# NOTES

### Utilizes OpenweatherAPI to fetch weather details (Free Tier, limited Data)

State Management: useReducer
ReactJS

## HOW TO USE:

1.  SEARCH FOR LOCATION (OR ACCEPT LOCATION LOOKUP AND IT WILL GRAB YOUR CURRENT LOCATIONS WEATHER DATA)

- Search Locations will display real and relevant locations (once user stops typing for 1 second)
- Click a displayed loation and it will load the data for the location.

2.  CLICK THE WEATHER CARD TO GET IN-DEPTH DETAILS. click Title to return back to home page

3.  Graph Data (Mouse Hover or Finger Drag to get weather details)

# Current:

- Search (or/and location based) to grab city data. (Click card to get more details)
- can add multiple cards each holding a different location to navigate into for more detailsw
- v1.1 Has timer since last refresh, should update every 40 seconds....
- v1.2 Improved location details to include 5 day forecast and 24 hour graph
- v1.3
  - Uses Cookies to remember added location
- v1.4 Search Locations will display real and relevant locations (once user stops typing for 1 second, cities will be fetched)
  - Click and it will add a location card.
- v1.5 Implements media queries for mobile view
- v1.6 Graph supports drag on mobile and hover
  - Displays correct weather details based on location of hover and nearest point

## Future/Improvements:

(✓) allow caching or some storage of data on computer with the locations the user wants (can delete or add), and will populate with API data upon website load.

(✓) Improve API call to allow more specific searches, and to show search results while searching.

(✓) show specific data on the graph when cilcking a point or hovering...?..
(✓) should put an element that displays details around mouse when it is close to the point

- add a way so user can change refresh timer based on preferences.

(✓) utilizes unique naming system by keeping track of lat and long instead of city name that can overlap with other cities

(✓) searching requires clicking specific city based on defining details like state, country, and etc. which will be fetched when user stops typing for 1 second

## Reminders

changed some data that is returned

1. dt_txt: is updated to hold {date: 'May 28,2023', time: '4:00 PM'}

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
