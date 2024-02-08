# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 17:18:05 2020

@author: Dr. Tang
"""

import tensorflow as tf

#定义图的阶段
x = tf.placeholder(tf.string)


#运行图的阶段
with tf.Session() as sess:
    output = sess.run(x, feed_dict={x: 'Hello World'})
    print(output)