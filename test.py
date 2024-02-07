import pickle
file = open("userdetails","rb")
details = pickle.load(file)
print(details['useremail'])
print(details['roomid'])