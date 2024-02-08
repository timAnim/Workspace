# -*- coding: utf-8 -*-
"""
Created on Mon Jul 20 12:26:20 2020

@author: Dr. Tang
"""

from tensorflow.examples.tutorials.mnist import input_data
import tensorflow as tf
import matplotlib.pyplot as plt
mnist=input_data.read_data_sets('./dataset',validation_size=0)
fig=mnist.train.images[0]
plt.imshow(fig.reshape(28,28),cmap='Greys_r')


hidden_number=100
learning_rate=0.01
batch_size=128
epochs=100


input_=tf.placeholder(tf.float32,[None,784])
target_=tf.placeholder(tf.float32,[None,784])

weights1=tf.Variable(tf.random_normal([784,hidden_number],stddev=0.1))
bias1=tf.Variable(tf.zeros([hidden_number]))

weights2=tf.Variable(tf.random_normal([hidden_number,784],stddev=0.1))
bias2=tf.Variable(tf.zeros([784]))

hidden_output=tf.matmul(input_,weights1)+bias1
hidden_output=tf.sigmoid(hidden_output)

logits=tf.matmul(hidden_output,weights2)+bias2
decoded=tf.sigmoid(logits)


loss=tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits=logits,labels=target_))
optimizer=tf.train.GradientDescentOptimizer(learning_rate).minimize(loss)
init=tf.global_variables_initializer()

with tf.Session() as sess:
    sess.run(init)
    total_batch=int(mnist.train.num_examples)+1
    for epoch in range(epochs):
        for i in range(total_batch):
            batch=mnist.train.next_batch(batch_size)
            _,loss_=sess.run([optimizer,loss],feed_dict={input_:batch[0],target_:batch[0]})
        print('loss:{:<4}'.format(loss_))

fig,axes=

