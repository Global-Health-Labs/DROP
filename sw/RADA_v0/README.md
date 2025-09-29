# RoboNAAT Worklist Generator

RoboNAAT Worklist Generator web application is developed to assist with the RoboNAAT workflow. The goal of this web-app is to generate the worklist files (.csv) that will then be used to load into the Hamilton Run Control to operate the robot. The web-app also provides the interactive instructions on how to load the experiment onto the robot.

## Project Structure Overview

```
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── utils
│   ├── App.js
│   ├── index.js
├── package.json
```
> **Note**: Only important files and directories are listed in the project structure above. When you download the source code of the project, you will see additional files.

- `src/`: Store all components in the application
- `src/assets`: Store static elements (ie: image, icon -etc)
- `src/components`: Store individual components/objects
- `src/config`: Store static configuration values (ie: default values, list of dropdown values)
- `src/utils`: Store utility methods to assist with business logic and perform worklist calculations
- `src/App.js`: The first component that the application will render when the app is loaded. This is where we perform screen navigation/routing.
- `index.js`: The entry point of the application. This is where we will call src/App.js to load all other components.
- `package.json`: Contains all the dependencies/libraries used in the application

---

## How to run and make changes to the web-app locally

### Dependencies Installation
The dependency below is required to install on your local machine prior to building and running the ReactJS web-app. 
- [Node](https://nodejs.org/en/ "Node") (at least v12)

### Building And Running The Web-App
Navigate to the root of the web-app project and install all the dependencies:
- `npm install`

Run the website in the development mode
- `npm start`
Note: Running the command above will open http://localhost:3000 to your default browser. 
The page will reload if you make edits. 
You will also see any lint errors in the console.

### Developer Notes
- You can change port number in **package.json** file.
- When running both server code and website concurrently, port number on the website must be different from the port number of your back-end server

---

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
