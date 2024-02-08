# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 12:29:22 2020

@author: Dr. Tang
"""

import tensorflow as tf 
a = tf.constant(10)
n = tf.constant(10)
def cond(a, n):    
	return  a< n
def body(a, n):    
	a = a + 1    
	return a, n
a, n = tf.while_loop(cond, body, [a, n])
with tf.Session() as sess:   
    tf.global_variables_initializer().run()    
    res = sess.run([a, n])    
print(res)