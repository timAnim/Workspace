# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:22:43 2020

@author: Dr. Tang
"""

import tensorflow as tf
gpu_device_name = tf.test.gpu_device_name()
print(gpu_device_name)

gpu_options=tf.GPUOptions() 
#gpu_options.per_process_gpu_memory_fraction=0.5
gpu_options.allow_growth=True
#optimizer=tf.OptimizerOptions(do_common_subexpression_elimination=True,do_constant_folding=True,opt_level=0)
#graph_options=tf.GraphOptions(optimizer_options=optimizer)

config_photo=tf.ConfigProto(allow_soft_placement=True,gpu_options=gpu_options)


with tf.device('/gpu:0'):
    a=tf.constant('10',tf.string,name='a_const')
    b=tf.string_to_number(a,out_type=tf.float64,name='str_2_double')
    c=tf.to_double(5.0,name='to_double')
    d=tf.add(b,c,name='add')
    with tf.Session(config=config_photo) as sess:
        print(sess.run(d))