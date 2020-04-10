package io

import (
	"bufio"
	gogoio "github.com/gogo/protobuf/io"
	"github.com/gogo/protobuf/jsonpb"
	"github.com/gogo/protobuf/proto"
	"io"
	"strings"
)

func NewNdjsonWriter(writer io.Writer) gogoio.WriteCloser {
	marshaler := jsonpb.Marshaler{
		EnumsAsInts:  false,
		EmitDefaults: false,
	}
	return &ndjsonWriter{writer, marshaler}
}

type ndjsonWriter struct {
	writer    io.Writer
	marshaler jsonpb.Marshaler
}

func (this *ndjsonWriter) WriteMsg(msg proto.Message) (err error) {
	msgJson, err := this.marshaler.MarshalToString(msg)
	if err != nil {
		return err
	}
	out := bufio.NewWriter(this.writer)
	_, err = out.WriteString(msgJson)
	if err != nil {
		return err
	}
	_, err = out.WriteString("\n")
	if err != nil {
		return err
	}
	err = out.Flush()
	if err != nil {
		return err
	}
	return nil
}

func (this *ndjsonWriter) Close() error {
	if closer, ok := this.writer.(io.Closer); ok {
		return closer.Close()
	}
	return nil
}

func NewNdjsonReader(reader io.Reader) gogoio.ReadCloser {
	var closer io.Closer
	if c, ok := reader.(io.Closer); ok {
		closer = c
	}
	scanner := bufio.NewScanner(reader)
	const maxCapacity = 10 * 1024 * 1024 // 10Mb
	buf := make([]byte, maxCapacity)
	scanner.Buffer(buf, maxCapacity)
	unmarshaler := jsonpb.Unmarshaler{
		AllowUnknownFields: true,
	}
	return &ndjsonReader{*bufio.NewReader(reader), *scanner, unmarshaler, closer}
}

type ndjsonReader struct {
	reader      bufio.Reader
	scanner     bufio.Scanner
	unmarshaler jsonpb.Unmarshaler
	closer      io.Closer
}

func (this *ndjsonReader) ReadMsg(msg proto.Message) error {
	if this.scanner.Scan() {
		return this.unmarshaler.Unmarshal(strings.NewReader(this.scanner.Text()), msg)
	}
	return io.EOF
}

func (this *ndjsonReader) Close() error {
	if this.closer != nil {
		return this.closer.Close()
	}
	return nil
}
