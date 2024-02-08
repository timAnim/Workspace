# -*- coding: utf-8 -*-

# -*- coding: utf-8 -*-
"""
Created on Sun Jun 23 11:04:35 2019

@author: tang

数据集介绍 自行车共享租赁过程与环境和季节性环境高度相关。 
例如，天气状况， 降水，星期几，是否工作日或周末，季节，
一天中的小时等都会影响出租行为。 数据集是为期两年的历史数据：2011年--2012年
一、数据导入
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
data_path = r'hour.csv'

rides = pd.read_csv(data_path)

#a=pd.DataFrame({'a':[1,2,3],'b':[4,5,6],'c':[7,8,9]})
#rides.head(10)
#rides.shape

#rides.columns
#可视化方法
#rides[:24*10].plot(x='instant', y='cnt')

'''
二、数据预处理

1、离散变量：生成哑变量（或成为one-hot变换）量纲问题

2、归一化转换，消除量纲。（初始值较大的，会严重影响模型判定权重）
'''

dummy_fields = ['season', 'weathersit', 'mnth', 'hr', 'weekday']
for each in dummy_fields:
    dummies = pd.get_dummies(rides[each], prefix=each)
    rides = pd.concat([rides, dummies], axis=1)
    print(rides.shape)
    
    
fields_to_drop = ['instant', 'dteday', 'season', 'weathersit', 
                  'weekday', 'atemp', 'mnth', 'workingday', 'hr']
data = rides.drop(fields_to_drop, axis=1)


quant_features = ['casual', 'registered', 'cnt', 'temp', 'hum', 'windspeed']

#保存换算的均值和标准差，以便后续使用。
#这个过程也被称为归一化，这里归一化成一个正太分布
scaled_features = {}
for each in quant_features:
    mean, std = data[each].mean(), data[each].std()
    scaled_features[each] = [mean, std]
    data.loc[:, each] = (data[each] - mean)/std



'''
三、训练数据集（50%-80%）、验证数据集(训练中）（20%-5%）、测试数据集（训练完）（20%-10%）

验证集：验证训练出来的模型效果,以便对模型进行调优；（参与建模的）

测试集：最终评判模型效果。（不参与建模）本项目中：拿出了最后21天的数据作为测试数据集。
'''
test_data = data[-21*24:]


#训练数据集中需要移除掉 测试数据集数据
data = data[:-21*24]

#将训练数据集数据拆分为 特征值 和目标值
target_fields = ['cnt', 'casual', 'registered']
features, targets = data.drop(target_fields, axis=1), data[target_fields]
test_features, test_targets = test_data.drop(target_fields, axis=1), test_data[target_fields]
#验证英文 validation
train_features, train_targets = features[:-60*24], targets[:-60*24]
val_features, val_targets = features[-60*24:], targets[-60*24:]

#超参数的设置
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

#这是sigmoid的激活函数
activation_function = lambda x : 1/(1+np.exp(-x))  
# Replace 0 with your sigmoid calculation.

### 如果你对lambda函数不熟悉，也可以使用如下方法作为替代
#def sigmoid(x):
#    
#    return 1/(1+np.exp(-x))       # 0 处替换为sigmoid 激活函数
#self.activation_function = sigmoid
'''
该网络有两个层级，一个隐藏层和一个输出层。隐藏层级将使用 S 型函数作为激活函数。
输出层只有一个节点，用于递归，节点的输出和节点的输入相同。即激活函数是  𝑓(𝑥)=𝑥 。
这种函数获得输入信号，并生成输出信号，但是会考虑阈值，称为激活函数。
我们完成网络的每个层级，并计算每个神经元的输出。一个层级的所有输出变成下一层级神经元的输入。
这一流程叫做前向传播（forward propagation）。

我们在神经网络中使用权重将信号从输入层传播到输出层。
我们还使用权重将错误从输出层传播回网络，以便更新权重。这叫做反向传播（backpropagation）。
'''
    
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

    #从这里开始做前向运算128*56去矩阵乘一个56*8
    hidden_inputs = np.dot(features,weights_input_to_hidden)    # 隐藏层输入
    hidden_outputs =activation_function(hidden_inputs)   # 隐藏层输出

    #从这里开始是隐藏层到输出层的运算
    final_inputs = np.dot(hidden_outputs,weights_hidden_to_output) # 最终的输出层输入
    final_outputs = final_inputs # 最终输出层的输出
    
    #### 开始部署反向传播 ####

    ## 需要你编程：输出层误差
    error = final_outputs-targets[:,None] # 输出层误差=实际值 减去 预测值
    #神经网络里面的labels数据结构都是[batchsize,num_class]
    #J对Z的偏导
    delta_output = error
    #经过了输出层激活函数f'(a)=1

    #计算隐藏层各自对误差的贡献
    delta_hidden_outputs = np.dot(delta_output,np.transpose(weights_hidden_to_output))
    
    ##对error terms进行反向传播hidden_outputs=f(a)
    delta_hidden_inputs = hidden_outputs*(1-hidden_outputs)*delta_hidden_outputs

    #权重梯度更新（输入层 到  隐藏层）
#    delta_weights_i_h=0
#    for feature,delta_hidden_input in zip(features,delta_hidden_inputs):
#        delta_weights_i_h+=np.dot(feature[:,None],delta_hidden_input[None,:])
    #这一行代码是最难懂的
    
    delta_weights_i_h = np.dot(features.T,delta_hidden_inputs)
    
    # 权重梯度更新（隐藏层 到 输出层）
    delta_weights_h_o = np.dot(hidden_outputs.T,delta_output)
    
    
    #更新权重
    weights_hidden_to_output -= lr*delta_weights_h_o/n_records # 使用梯度下降更新hidden-to-output weights
    weights_input_to_hidden -= lr*delta_weights_i_h/n_records # 使用梯度下降更新input-to-hidden weights
 
def run( features):
    
    
    #### 部署正向传播 ####
    # 隐藏层的输入和输出
    hidden_inputs = np.dot(features,weights_input_to_hidden) # 隐藏层输入
    hidden_outputs = activation_function(hidden_inputs) # 隐藏层输出
    
    # 最终输出层的输入和输出
    final_inputs =np.dot(hidden_outputs,weights_hidden_to_output)  # 最终输出层的输入
    final_outputs = final_inputs # 最终输出层的输出
    
    return final_outputs
    

#计算均方差
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
    losses['validation'].append(val_loss)# -*- coding: utf-8 -*-

plt.figure()
plt.plot(losses['train'], label='Training loss')
plt.plot(losses['validation'], label='Validation loss')
plt.legend()



_, ax = plt.subplots(figsize=(8,4))
#这里很重要
mean, std = scaled_features['cnt']
#原来归一化的时候是减去均值再除以方差，现在就要乘以方差再加上均值
predictions = run(test_features).T*std + mean

#plt.rcParams['font.sans-serif'] = ['KaiTi'] # 指定默认字体
#plt.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题

ax.plot(predictions.T, label='Predict')
ax.plot((test_targets['cnt']*std + mean).values, label='Actual')
ax.legend()

dates = pd.to_datetime(rides.iloc[test_data.index]['dteday'])
dates = dates.apply(lambda d: d.strftime('%b %d'))
ax.set_xticks(np.arange(len(dates))[12::24])
_ = ax.set_xticklabels(dates[12::24], rotation=45)