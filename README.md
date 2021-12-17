# AnimationController
CSS Animation controller in JS

## Installation
 - The only needed file is the animationController.js, set it up in your project and you are ready to use it.


## Features
 - Start/Pause/Stop CSS animation easily with JavaScript

## Quick Start

### Setup the CSS

 - You will need a small change in your CSS file before to use the AnimationContoller.
You need to seperate the animation attribute from the initial CSS attriubtes in a new CSS class.

example  :

 - Before 
    ```CSS
    .custom-circle {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        -webkit-animation: 2s linear infinite custom-circle;
        animation: 2s linear infinite custom-circle;
    }
    ```

- After

    ```CSS
    .custom-circle {
        width: 30px;
        height: 30px;
        border-radius: 100%;
    }

    .custom-circle-animation {
        -webkit-animation: 2s linear infinite custom-circle;
        animation: 2s linear infinite custom-circle;
    }
    ```

### Setup the HTML


 - Start with include the script to your page
    ```HTML
        <script src="animationController.js"></script>
    ```

 - The only html setup you need is to precise the new CSS class you have just create in your HTML element 

    example :

    ```HTML
        <div class="custom-circle bg-info" data-animationClass="custom-circle-animation" id="animationExample1" role="status"></div>
    ```

 - If you want to call the function from the DOM element you need to init the controller at the end of your page

    ```HTML
        <script>
            AnimationController.init();
        </script>
    ```

## Basic Example

 - Start the animation of an element with its ID : 
    ```javascript
        AnimationController.startAnimation('elementId');
    ```

- Start the animation from the DOM element
    ```javascript
        element.startAnimation();
    ```

- Start the animation from the DOM element 3 time in a row
    ```javascript
        element.startAnimation(3);
    ```

- Start a global animation with its name
    ```javascript
        AnimationController.startGlobalAnimation('global-animation', 0.2)
    ```