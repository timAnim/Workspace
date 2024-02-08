package net

import (
	"io"
	"net"
	"os"
	"strconv"
	"time"
)

var StdConn net.Conn

func init() {
	StdConn = &ProcessConn{
		Stdin:  os.Stdin,
		Stdout: os.Stdout,
		Local:  ProcessAddr(os.Getpid()),
		Remote: ProcessAddr(os.Getppid()),
	}
}

type ProcessConn struct {
	Stdin         io.ReadCloser
	Stdout        io.WriteCloser
	Local, Remote ProcessAddr
}

func (pc *ProcessConn) Read(b []byte) (n int, err error) {
	return pc.Stdin.Read(b)
}

func (pc *ProcessConn) Write(b []byte) (n int, err error) {
	return pc.Stdout.Write(b)
}

func (pc *ProcessConn) Close() error {
	pc.Stdout.Close()
	pc.Stdin.Close()
	return nil
}

func (pc *ProcessConn) LocalAddr() net.Addr {
	return &pc.Local
}

func (pc *ProcessConn) RemoteAddr() net.Addr {
	return &pc.Remote
}

func (pc *ProcessConn) SetDeadline(t time.Time) error {
	return nil
}

func (pc *ProcessConn) SetReadDeadline(t time.Time) error {
	return nil
}

func (pc *ProcessConn) SetWriteDeadline(t time.Time) error {
	return nil
}

type ProcessAddr int

func (pa *ProcessAddr) Network() string {
	return "process"
}

func (pa *ProcessAddr) String() string {
	return "PID-" + strconv.Itoa(int(*pa))
}
