# Revive
_Just being surrounded by an organized environment, revive our souls and inspires us._\
*Revive* is a web application created to manage the tasks cycle of employees, students or any person who want to change his life and to be more productive.\
\
\
## Overview

\
## How Revive was built?
Revive is a microservices based application.\
The frontend was written with React JS using Tailwind for CSS.\
The backend is composed from 3 microservies:\
- The quotes microservice is coded in Python using the Django framework.\
- The users microservice is coded in NodeJs using the ExpressJs framework.\
- The tasks microservice is also coded in NodeJs using the ExpressJs framework.\
\
## How to run the application?
First, you need to create a cluster in MongoDB Atlas to host our databases.\
Then, add your username and password in the following files:\
- backend -> quotesProject -> manage.py\
- backend -> users -> server.js\
- backend -> tasks -> server.js\
*Now we have to install the requirements for our backend apis:*\
Inside backend/quotesProject we run the following command:\
`pip install -r requirements.txt`
Inside backend/users we run the following commands:\
`npm install --save express express-validator bcryptjs jsonwebtoken mongoose mongoose-unique-validator`\
`npm install --save-dev nodemon`\
Inside backend/tasks we run the following commands:\
`npm install --save express express-validator axios jsonwebtoken mongoose mongoose-unique-validator`\
`npm install --save-dev nodemon`\
*Now we can run our backend apis:*\
Inside backend/quotesProject we run the following command:\
`python manage.py runserver`\
Inside backend/quotesProject we run the following command:\
`python manage.py runserver`\
Inside backend/users we run the following command:\
`npm start`\
Inside backend/tasks we run the following command:\
`npm start`\
*To run our frontend:*\
Inside the frontend repository we run the following command:\
`npm start`\