import math
import numpy as np

#Exo1
ListeX, ListeY = [],[]

def g(x):
    return math.sin(4*x)*math.exp(-1*(x**2)+3*x);

def liste(ListeX,ListeY):
    for i in float_range(1.0,5.0,0.01):
        ListeX, ListeY =[g(i)], [g(i)]
    return ListeY, ListeX;