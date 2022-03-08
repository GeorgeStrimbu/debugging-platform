# debugging-platform-for-school-students

## Setup
How to run the project:
* You need to install Node.js (npm is included in the Node.js installation). You can download the installer from this link: https://nodejs.org/en/download/
* You need to install MongoDB. You can download the installer from this link: https://www.mongodb.com/try/download/community?tck=docs_server
* Clone the repository
* Open the project in your terminal and run:
```
npm install
```
* Open the api folder from the project in your terminal and run:
```
npm install
```
* Start MongoDB. There are 2 options:
1) Write the following command in the terminal
```
mongod
```
If you encounter the following error
```
'mongod' is not recognized as an internal or external command, operable program or batch file
```
the following link could be useful:
```
https://stackoverflow.com/questions/15053893/mongo-command-not-recognized-when-trying-to-connect-to-a-mongodb-server
```
2) Go to C:\Program Files\MongoDB\Server\5.0\bin and double-click on mongod
* Open the project in your terminal and write:
```
npm run serve
```
* Open the api folder from the project in another terminal and write:
```
npm run start
```
* Open your browser and go to http://localhost:8080

