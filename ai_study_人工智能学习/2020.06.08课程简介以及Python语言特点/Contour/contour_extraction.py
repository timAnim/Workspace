# -*- coding: utf-8 -*-

from PIL import Image
from PIL import ImageFilter
im=Image.open('meidun.jpeg')
contour=im.filter(ImageFilter.CONTOUR)
contour.save('meidun_c.jpg')

