package rmq

import (
	"bytes"
	"errors"
	"github.com/klauspost/compress/gzip"
	"github.com/klauspost/compress/snappy"
	"github.com/klauspost/compress/zstd"
	"io"
)

// NewContentEncoder returns a ContentEncoder for the encoding type.
func NewContentEncoder(encoding string) (ContentEncoder, error) {
	switch encoding {
	case "gzip":
		return NewGzipEncoder()
	case "snappy":
		return NewSnappyEncoder()
	case "zstd":
		return NewZSTDEncoder()
	case "identity", "":
		return NewIdentityEncoder(), nil
	default:
		return nil, errors.New("invalid value for content_encoding")
	}
}

// NewContentDecoder returns a ContentDecoder for the encoding type.
func NewContentDecoder(encoding string) (ContentDecoder, error) {
	switch encoding {
	case "gzip":
		return NewGzipDecoder()
	case "snappy":
		return NewSnappyDecoder()
	case "zstd":
		return NewZSTDDecoder()
	case "identity", "":
		return NewIdentityDecoder(), nil
	default:
		return nil, errors.New("invalid value for content_encoding")
	}
}

// ContentEncoder applies a wrapper encoding to byte buffers.
type ContentEncoder interface {
	Encode([]byte) ([]byte, error)
}

type ZSTDEncoder struct {
	writer *zstd.Encoder
	buf    *bytes.Buffer
}

func NewZSTDEncoder() (*ZSTDEncoder, error) {
	var buf bytes.Buffer
	w, err := zstd.NewWriter(&buf)
	return &ZSTDEncoder{
		writer: w,
		buf:    &buf,
	}, err
}

func (e *ZSTDEncoder) Encode(data []byte) ([]byte, error) {
	e.buf.Reset()
	e.writer.Reset(e.buf)

	_, err := e.writer.Write(data)
	if err != nil {
		return nil, err
	}
	err = e.writer.Close()
	if err != nil {
		return nil, err
	}
	return e.buf.Bytes(), nil
}

type SnappyEncoder struct {
	buf []byte
}

// NewSnappyEncoder: use block format
func NewSnappyEncoder() (*SnappyEncoder, error) {
	const maxLen = 512 * 1024 // 512K
	return &SnappyEncoder{
		buf: make([]byte, maxLen),
	}, nil
}

func (e *SnappyEncoder) Encode(data []byte) ([]byte, error) {
	return snappy.Encode(e.buf, data), nil
}

// GzipEncoder compresses the buffer using gzip at the default level.
type GzipEncoder struct {
	writer *gzip.Writer
	buf    *bytes.Buffer
}

func NewGzipEncoder() (*GzipEncoder, error) {
	var buf bytes.Buffer
	return &GzipEncoder{
		writer: gzip.NewWriter(&buf),
		buf:    &buf,
	}, nil
}

func (e *GzipEncoder) Encode(data []byte) ([]byte, error) {
	e.buf.Reset()
	e.writer.Reset(e.buf)

	_, err := e.writer.Write(data)
	if err != nil {
		return nil, err
	}
	err = e.writer.Close()
	if err != nil {
		return nil, err
	}
	return e.buf.Bytes(), nil
}

// IdentityEncoder is a null encoder that applies no transformation.
type IdentityEncoder struct{}

func NewIdentityEncoder() *IdentityEncoder {
	return &IdentityEncoder{}
}

func (*IdentityEncoder) Encode(data []byte) ([]byte, error) {
	return data, nil
}

// ContentDecoder removes a wrapper encoding from byte buffers.
type ContentDecoder interface {
	Decode([]byte) ([]byte, error)
}

type ZSTDDecoder struct {
	reader *zstd.Decoder
	buf    *bytes.Buffer
}

func NewZSTDDecoder() (*ZSTDDecoder, error) {
	d, err := zstd.NewReader(nil)
	return &ZSTDDecoder{
		reader: d,
		buf:    new(bytes.Buffer),
	}, err
}

func (d *ZSTDDecoder) Decode(data []byte) ([]byte, error) {
	d.reader.Reset(bytes.NewBuffer(data))
	d.buf.Reset()

	_, err := d.buf.ReadFrom(d.reader)
	if err != nil && err != io.EOF {
		return nil, err
	}
	return d.buf.Bytes(), nil
}

type SnappyDecoder struct {
	buf []byte
}

// NewSnappyDecoder: use block format
func NewSnappyDecoder() (*SnappyDecoder, error) {
	const maxLen = 512 * 1024 // 512K
	return &SnappyDecoder{
		buf: make([]byte, maxLen),
	}, nil
}

func (d *SnappyDecoder) Decode(data []byte) ([]byte, error) {
	return snappy.Decode(d.buf, data)
}

// GzipDecoder decompresses buffers with gzip compression.
type GzipDecoder struct {
	reader *gzip.Reader
	buf    *bytes.Buffer
}

func NewGzipDecoder() (*GzipDecoder, error) {
	return &GzipDecoder{
		reader: new(gzip.Reader),
		buf:    new(bytes.Buffer),
	}, nil
}

func (d *GzipDecoder) Decode(data []byte) ([]byte, error) {
	d.reader.Reset(bytes.NewBuffer(data))
	d.buf.Reset()

	_, err := d.buf.ReadFrom(d.reader)
	if err != nil && err != io.EOF {
		return nil, err
	}
	err = d.reader.Close()
	if err != nil {
		return nil, err
	}
	return d.buf.Bytes(), nil
}

// IdentityDecoder is a null decoder that returns the input.
type IdentityDecoder struct{}

func NewIdentityDecoder() *IdentityDecoder {
	return &IdentityDecoder{}
}

func (*IdentityDecoder) Decode(data []byte) ([]byte, error) {
	return data, nil
}
