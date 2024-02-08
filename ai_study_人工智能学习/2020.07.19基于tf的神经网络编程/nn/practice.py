# -*- coding: utf-8 -*-
"""
Created on Sun Jul 19 20:31:50 2020

@author: Dr. Tang
"""

import tensorflow as tf

from tensorflow.examples.tutorials.mnist import input_data


mnist=input_data.read_data_sets('./datasets',one_hot=True)

#第一步三组数
#首先是超参数

learning_rate=0.01
batch_size=128
epochs=100

#数据

features=tf.placeholder(tf.float32,[None,784])
labels=tf.placeholder(tf.float32,[None,10])

#变量

weights=tf.Variable(tf.random_normal([784,10],stddev=0.1))
bias=tf.Variable(tf.zeros([10]))

#第二步是搭网络

logits=tf.matmul(features,weights)+bias


#第三步算cost
#probs=tf.nn.softmax(logits)
#cross_entropy=tf.reduce_sum(-labels*tf.log(probs),axis=1)
#cost=tf.reduce_mean(cross_entropy)
cost=tf.nn.softmax_cross_entropy_with_logits(labels=labels,logits=logits)
optimizer=tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)
correct_prediction=tf.equal(tf.arg_max(logits,1),tf.arg_max(labels,1))
accuracy=tf.reduce_mean(tf.cast(correct_prediction,tf.float32))
init=tf.global_variables_initializer()

with tf.Session() as sess:
    sess.run(init)
    total_batch=int(mnist.train.num_examples/batch_size)+1
    for epoch in range(epochs):
        for i in range(total_batch):
            batch_features,batch_labels= mnist.train.next_batch(batch_size)
            sess.run(optimizer,feed_dict={features:batch_features,labels:batch_labels})
        if(epoch%10==0):
            val_acc=sess.run(accuracy,feed_dict={features:mnist.validation.images,\
                                                 labels:mnist.validation.labels})
            print('Epoch {:<3} val_acc={:.3f}'.format(epoch,val_acc))
    test_acc=sess.run(accuracy,feed_dict={features:mnist.test.images,\
                                                 labels:mnist.test.labels})
    print('test_acc:',test_acc)



