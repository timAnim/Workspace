# -*- coding: utf-8 -*-
"""
Created on Tue Jun  9 17:19:57 2020

@author: Dr. Tang
"""



import numpy as np
import matplotlib.pyplot as plt
#标签
labels = np.array(['python编程','英语','数学','模型','深度编程','高维数据'])
#数据个数
dataLenth = 6
#数据
data = np.array([6,6,6,6,6,6])
angles = np.linspace(0, 2*np.pi, dataLenth, endpoint=False)
data = np.concatenate((data, [data[0]])) 
angles = np.concatenate((angles, [angles[0]]))
fig = plt.figure()
ax = fig.add_subplot(111, polar=True)
ax.plot(angles, data, 'ro-', linewidth=2)
ax.set_thetagrids(angles * 180/np.pi, labels, fontproperties="SimHei")
ax.set_ylim(0,7)
ax.set_title("算法工程师能力雷达图",fontproperties="SimHei")

ax.grid(True)
plt.show()