package netutil

import (
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	"google.golang.org/grpc/health/grpc_health_v1"
	"net"
	"testing"
	"time"
)

func TestChanPipes(t *testing.T) {
	d, l := ChanPipes()

	srv := grpc.NewServer()
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	go srv.Serve(l)

	cc, err := grpc.Dial("", grpc.WithDialer(func(addr string, _ time.Duration) (net.Conn, error) { return d.Dial("pipe", addr) }), grpc.WithInsecure())
	if err != nil {
		t.Error(err)
		return
	}
	clt := grpc_health_v1.NewHealthClient(cc)

	_, err = clt.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
	if err != nil {
		t.Error(err)
		return
	}
}

func TestMuxPipes(t *testing.T) {
	d, l := MuxPipes()

	srv := grpc.NewServer()
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	go srv.Serve(l)

	cc, err := grpc.Dial("", grpc.WithDialer(func(addr string, _ time.Duration) (net.Conn, error) { return d.Dial("pipe", addr) }), grpc.WithInsecure())
	if err != nil {
		t.Error(err)
		return
	}
	clt := grpc_health_v1.NewHealthClient(cc)

	_, err = clt.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
	if err != nil {
		t.Error(err)
		return
	}
}

func TestBufferedPipes(t *testing.T) {
	d, l := BufferedPipes(-1)

	srv := grpc.NewServer()
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	go srv.Serve(l)

	cc, err := grpc.Dial("", grpc.WithDialer(func(addr string, _ time.Duration) (net.Conn, error) { return d.Dial("pipe", addr) }), grpc.WithInsecure())
	if err != nil {
		t.Error(err)
		return
	}
	clt := grpc_health_v1.NewHealthClient(cc)

	_, err = clt.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
	if err != nil {
		t.Error(err)
		return
	}
}

func BenchmarkChanPipes(b *testing.B) {
	d, l := ChanPipes()

	srv := grpc.NewServer()
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	go srv.Serve(l)

	cc, err := grpc.Dial("", grpc.WithDialer(func(addr string, _ time.Duration) (net.Conn, error) { return d.Dial("pipe", addr) }), grpc.WithInsecure())
	if err != nil {
		b.Error(err)
		return
	}
	clt := grpc_health_v1.NewHealthClient(cc)

	for i := 0; i < b.N; i++ {
		_, err = clt.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
		if err != nil {
			b.Error(err)
			return
		}
	}
}

func BenchmarkBufferedPipes(b *testing.B) {
	d, l := BufferedPipes(-1)

	srv := grpc.NewServer()
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	go srv.Serve(l)

	cc, err := grpc.Dial("", grpc.WithDialer(func(addr string, _ time.Duration) (net.Conn, error) { return d.Dial("pipe", addr) }), grpc.WithInsecure())
	if err != nil {
		b.Error(err)
		return
	}
	clt := grpc_health_v1.NewHealthClient(cc)

	for i := 0; i < b.N; i++ {
		_, err = clt.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
		if err != nil {
			b.Error(err)
			return
		}
	}
}

func BenchmarkMuxPipes(b *testing.B) {
	d, l := MuxPipes()

	srv := grpc.NewServer()
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	go srv.Serve(l)

	cc, err := grpc.Dial("", grpc.WithDialer(func(addr string, _ time.Duration) (net.Conn, error) { return d.Dial("pipe", addr) }), grpc.WithInsecure())
	if err != nil {
		b.Error(err)
		return
	}
	clt := grpc_health_v1.NewHealthClient(cc)

	for i := 0; i < b.N; i++ {
		_, err = clt.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
		if err != nil {
			b.Error(err)
			return
		}
	}
}
