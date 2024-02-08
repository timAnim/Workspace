package modbus

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"mime"
	"net"
	"net/http"
	"strconv"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	modbusPb "xtool/pkg/protos/modbus"
	"xtool/pkg/reg"
	"xtool/pkg/xpty/modbus/handler"
)

func init() {
	reg.Regist("xpty", "modbus_web", Web, "启动 modbus web 模拟器", `modbus_web <port>`, []*reg.Param{
		&reg.Param{Name: "port", Type: "string", Necessity: true, Desc: "服务地址"},
		&reg.Param{Name: "rtuBase", Type: "int", Necessity: false, Desc: "modbus RTU 基准端口，默认: 21000"},
		&reg.Param{Name: "rtuCount", Type: "int", Necessity: false, Desc: "modbus RTU 端口数量，默认: 10"},
		&reg.Param{Name: "tcpBase", Type: "int", Necessity: false, Desc: "modbus TCP 基准端口，默认: 22000"},
		&reg.Param{Name: "tcpCount", Type: "int", Necessity: false, Desc: "modbus TCP 端口数量，默认: 10"},
		&reg.Param{Name: "ttyPrefix", Type: "string", Necessity: false, Desc: "/dev 下的串口前缀，以端口前缀以','分隔，默认: 'ttyS,ttymxc'"},
	})
}

//go:embed dist
var dist embed.FS

func servePage(mux *http.ServeMux) {
	mime.AddExtensionType(".svg", "image/svg+xml")

	sub, _ := fs.Sub(dist, "dist")
	prefix := "/"
	mux.Handle(prefix, http.StripPrefix(prefix, http.FileServer(http.FS(sub))))
}

// Web 在Web App中模拟modbus协议
func Web(port string, rtuBase string, rtuCount string, tcpBase string, tcpCount string, ttyPrefix string) {
	p, err := strconv.Atoi(port)
	if err != nil {
		p = 8010
	}
	rb, err := strconv.Atoi(rtuBase)
	if err != nil {
		rb = 21000
	}
	rc, err := strconv.Atoi(rtuCount)
	if err != nil {
		rc = 10
	}

	tb, err := strconv.Atoi(tcpBase)
	if err != nil {
		tb = 22000
	}
	tc, err := strconv.Atoi(tcpCount)
	if err != nil {
		tc = 10
	}
	if ttyPrefix == "" {
		ttyPrefix = "ttyS,ttymxc"
	}
	go func() {
		targetAddr := fmt.Sprintf("localhost:%d", p)
		listenAddr := fmt.Sprintf(":%d", p)

		opts := []grpc.ServerOption{}
		dopts := []grpc.DialOption{
			grpc.WithInsecure(),
		}

		ctx := context.Background()
		mux := http.NewServeMux()
		gwmux := runtime.NewServeMux(
			runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{OrigName: true, EmitDefaults: true}),
		)

		grpcServer := grpc.NewServer(opts...)

		modbusServer := handler.NewServer(
			handler.WithRTUPortBase(rb),
			handler.WithRTUPortCount(rc),
			handler.WithTCPPortBase(tb),
			handler.WithTCPPortCount(tc),
			handler.WithTTYPrefix(ttyPrefix),
			handler.WithTTYExclude("ttymxc0"),
		)
		modbusPb.RegisterXModbusServer(grpcServer, modbusServer)

		reflection.Register(grpcServer)

		modbusPb.RegisterXModbusHandlerFromEndpoint(ctx, gwmux, targetAddr, dopts)

		mux.Handle("/modbus/", gwmux)

		servePage(mux)

		h2s := http2.Server{}
		h := h2c.NewHandler(GrpcHandlerFunc(grpcServer, mux), &h2s)

		srv := &http.Server{
			Addr:    listenAddr,
			Handler: h,
		}

		lis, err := net.Listen("tcp", listenAddr)
		if err != nil {
			panic(err)
		}
		log.Infof("modbus web server listen on '%s'", listenAddr)

		err = srv.Serve(lis)

		if err != nil {
			log.Errorf("ListenAndServe error: %s", err.Error())
		}
	}()
}

// GrpcHandlerFunc 同时服务GRPC与HTTP
func GrpcHandlerFunc(grpcServer *grpc.Server, otherHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO(tamird): point to merged gRPC code rather than a PR.
		// This is a partial recreation of gRPC's internal checks https://github.com/grpc/grpc-go/pull/514/files#diff-95e9a25b738459a2d3030e1e6fa2a718R61
		//fmt.Println(r.Header, r.ProtoMajor)
		if r.ProtoMajor == 2 && strings.Contains(r.Header.Get("Content-Type"), "application/grpc") {
			//if r.ProtoMajor == 2 {
			grpcServer.ServeHTTP(w, r)
		} else {
			otherHandler.ServeHTTP(w, r)
		}
	})
}
