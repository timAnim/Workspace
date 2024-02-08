package web

import (
	"xtool/pkg/cmdb"
	"xtool/pkg/route"

	"github.com/gin-gonic/gin"
)

func init() {
	route.GET("cmdb", "/api/cmdb/item", itemHandler)
	route.GET("cmdb", "/api/cmdb/children", childrenHandler)
}

type itemGetReq struct {
	ResourceID string `form:"resource_id"`
	Deleted    int    `form:"deleted"`
}

func itemHandler(c *gin.Context) {
	req := &itemGetReq{}
	err := c.BindQuery(req)
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}
	item, err := cmdb.GetItem(req.ResourceID, req.Deleted)
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}
	route.RenderSuccess(c, item)
}

func childrenHandler(c *gin.Context) {
	req := &itemGetReq{}
	err := c.BindQuery(req)
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}
	items, err := cmdb.GetChildren(req.ResourceID, req.Deleted, nil)
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}
	res := cmdb.Sort(items)
	route.RenderSuccess(c, gin.H{
		"resources": res,
	})
}
