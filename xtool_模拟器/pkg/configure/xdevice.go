package configure

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"
	"xtool/pkg/reg"
	"xtool/pkg/xdevice"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("xdevice", "xdevice_connect", XDeviceConnect, "连接xdevice", `xdevice_connect <addr>`, []*reg.Param{
		&reg.Param{Name: "addr", Type: "string", Necessity: true, Desc: "xdevice服务地址"},
	})

	reg.Regist("xdevice", "xdevice_debug_device", XDeviceDebugDevice, "查看xdevice设备", `xdevice_debug_device <deviceIDs>`, []*reg.Param{
		&reg.Param{Name: "deviceIDs", Type: "string", Necessity: true, Desc: "要查看的设备ID列表, 以','隔开"},
	})
	reg.Regist("xdevice", "xdevice_debug_work", XDeviceDebugWork, "查看xdevice线程", `xdevice_debug_work <indices>`, []*reg.Param{
		&reg.Param{Name: "indices", Type: "string", Necessity: true, Desc: "要查看的线程列表, 以','隔开"},
	})
	reg.Regist("xdevice", "xdevice_debug_bind", XDeviceDebugBind, "反查绑定测点", `xdevice_debug_bind <spotIDs>`, []*reg.Param{
		&reg.Param{Name: "spotIDs", Type: "string", Necessity: true, Desc: "要查看的测点列表, 以','隔开"},
	})
	reg.Regist("xdevice", "xdevice_debug_spot", XDeviceDebugSpot, "查看测点状态", `xdevice_debug_spot <spotIDs>`, []*reg.Param{
		&reg.Param{Name: "spotIDs", Type: "string", Necessity: true, Desc: "要查看的测点列表, 以','隔开"},
	})
}

var xdeviceAddr = "127.0.0.1:6201"

// XDeviceConnect 连接xdevice
func XDeviceConnect(addr string) {
	xdeviceAddr = addr
	log.Infof("set xdevice connection to '%s'", addr)
}

// XDeviceDebugDevice 调试设备
func XDeviceDebugDevice(deviceIDs string) {
	ids := strings.Split(deviceIDs, ",")
	c, conn, err := xdevice.NewClient(xdeviceAddr)
	if err != nil {
		log.Errorf("connect to xdevice error: %s", err.Error())
		return
	}
	defer conn.Close()
	dRes, err := c.DebugDevice(context.Background(), &xdevice.CommonReq{
		Resourceid: ids,
	})
	if err != nil {
		log.Errorf("c.DebugDevice error: %s", err.Error())
		return
	}

	for _, d := range dRes.Devices {
		fmt.Printf("device_id: '%s' ci_type: '%d' device_type: '%s' bind_board: %v status: %d last_time: %d threadindex: %d\n", d.Resourceid, d.Citype, d.Devicetype, d.Bindboard, d.Status, d.Lasttime, d.Threadindex)
		fmt.Println("child_status:")
		for _, spot := range d.Childstatus {
			fmt.Printf("\t%v\n", spot)
		}
		fmt.Println("children:")
		for _, spot := range d.Childs {
			fmt.Printf("\tspot_id: '%s', name: '%s', ci_type: '%d', spot_type: '%d', bind_to: %v, parent_id: '%s', last_status: %d, last_value: '%s', last_time: %d (%s)\n", spot.Resourceid, spot.Name, spot.Citype, spot.Spottype, spot.Bindid, spot.Parent, spot.Laststatus, spot.Lastvalue, spot.Lasttime, time.Unix(spot.Lasttime, 0).Format("2006-01-02 15:04:05"))
		}
	}
}

// XDeviceDebugWork 查看工作线程
func XDeviceDebugWork(indices string) {
	idxes := make([]int32, 0, 10)

	for _, index := range strings.Split(indices, ",") {
		idx, err := strconv.Atoi(index)
		if err != nil {
			log.Errorf("'%s; convert to int error: %s", index, err.Error())
			return
		}
		idxes = append(idxes, int32(idx))
	}

	c, conn, err := xdevice.NewClient(xdeviceAddr)
	if err != nil {
		log.Errorf("connect to xdevice error: %s", err.Error())
		return
	}
	defer conn.Close()

	wRes, err := c.DebugWork(context.Background(), &xdevice.DebugWorkReq{
		Index: idxes,
	})
	if err != nil {
		log.Errorf("c.DebugWork error: %s", err.Error())
		return
	}

	for _, w := range wRes.Workers {
		fmt.Printf("%s\n\n", w.Rundata)
	}
}

// XDeviceDebugBind 反查绑定关系
func XDeviceDebugBind(spotIDs string) {
	ids := strings.Split(spotIDs, ",")

	c, conn, err := xdevice.NewClient(xdeviceAddr)
	if err != nil {
		log.Errorf("connect to xdevice error: %s", err.Error())
		return
	}
	defer conn.Close()

	bRes, err := c.DebugBind(context.Background(), &xdevice.CommonReq{
		Resourceid: ids,
	})
	if err != nil {
		log.Errorf("c.DebugBind error: %s", err.Error())
		return
	}

	for _, b := range bRes.Br {
		fmt.Println(b)
	}
}

// XDeviceDebugSpot 查看测点
func XDeviceDebugSpot(spotIDs string) {
	ids := strings.Split(spotIDs, ",")

	c, conn, err := xdevice.NewClient(xdeviceAddr)
	if err != nil {
		log.Errorf("connect to xdevice error: %s", err.Error())
		return
	}
	defer conn.Close()

	sRes, err := c.DebugSpot(context.Background(), &xdevice.CommonReq{
		Resourceid: ids,
	})
	if err != nil {
		log.Errorf("c.DebugBind error: %s", err.Error())
		return
	}

	for _, spot := range sRes.Spots {
		fmt.Printf("\tspot_id: '%s', name: '%s', ci_type: '%d', spot_type: '%d', bind_to: %v, parent_id: '%s', last_status: %d, last_value: '%s;, last_time: %d (%s)\n", spot.Resourceid, spot.Name, spot.Citype, spot.Spottype, spot.Bindid, spot.Parent, spot.Laststatus, spot.Lastvalue, spot.Lasttime, time.Unix(spot.Lasttime, 0).Format("2006-01-02 15:04:05"))
	}
}
