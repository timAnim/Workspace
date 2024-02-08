# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 11:10:35 2020

@author: Dr. Tang
"""

import tensorflow as tf

tf.reset_default_graph()
with tf.Session() as sess:
    with tf.variable_scope('foo') as foo_scope:
        v=tf.get_variable('v',[1])
        w=tf.get_variable('w',[1])
        with tf.variable_scope('bar'):
            l=tf.get_variable('l',[2])
            with tf.variable_scope('test'):
                h=tf.get_variable('h',[1],\
                                  initializer=tf.random_normal_initializer())
                g=w+v+h+l[0]
    sess.run(tf.global_variables_initializer())
    print("{} {}".format(v.name,v.eval()))         
    print("{} {}".format(w.name,w.eval()))            
    print("{} {}".format(h.name,h.eval()))            
    print("{} {}".format(g.name,g.eval()))            