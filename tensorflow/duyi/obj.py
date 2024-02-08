# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

"""
"""

class People:
    name=""
    age=0
    __weight=0
    
    def __init__(self, name, age):
        self.name=name
        self.age=age
        
    def setW(self,w):
        self.__weight = w
        
    def getW(self):
        return self.__weight
        
        
    def speak(self):
        print("%s is speakinig, I am %d years old" %(self.name, self.age))
        
    
    w = property(setW, getW)
        

p = People("Tim", 30)
p.speak()