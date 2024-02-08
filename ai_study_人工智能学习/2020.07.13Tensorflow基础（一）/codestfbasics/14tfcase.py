# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 12:23:31 2020

@author: Dr. Tang
"""

import tensorflow as tf
def f1():    
	return tf.constant(17)
def f2():    
	return tf.constant(23)
def f3():    
	return tf.constant(-1)
x = 2
y = 3
r = tf.case({tf.less(x, y): f1, tf.greater(x, y): f2},\
             default=f3, exclusive=True)
sess = tf.Session()
print(sess.run(r))#17
