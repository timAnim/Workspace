# -*- coding: utf-8 -*-
"""
Created on Fri Jul 17 21:40:58 2020

@author: Dr. Tang
"""

import tensorflow as tf
output = None
hidden_layer_weights = [
    [0.1, 0.2, 0.4],
    [0.4, 0.6, 0.6],
    [0.5, 0.9, 0.1],
    [0.8, 0.2, 0.8]]
out_weights = [
    [0.1, 0.6],
    [0.2, 0.1],
    [0.7, 0.9]]

weights = [
    tf.Variable(hidden_layer_weights),
    tf.Variable(out_weights)]

biases = [
    tf.Variable(tf.zeros(3)),
    tf.Variable(tf.zeros(2))]

# Input
features = tf.Variable([[1.0, 2.0, 3.0, 4.0], [-1.0, -2.0, -3.0, -4.0],
                        [11.0, 12.0, 13.0, 14.0]])

# 需要编程：创建模型
hidden_input=tf.matmul(features,weights[0])+biases[0]
hidden_output=tf.nn.relu(hidden_input)
#hidden_output=tf.nn.leaky_relu(hidden_input)
output=tf.matmul(hidden_output,weights[1])+biases[1]
config = tf.ConfigProto()
config.gpu_options.allow_growth = True
# 需要编程：打印session 输出的结果
with tf.Session(config=config) as sess:
    sess.run(tf.global_variables_initializer())
    out=sess.run(hidden_input)
    print(out)