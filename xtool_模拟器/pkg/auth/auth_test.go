package auth

import "testing"

func TestLogin(t *testing.T) {
	Addr = "192.168.0.132"
	err := Login("admin", "123456")
	if err != nil {
		t.Error(err.Error())
	}
	err = Logout()
	if err != nil {
		t.Error(err.Error())
	}
}
