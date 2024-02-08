package httpx

import (
	"net/http"
	"time"
)

// OptionFunc option func definition
type OptionFunc func(c *http.Client)

// NewHTTPClient new http client
func NewHTTPClient(opts ...OptionFunc) *http.Client {
	c := &http.Client{}

	for _, opt := range opts {
		opt(c)
	}

	return c
}

// WithCookies assign cookies to http client
func WithCookies(jar http.CookieJar) OptionFunc {
	return func(c *http.Client) {
		c.Jar = jar
	}
}

// WithTimeout assign timeout to http client
func WithTimeout(timeout time.Duration) OptionFunc {
	return func(c *http.Client) {
		c.Timeout = timeout
	}
}

////////////////////////////////////////////////////

// SetDefaultClient set new default client func
func SetDefaultClient(opts ...OptionFunc) {
	newDefaultClientFunc = func() *http.Client {
		return NewHTTPClient(opts...)
	}
}

var newDefaultClientFunc = func() *http.Client {
	return NewHTTPClient()
}

// DoRequest do http request
func DoRequest(req *http.Request) (*http.Response, error) {
	return newDefaultClientFunc().Do(req)
}
