import subprocess
import os
import sys
import platform

NAME_CLIENT_IMAGE = "we-image"
NAME_CLIENT_CONTAINER = "we-container"

URL = '%cd%' if platform.system() == 'Windows' else '${PWD}'

def setup_client():
    os.system('docker build -t ' + NAME_CLIENT_IMAGE + ' .')
    os.system('docker run --name ' + NAME_CLIENT_CONTAINER + ' -i -d -v ' + URL + ':/srv/app -p 3333:3333 -p 4666:4666 ' + NAME_CLIENT_IMAGE)
    os.system('docker exec -w /srv/app ' + NAME_CLIENT_CONTAINER + ' npm install')
    os.system('docker exec -it -w /srv/app ' + NAME_CLIENT_CONTAINER + ' /bin/bash')

def start_client():
    print('Starting client...')
    os.system('docker start ' + NAME_CLIENT_CONTAINER)
    os.system('docker exec -it -w /srv/app ' + NAME_CLIENT_CONTAINER + ' /bin/bash')

def stop_client():
    print('Stopping client...')
    os.system('docker stop ' + NAME_CLIENT_CONTAINER)

def delete_client():
    print('Deleting client...')
    os.system('docker rm -f ' + NAME_CLIENT_CONTAINER)
    os.system('docker rmi -f ' + NAME_CLIENT_IMAGE)

def print_help(command):
    print('Welcome to the Jungle!')
    print('Thanks to this script you can manage easly docker container where you already have the environment you need to run the application')
    print('This is the list of commands you can use:')
    print('-d, --delete docker container and image')
    print('-h, --help list of available commands')
    print('-i, --init initialize the environmnet creating and running docker image, container and running npm install')
    print('-s, --start start docker container and open a terminal inside it')
    print('-t, --terminate stop docker container')

def identify_command(command, parameter):
    if command == '-d' or command == '--delete':
        delete_client()
    if command == '-h' or command == '--help':
        print_help(None)
    if command == '-i' or command == '--init':
        setup_client()
    if command == '-s' or command == '--start':
        start_client()
    if command == '-t' or command == '--terminate':
        stop_client()

def main():
    command = '-h'
    parameter = None
    if (len(sys.argv) >= 2):
        command = sys.argv[1]
    if len(sys.argv) >= 3:
        parameter = sys.argv[2]
    identify_command(command, parameter)

if __name__ == "__main__":
    main()
