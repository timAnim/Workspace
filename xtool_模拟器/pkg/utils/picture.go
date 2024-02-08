package utils

import (
	"errors"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"

	"github.com/nfnt/resize"
	"golang.org/x/image/bmp"
)

// Clip 图片裁剪
// 入参:
// 规则:如果精度为0则精度保持不变
//
// 返回:error
//
func Clip(in io.Reader, out io.Writer, x0, y0, x1, y1, quality int) error {
	origin, fm, err := image.Decode(in)
	if err != nil {
		return err
	}

	switch fm {
	case "jpeg":
		img := origin.(*image.YCbCr)
		subImg := img.SubImage(image.Rect(x0, y0, x1, y1)).(*image.YCbCr)
		return jpeg.Encode(out, subImg, &jpeg.Options{
			Quality: quality,
		})
	case "png":

		canvas := resize.Thumbnail(uint(origin.Bounds().Max.X), uint(origin.Bounds().Max.Y), origin, resize.Lanczos3)
		switch img := canvas.(type) {
		case *image.NRGBA64:
			subImg := img.SubImage(image.Rect(x0, y0, x1, y1)).(*image.NRGBA64)
			return png.Encode(out, subImg)
		case *image.NRGBA:
			subImg := img.SubImage(image.Rect(x0, y0, x1, y1)).(*image.NRGBA)
			return png.Encode(out, subImg)
		case *image.RGBA:
			subImg := img.SubImage(image.Rect(x0, y0, x1, y1)).(*image.RGBA)
			return png.Encode(out, subImg)
		default:
			return fmt.Errorf("resize error")
		}
	case "gif":
		img := origin.(*image.Paletted)
		subImg := img.SubImage(image.Rect(x0, y0, x1, y1)).(*image.Paletted)
		return gif.Encode(out, subImg, &gif.Options{})
	case "bmp":
		img := origin.(*image.RGBA)
		subImg := img.SubImage(image.Rect(x0, y0, x1, y1)).(*image.RGBA)
		return bmp.Encode(out, subImg)
	default:
		return errors.New("ERROR FORMAT")
	}
}

// Scale 缩略图生成
// 入参:
// 规则: 如果width 或 hight其中有一个为0，则大小不变 如果精度为0则精度保持不变
// 矩形坐标系起点是左上
// 返回:error
///
func Scale(in io.Reader, out io.Writer, width, height, quality int) error {
	origin, fm, err := image.Decode(in)
	if err != nil {
		return err
	}
	if width == 0 || height == 0 {
		width = origin.Bounds().Max.X
		height = origin.Bounds().Max.Y
	}
	if quality == 0 {
		quality = 100
	}
	canvas := resize.Thumbnail(uint(width), uint(height), origin, resize.Lanczos3)

	//return jpeg.Encode(out, canvas, &jpeg.Options{quality})

	switch fm {
	case "jpeg":
		return jpeg.Encode(out, canvas, &jpeg.Options{
			Quality: quality,
		})
	case "png":
		return png.Encode(out, canvas)
	case "gif":
		return gif.Encode(out, canvas, &gif.Options{})
	case "bmp":
		return bmp.Encode(out, canvas)
	default:
		return errors.New("ERROR FORMAT")
	}
}
