# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:57:38 2020

@author: Dr. Tang
"""
import tensorflow as tf
softmax_data = [0.7, 0.2, 0.1]
one_hot_data = [1.0, 0.0, 0.0]

softmax = tf.placeholder(tf.float32)
one_hot = tf.placeholder(tf.float32)
cross_entropy=-tf.reduce_sum(one_hot*tf.log(softmax))
# 需要编程: 通过session运算，打印出交叉熵
with tf.Session() as sess:
    result=sess.run(cross_entropy,feed_dict={one_hot:one_hot_data,softmax:softmax_data  }  )
    print(result)