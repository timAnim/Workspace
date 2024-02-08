// Package scp provides a simple interface to copying files over a
// go.crypto/ssh session.
package scp

import (
	"fmt"
	"io"
	"os"
	"path"

	shellquote "github.com/kballard/go-shellquote"

	"golang.org/x/crypto/ssh"
)

// Copy 拷贝
func Copy(size int64, mode os.FileMode, fileName string, contents io.Reader, destinationPath string, session *ssh.Session) error {
	return copy(size, mode, fileName, contents, destinationPath, session)
}

// CopyPath 目录拷贝
func CopyPath(filePath, destinationPath string, session *ssh.Session) error {
	f, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer f.Close()
	s, err := f.Stat()
	if err != nil {
		return err
	}
	return copy(s.Size(), s.Mode().Perm(), path.Base(filePath), f, destinationPath, session)
}

func copy(size int64, mode os.FileMode, fileName string, contents io.Reader, destination string, session *ssh.Session) error {
	defer session.Close()
	w, err := session.StdinPipe()

	if err != nil {
		return err
	}

	cmd := shellquote.Join("scp", "-t", destination)
	if err := session.Start(cmd); err != nil {
		w.Close()
		return err
	}

	errors := make(chan error)

	go func() {
		errors <- session.Wait()
	}()

	fmt.Fprintf(w, "C%#o %d %s\n", mode, size, fileName)
	io.Copy(w, contents)
	fmt.Fprint(w, "\x00")
	w.Close()

	return <-errors
}

// CopyToRemote 从本地拷贝到远程
func CopyToRemote(session *ssh.Session, localPath string, remotePath string) error {
	f, err := os.Open(localPath)
	if err != nil {
		return err
	}
	defer f.Close()
	s, err := f.Stat()
	if err != nil {
		return err
	}
	return copy(s.Size(), s.Mode().Perm(), path.Base(localPath), f, remotePath, session)
}

// CopyFromRemote 从远程拷贝到本地
func CopyFromRemote(session *ssh.Session, remotePath string, localPath string) error {
	r, err := session.StdoutPipe()
	if err != nil {
		return err
	}
	cmd := shellquote.Join("cat", remotePath)
	err = session.Start(cmd)
	if err != nil {
		return err
	}
	dstFile, err := os.Create(localPath)
	if err != nil {
		return err
	}
	defer dstFile.Close()

	errors := make(chan error)

	go func() {
		errors <- session.Wait()
	}()

	io.Copy(dstFile, r)

	return <-errors
}
