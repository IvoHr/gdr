# Install NodeJS on Windows
Download the latest stable release of NodeJS from https://nodejs.org and install using all the default options.

# Install MongoDB on Windows
Download the current stable release of MongoDB from https://www.mongodb.org/downloads and install using the "Complete" setup type and all the default options.

# Create the MongoDB data directory
Create an empty folder at "C:\data\db".

In BASH
`$ cd /c`
`$ mkdir -p /C/data/db`

Start MongoDB Server on Windows
Start the MongoDB server by running "mongod.exe" from the command line, "mongod.exe" is located in "C:\Program Files\MongoDB\Server\[MONGODB VERSION]\bin", for example for version 3.2 the following command will start MongoDB:

`$ "/C/Program Files/MongoDB/Server/3.4/bin/mongod"`

# Install NodeJS dependencies

`$ npm install`

Start NodeJS server from the project folder
`$ node server.js`