# Charmela-Ahilan-Capstone

# Project Title

Daily Journal

## Overview

A daily journal is a personal sanctuary where you capture your thoughts, feelings, and moods, allowing you to reflect on your inner world and track your emotional journey day by day. It serves as a compass guiding you through life's ups and downs, offering clarity and self-awareness along the way.

### Problem

The daily journal addresses the challenge of navigating one's emotions and maintaining self-awareness in the midst of daily life. By providing a dedicated space to record thoughts, feelings, and moods, it fosters introspection and emotional understanding.

An digital journal application enhances this solution by offering accessibility and convenience. With the ability to access the journal from anywhere, users can easily capture their thoughts in real-time, ensuring nothing is missed. Additionally, features such as password protection and encryption ensure privacy and security, while search and tagging functions facilitate organization and reflection. Overall, combining the benefits of a traditional daily journal with the convenience of a portable online application empowers users to cultivate mindfulness and emotional well-being effortlessly.

### User Profile

- Journal Users:
  - Looking to create journal entries
  - Looking to keep track of their daily entries
  - Sign up as a new user using auth
  - Able to edit or delete past journal entries
  - Log in as a registered user

### Features

- As a user, I want to be record daily journal entries
- As a user, I want to be able to receive a daily motivational quote for each new journal entry
- As a user, I want to be able to select a mood icon to represent my emotional state within my journal entry
- As a user, I want to be able to create an account to manage my journal entries
- As a user, I want to be able to login to my account

### Tech Stack

- React
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express
  - bcrypt for password hashing, JWT

### APIs

- An external library to generate daily motivational quotes

### Sitemap

- Home page
- Journal Entries
- New Entry
- Register/Sign Up
- Login

### Mockups

- Please see under Mock-Ups folder

### Endpoints

GET Method:
/emojis: Retrieve a list of available emojis that users can choose from to include in their journal entries.
GET Method:
/quote: Retrieve a new quote from the external library to display within the application.
POST Method:
/journal/entry: Create a new journal entry with the user's input.
GET Method:
/journal/entry/{entry_id1}: Retrieve a specific journal entry by its unique identifier.
PUT Method:
/journal/entry/{entry_id}: Update an existing journal entry with new information provided by the user.
DELETE Method:
/journal/entry/{entry_id}: Delete a specific journal entry by its unique identifier.

GET Method - Retrieve Available Emojis:

Endpoint: /emojis
Parameters: None
Response:
Status Code: 200 OK
Body: JSON array containing available emojis, each represented as a string.

[ "😊", "😊", "💖", "😊", ...]

POST Method - Create Journal Entry:

Endpoint: /journal/entry
Parameters:
text (string): The text content of the journal entry.
emojis (array of strings): Selected emojis to include in the journal entry.
quote (object, optional): The retrieved quote to include in the journal entry.
text (string): The quote text.
author (string): The author of the quote.
category (string): The category of the quote.
Response:
Status Code: 201 Created
Body: JSON object representing the newly created journal entry, including the quote
{
"entry_id": "abc123",
"text": "Today was a great day!",
"emojis": ["😊", "🌟"],
"quote": {
"text": "The only way to do great work is to love what you do.",
"author": "Steve Jobs",
"category": "motivational"
}
}

PUT Method - Update Journal Entry:

Endpoint: /journal/entry/{entry_id}
Parameters:
text (string, optional): Updated text content of the journal entry.
emojis (array of strings, optional): Updated selected emojis.
Response:
Status Code: 200 OK
Body: JSON object representing the updated journal entry.

{
"entry_id": "abc123",
"text": "Today was an amazing day!",
"emojis": ["😊", "🌟", "💖"]
}

GET Method - Retrieve Specific Journal Entry:

Endpoint: /journal/entry/{entry_id}
Parameters: None
Response:
Status Code: 200 OK
Body: JSON object representing the requested journal entry.

{
"entry_id": "abc123",
"text": "Today was an amazing day!",
"emojis": ["😊", "🌟", "💖"]
}

### Auth

- JWT auth
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features have first been implemented
  - Store JWT in localStorage, remove when a user logs out
  - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create user

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Create seeds with user information and journal entries

- Deploy client and server projects so all commits will be reflected in production

- Feature: Journal Entry Page with prompts

  - Journal inputs for the two given prompts
  - Create GET /quotes endpoint to render a new quote on a new journal entry page
  - Clickable emojis to record mood for the day

- Feature: View All Journal Entries

  - See all created journal entries for that user

- Feature: Home page

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Feature: Sort/Search functionality
- Server: Update expected requests / responses on protected endpoints
- Forgot password functionality
- More complex and visually appealing UI interface
