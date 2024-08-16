[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Reservation-App-Coding-Challenge

TEst change 

Coding challenge where you build a Reservation App client that interacts with a RESTful API using React (Web) or Using Swift (Mobile).

This Repo contains all pre-written code needed to spin up the REST API, documentation for the routes exposed by this API, and directions on what is required for the front-end or mobile app you will be creating.

## Prerequisites

- Docker installed (https://docs.docker.com/get-docker/)
- Heroku Account
- Dev environment setup for either Web development (node + react) or Mobile development (Xcode and Swift)

## Getting Started

### Web / Mobile

1. Use the step-by-step below to spin up the provided API.
2. Create a separate Git Repo where you will write your code for the front-end for this project
3. Use the API documentation below to integrate with the pre-provided backend

#### TIP: run the 'heroku apps' command to see if your app is already running

### First Time Set Up - heroku deployment
1. In the terminal, confirm you are within the resy-takehome-backend directory
2. Run `heroku login` and login with your heroku credentials
3. Run `heroku container:login` 
4. Run `bash ./scripts/start-heroku.sh -n {put your name here}-takehome-api`, ex: `bash ./scripts/start-heroku.sh -n billy-takehome-api`
5. Wait for the command to complete
6. Once complete, you can access your api at https://{your name here}-takehome-api.herokuapp.com/
7. Optional - Use my pre-built Postman collection to test the API: https://www.getpostman.com/collections/d17ea1096dbade3f4a9c

### Refreshing / Updating your heroku deployment
If you have made changes to the API (or pulled changes from git via `git pull`), you can run `bash ./scripts/update-heroku.sh -n {put your name here}-takehome-api`.

This will update the Docker image that the API is built from -- without rebuilding / provisioning a new database.

### Stopping the app - heroku 
1. In the terminal, confirm you are within the resy-takehome-backend directory
2. Copy `bash ./scripts/stop-heroku.sh -n {name}-takehome-api` and paste in the terminal, then hit return / enter

## Technical Requirements

Create a client for a Restaurant Reservations application. Users are able to:

- Add Restaurants
- Search Restaurants
- Create and Update Reservations 
- List all Reservations
- View Details for Individual Reservations or Restaurants

### API

Use the details and endpoints of the API below to accomplish the Reservation App functionality. This API accepts and returns JSON payloads.

<table>
  <tr><td><strong>Method</strong></td><td><strong>Endpoint</strong></td><td><strong>Description</strong></td><td><strong>Example JSON Body Payload</strong></td></tr>
  <tr><td>GET</td><td>`/api/restaurants`</td><td>List restaurants (empty query string = all restaurants)</td><td></td></tr>
  <tr><td>GET</td><td>`/api/restaurants/:id`</td><td>Retreive a restaurant by ID</td><td></td></tr>
  <tr><td>GET</td><td>`/api/restaurants/:id/reservations`</td><td>Retrieve all reservations at a restaurant</td><td></td></tr>
  <tr><td>POST</td><td>`/api/restaurants`</td><td>Create a restaurant</td><td>

  ```json
  { 
    "name": "Subway", 
    "description": "Build-your-own sandwich chain", 
    "phoneNumber": "0001112222", 
    "openingTime": "10:00:00", 
    "closingTime": "22:00:00", 
    "price": "$", 
    "cuisine": "American", 
    "location": "New York City", 
    "diningRestriction": "Takeout Only" 
  }
  ```
  </td></tr>
  <tr><td>PATCH</td><td>`/api/restaurants/:id`</td><td>Update an existing Restaurant. The payload for updating a restaurant is a partial version of the 'Create a Restaurant' payload where all fields are optional.</td><td>
  
  ```json
  { 
    "description": "SUBWAY -- NOW WITH PIZZA", 
    "phoneNumber": "7188212995" 
  }
  ```
  </td></tr>
  <tr><td>DELETE</td><td>`/api/restaurants/:id`</td><td>Delete a restaurant</td><td></td></tr>
  <tr><td>GET</td><td>`/api/reservations`</td><td>Retrieve all reservations</td><td></td></tr>
  <tr><td>GET</td><td>`/api/reservations/:id`</td><td>Retrieve a reservation by ID</td><td></td></tr>
  <tr><td>POST</td><td>`/api/reservations/`</td><td>Create a reservation. `restaurantId` must be the id of a valid Restaurant</td><td>
  
  ```json
  { 
    "firstName": "Joe", 
    "lastName": "Smith", 
    "phoneNumber": "9098087777", 
    "email": "joesmith@pursuit.com", 
    "time": "2022-06-01 19:00:00", 
    "numGuests": "2", 
    "restaurantId": "470d7797-8ece-4133-9885-c5651fd90625" 
  }
  ```
  </td></tr>
  <tr><td>PATCH</td><td>`/api/reservations/:id`</td><td>Update an existing Reservation. The payload for updating a restaurant is a partial version of the 'Create a Reservation' payload where all fields are optional and you may not change the restaurantId.</td><td>
  
  ```json
  { 
    "time": "2022-06-01 19:30:00", 
    "numGuests": "4" 
  }
  ```
  </td></tr>
  <tr><td>DELETE</td><td>`/api/reservations/:id`</td><td>Delete a reservation</td><td></td></tr>
</table>




### App Pages/Views

Your Reservation App should have the following pages or views (mobile) (and be displayed at their respective browser url [Web only]).

#### Search Restaurants (`/restaurants`)
- User can search restaurants (text search bar)
- User can filter restaurants by the filters defined in the API (pre-built filters: cuisine, location, price, Takeout/Delivery)
- If no filters are applied, User can view all Restaurants

#### Create Restaurant (`/newRestaurant`)
- User can fill out a form to create a restaurant based on the fields defined in the API (src/util/types.ts)

#### Single Restaurant (`/restaurants/:id`)
- User can view all details about the restaurant (Name, Description, Location, Price, Hours...)
- User can create a reservation for any time in the future when the restaurant is open

#### Create Reservation (`/newReservation`) ***OPTIONAL***
- If the create reservation form is not embedded in the single restaurant page, provide a form for the user to create a reservation for a given restaurant

#### All Reservations (`/reservations`)
- User can view all reservations

#### Single Reservation (`/reservations/:id`)
- User can view active reservation details
- User can update existing reservations
- User can cancel a reservation


**Notes**:

- You may use any 3rd-party libraries or packages for functionality or styling.
  - **Web** We recommend you use something like Bootstrap or Material UI or others to style you app.
  - **Mobile** You must write your networking layer natively, do not use Alamofire or equivalents for Network Requests.

- When you first start the API, there will be some example restaurants and reservations to help you get started. Using a service like Postman or using curl commands, you can access the API directly to update this data as you build the front-end functionality for these operations.

- Restaurant Fields:
  - Required: name, description, price, cuisine, location, openingTime, closingTime
  - Optional: phoneNumber, diningRestriction ('Takeout Only', 'Delivery Only'), tables
- Reservation Fields:
  - Required: firstName, lastName, phoneNumber, time, numGuests
  - Optional: email
- For more detailed information about the types defined in this API see [`./src/util/types.ts`](https://github.com/williamtaggart97/resy-takehome-backend/blob/main/src/util/types.ts )


### Design Inspiration

This idea for the project already pulls inspiration from apps like Open Table and Resy, so feel free to do the same for your work. In the screenshots folders (`web-screenshots` or `mobile-screenshots`), we compiled some examples of the different pages from these sites. In addition to these screenshots, we encourage everyone to test the functionality on these sites as you make decisions about your own app.
- https://opentable.com 
- https://resy.com

## Hints
- When formatting your query string to search and filter restaurants, the 'qs' npm library can be very helpful for formatting complex query strings.
- Think about what should happen if two reservations are at the same time. (look at the TableConfig type in [`./src/util/types.ts`](https://github.com/williamtaggart97/resy-takehome-backend/blob/main/src/util/types.ts ))

## Submission Guidelines

- We think this challenge would take ~8 hours to complete, so allocate your time appropriately.
- You must submit your solution no later than **6/30/22**
- Please fill out this google form (https://forms.gle/mKYWBm6Ms5eBJS1n8) to submit your Take-Home. 
- For any questions reach out to @Billy Taggart in the [Pursuit Core Workspace](https://pursuit-core.slack.com/)

