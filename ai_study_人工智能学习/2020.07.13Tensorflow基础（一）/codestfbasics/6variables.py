# -*- coding: utf-8 -*-
"""
Created on Fri Jul 10 15:43:22 2020

@author: Dr. Tang
"""

import tensorflow as tf

v1=tf.Variable(tf.random_normal([10],stddev=0.5,dtype=tf.float32),name='v1')
v2=tf.Variable(tf.random_normal([5],stddev=10,dtype=tf.float32),name='v2')
v3=tf.Variable(4.0)
v4=tf.Variable([4,5])

init=tf.global_variables_initializer()

with tf.Session() as sess:
    
    #run变量节点之前一定要先run初始化器
    sess.run(init)
  #  out1,out2=sess.run([v1,v2])   
    out4=sess.run(v4)
    
    
    #sess.run(init)

#    out2=sess.run(v1)