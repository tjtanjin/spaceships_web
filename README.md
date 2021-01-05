<p align="center">
  <img src="https://i.imgur.com/MpyZk4N.gif" />
  <h1 align="center">SpaceShips Web</h1>
</p>

## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Team](#team)
* [Contributing](#contributing)
* [Others](#others)

### Introduction
SpaceShips Web is a self-initiated project building on one of my very first coding project [SpaceShips](https://github.com/tjtanjin/spaceships) (2018). This project involves recoding the original [SpaceShips](https://github.com/tjtanjin/spaceships) project done in python to javascript so as to bring the entire game online. A backend project was also done separately using nodejs to incorporate a leaderboard so as to add some competitiveness to the game. For work pertaining to the leaderboard, please refer to the repository here:
```
https://github.com/tjtanjin/spaceships_api
```
Currently, the game is live on the following website:
```
https://spaceships.tjtanjin.com/
```

### Features
The web edition of SpaceShips retains all the old features of the original project with tweaks to player/enemy stats for game balance reasons. Apart from being playable online now, the game also offers support for both PC and mobile devices! In addition, leaderboards have been added to allow for competitive players to pit themselves against each other! The game currently supports 2 main modes:
```
1) Single player
2) Two player
```
Leaderboards for both modes are calculated separately so you need not worry about losing out should you be playing this game alone!

### Technologies
Technologies used by SpaceShips Web are as below:
##### Done with:

<p align="center">
  <img height="150" width="150" src="https://i.imgur.com/lXu9kox.png"/>
</p>
<p align="center">
HTML
</p>
<p align="center">
  <img height="150" width="150" src="https://i.imgur.com/SQKE9WW.png"/>
</p>
<p align="center">
CSS
</p>
<p align="center">
  <img height="150" width="150" src="https://i.imgur.com/1D3AoId.png"/>
</p>
<p align="center">
JavaScript
</p>

##### Deployed on:
<p align="center">
  <img height="150" width="150" src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/ayzwkdawmlyzvuummuf4" />
</p>
<p align="center">
OVHcloud
</p>

##### Project Repository
```
https://github.com/tjtanjin/spaceships_web
```

### Setup
The following section will guide you through setting up your own SpaceShips Web edition!
* First, cd to the directory of where you wish to store the project and clone this repository. An example is provided below:
```
$ cd /home/user/exampleuser/projects/
$ git clone https://github.com/tjtanjin/spaceships_web.git
```
* Following which, unzip res.zip which contains the images and audio files for the project. You may remove the res.zip file after that.
* This step is optional. If you wish to have leaderboards set up as well, you will need to create a config.js file inside the js folder of the project and add your 2 API endpoints with variable names SOLOURL and DUOURL as shown below:
```
var SOLOURL = "your api endpoint for single player leaderboard";
var DUOURL = "your api endpoint for two player leaderboard";
```
A separate setup for the API endpoint of the leaderboard can be found in the backend project [here](https://github.com/tjtanjin/spaceships_api).
* If you wish to test the game locally, clicking on index.html will launch the game window. If you wish to host this game publicly on the web, further setup of a server with XAMPP and Apache2 is required and you may refer to the guide [here](https://gist.github.com/tjtanjin/29875407defe183c5147bb854f9e69ae).

### Team
* [Tan Jin](https://github.com/tjtanjin)

### Contributing
If you have code to contribute to the project, open a pull request and describe clearly the changes and what they are intended to do (enhancement, bug fixes etc). Alternatively, you may simply raise bugs or suggestions by opening an issue.

### Others
For any questions regarding the implementation of the project, please drop an email to: cjtanjin@gmail.com.
