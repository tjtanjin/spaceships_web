<p align="center">
	<img width=1000 src="https://i.imgur.com/MpyZk4N.gif" />
	<h1 align="center">SpaceShips Web</h1>
</p>

## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Deployment](#deployment)
* [Team](#team)
* [Contributing](#contributing)
* [Others](#others)

### Introduction
SpaceShips Web is a self-initiated project building on one of my very first coding project [SpaceShips](https://github.com/tjtanjin/spaceships) (2018). This project involves recoding the original [SpaceShips](https://github.com/tjtanjin/spaceships) project done in python to javascript so as to bring the entire game online. Currently, the game is live on [spaceships.tjtanjin.com](https://spaceships.tjtanjin.com).

A backend project was also done separately using nodejs to incorporate a leaderboard so as to add some competitiveness to the game. For work pertaining to the leaderboard, please refer to the [API repository](https://github.com/tjtanjin/spaceships_api).

### Features
The web edition of SpaceShips retains all the old features of the original project with tweaks to player/enemy stats for game balance reasons. Apart from being playable online now, the game also offers support for both PC and mobile devices! In addition, leaderboards have been added to allow for competitive players to pit themselves against each other! The game currently supports 2 main modes:

- Single player
- Two player


Note: Leaderboards for both modes are **calculated separately** so you need not worry about losing out should you be playing this game alone!

### Technologies
Technologies used by SpaceShips Web are as below:
#### Done with:

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

#### Project Repository
- https://github.com/tjtanjin/spaceships_web

### Setup
The following section will guide you through setting up your own SpaceShips Web edition!
* First, `cd` to the directory of where you wish to store the project and clone this repository. An example is provided below:
```
$ cd /home/user/exampleuser/projects/
$ git clone https://github.com/tjtanjin/spaceships_web.git
```
* Following which, extract *res.tgz* which contains the images and audio files for the project. You may remove *res.tgz* after that.
* **This step is optional**. If you wish to have your own leaderboard set up as well, you will need to modify the *config.js* file inside the *js* folder of the project and replace the 2 endpoints with your own. A separate setup for the API endpoint of the leaderboard can be found in the backend project [here](https://github.com/tjtanjin/spaceships_api).
* Once the above steps are complete, clicking on *index.html* will launch the game window which allows you to run the game locally.

### Deployment
#### Docker
This section assumes you are familiar with [docker](https://www.docker.com/). If you are unfamiliar with docker, it is recommended you go through a quick tutorial for it first. This section **will not** dive into the details of docker usage.

1) If you using the project as it is (**i.e. no intended code changes**), then simply pull the latest image from dockerhub and run the container as follows:
	```
	$ docker pull tjtanjin/spaceships_web:master
	$ docker run -d -p 80:80 --name spaceships_web tjtanjin/spaceships_web:master --restart always
	```
	Note that the default image uses my leaderboard endpoints. To use your own endpoints, you will have to update the 2 endpoint variables in the *Dockerfile*. If you wish to make changes to the project, then please read on. Otherwise, [launch away](http://localhost:80)!
2) Once you are done with your code changes, you would have to build your own docker image with the following command (take note to replace the tag `-t` with that of your own):
	```
	$ docker build -t tjtanjin/spaceships_web .
	```
4) Upon obtaining your image, you may then start your container with the following command (remember to replace image name below if you built your own image):
	```
	$ docker run -d -p 80:80 --name spaceships_web tjtanjin/spaceships_web:master
	```
	With that, you now have your own container for the spaceships game running on port 80 of your localhost!

Note: To expose the application publicly, you will still need to serve it over a web server/proxy. Refer to the [Manual](#manual) section if you would like more details.

#### Manual
A guide utilizing this spaceships project as an example can be found [here](https://gist.github.com/tjtanjin/29875407defe183c5147bb854f9e69ae).

### Team
* [Tan Jin](https://github.com/tjtanjin)

### Contributing
If you have code to contribute to the project, open a pull request and describe clearly the changes and what they are intended to do (enhancement, bug fixes etc). Alternatively, you may simply raise bugs or suggestions by opening an issue.

### Others
For any questions regarding the implementation of the project, please drop an email to: cjtanjin@gmail.com.
