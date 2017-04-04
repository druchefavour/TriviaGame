# Trivia Game

## Overview

In this project a Trivia game using JavaScript for the logic and jQuery to manipulate HTML is created. The app is layed out with valid HTML and stylish CSS.

The trivia game shows only one question until the player answers it or their time runs out. In the app, a trivia form is created with multiple choice.

The player is given fifty seconds to finish the quiz.

The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly. The player is not allowed to pick more than one answer per question. A countdown timer is included in the app.


## Procedure

* Create a GitHub repo called TriviaGame, then clone the repo to the local computer.

* Create a file inside of the TriviaGame folder called ```index.html```. In this file all of the  HTML would be marked up.

* Add/include a script tag with the jQuery library.

* Create a folder inside of the TriviaGame folder called assets.
  * Inside assets, create three folders: css, javascript, images
    * In the css folder, create a style.css file.
    * In the javascript folder, create an app.js file; here all of the JavaScript and jQuery scripts would e written.
    * In the images folder, all the images used in creating the app is saved.


## How the app works
* If the player selects the correct answer, a screen congratulating them for choosing the right option is shown. After five seconds the next question is displayed automatically.

* The scenario is similar for wrong answers and time-outs.

* If the player runs out of time, a modal appears and the player is notified that time's up. Then the correct answer is displayed. The app then waits a for five seconds and shows the next question.

* If the player chooses the wrong answer, the app notifies the player they selected the wrong option and then displays the correct answer. Then the app waits a for five seconds, and then shows the next question.

* On the final screen, the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page) is shown.