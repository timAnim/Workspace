package configure

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/rmq"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "simulator", Simulator, "数据模拟", `simulator <rootID>`, []*reg.Param{
		&reg.Param{Name: "rootID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "mqAddr", Type: "string", Necessity: true, Desc: "mq地址，默认 127.0.0.1:5672"},
	})
}

type simDevice struct {
	Device *cmdb.Resource
	Spots  []*cmdb.Resource
}

// Simulator 启动模拟器
func Simulator(rootID string, mqAddr string) {
	ds, err := getDevices(rootID)
	if err != nil {
		log.Errorf("getDevices error: %s", err.Error())
		return
	}
	devices := make([]*simDevice, 0, len(ds))
	for _, d := range ds {
		device := &simDevice{
			Device: d,
		}

		spots, err := cmdb.GetChildren(d.ResourceID, 0, []string{"name", "ci_type", "location", "spot_type", "value_type"})
		if err != nil {
			log.Errorf("getSpots error: %s", err.Error())
			return
		}
		device.Spots = spots
		devices = append(devices, device)
		log.Infof("load device '%s' spots: %d", d.ResourceID, len(spots))
	}

	if mqAddr == "" {
		mqAddr = "127.0.0.1:5672"
	}

	mq, err := rmq.Dial(fmt.Sprintf("amqp://gj:xbrother@%s", mqAddr))
	if err != nil {
		log.Errorf("rmq.Dial error: %s", err.Error())
		return
	}

	p := mq.NewPublisher("fss_exchange", "fss.value.#")

	ch := make(chan os.Signal)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-ch
		panic("sop simulator")
	}()

	log.Infof("start simulator")

	for {
		for _, d := range devices {
			t := time.Now().Unix()

			vs := make([]*MQValueSpot, 0, len(d.Spots))

			for _, s := range d.Spots {
				v := rand.Intn(10)
				if s.Attributes.MustString("value_type") == "float" {
					v = rand.Intn(1000)
				}
				vs = append(vs, &MQValueSpot{
					ResourceID: s.ResourceID,
					RealValue:  strconv.Itoa(v),
					Status:     1,
					Timestamp:  t,
				})
			}

			m := &MQValue{
				Args: &MQValueArgs{
					Data: &MQValueData{
						Device: &MQValueSpot{
							ResourceID: d.Device.ResourceID,
							RealValue:  "1",
							Status:     1,
							Timestamp:  t,
						},
						Spots: vs,
					},
				},
				UID:    "",
				Method: "",
			}
			b, err := json.Marshal(m)
			if err != nil {
				log.Errorf("json.Marshal error: %s", err.Error())
				continue
			}

			log.Infof("publish value for '%s'", d.Device.ResourceID)
			if err := p.Publish(b); err != nil {
				log.Errorf("p.Publish error: %s", err.Error())
				continue
			}
			time.Sleep(500 * time.Millisecond)
		}
	}
	// 执行数据模拟
}

func getDevices(rootID string) ([]*cmdb.Resource, error) {
	items, err := cmdb.QueryItems(&define.Query{
		Output: []string{"name", "ci_type", "location", "board_options"},
		Where: []*define.Cond{
			&define.Cond{
				Terms: []*define.Term{
					&define.Term{
						Field:    "ci_type",
						Operator: "eq",
						Value:    "2",
					},
					&define.Term{
						Field:    "location",
						Operator: "like",
						Value:    "%" + rootID,
					},
				},
			},
			&define.Cond{
				Terms: []*define.Term{
					&define.Term{
						Field:    "ci_type",
						Operator: "eq",
						Value:    "2",
					},
					&define.Term{
						Field:    "location",
						Operator: "like",
						Value:    "%" + rootID + "/%",
					},
				},
			},
		},
	})
	if err != nil {
		return nil, err
	}
	return items.Resources, nil
}
