# LostAndFound - Backend
The backend of the "LostAndFound" system has a typical microservices architecture. It consists of API Gateway and four independent microservices: 
* Auth Service
* Chat Service
* Profile Service
* Publication Service

# How to Run Backend Solution

You can build and run backend solution by following these steps:
1. Go to Backend directory.
2. If your Operating System is Windows run dotnet-lostandfound.bat file:
> ./dotnet-lostandfound.bat
3. If you use Unix-like Operating System execute:
> ./dotnet-lostandfound.sh

Additionally, you can also build and run the system using the solution file ''LostAndFound.sln'' and VisualStudio 2022.

By default, services run at the following URLs:
* **API Gateway** - "https://localhost:5000/"
* **Auth Service** - "https://localhost:5100/"
* **Chat Service** - "https://localhost:5200/"
* **Profile Service** - "https://localhost:5300/"
* **Publication Service** - "https://localhost:5400/"

You can inspect each service swagger documentation using mentioned URLs.
