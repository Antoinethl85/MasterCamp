import math
import numpy as np
import matplotlib.pyplot as plt

#Exo 1

#Partie 1

def g(x):
    return math.sin(4*x)*math.exp(-1*(x**2)+3*x);

ListeX, ListeY = [],[]

for i in np.arange(1.0,5.0,0.01):
    ListeX.append(i);
    ListeY.append(g(i));

coordonees = np.zeros(2,len(ListeY))

for j in range(len(ListeX)):
    for k in np.arange(len(ListeX)):
        coordonees[j][0] = ListeX[j];
        coordonees[j][1] = ListeY[j];

plt.plot(g)
plt.show()

fichier = open("C:\Antoine\MasterCamp\data.txt", "r");
fichier.write(coordonees)
print (fichier.read());

#Partie 2



#Exo 2

def bernouilli1(x):
    return math.sin(x)/(1 + (math.cos(x))**2)

def bernouilli2(x):
    return (math.sin(x)*math.cos(x))/(1 + (math.cos(x))**2)

Xbernouilli = np.arange(0, 2 * np.pi, 0.1)
plt.plot(Xbernouilli, bernouilli1)
plt.plot(Xbernouilli, bernouilli2)
plt.show()

def archimede1(x):
    return x*math.cos(x)

def archimede2(x):
    return x*math.sin(x)

Xarchimede = np.arange(0, 10 * np.pi, 0.1)
plt.plot(Xarchimede, archimede1)
plt.plot(Xarchimede, archimede2)
plt.show()

def coeur1(x):
    return 16*(math.sin(x))**3

def coeur2(x):
    return 13*math.cos(x) - 5*math.cos(2*x) - 2*math.cos(3*t) - math.cos(4*t)

Xcoeur = np.arange(0, 2 * np.pi, 0.1)
plt.plot(Xcoeur, coeur1)
plt.plot(Xcoeur, coeur2)
plt.show()

q = input("saisir un nombre")

def harmonique1(p,q):
    return (1+math.cos((p/q)*x))*math.cos(x)

def harmonique2(p,q):
    (1+math.cos((p/q)*x))*math.sin(x)

Xharmonique = np.arange(0, 2 * q * np.pi, 0.1)
plt.plot(Xharmonique, harmonique1)
plt.plot(Xharmonique, harmonique2)
plt.show()

#Exo 3

