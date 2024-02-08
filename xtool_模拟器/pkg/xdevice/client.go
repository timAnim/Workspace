package xdevice

import grpc "google.golang.org/grpc"

// NewClient 用于创建grpc连接
func NewClient(address string) (XDeviceClient, *grpc.ClientConn, error) {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		return nil, nil, err
	}
	return NewXDeviceClient(conn), conn, nil
}
