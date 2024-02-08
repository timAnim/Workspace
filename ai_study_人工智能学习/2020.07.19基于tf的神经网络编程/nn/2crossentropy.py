# -*- coding: utf-8 -*-

# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:57:38 2020

@author: Dr. Tang
"""
import tensorflow as tf
#softmax_data = [[0.7, 0.2, 0.1],[0.2, 0.2, 0.6]]
one_hot_data = [[1.0, 0.0, 0.0],[0.0, 0.0, 1.0]]
#softmax_data = [0.7, 0.2, 0.1]
#one_hot_data = [1.0, 0.0, 0.0]
logits_data=[[4.,2.,3.],[2.,6.,4.]]
softmax = tf.placeholder(tf.float32)
one_hot = tf.placeholder(tf.float32)
logits = tf.placeholder(tf.float32)


#cross_entropy=-tf.reduce_sum(one_hot*tf.log(softmax))

cross_entropy=-tf.reduce_sum(one_hot*tf.log(tf.nn.softmax(logits)),axis=1)
cost=tf.nn.softmax_cross_entropy_with_logits(labels=one_hot_data,logits=logits)
# 需要编程: 通过session运算，打印出交叉熵
with tf.Session() as sess:
    result1=sess.run(cross_entropy,feed_dict={one_hot:one_hot_data,logits:logits_data  }  )
    result2=sess.run(cost,feed_dict={one_hot:one_hot_data,logits:logits_data  }  )
#    result=sess.run(cross_entropy,feed_dict={one_hot:one_hot_data,softmax:softmax_data  }  )

    print(result1)
    print(result2)
#    print(result)