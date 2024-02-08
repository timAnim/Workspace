package main

import (
	"fmt"
	"os"
	"strconv"
	"syscall"
	"unsafe"

	"github.com/tamago-cn/mbserver"
)

func ioctl(fd, cmd, ptr uintptr) error {
	_, _, e := syscall.Syscall(syscall.SYS_IOCTL, fd, cmd, ptr)
	if e != 0 {
		return e
	}
	return nil
}

func ptsname(f *os.File) (string, error) {
	var n uint32
	err := ioctl(f.Fd(), syscall.TIOCGPTN, uintptr(unsafe.Pointer(&n)))
	if err != nil {
		return "", err
	}
	return "/dev/pts/" + strconv.Itoa(int(n)), nil
}

func unlockpt(f *os.File) error {
	var u int32
	// use TIOCSPTLCK with a zero valued arg to clear the slave pty lock
	return ioctl(f.Fd(), syscall.TIOCSPTLCK, uintptr(unsafe.Pointer(&u)))
}

func StartPty() (pty, tty *os.File, err error) {
	p, err := os.OpenFile("/dev/ptmx", os.O_RDWR, 0)
	if err != nil {
		return nil, nil, err
	}

	sname, err := ptsname(p)
	if err != nil {
		return nil, nil, err
	}

	err = unlockpt(p)
	if err != nil {
		return nil, nil, err
	}

	//fmt.Println("sname is :", sname)
	t, err := os.OpenFile(sname, os.O_RDWR|syscall.O_NOCTTY, 0)
	if err != nil {
		return nil, nil, err
	}

	return p, t, nil
}

func main() {
	m, s, err := StartPty()
	if err != nil {
		fmt.Printf("start pty: ", err)
		os.Exit(-1)
	}
	defer m.Close()
	defer s.Close()

	//n, err := m.Write([]byte("hello world!\n"))
	//fmt.Printf("write master, %d:%v\n", n, err)

	//buf := make([]byte, 256)
	//n, err = s.Read(buf)
	//fmt.Println("read from slave:", string(buf[0:n]))

	//n, err = s.Write([]byte("slave!\n"))
	//fmt.Printf("write slave, %d:%v\n", n, err)
	//n, err = m.Read(buf[:])
	//fmt.Println("read from master:", string(buf[0:n]))
	fmt.Println("slave: ", s.Name())
	for {

		b := make([]byte, 4096)
		n, err := m.Read(b)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("master recv: ", n, mbserver.FormatBytes(b[:n]))

		//for {
		//	if b[n-1] == 0x0A && b[n-2] == 0x0D {
		//		n -= 2
		//	} else {
		//		break
		//	}
		//}

		x, err := m.Write(b[:n])
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("master send: ", x)

	}
}
