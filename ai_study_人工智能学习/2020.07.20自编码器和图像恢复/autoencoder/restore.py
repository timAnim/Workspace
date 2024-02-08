# -*- coding: utf-8 -*-
"""
Created on Fri Jul 17 11:40:41 2020

@author: Dr. Tang
"""

import tensorflow as tf
tf.reset_default_graph()

# 文件保存路径
##命名为 "model.ckpt"，（".ckpt" 扩展名表示"checkpoint"）
save_file = './savefile/model.ckpt'
# 两个 Tensor 变量：权重和偏置项
weights = tf.Variable(tf.truncated_normal([3, 3]))
bias = tf.Variable(tf.truncated_normal([3]))
weights2 = tf.Variable(tf.truncated_normal([2, 3]))
bias2 = tf.Variable(tf.truncated_normal([3]))

# 用来存取 Tensor 变量的类
saver = tf.train.Saver()

with tf.Session() as sess:
    # 初始化所有变量
    sess.run(tf.global_variables_initializer())
   # 显示变量和权重
#    print('Weights:',weights)
#    print(sess.run(weights2))
##    print('Bias:',bias)
#    print(sess.run(bias2))
    # 保存模型
    saver.save(sess, save_file)
    
    
    
# 移除之前的权重和偏置项
tf.reset_default_graph()
save_file = './savefile/model.ckpt'

# 两个变量：权重和偏置项
weights1 = tf.Variable(tf.truncated_normal([2, 3]))
bias1 = tf.Variable(tf.truncated_normal([3]))

# 用来存取 Tensor 变量的类
saver = tf.train.Saver()
print(saver)
with tf.Session() as sess:
    # 加载权重和偏置项
    saver.restore(sess, save_file)

    # 显示权重和偏置项
    print('Weight:')
    print(sess.run(weights1))
    print('Bias:')
    print(sess.run(bias1))