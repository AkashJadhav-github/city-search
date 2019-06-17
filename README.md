Cities search project



(A) Description - 

This is a backend web app that is build to search the cities across the globe with either complete anme of the city of the partial name.



(B) Technologies used to build the project -

(*Note - Development has been done on Ubuntu OS)\
1) Node.js & Express.js - For build ing RESTful APIs
2) Algolia 3rd party cities search service - To get the suggestions for the cities either using name of the city (partial or complete) or the geographical position of it i.e. (location using latitide and longitude)
website here -> https://www.algolia.com/
documentation for developers -> https://www.algolia.com/doc/
3) AWS - To deploy the web application on the server.
4) Swagger - Swagger is a tool, which helps to Document, Maintain and Test the APIs without any code or coding tool!



(C) Steps to run the project (LOCAL environment)- 

1) Git clone the project 
link -> git clone https://github.com/AkashJadhav-github/city-search.git

2) Go to the project directory and execute the below command -
cmd -> npm install (if permission error occurs try executing it using 'sudo' i.e. 'sudo npm install')

3) Start the project execution using below command -
cmd -> npm start



(D) To test the execution and see the end result follow the steps below (LOCAL environment)- 

1) After starting the project using 'npm start' go to POSTMAN or any tool where you can hit the below api for searching the cities suggestions across the globe -

http://localhost:3000/api/v1/suggestions?q=Mum 
(Here the search string is partially written. So we'll get closest suggestion for this search like Mumbai, Navi Mumbai etc which relates the most)

http://localhost:3000/api/v1/suggestions?q=Miami&latitude=28.6142&longitude=77.2023
(To search the cities using geolocation as well as name. If you want to search using geolocation then both the parameteres (i.e. Latitude and Longitude) must be specified. If any one othe them is not specified then it will jsut search usikng the given name parameter i.e. 'q=Miami')



(E) FOR USING THE SERVICE AS RESTful API (i.e. consuming as a service from web server - AWS) 

1) The service or web application has been hosted on AWS server.
2) The API link to access the service is given below, execute it as mention in POINT-D just, use below URLs for the execution instead of localhost - 

http://ec2-3-15-73-89.us-east-2.compute.amazonaws.com/api/v1/suggestions?q=Mum
(Here the search string is partially written. So we'll get closest suggestion for this search like Mumbai, Navi Mumbai etc which relates the most)

http://ec2-3-15-73-89.us-east-2.compute.amazonaws.com/api/v1/suggestions?q=Miami&latitude=28.6142&longitude=77.2023
(To search the cities using geolocation as well as name. If you want to search using geolocation then both the parameteres (i.e. Latitude and Longitude) must be specified. If any one othe them is not specified then it will jsut search usikng the given name parameter i.e. 'q=Miami')



(F) If you have no environment to execute the API and want to see the results, here is the link where you can Test, Run, See complete APIs list and its Description. Its name is Swagger and you can access it at below link - 

http://ec2-3-15-73-89.us-east-2.compute.amazonaws.com/api-docs/