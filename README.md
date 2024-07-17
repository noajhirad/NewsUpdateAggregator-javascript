# Personalized News Update Aggregator
## Overview
The Personalized News Update Aggregator is a microservice-based application that aggregates news and technology updates based on user preferences. The system fetches the latest news, selects the most interesting articles using AI based on user preferences, generates concise summaries using AI, and sends this information to users via email.

## Project Structure
* **manager**: Orchestrates the microservices architecture.
* **users-accessor**: Connects with the database (MongoDB). It saves new users, updates their preferences, and deletes users when requested.
* **news-engine**: Returns the most interesting articles and their summaries, chosen by AI according to user preferences.
* **notification-engine**: Receives an email address and text, then sends the requested message to the specified email.


## How to Use the Personalized News Update Aggregator

### Running the System
To run the entire system, navigate to the root directory of the project and execute the following command:
`docker-compose up --build`

### Creating a New User
To create a new user, include your email and your preferences for articles from the following list:
* Technology
* Business
* Science
* Entertainment
* Sports
* Health
* Environment
* Travel
* Food
* Education
* Fashion
* Arts
* Gaming
* Motoring
* Politics
* Space
* Crime

### Sending Requests
The manager is available on port 5000.

**__Create a New User__**

Send a POST request to the endpoint "/newuser" with a JSON body like this example:

`{
    "email": "example@example.com",
    "preferences": ["Technology", "Science"]
}`


**__Update User Preferences__**

Send a POST request to the endpoint "/updateuser" with a JSON body like this example:

`{
    "email": "example@example.com",
    "preferences": ["Business", "Health", "Travel"]
}`

**__Unsubscribe a User__**

Send a DELETE request to the endpoint "/unsubscribe" with a JSON body like this example:

`{
    "email": "example@example.com"
}`

**__Get Top Articles__**

Send a GET request to the endpoint "/" to send an email to the registered user with the top article picks. Include the email query parameter like this example:
`email=example@example.com`

## Additional Resources
* A file named flow.pdf is included with the System Diagram.
* A Postman collection with a usage scenario is added.
