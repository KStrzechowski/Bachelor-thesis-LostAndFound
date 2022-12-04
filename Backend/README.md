# LostAndFound - Backend
The backend of the "LostAndFound" system has a typical microservices architecture. It consists of API Gateway and four independent microservices: 
* Auth Service
* Chat Service
* Profile Service
* Publication Service


# Backend - Dependencies
Before you will be able to run backend solution of LostAndFound system you need to satisy few requirements.

## Requirements
<br />

### .Net 6.0
Backend solution is developed using .NET 6.0. To be able to build the solution, it is required to have .net 6.0 installed on your local machine. 
You can download .NET 6.0 using the address below:

https://dotnet.microsoft.com/en-us/download/dotnet/6.0

If you want to check your your local .NET versions, use the the following instruction:
> dotnet --list-sdks

<br />

### **MongoDB**
MongoDB is an open-source NoSQL database management program. Our solution uses MongoDB as a non-relational database management system.
That's why each microservice requires a connection to the MongoDB database management server. You have 3 options to satisfy this requirement:

1. Setup a local MongoDB server using MongoDB Community Edition. Here is a guide how to do that:
	* https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

2. Use MongoDB Atlas, that provides an easy way to host MongoDB server in the cloud. You can follow this tutorial, which will guide you through creating an Atlas cluster and connecting to it.
	* https://www.mongodb.com/docs/atlas/getting-started/

3. If you don't want to set up your own MongoDB database management server, you can use the below connection string. It is a build and deployed MongoDB database management cluster, using MongoDB Atlas.<br />
It was created for solution testing and development, so feel free to use. (Be aware that it may contain already some data)
	> mongodb+srv://development:<password>@lostandfound-developmen.ygmxcvg.mongodb.net/?retryWrites=true&w=majority

<br />

When you have the new connection string ready, you just need to update "appsettings.Development.json" files in all 4 microservices. So you need to make the following changes:
* Replace value for **LostAndFoundAuthServiceDb:ConnectionString** with the new one. (It is by default set to mongodb://localhost:27017)
	> Backend\AuthService\src\LostAndFound.AuthService\appsettings.Development.json
* Replace value for **LostAndFoundChatServiceDb:ConnectionString** with the new one. (It is by default set to mongodb://localhost:27017)
	> Backend\ChatService\src\LostAndFound.ChatService\appsettings.Development.json
* Replace value for **LostAndFoundProfileServiceDb:ConnectionString** with the new one. (It is by default set to mongodb://localhost:27017)
	> Backend\ProfileService\src\LostAndFound.ProfileService\appsettings.Development.json
* Replace value for **LostAndFoundPublicationServiceDb:ConnectionString** with the new one. (It is by default set to mongodb://localhost:27017)
	> Backend\PublicationService\src\LostAndFound.PublicationService\appsettings.Development.json

<br />

### **File Storage**
Publication and Profile services integrated with **Azure Blob Storage** in order to store pictures. Before running system you need to provide correct blob storage connection string.
Here you have 2 options:

#### 1. Use Azure Storage Emulator. All you need to do is run Azure Storage Emulator on your local machine. To run the Azure Storage emulator on Windows:
	1. Select the Start button or press the Windows key.
	2. Start typing Azure Storage Emulator
	3. Select an emulator from the list of displayed applications.
	4. After starting the warehouse emulator, the command line will be displayed. You can use this console window to start and stop the magazine emulator.
	5. It should start automatically, you can make sure that emulator is working, using "AzureStorageEmulator.exe status" command. In case the emulator didn't start use "AzureStorageEmulator.exe start".

More informations about Azure Storage Emulator:
	> https://learn.microsoft.com/pl-pl/azure/storage/common/storage-use-emulator
Note 1: You don't need to change any connection string while using Azure Storage Emulator.
Note 2: The storage emulator currently operates only in Windows. For emulation in Linux, use [Azurite emulator](https://github.com/azure/azurite).


<br />

#### 2. Create Azure Storage Account using Azure Portal and replace blob storage connection strings:

Guide how to create Azure Storage Account:  https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview
When you have the new connection string ready, you just need to update "appsettings.Development.json" files in all 4 microservices. So you need to make the following changes:
* Replace value for **LostAndFoundBlobStorageSettings:ConnectionString** with the new one. (It is by default set to UseDevelopmentStorage=true)
	> Backend\ProfileService\src\LostAndFound.ProfileService\appsettings.Development.json
* Replace value for **LostAndFoundBlobStorageSettings:ConnectionString** with the new one. (It is by default set to UseDevelopmentStorage=true)
	> Backend\PublicationService\src\LostAndFound.PublicationService\appsettings.Development.json	


<br />
<br />

## Build and run
You can build and run backend solution by following these steps:
1. Go to Backend directory.
2. If your Operating System is Windows run dotnet-lostandfound.bat file:
	> ./dotnet-lostandfound.bat
3. If you use Unix-like Operating System execute:
	> ./dotnet-lostandfound.sh

Additionally, you can also build and run the system using the solution file ''LostAndFound.sln'' and VisualStudio 2022.


<br />

## Service URLs
By default, services run at the following URLs:
* **API Gateway** - "https://localhost:5000/"
* **Auth Service** - "https://localhost:5100/"
* **Chat Service** - "https://localhost:5200/"
* **Profile Service** - "https://localhost:5300/"
* **Publication Service** - "https://localhost:5400/"

You can inspect each service swagger documentation using mentioned URLs.
