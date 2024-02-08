# -*- coding: utf-8 -*-

# -*- coding: utf-8 -*-
"""
Created on Sun Jun 23 11:04:35 2019

@author: tang
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
data_path = r'hour.csv'

rides = pd.read_csv(data_path)


#rides.head(10)
#
#rides[:24*10].plot(x='instant', y='cnt')
dummy_fields = ['season', 'weathersit', 'mnth', 'hr', 'weekday']
for each in dummy_fields:
    dummies = pd.get_dummies(rides[each], prefix=each, drop_first=False)
    rides = pd.concat([rides, dummies], axis=1)
    print(rides.shape)
    
    
fields_to_drop = ['instant', 'dteday', 'season', 'weathersit', 
                  'weekday', 'atemp', 'mnth', 'workingday', 'hr']
data = rides.drop(fields_to_drop, axis=1)


quant_features = ['casual', 'registered', 'cnt', 'temp', 'hum', 'windspeed']

#保存换算的均值和标准差，以便后续使用。
scaled_features = {}
for each in quant_features:
    mean, std = data[each].mean(), data[each].std()
    scaled_features[each] = [mean, std]
    data.loc[:, each] = (data[each] - mean)/std
    
test_data = data[-21*24:]


#训练数据集中需要移除掉 测试数据集数据
data = data[:-21*24]

#将训练数据集数据拆分为 特征值 和目标值
target_fields = ['cnt', 'casual', 'registered']
features, targets = data.drop(target_fields, axis=1), data[target_fields]
test_features, test_targets = test_data.drop(target_fields, axis=1), test_data[target_fields]

train_features, train_targets = features[:-60*24], targets[:-60*24]
val_features, val_targets = features[-60*24:], targets[-60*24:]


iterations = 6000
learning_rate = 0.5
hidden_nodes = 8
output_nodes = 1
input_nodes = train_features.shape[1]

#初始化权重
weights_input_to_hidden = np.random.normal(0.0, input_nodes**-0.5, 
               (input_nodes, hidden_nodes))

weights_hidden_to_output = np.random.normal(0.0, hidden_nodes**-0.5, 
               (hidden_nodes, output_nodes))
lr = learning_rate

##需要编程：设置  self.activation_function 部署sigmoid函数

##提示：在python中，可以用lambda作为函数表达式，如下：
activation_function = lambda x : 1/(1+np.exp(-x))  # Replace 0 with your sigmoid calculation.

        ### 如果你对lambda函数不熟悉，也可以使用如下方法作为替代
        #def sigmoid(x):
        #    return 0      # 0 处替换为sigmoid 激活函数
        #self.activation_function = sigmoid
                    
    
def train(features, targets,weights_input_to_hidden,weights_hidden_to_output):
    ''' Train the network on batch of features and targets. 
    
        Arguments
        ---------
        
        features: 2D array, each row is one data record, each column is a feature
        targets: 1D array of target values
    
    '''
    n_records = features.shape[0]
    delta_weights_i_h = np.zeros(weights_input_to_hidden.shape)
    delta_weights_h_o = np.zeros(weights_hidden_to_output.shape)
    for X, y in zip(features, targets):
        #### 此处为正向传播 ####
        
        hidden_inputs = np.dot(X,weights_input_to_hidden)    # 隐藏层输入
        
        hidden_outputs =activation_function(hidden_inputs)   # 隐藏层输出

        final_inputs = np.dot(hidden_outputs,weights_hidden_to_output) # 最终的输出层输入
        final_outputs = final_inputs #由于最后一层是线性输出
        

        ## 
        error = final_outputs-y # 输出层误差=实际值 减去 预测值
        
        #需要编程：计算隐藏层各自对误差的贡献
        output_error_term = error

        hidden_error = output_error_term*weights_hidden_to_output.reshape(hidden_nodes,)
        
        ##需要编程：对error terms进行反向传播
        hidden_error_term = hidden_outputs*(1-hidden_outputs)*hidden_error

        #  需要编程：权重梯度更新（输入层 到  隐藏层）
        delta_weights_i_h += X[:,None]*hidden_error_term
        
        # 需要编程：权重梯度更新（隐藏层 到 输出层）
        delta_weights_h_o += hidden_outputs[:,None]*output_error_term
    
    #需要编程：更新权重
    weights_hidden_to_output -= lr*delta_weights_h_o/n_records # 使用梯度下降更新hidden-to-output weights
    weights_input_to_hidden -= lr*delta_weights_i_h/n_records # 使用梯度下降更新input-to-hidden weights
 
def run( features):
    ''' 该函数作用：给定输入特征值，通过正向传播输出预测结果 
    
        参数
        ---------
        features: 1D array of feature values
    '''
    
    #### 部署正向传播 ####
    # 需要编程: 隐藏层的输入和输出
    hidden_inputs = np.dot(features,weights_input_to_hidden) # 隐藏层输入
    hidden_outputs = activation_function(hidden_inputs) # 隐藏层输出
    
    # 需要编程: 最终输出层的输入和输出
    final_inputs =np.dot(hidden_outputs,weights_hidden_to_output)  # 最终输出层的输入
    final_outputs = final_inputs # 最终输出层的输出
    
    return final_outputs
    


def MSE(y, Y):
    return np.mean((y-Y)**2)

import sys

### 设置超参数 ###


#N_i = train_features.shape[1]
#network = NeuralNetwork(N_i, hidden_nodes, output_nodes, learning_rate)
losses = {'train':[], 'validation':[]}
for ii in range(6000):
    
    #每次随机从训练数据集中抽取128条记录作为训练
    batch = np.random.choice(train_features.index, size=128)
    X, y = train_features.iloc[batch].values, train_targets.iloc[batch]['cnt'].values
    train(X, y,weights_input_to_hidden,weights_hidden_to_output)
    
    #打印出训练过程
    train_loss = MSE(run(train_features).T, train_targets['cnt'].values)
    
    val_loss = MSE(run(val_features).T, val_targets['cnt'].values)
    sys.stdout.write("\rProgress: {:2.1f}".format(100 * ii/float(iterations)) \
                     + "% ... Training loss: " + str(train_loss)[:5] \
                     + " ... Validation loss: " + str(val_loss)[:5])
    sys.stdout.flush()
    
    losses['train'].append(train_loss)
    losses['validation'].append(val_loss)