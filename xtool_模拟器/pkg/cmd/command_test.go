package cmd

import (
	"os"
	"testing"
)

func TestPrefixWriter(t *testing.T) {
	pw := NewPrefixWriter("127.0.0.1", os.Stdout)

	pw.Write([]byte("2222222222222\nsasasa\n\nsdasa\n"))
}
