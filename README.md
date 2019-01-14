Graphql task frontend that consumes [backend API](https://github.com/StraylightSky/graphql_task).

If you want to test the vin validation, I used [randomvin](http://randomvin.com/) to generate one.

### Running the project
Make sure that the backend API is up and running. Then just run the command `yarn start` in this project's root directory

### Tests
Just run `yarn test`

### Wishlist
- Add delete subscription so list gets updated when a car is removed
- Success / fail notifications when creating/updating/deleting a car
- Clean up repeated code
- Make the table reusable (had this sort of working in a previous commit, but reverted due to an edge case breaking things)
- More tests (App is the only component that is tested...)
