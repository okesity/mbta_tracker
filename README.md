# MbtaTracker

This is a test

To start your Phoenix server:


  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## MBTA Tracker 
## Overview
  * Our app allows users to interact with the google map and see different routes 
   by clicking different buttons and check schedules for a specific stop and route.
   For purpose of a better user experiences, users could interact with the maps
   and routes without login, and after they login
   they could add the stops to their favorite list.
 * Users will only see the favorite stops that they added. 
 * Deletion of a certain favorite stop is also supported.
 * Users could either choose to register an account or login using facebook.
## External APIs
 * Soical Oauth(facebook)
 * Google Map API
 * MBTA API 
## Features
 * Implementing single page application using react-router 
## Tools & Libraries
 * react-google-login
 * react-maps-google
 * react-strap
 * mdbreact
 * react-sweatalert
 * mdbootstrap
## References
 * Using part of the css code from the following source
 * Source: https://mdbootstrap.com/docs/react/forms/basic/
