# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 17:45:50 2020

@author: Dr. Tang
"""

import tensorflow as tf
 
a=tf.constant(3)
b=tf.constant(4)
c=tf.multiply(a,b)



with tf.Session() as sess:
    output=sess.run([a,b,c])
    output1, output2, output3=sess.run([a,b,c])

    print(output)