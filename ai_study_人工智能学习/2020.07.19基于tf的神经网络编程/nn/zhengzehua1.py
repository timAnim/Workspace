# -*- coding: utf-8 -*-

import tensorflow as tf


test_var=tf.Variable([3.,2.,3.,4.])
loss=tf.contrib.layers.l2_regularizer(1.0)(test_var)
init=tf.global_variables_initializer()

with tf.Session() as sess:
    sess.run(init)
    print(sess.run(loss))
    