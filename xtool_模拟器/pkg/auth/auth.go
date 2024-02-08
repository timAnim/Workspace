package auth

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

var (
	// Addr 地址
	Addr     string
	info     *Info
	useHTTPS = false
)

func init() {
	Addr = "127.0.0.1"
	info = &Info{}
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

// Login 登陆
func Login(account string, password string) error {
	if info.Session != "" {
		return fmt.Errorf("%s had login, session: %s", info.Name, info.Session)
	}
	b := fmt.Sprintf(`{
		"account": "%s",
		"password": "%s"
	}`, account, password)

retry:
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/auth/sso/login", GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	c := NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode == http.StatusNotFound && !useHTTPS {
		useHTTPS = true
		goto retry
	}
	//resp, err := http.Post(fmt.Sprintf("http://%s/api/v2/auth/sso/login", Addr), "application/json", strings.NewReader(b))
	//if err != nil {
	//	return err
	//}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), info)
	if err != nil {
		return err
	}
	info.Password = password

	// 后续扩展用
	//httpx.SetDefaultClient(httpx.WithCookies(NewCookieJar()))

	return nil
}

// Logout 登陆
func Logout() error {
	b := fmt.Sprintf(`{
		"session": "%s"
	}`, info.Session)

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/auth/sso/logout", GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	c := NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	//resp, err := http.Post(fmt.Sprintf("http://%s/api/v2/auth/sso/logout", Addr), "application/json", strings.NewReader(b))
	//if err != nil {
	//	return err
	//}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	//fmt.Println(string(body))
	info = &Info{}
	useHTTPS = false
	return nil
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

// NewCookieJar 新建cookie jar
func NewCookieJar() http.CookieJar {
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
			Value: fmt.Sprintf("%d", info.ID),
		},
		&http.Cookie{
			Name:  "ACCOUNT",
			Value: base64.StdEncoding.EncodeToString([]byte(info.Account)),
		},
		&http.Cookie{
			Name:  "USER_NAME",
			Value: base64.StdEncoding.EncodeToString([]byte(info.Name)),
		},
		&http.Cookie{
			Name:  "X_GU_SID",
			Value: info.Session,
		},
	}
	jar := &Jar{}
	jar.SetCookies(nil, cookies)
	return jar
}

// NewHTTPClient 带Cookie的HTTP客户端
func NewHTTPClient() *http.Client {
	// 'MODE=0; THEME=default; X_PRODUCT=gu; JSESSIONID=dummy; USER_ID=1; ACCOUNT=YWRtaW4=; USER_NAME=57O757uf566h55CG5ZGY; X_GU_SID=XSS_vhyFnjplHPNfQNuI04oc2CazJDm8XM5h889Oisk82GOSt9I'
	var tr *http.Transport
	//cliCrt, err := tls.LoadX509KeyPair("ssl.crt", "ssl.key")
	//if err != nil {
	//	fmt.Println("Loadx509keypair err:", err)
	//	tr = &http.Transport{
	//		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	//	}
	//}

	tr = &http.Transport{
		TLSClientConfig: &tls.Config{
			//Certificates:       []tls.Certificate{cliCrt},
			InsecureSkipVerify: true,
		},
	}

	return &http.Client{
		Jar:       NewCookieJar(),
		Transport: tr,
	}
}

// GetSession 获取会话session
func GetSession() string {
	return info.Session
}

// GetAddr 获取会话地址
func GetAddr() string {
	if useHTTPS {
		return fmt.Sprintf("https://%s", Addr)
	}
	return fmt.Sprintf("http://%s", Addr)
}

// GetHost 获取会话session
func GetHost() string {
	return strings.Replace(Addr, ":", "-", -1)
}

// GetAccount 获取账号
func GetAccount() string {
	return info.Account
}

// GetPassword 获取密码
func GetPassword() string {
	return info.Password
}
