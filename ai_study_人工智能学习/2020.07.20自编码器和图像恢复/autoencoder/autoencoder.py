# -*- coding: utf-8 -*-
"""
Created on Fri Jul 17 21:50:09 2020

@author: Dr. Tang
"""

import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt


from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('./datasets', validation_size=0)


img = mnist.train.images[2]
noisy_img = img + 0.3 * np.random.randn(*img.shape)
noisy_img = np.clip(noisy_img, 0., 1.)
plt.imshow(img.reshape((28, 28)), cmap='Greys_r')

encoding_dim1 = 100
epochs = 100
batch_size = 200
noise_factor = 0.5

image_size = mnist.train.images.shape[1]
tf.reset_default_graph()

inputs_ = tf.placeholder(tf.float32, (None, image_size), name='inputs')
targets_ = tf.placeholder(tf.float32, (None, image_size), name='targets')
# Output of hidden layer

#1.0
#weight_input_to_hidden=tf.Variable(tf.random_normal([image_size,encoding_dim1]))
#bias=tf.Variable(tf.zeros([encoding_dim1]))
#encoded=tf.matmul(inputs_,weight_input_to_hidden)+bias
#encoded=tf.nn.relu(encoded)
#2.0
encoded = tf.layers.dense(inputs_, encoding_dim1, activation=tf.nn.relu)

# Output layer logits
logits = tf.layers.dense(encoded, image_size, activation=None)
# Sigmoid output from
decoded = tf.nn.sigmoid(logits, name='output1')
#loss=tf.losses.mean_squared_error(decoded,targets_)
loss = tf.nn.sigmoid_cross_entropy_with_logits(labels=targets_, logits=logits)
cost = tf.reduce_mean(loss)
opt=tf.train.GradientDescentOptimizer(0.1).minimize(cost)
sess = tf.Session()


sess.run(tf.global_variables_initializer())
for e in range(epochs):
    
    for ii in range(mnist.train.num_examples//batch_size):
        batch = mnist.train.next_batch(batch_size)
#        noisy_imgs = batch[0]+noise_factor * np.random.randn(*batch[0].shape)
#        noisy_imgs = np.clip(noisy_imgs, 0., 1.)

        imgs=batch[0]
        feed = {inputs_: imgs, targets_: imgs}
        batch_cost, _ = sess.run([cost, opt], feed_dict=feed)

    print("Epoch: {}/{}...".format(e+1, epochs),
              "Training loss: {:.4f}".format(batch_cost))
        
        
fig, axes = plt.subplots(nrows=2, ncols=10, sharex=True, sharey=True, figsize=(20,4))
in_imgs = mnist.test.images[:10]
reconstructed, compressed = sess.run([decoded, encoded], feed_dict={inputs_: in_imgs})
#noisy_imgs = in_imgs + noise_factor * np.random.randn(*in_imgs.shape)
#noisy_imgs = np.clip(noisy_imgs, 0., 1.)
for images, row in zip([in_imgs, reconstructed], axes):
    

    for img, ax in zip(images, row):
        ax.imshow(img.reshape((28, 28)), cmap='Greys_r')
        ax.get_xaxis().set_visible(False)
        ax.get_yaxis().set_visible(False)

