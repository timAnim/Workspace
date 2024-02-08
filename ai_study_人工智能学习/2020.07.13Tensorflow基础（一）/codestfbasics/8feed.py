# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 17:52:02 2020

@author: Dr. Tang
"""

import tensorflow as tf

m1=tf.placeholder(tf.float32)
m2=tf.placeholder(tf.float32)
m3=tf.placeholder_with_default(4.0, shape=None)

output1=tf.multiply(m1,m2)
output2=tf.multiply(m1,m3)



with tf.Session() as sess:
    
    print(sess.run(output1,feed_dict={m1:2,m2:3}))
    print(sess.run(output2,feed_dict={m1:2}))
    print(sess.run(output2,feed_dict={m1:2,m3:3}))



