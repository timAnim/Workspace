# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 17:59:02 2020

@author: Dr. Tang
"""

import tensorflow as tf

with tf.device('/gpu:0'):
    a=tf.constant([2,3,4])
    b=tf.constant(3)
    c=tf.multiply(a,b)
    
    
with tf.Session() as sess:
    print(sess.run(c))