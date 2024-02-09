# CarCar
CarCar is an application for managing aspects of an automobile dealership—specifically its inventory, service center, and sales.

Team:

* Trevor Cannatella - Service microservice
* Key Gomez - Sales microservice


## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository
<<https://gitlab.com/Tcannatella/project-alpha-apr>>

2. Clone the forked repository onto your local computer:
git clone <<respository.url.here>>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$IMG$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
## Design

CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$IMG$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

## Inventory Microservice

Our Inventory and Sales domains work together with our Service domain to make everything here at **CarCar** possible.

How this all starts is at our inventory domain. We keep a record of automobiles on our lot that are available to buy. Our sales and service microservices obtain information from the inventory domain, using a **poller**, which talks to the inventory domain to keep track of which vehicles we have in our inventory so that the service and sales team always has up-to-date information.

## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Manufacturers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/


### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/


### Automobiles:
- The **'vin'** at the end of the detail urls represents the VIN for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/


# Sales Microservice

On the backend, the sales microservice has 4 models: AutomobileVO, Customer, SalesPerson, and SalesRecord. SalesRecord is the model that interacts with the other three models. This model gets data from the three other models.

The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The sales poller automotically polls the inventory microservice for data, so the sales microservice is constantly getting the updated data.

The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that information lives inside of the inventory microservice.

## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Customers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/id/

### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Salesperson details | GET | http://localhost:8090/api/salesperson/id/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/


### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/salesrecords/
| Create a new sale | POST | http://localhost:8090/api/salesrecords/
| Show salesperson's salesrecords | GET | http://localhost:8090/api/salesrecords/id/

# Service microservice

Hello and welcome to the wonderful world of service!!
As explained above, the service microservice is an extension of the dealership that looks to provide service repairs for your vehicle.

As automobiles are purchased, we keep track of the vin number of each automobile and you are able to receive the special perks of being a VIP!
As a VIP, you will receive free oil changes for life, complimentary neck massages while in our waiting room, and free car washes whenever you would like!

This area is going to be broken down into the various API endpoints (Fancy way of saying your web address url) for service along with the format needed to send data to each component.
The basics of service are as follows:
1. Our friendly technician staff
2. Service Appointments

## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Technicians

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/

### Service Appointments

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/appointments/
| Service appointment detail | GET | http://localhost:8080/api/appointments/<int:id>
| Service appointment history | GET | http://localhost:8080/api/servicehistory/<int:vin (OPTIONAL)>
| Create service appointment | POST | http://localhost:8080/api/appointments/
| Delete service appointment | DELETE | http://localhost:8080/api/serviceappointment/<int:id>
