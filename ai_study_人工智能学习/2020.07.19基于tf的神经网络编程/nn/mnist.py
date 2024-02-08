# -*- coding: utf-8 -*-

import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data
import numpy as np
tf.reset_default_graph()

learning_rate = 0.001
n_input = 784  # MNIST 数据输入 (图片尺寸: 28*28)
n_classes = 10  # MNIST 总计类别 (数字 0-9)

# 加载 MNIST 数据
mnist = input_data.read_data_sets('./datasets', one_hot=True)


features = tf.placeholder(tf.float32, [None, n_input])
labels = tf.placeholder(tf.float32, [None, n_classes])

# 权重和偏置项
weights = tf.Variable(tf.random_normal([n_input, n_classes],seed=1))
bias = tf.Variable(tf.zeros([n_classes]))

# Logits - xW + b
logits = tf.add(tf.matmul(features, weights), bias)

# 定义损失函数和优化器
probs =tf.nn.softmax(logits)

cross_entropy=-tf.reduce_sum(labels*tf.log(probs))
cost=tf.reduce_mean(cross_entropy)

#cost = tf.reduce_mean(\
#    tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=labels))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=learning_rate)\
    .minimize(cost)

# 计算准确率
correct_prediction = tf.equal(tf.argmax(logits, 1), tf.argmax(labels, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))


import math

save_file = './savefile/train_model.ckpt'
batch_size = 128
n_epochs = 100

saver = tf.train.Saver()

# 启动图
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    # 训练循环
    for epoch in range(n_epochs):
        total_batch = math.ceil(mnist.train.num_examples / batch_size)

        # 遍历所有 batch
        for i in range(total_batch):
            batch_features, batch_labels = mnist.train.next_batch(batch_size)
            sess.run(
                optimizer,
                feed_dict={features: batch_features, labels: batch_labels})

        # 每循环10次  打印一次状态
        if epoch % 10 == 0:
            valid_accuracy = sess.run(
                accuracy,
                feed_dict={
                    features: mnist.validation.images,
                    labels: mnist.validation.labels})
            print('Epoch {:<3} - Validation Accuracy: {}'.format(
                epoch,
                valid_accuracy))

    ### 保存模型
    saver.save(sess, save_file)
    print('Trained Model Saved.')
