import socketio
import base64
import os
import pickle
# import pyscreenshot
from datetime import datetime
import subprocess
import ctypes
from AppOpener import open as Open
from AppOpener import close as Close
import asyncio
import tracemalloc
import cv2
import getpass
import pyttsx3
import sys
from PIL import ImageGrab
import pystray
from PIL import Image
import threading
from time import sleep
# import win32gui
# output = open("output.txt", "w")
# sys.stdout = output
# sys.stderr = output
tracemalloc.start()
engine=pyttsx3.init("sapi5")
voices=engine.getProperty("voices")
engine.setProperty("voice",voices[0].id)
rate=engine.getProperty('rate')
engine.setProperty("rate",rate-30)


async def speak(text):
    engine.say(text)
    engine.runAndWait()
global useremail
global roomid
global loop
global musicchose
musicchose = 0
sio = socketio.AsyncClient()
async def sendmessage(message,type='text'):
    await sio.emit("send_message",{"sender":"bot","room":roomid,"message":message,"type":type,"sent_at":datetime.now().strftime('%Y-%m-%dT%H:%M')})
    

    
    
    
async def process_receive(message):
    global musicchose
    global loop
    if message['sender'] == useremail:
        msg = str(message['message']).lower().strip()
        splittedmesg = msg.split(" ")
        if msg == 'screenshot' or msg == 'ss':
            await sendmessage("sending")
            path = 'screenshot.png'
            # img = pyscreenshot.grab()
            img = ImageGrab.grab()
            img.save(path)
            # time = datetime.now()
            with open(path,'rb') as image_file:
                base64img = base64.b64encode(image_file.read()).decode('utf-8')
            # await sio.emit("send_mesage",{"sender":"bot","room":roomid,"message": base64img,"type":"image","sent_at":"2024-01-31T22:32:33.147Z"})
            await sendmessage(base64img,"image")
            print("ss sent")
        
        elif msg == 'shutdown':
            subprocess.run('shutdown /s')
            text = "your pc going to shutdown"
            await sendmessage(text,"text")
        elif msg == 'lock':
            ctypes.windll.user32.LockWorkStation()
            text = "your pc is locked now"
            await sendmessage(text,"text")
        elif splittedmesg[0] == 'open':
            if len(splittedmesg)>=2:
                appname = " ".join(splittedmesg[1:])
                # Open(" ".join(splittedmesg[1:]))
                Open(appname)
                text = f'opening {appname} boss'
                await sendmessage(text,"text")
        elif splittedmesg[0] == 'close':
            if len(splittedmesg)>=2:
                appname = " ".join(splittedmesg[1:])
                Close(appname)
                text = f'closing {appname} boss'
                await sendmessage(text,"text")
        elif splittedmesg[0] == 'speak':
            if len(splittedmesg)>=2:
                await sendmessage("speaking...")
                speaktext = " ".join(splittedmesg[1:])
                # speak(speaktext)
                await speak(speaktext)
                text = f'done boss'
                await sendmessage(text,"text")
            else:
                await sendmessage("write something to speak")
        elif msg == 'getuserpic':
            await sendmessage("sending...","text")
            video = cv2.VideoCapture(0)
            _,frame = video.read()
            path = "temp.png"
            cv2.imwrite(path,frame)
            with open(path,'rb') as image_file:
                base64img = base64.b64encode(image_file.read()).decode('utf-8')
            await sendmessage(base64img,"image")
            
        elif msg == 'play music':
            b= f'C:/Users/{getpass.getuser()}/Music'
            if not os.path.exists(b):
                await sendmessage("create a folder with name pccontrolappmusic and copy your songs in it to start music","text")
            else:
                song=os.listdir(b)
                length=len(song)
                await sendmessage("now music is playing","text")
                os.startfile(os.path.join(b,song[musicchose]))
                musicchose+=1
                # sendmessage("playing music")
        elif msg == 'next':
            b= f'C:/Users/{getpass.getuser()}/Music'
            song=os.listdir(b)
            length=len(song)
            if musicchose>=length:
                await sendmessage("no more music to next")
                await sendmessage("i'm playing music from starting")
                musicchose=0
                os.startfile(os.path.join(b,song[musicchose]))
            else:
                os.startfile(os.path.join(b,song[musicchose]))
                musicchose+=1
                await sendmessage("playing next music")
        elif msg == 'band':
            bandtray()
            await sio.disconnect()
        elif msg == 'help':
            text = ''' available commands:-
                        1. screenshot --> this command send screenshot of your pc screen to you.
                        2. open <app_name> --> this command open app in your pc.
                        3. close <app_name> --> this command close app in your pc.
                        4. speak <text> --> this command speaks on you pc whatever you type.
                        5. getuserpic --> this command will send you the pic of whoever using your pc.
                        6. play music --> this command will play music but you have to create a folder with name "pccontrollappmusic" in your windows music folder.
                        7. next --> play next music.
                        8. help
                        9. shutdown --> shutdown your pc.
                        10.lock --> lock your pc.
                    '''
            await sendmessage(text,"text")
        else:
            text ='''Hello boss, Here I here to follow your commands.
                     Type  help to see all available commands.
                     If you are a developer/python developer then you can make
                     your own features. Fork this repository to add your own features: -
                      https://github.com/kumarvivek9088/pccontrolapp
                    '''
            await sendmessage(text,"text")
@sio.on('receive_message')
async def message(data):
        # print(data)
        await process_receive(data)

async def connect():
    await sio.connect("https://pccontrolappbackend-progresswithpython.koyeb.app")
    await sio.emit("join_room",{"username":"bot","room":roomid})

image = Image.open("pccontrolicon.png")
 
async def after_click(icon, query):
    if str(query) == "Config Roomid & User email":
        os.startfile('pccontrolappgui.exe')
    elif str(query) == "Exit":
        await sio.disconnect()
        loop.stop()
        icon.stop()


def traycommand(icon,query):
    asyncio.run(after_click(icon,query))
    # icon.stop()
    # sys.exit()
icon = pystray.Icon("Pc Control", image, "PwP's Pc Control", 
                        menu=pystray.Menu(
        pystray.MenuItem("Config Roomid & User email",traycommand),
        pystray.MenuItem("Exit", traycommand)))
def bandtray():
    icon.stop()
    
def startsystemtray():
    icon.run()
async def main():
    while True:
        try:
            await connect()
            print("connected")
            break
        except Exception as e:
            print("waiting for connection")
            sleep(5)
    print("successfully connected")
    await sio.wait()
    # await sio.wait()
if os.path.exists('./userdetails'):
    print("file exist")
    file = open('userdetails','rb')
    details = pickle.load(file)
    try:
        useremail = details['useremail']
        roomid = details['roomid']
        if roomid is not None and roomid != "" and useremail is not None and useremail  != "":
            # sio.connect("https://pccontrolappbackend-progresswithpython.koyeb.app")
            # sio.connect("http://127.0.0.1:3001")
            # sio.emit("join_room",{"username":"bot","room":roomid})
            thread = threading.Thread(target=startsystemtray,args=())
            thread.start()
            # asyncio.run(main())
            loop = asyncio.get_event_loop()
            loop.run_until_complete(main())
        else:
            os.startfile('pccontrolappgui.exe')
    except KeyError as e:
        print("error")
        # os.startfile("pccontrolappgui.exe")
        os.startfile('pccontrolappgui.exe')

else:
    # os.startfile('pccontrolappgui.exe')
    print("details not exist")
    os.startfile('pccontrolappgui.exe')
    


# asyncio.run(main())