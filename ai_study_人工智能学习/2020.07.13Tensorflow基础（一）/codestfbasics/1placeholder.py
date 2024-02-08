# -*- coding: utf-8 -*-
"""
Created on Fri Jul 10 15:35:27 2020

@author: Dr. Tang
"""

import tensorflow as tf




x = tf.placeholder(tf.string)
y = tf.placeholder(tf.int32)
z = tf.placeholder(tf.float64)

# with tf.Session() as sess:
#     output = sess.run([x,y,z], feed_dict={x: 'Test String', y: 123, z: 45.67})
#     print(output)

with tf.Session() as sess:
    output1,output2,output3 = sess.run([x,y,z], feed_dict={x: 'Test String', y: 333, z: 12.34})
    print(output1)
    print(output2)
    print(output3)





#
#a=tf.placeholder(tf.float32)
#b=tf.placeholder(tf.float32)
#c=tf.placeholder(tf.float16)
#
#out1=tf.add(a,b)
##out2=tf.multiply(b,c)
#
#with tf.Session() as sess:
#    
#    print(sess.run(out1,feed_dict={a:3.0,b:4.0}))
#    print(sess.run(out1,feed_dict={a:5.0,b:8}))
#    
#    
    
    


