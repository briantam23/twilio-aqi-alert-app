[![Build Status](https://travis-ci.org/briantam23/aqi-twilio-alert-app.svg?branch=master)](https://travis-ci.org/briantam23/aqi-twilio-alert-app)

# 🌤 Air Quality Index App w/ Twilio Notifications

A Single Page App created with React, Redux, LESS, and Media Queries, along with multiple Testing libraries (Enzyme, Mocha, Chai, Sinon, SuperTest), and Continuous Integration using TravisCI.

## Login Credentials

* Username: `Brian`  | Password: `Briantam23@`
* Username: `Mike`   | Password: `Mike12#`
* Username: `Johnny` | Password: `Johnny34&` 

## Live Demo

Currently deployed to [Heroku](https://btam-aqi-twilio-alert-app.herokuapp.com/)!

## Setting up

This app requires a Google API Key, Air Quality Index API Key (from https://aqicn.org), Twilio Account SID, Twilio Auth Token, Twilio Phone Number & Own Phone Number (if you want to test out the Twilio API on a phone), which must be set in `.env` or set as an environment variable on `GOOGLE_API_KEY`, `AIR_QUALITY_INDEX_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` & `OWN_PHONE_NUMBER`.

### Dependencies

* [React](https://reactjs.org)
* [Redux](https://redux.js.org)
* [LESS](http://lesscss.org)
* [Enzyme](https://airbnb.io/enzyme)
* [PostgreSQL](https://www.postgresql.org)
* [Twilio](https://www.twilio.com)
* [Mocha](https://mochajs.org)
* [Express](https://expressjs.com)

### Installation

* `npm install` ( or `yarn install` )
* `npm run start:dev`
* open up [localhost:8080](http://localhost:3000) in a web browser

The `run start:dev` command will run both the `webpack` process (in watch mode) to build your client-side Javascript files, and the Node process for your server with `nodemon`.

### Miscellaneous

* created Tests for React Components, the Redux Store, Routes, Models, and Functions, which can be run with `npm run test` or `npm run test:dev`