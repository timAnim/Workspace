# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:44:59 2020

@author: Dr. Tang
"""

# -*- coding: utf-8 -*-

import tensorflow as tf
import numpy as np

train_X=np.linspace(-1,1,100)
train_Y=2*train_X+np.random.randn(*train_X.shape)*0.33+10

X=tf.placeholder(tf.float32,name='x')
Y=tf.placeholder(tf.float32,name='y')

w=tf.Variable(0.0,name='weight')
b=tf.Variable(0.0,name='bias')

loss=tf.square(Y-w*X-b)
train_op=tf.train.GradientDescentOptimizer(0.01).minimize(loss)

with tf.Session() as sess:
    
    sess.run(tf.global_variables_initializer())
    for i in range(20):
        for (x,y) in zip(train_X,train_Y):
            op_result,w_result,b_result=\
            sess.run([train_op,w,b],feed_dict={X:x,Y:y})
            
            print("Epoch:{},w:{},b:{}".format(i+1,w_result,b_result))
            
            
import matplotlib.pyplot as plt


plt.figure()

plt.plot(train_X,w_result*train_X+b_result,'r')
plt.scatter(train_X,train_Y)
