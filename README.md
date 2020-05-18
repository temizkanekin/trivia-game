# A Trivia Game

## Live version on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/dd577a39-0ada-4359-94e8-7d4ef0d27177/deploy-status)](https://app.netlify.com/sites/focused-haibt-db332c/deploys)

https://focused-haibt-db332c.netlify.app/

## Available Scripts

In the project directory, you can run:

#### `yarn install`

Install the node dependencies before run the app.

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Description

Simple trivia game with some extra features. After you select category and difficulty(or let the game choose them for you), you are ready to play.

## Features

- User selectable and random generated trivia questions
- Responsive Design
- Highest score persistance with React's local storage

## Technologies/Libraries Used

- React Router Dom : To wrap all views into router in App.js.
- [Tailwind CSS](https://tailwindcss.com/) : Highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.
- [axios](https://github.com/axios/axios) : Promise based HTTP client for the browser and node.js
- [react-lottie](https://github.com/chenqingspring/react-lottie) : Render After Effects animations on React

## About Game (with respective of each view)

### Welcome View

- Leads user to choose category and difficulty information and passes the selection data to questions view. 
- Additionally user can choose category and difficulty by random and be rewarded with some extra points.

### Questions View

- Fetches trivia questions from [Open Trivia Database](https://opentdb.com/) with category and difficulty parameters that acquired from url.
- Renders all information about questions and user information details in the following order:    
    1. Question number, user point and remaining time in a toolbar
    2. Highest point and 50:50 lifeline* section
    3. Questions and answers section
- Answering a question redirects users to one of theese three views: correct answer view, wrong answer view or game completed view

*_A lifeline is a form of aid which is given to contestants in all worldwide formats of the show. Most of the time, each lifeline can be used by the contestant only once during their game to help them on a particular question(Joker)._

### Correct Answer View

- Renders the earned points from related question with the total user point and redirects user to the next question.

### Wrong Answer View

- Redirects user to questions view or welcome view by user's decision(if user chooses the questions view, than new questions will be fetched)

### Time Is Up View

- Redirects user to questions view or welcome view by user's decision(if user chooses the questions view, than new questions will be fetched)

### Game Completed View

- Renders total user point and updates high score information if necessary
- Redirects user to questions view or welcome view by user's decision(if user chooses the questions view, than new questions will be fetched)

## Further Information

- Each component, has everything it needs to work on its own, such as its own styles, images, set of actions as well as unit or integration tests.
- All of the bonus features are implemented.
- Scoring system improvements have been made as an additional feature. The goal here is to make the reward system more complex(thus, making the game more competitive). These improvements divided into 3 parts:    
    1. Earned points for each question is calculated with respect of remaining time and the difficulty of the question(60 for easy, 90 for medium, 120 for hard questions).
    2. A tempting random category and difficulty picker button(with animations that makes the button even more tempting) added to the home view. Random selection will be rewarded with bonus points.
    3. Highest score information added. In this way previous features has become more sensible.
- [This](https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb) array shuffle approach is used for shuffling the answers in an efficient way.
- This app has 4 components:    
    1. A BaseView component that is used for creating a base view with image, title, message and button list(Used in both WelcomeView and QuestionView components).
    2. A Button component which has css and prop management over html button.
    3. A QuestionView component that manages app state information and includes sub views like correct answer view as seperate functions.
    4. A WelcomeView component that is a welcome page that includes category and difficulty information.
- useImperativeHandle(in BaseView) hook is used to obtain the category and difficulty information in WelcomeView by passing the ref from WelcomeView to BaseView.

## Feature TODO's

- Localization can be added to the app
- More Lifelines can be added
- Random button rewards can be diversified
- UI/UX improvements
- Single page application concept can be strengthened accross the app
- Dockerizing the app
- Testing

## Author

**Ekin Mert Temizkan**