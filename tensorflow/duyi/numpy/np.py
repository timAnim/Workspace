import numpy as np

narr=np.array([[1,2,3],[4,5,6]])


narr1 = np.arange(12)
narr1=narr1.reshape(2,6)

narr2 = np.arange(1,2,0.1)
"""
print(narr.shape)
print(narr1)
print(narr2)
"""

narr3=np.linspace(0,10,10,endpoint=False)
narr3.resize(2,5)

b=narr2[1:3]
narr2[2]=10
"""
切片后共享相同的存储空间（引用值）
print(b)
print(narr3[:2,:2])

print(narr1+1)

print(narr1+narr1+1)
"""

a=np.arange(1,5)
b=np.arange(5,9)

"""
print(np.add(a,b))
print(np.subtract(a,b))
print(np.multiply(a,b))
print(np.divide(a,b))
print(a<b)
print((a<b).astype(np.int))
print(np.all(a<b))
print(np.any(a<b))
"""
m=np.arange(1,4).reshape(3,1)
n=np.ones((1,3))
"""
print(m,n)
print(m+n)
print(m*n)
"""

c=np.random.normal(size=(2000,))
"""
算数平均数
print(np.mean(c))
print(np.std(d,ddof=1))
print(np.sum(d))
"""
d=np.arange(1,13).reshape(3,2,2)
"""
print(d)
print(np.sum(d,axis=0))
print(np.sum(d,axis=1))
print(np.sum(d,axis=2))
print(np.sum(d,axis=2,keepdims=True))
"""
e=np.array([[1,2,3]])
"""
print(e)
print(e[None,:])
print(e[:,None,:])
"""

f=np.array([1,2,3])
f=np.expand_dims(f,axis=0)
"""
print(f)
print(np.expand_dims(f,axis=0))
print(np.squeeze(f))
"""