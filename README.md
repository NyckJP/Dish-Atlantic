# Dish Atlantic

Want to find a new place to eat? Dish Atlantic gives you many different restaurants to scroll through and choose from! Find your next meal: [Dish Atlantic hosted by Heroku](http://www.dishatlantic.com)

Dish Atlantic will have a pre-existing account for you to try out all features:
 - Email: newuser@email.com
 - Password: 1234
 - Seeded restaurants are favorited

## Dev Stack

### Frontend

- JavaScript
- React
- Foundation CSS, SCSS

### Backend

- Node.js
- Express
- Yelp Fusion API

### Other Technologies

- Webpack, Passport, Objection, Knex, PostgreSQL

## Features

- Generates a list of restuarants in a given location
- Provides reviews of restaurant experience and dishes tried by other users
- Users can create accounts to post reviews of their own
- Allows the user to favorite or save restaurants to try later

## Future Features

- Fully fledged viewable profiles
- Image upload functionality for profile pictures and dish reviews
- Ability to add comments to existing reviews

## Known Issues

- Authentication redirects to homepage
- Mobile view is awkward
- Saved restaurants take a while to appear and lacks a loading icon

## Local Setup

- Clone the repository
- Configure your .env file based on the .env.example file
- Run the following commands in your terminal:
1. `yarn install`
2. `createdb Dish-Atlantic_development`
3. `cd server`
4. `yarn migrate:latest`
5. `yarn db:seed`
6. `yarn dev`
- Visit `localhost:3000` in your browser