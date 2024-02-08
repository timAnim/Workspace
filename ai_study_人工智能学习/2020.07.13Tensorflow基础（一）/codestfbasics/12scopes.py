# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:36:32 2020

@author: Dr. Tang
"""

import tensorflow as tf

tf.reset_default_graph()
with tf.name_scope('duyi'):
    var_1 = tf.Variable(initial_value=[0], name='var_1')
    var_2 = tf.Variable(initial_value=[0], name='var_1')
    var_3 = tf.Variable(initial_value=[0], name='var_1')
print(var_1.name)
print(var_2.name)
print(var_3.name)

with tf.name_scope('AI'):
    var_1 = tf.Variable(initial_value=[0], name='var_1')

#with tf.variable_scope('test'):
print(var_1.name)

with tf.variable_scope('deeplearning'):
    var_2 = tf.get_variable(name='var_2', shape=[1, ])

    var_3 = tf.Variable(initial_value=[0], name='var_3')
    var_4 = tf.get_variable(name='var_4', shape=[1, ])

print(var_2.name)

print(var_3.name)
print(var_4.name)