import socket
import threading
import os

PORT = 5050
SERVER = socket.gethostbyname(socket.gethostname())
ADDR = (SERVER, PORT)

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)

client_list = {"clients": []}

def get_name(nid):
	for i in client_list["clients"]:
		if i["id"] == nid:
			return i["name"]

def send_all(msg):
	for i in client_list["clients"]:
		i["conn"].send(msg)

def handle_client(conn, addr):
	client_id = os.urandom(4).hex()
	client_list["clients"].append({"id": client_id, "name": client_id, "ip": addr[0], "conn": conn})
	connected = True
	while connected:
		msg = conn.recv(2048).decode()
		if msg:
			if "1e46e2b33b9fea97" in msg:
				msg = list(msg)
				for i in range(16):
					msg[i] = ' '
				new_msg = ''
				for i in range(len(msg)):
					if msg[i] != ' ':
						new_msg += msg[i]
				msg = new_msg
				for i in range(len(client_list["clients"])):
					if client_list["clients"][i]["id"] == client_id:
						client_list["clients"][i]["name"] = msg
				send_all(("[" + msg + " Connected]").encode())
			elif msg == "!exit":
				connected = False
				send_all(("[" + get_name(client_id) + " Disconnected]").encode())
				for i in range(len(client_list["clients"])):
					if client_list["clients"][i]["id"] == client_id:
						del client_list["clients"][i]
						break
			else:
				send_all(("[" + get_name(client_id) + "] " + msg).encode())
	conn.close()

def listener():
	server.listen()
	print("[SERVER] is listening on " + SERVER + ":" + str(PORT))
	while True:
		conn, addr = server.accept()
		thread = threading.Thread(target = handle_client, args = (conn, addr))
		thread.start()
		print("[SERVER] Active Connections: " + str(threading.activeCount() - 2))

def start():
	listener_thread = threading.Thread(target = listener)
	listener_thread.start()
	active = True
	while active:
		inp = input()
		if inp == "stop":
			active = False
			for i in client_list["clients"]:
				i["conn"].close()
			server.close()

start()