# -*- coding: utf-8 -*-
"""
Created on Sat May 30 20:49:47 2020

@author: Dr. Tang
"""

import face_recognition
import cv2
image = face_recognition.load_image_file("trump.jpg")
face_locations = face_recognition.face_locations(image)

y0, x1, y1, x0 =face_locations[0]
img = cv2.imread('trump.jpg')
# 画矩形框
cv2.rectangle(img, (x0,y0), (x1,y1), (0,255,0), 2)
cv2.imwrite('002_new.jpg', img)
cv2.imshow('image',img)
cv2.waitKey()
cv2.destroyAllWindows()