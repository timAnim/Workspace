package auc

import (
	"crypto/tls"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/tidwall/gjson"
)

// Client HTTP客户端
type Client struct {
	Addr     string `json:"addr"`
	Account  string `json:"account"`
	Password string `json:"password"`

	useHTTPS bool
	info     *Info
}

// Info 登陆信息
type Info struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Account  string `json:"account"`
	Password string `json:"password"`
	Session  string `json:"session"`
	AddInfo  string `json:"add_info"`
}

func (c *Client) getAddr() string {
	if c.useHTTPS {
		return fmt.Sprintf("https://%s", c.Addr)
	}
	return fmt.Sprintf("http://%s", c.Addr)
}

// Jar Cookie包
type Jar struct {
	cookies []*http.Cookie
}

// SetCookies 设置Cookies
func (jar *Jar) SetCookies(u *url.URL, cookies []*http.Cookie) {
	jar.cookies = cookies
}

// Cookies 获取Cookies
func (jar *Jar) Cookies(u *url.URL) []*http.Cookie {
	return jar.cookies
}

func (c *Client) newCookieJar() http.CookieJar {
	if c.info == nil {
		return nil
	}
	cookies := []*http.Cookie{
		&http.Cookie{
			Name:  "MODE",
			Value: "0",
		},
		&http.Cookie{
			Name:  "THEME",
			Value: "default",
		},
		&http.Cookie{
			Name:  "X_PRODUCT",
			Value: "gu",
		},
		&http.Cookie{
			Name:  "JSESSIONID",
			Value: "dummy",
		},
		&http.Cookie{
			Name:  "USER_ID",
			Value: fmt.Sprintf("%d", c.info.ID),
		},
		&http.Cookie{
			Name:  "ACCOUNT",
			Value: base64.StdEncoding.EncodeToString([]byte(c.info.Account)),
		},
		&http.Cookie{
			Name:  "USER_NAME",
			Value: base64.StdEncoding.EncodeToString([]byte(c.info.Name)),
		},
		&http.Cookie{
			Name:  "X_GU_SID",
			Value: c.info.Session,
		},
	}
	jar := &Jar{}
	jar.SetCookies(nil, cookies)
	return jar
}

func (c *Client) newHTTPClient() *http.Client {
	// 'MODE=0; THEME=default; X_PRODUCT=gu; JSESSIONID=dummy; USER_ID=1; ACCOUNT=YWRtaW4=; USER_NAME=57O757uf566h55CG5ZGY; X_GU_SID=XSS_vhyFnjplHPNfQNuI04oc2CazJDm8XM5h889Oisk82GOSt9I'
	var tr *http.Transport

	tr = &http.Transport{
		TLSClientConfig: &tls.Config{
			//Certificates:       []tls.Certificate{cliCrt},
			InsecureSkipVerify: true,
		},
	}

	return &http.Client{
		Jar:       c.newCookieJar(),
		Transport: tr,
	}
}

// Login 模拟登录
func (c *Client) Login() error {
	if c.Addr == "127.0.0.1" {
		// 本机不需要登录
		return nil
	}
	if c.Account == "" {
		c.Account = "admin"
	}
	if c.Password == "" {
		c.Password = "123456"
	}
	b := fmt.Sprintf(`{
		"account": "%s",
		"password": "%s"
	}`, c.Account, c.Password)

retry:
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/auth/sso/login", c.getAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	client := c.newHTTPClient()
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode == http.StatusNotFound && !c.useHTTPS {
		c.useHTTPS = true
		goto retry
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	info := &Info{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), info)
	if err != nil {
		return err
	}
	info.Password = c.Password
	c.info = info
	return nil
}
