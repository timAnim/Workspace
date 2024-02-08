# -*- coding: utf-8 -*-


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
data_path = r'hour.csv'

rides = pd.read_csv(data_path)


#rides.head(10)
#rides.shape

#rides.columns
#rides[:24*10].plot(x='instant', y='cnt')
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