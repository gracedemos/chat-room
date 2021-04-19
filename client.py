import socket
import threading

PORT = 5050
SERVER = "192.168.86.232"
ADDR = (SERVER, PORT)

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)

active = True

def handle_message():
	while active:
		msg = client.recv(2048).decode()
		print(msg)

inp = input("What is Your Name?: ")
msg = "1e46e2b33b9fea97" + inp
client.send(msg.encode())
print("Welcome " + inp + "!")

message_thread = threading.Thread(target = handle_message)
message_thread.start()

while active:
	msg = input()
	client.send(msg.encode())
	if msg == "!exit":
		active = False