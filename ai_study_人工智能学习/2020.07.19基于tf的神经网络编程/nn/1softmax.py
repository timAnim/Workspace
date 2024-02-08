# -*- coding: utf-8 -*-

# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:55:25 2020

@author: Dr. Tang
"""

import tensorflow as tf
output = None
logit_data = [3,2]
logits = tf.placeholder(tf.float32)

# 需要编程实现: 计算logits的softmax激活函数值
softmax =tf.nn.softmax(logits)

with tf.Session() as sess:
    # 需要编程实现: 将logit数据读进去。
    output = sess.run(softmax,feed_dict={logits:logit_data} )
    #print(output)
    print(output)