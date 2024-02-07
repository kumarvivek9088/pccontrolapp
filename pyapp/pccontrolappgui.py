from tkinter import *
import pickle
import sys
output = open("output.txt", "w")
sys.stdout = output
sys.stderr = output
root = Tk()
icon = PhotoImage(file = 'icon.png')
root.iconphoto(False,icon)
# root.iconbitmap('icon.ico')
root.geometry('400x200')
root.resizable(False,False)
def save_details():
    file = open("userdetails","wb")
    details = {"useremail":useremail.get(),"roomid":roomid.get()}
    pickle.dump(details,file)
    file.close()
    label3.config(text="save successfull!")
    # print(useremail.get())
    # print(roomid.get())
root.title("Enter you details")
label1 = Label(root,text="Your registered email id")
label1.place(x=10,y=20)
useremail = Entry(root,width=30)
useremail.place(x=200,y=20)
label2 = Label(root,text="Room id")
label2.place(x=10,y=60)
roomid = Entry(root,width=30)
roomid.place(x=200,y=60)
button = Button(root,text="Save",width=20,height=2,background="white",command=save_details)
button.place(x=125,y=125)
label3 = Label(root)
label3.place(x=150,y=170)
root.mainloop()