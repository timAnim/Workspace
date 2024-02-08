# -*- coding: utf-8 -*-
"""
Created on Fri Jul 10 15:24:31 2020

@author: Dr. Tang
"""

import tensorflow as tf
a=tf.constant(4.0)
print("a是否在默认图上:{}".format(a.graph == tf.get_default_graph()))
g0=tf.get_default_graph()
g=tf.Graph()
with g.as_default():
    b=tf.constant(3.0)
    c=tf.constant(2.0)
    print("b是否在默认图上:{}".format(b.graph == g))
    print("c是否在默认图上:{}".format(c.graph == tf.get_default_graph()))

with tf.Graph().as_default() as g2:
    d=tf.constant(4.0)
    print(g2)
    print("d是否在默认图上:{}".format(d.graph == g2))
    print("d是否在默认图上:{}".format(d.graph == g))

e=tf.add(tf.add(a,b),tf.add(c,d))