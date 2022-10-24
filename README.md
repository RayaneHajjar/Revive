# Revive
_Just being surrounded by an organized environment, revive our souls and inspires us._\
**Revive** is a web application created to manage the tasks cycle of employees, students or any person who want to change his life and to be more productive.  
  
## Overview
![Screenshot (99)](https://user-images.githubusercontent.com/75786591/197496414-24eb0ae2-1cab-43ae-bf7f-771faa189e20.png)
![Screenshot (114)](https://user-images.githubusercontent.com/75786591/197496688-ceb98553-6149-45cf-81ee-61966ff5a975.png)
![Screenshot (100)](https://user-images.githubusercontent.com/75786591/197496736-14847896-72ef-4ce5-b390-6c4b633f464b.png)
![Screenshot (101)](https://user-images.githubusercontent.com/75786591/197496754-d4d9b182-d46f-4161-a445-a5bc097dac90.png)
![Screenshot (106)](https://user-images.githubusercontent.com/75786591/197496942-33fd1054-2932-4ce4-a694-d820e0e3030a.png)
![Screenshot (107)](https://user-images.githubusercontent.com/75786591/197497143-28b1e186-6fdf-41a5-bddd-33ebb3324cce.png)
![Screenshot (108)](https://user-images.githubusercontent.com/75786591/197497167-f2e0bfe7-96cf-4069-a1ce-9d88ddebfc6a.png)
![Screenshot (110)](https://user-images.githubusercontent.com/75786591/197497275-d3ffc2b8-4351-4f61-b3fa-c852b7ce3fe9.png)
![Screenshot (111)](https://user-images.githubusercontent.com/75786591/197497361-48a7847b-0a4f-49ca-bdd1-a3a72f74ea3e.png)
![Screenshot (112)](https://user-images.githubusercontent.com/75786591/197497449-e5f23d83-e0c7-4374-a622-d44b760e28b6.png)
![Screenshot (113)](https://user-images.githubusercontent.com/75786591/197497462-e75e8409-411b-4da3-85bc-a0b1faee3de3.png)

## How Revive was built?
Revive is a microservices based application.  
The frontend was written with React JS using Tailwind for CSS.  
The backend is composed from 3 microservies:  
The quotes microservice is coded in Python using the Django framework.  
The users microservice is coded in NodeJs using the ExpressJs framework.  
The tasks microservice is also coded in NodeJs using the ExpressJs framework.  
  
## How to run the application?
First, you need to create a cluster in MongoDB Atlas to host our databases.  
Then, add your username and password in the following files:  
backend -> quotesProject -> manage.py  
backend -> users -> server.js  
backend -> tasks -> server.js  
**Now we have to install the requirements for our backend apis:**  
Inside backend/quotesProject we run the following command:  
`pip install -r requirements.txt`  
Inside backend/users we run the following commands:  
`npm install --save express express-validator bcryptjs jsonwebtoken mongoose mongoose-unique-validator`  
`npm install --save-dev nodemon`  
Inside backend/tasks we run the following commands:  
`npm install --save express express-validator axios jsonwebtoken mongoose mongoose-unique-validator`  
`npm install --save-dev nodemon`  
**Now we can run our backend apis:**  
Inside backend/quotesProject we run the following command:  
`python manage.py runserver`  
Inside backend/quotesProject we run the following command:  
`python manage.py runserver`  
Inside backend/users we run the following command:  
`npm start`  
Inside backend/tasks we run the following command:  
`npm start`  
**To run our frontend:**  
Inside the frontend repository we run the following command:  
`npm start`  
