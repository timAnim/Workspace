# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:43:58 2020

@author: Dr. Tang
"""

import tensorflow as tf
# 需要你编程：将下面转换成tensorflow
#x = 10
#y = 2
#u=x/y
#z = u- 1

x=tf.placeholder(tf.int32)
y=tf.placeholder(tf.int32)
u=tf.divide(x,y)
z=tf.subtract(u,tf.constant(1.0,dtype=tf.float64))
# 需要你编程：从session中打印 z
with tf.Session() as sess:
    output=sess.run(z,feed_dict={x:10,y:2})
    print(output)
