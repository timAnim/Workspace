package store

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/define"

	"github.com/tidwall/gjson"
)

/*
{
    "disk_capacity": {
        "alarm": true,
        "auto_delete": true,
        "limited": 80,
        "total": "20.99GB"
    },
    "storage": {
        "expired": {
            "alarm_event": 1,
            "comb_data": 3,
            "etl_data": 3,
            "log": 1,
            "real_data": 1
        },
        "rate_estimate": 10
    },
    "strategy": {
        "comb_storage": {
            "period": {
                "enable": true,
                "minute": 5
            },
            "rate_change": {
                "enable": false,
                "rate": 5
            },
            "real_spot": {
                "device": [],
                "enable": false,
                "space": [],
                "spots": {}
            },
            "value_change": {
                "enable": false
            }
        },
        "method": 2
    }
}
*/

// Addr 服务器地址
var Addr string

// 存储方式
const (
	CombStorage = 0
	AllRealTime = 1
	DontSave    = 2
)

func init() {
	Addr = "127.0.0.1"
}

// StorageConfig 存储配置
type StorageConfig struct {
	DiskCapacity struct {
		Alarm      bool        `json:"alarm"`
		AutoDelete bool        `json:"auto_delete"`
		Limited    int         `json:"limited"`
		Total      interface{} `json:"total"`
	} `json:"disk_capacity"`
	Storage struct {
		Expired struct {
			AlarmEvent int `json:"alarm_event"`
			CombData   int `json:"comb_data"`
			EtlData    int `json:"etl_data"`
			Log        int `json:"log"`
			RealData   int `json:"real_data"`
		} `json:"expired"`
		RateEstimate int `json:"rate_estimate"`
	} `json:"storage"`
	Strategy struct {
		CombStorage struct {
			Period struct {
				Eanabled bool `json:"enable"`
				Minute   int  `json:"minute"`
			} `json:"period"`
			RateChange struct {
				Eanabled bool `json:"enable"`
				Rate     int  `json:"rate"`
			} `json:"rate_change"`
			ValueChange struct {
				Eanabled bool `json:"enable"`
			} `json:"value_change"`
			RealSpot struct {
				Device   []string `json:"device"`
				Eanabled bool     `json:"enable"`
				Space    []string `json:"space"`
				Spots    define.M `json:"spots"`
			} `json:"real_spot"`
		} `json:"comb_storage"`
		Method int `json:"method"`
	} `json:"strategy"`
}

// GetStorageConfig 获取存储配置
func GetStorageConfig() (*StorageConfig, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v2/project/storage", auth.GetAddr()), nil)
	if err != nil {
		return nil, err
	}
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return nil, fmt.Errorf("data error: not json, data: %s", string(body))
	}
	//fmt.Println(gjson.Get(string(body), "data.interfaces"), err)
	cfg := StorageConfig{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), &cfg)
	if err != nil {
		return nil, err
	}
	//fmt.Println(cfg)
	return &cfg, nil
}

// SetStorageConfig 修改存储配置
func SetStorageConfig(cfg *StorageConfig) error {
	if cfg.Strategy.CombStorage.RealSpot.Space == nil {
		cfg.Strategy.CombStorage.RealSpot.Space = []string{}
	}
	if cfg.Strategy.CombStorage.RealSpot.Device == nil {
		cfg.Strategy.CombStorage.RealSpot.Device = []string{}
	}
	if cfg.Strategy.CombStorage.RealSpot.Spots == nil {
		cfg.Strategy.CombStorage.RealSpot.Spots = define.M{}
	}
	b, err := json.Marshal(cfg)

	//fmt.Println(string(b))
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/project/storage", auth.GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	return nil

}
