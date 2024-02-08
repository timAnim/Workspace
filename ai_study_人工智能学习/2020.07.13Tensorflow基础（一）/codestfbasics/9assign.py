# -*- coding: utf-8 -*-
"""
Created on Mon Jul 13 11:23:58 2020

@author: Dr. Tang
"""
#第一种方法
import tensorflow as tf

a = tf.Variable(tf.zeros(1))
#a = tf.add(a,tf.ones(1))
a = tf.assign_add(a,tf.ones(1))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for i in range(5):
    print(sess.run(a))
    
    
#第二种方法

x = tf.Variable(0, dtype=tf.int32)

# We use a simple assign operation
assign_op = tf.assign(x, x + 1)

with tf.Session() as sess:
  sess.run(tf.global_variables_initializer())

  for i in range(5):
    print('x:', sess.run(x))
    sess.run(assign_op)
    
    
#第三种方法
   
x = tf.placeholder(tf.int32, shape=[], name='x')
y = tf.Variable(2, dtype=tf.int32)

# We set our assign op
assign_op = tf.assign(y, y + 1)

# We build our multiplication (this could be a more complicated graph)
with tf.control_dependencies([assign_op]):

    out = x * y

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
      
    for i in range(3):
        print('output:', sess.run(out, feed_dict={x: 1}))
        


#补充说明       
        
        
a = tf.Variable(initial_value=[1.], dtype=tf.float32)
b = tf.add(a ,3)
update_a = tf.assign(a, b)
with tf.control_dependencies([update_a]):
    e = tf.identity(b) + 5
    val = tf.identity(a)

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    print(sess.run([e, val]))
