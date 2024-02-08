# -*- coding: utf-8 -*-

def get_weight(shape,lamda):
    #定义变量
    var = tf.Variable(tf.random_normal(shape=shape),dtype=tf.float32)
    #将变量的L2正则化损失添加到集合中
    tf.add_to_collection("losses",tf.contrib.layers.l2_regularizer(lamda)(var))
    return var
 
import tensorflow as tf
if __name__=="__main__":
    #定义输入节点
    tf.reset_default_graph()
    x = tf.placeholder(tf.float32,shape=(None,2))
    #定义输出节点
    y_ = tf.placeholder(tf.float32,shape=(None,1))
    #定义每次迭代数据的大小
    batch_size = 8
    #定义五层神经网络，并设置每一层神经网络的节点数目
    layer_dimension = [2,10,10,10,1]
    #获取神经网络的层数
    n_layers = len(layer_dimension)
    #定义神经网络第一层的输入
    cur_layer = x
    #当前层的节点个数
    in_dimension = layer_dimension[0]
    #通过循环来生成5层全连接的神经网络结构
    for i in range(1,n_layers):
        #定义神经网络上一层的输出，下一层的输入
        out_dimension = layer_dimension[i]
        #定义当前层中权重的变量，并将变量的L2损失添加到计算图的集合中
        weight = get_weight([in_dimension,out_dimension],0.001)
        #定义偏置项
        bias = tf.Variable(tf.constant(0.1,shape=[out_dimension]))
        #使用RELU激活函数
        cur_layer = tf.nn.relu(tf.matmul(cur_layer,weight) + bias)
        #定义下一层神经网络的输入节点数
        in_dimension = layer_dimension[i]
    #定义均方差的损失函数
    mse_loss = tf.reduce_mean(tf.square(y_ - cur_layer))
    #将均方差孙函数添加到集合
    tf.add_to_collection("losses",mse_loss)
#    total_loss=mse_loss+...
    #获取整个模型的损失函数,tf.get_collection("losses")返回集合中定义的损失
    #将整个集合中的损失相加得到整个模型的损失函数
    collection=tf.get_collection("losses")
    loss = tf.reduce_sum(tf.get_collection("losses"))
    init=tf.global_variables_initializer()
    with tf.Session() as sess:
        sess.run(init)
        print(sess.run(collection,feed_dict={x:[[3,2]],y_:[[1]]}))

