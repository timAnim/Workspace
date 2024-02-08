# -*- coding: utf-8 -*-
"""
Created on Tue Jun  9 12:27:21 2020

@author: admin
"""
from PIL import Image
from PIL import ImageFilter
im = Image.open('test.png')
contour = im.filter(ImageFilter.CONTOUR)

contour.save('res.png')