package ngx

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestLoad(t *testing.T) {
	Convey("test LoadNginxConf", t, func() {
		{
			//LoadNginxConf("nginx.conf")
			//NginxReconf("org/nginx.conf")
			NginxReconf("nginx.conf")
		}
	})
}
