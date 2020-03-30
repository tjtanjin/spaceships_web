enchant();

window.onload = function() {
	var game = new Game(560, 780);

	game.preload( 
		'./res/space-player1life.png',
		'./res/space-powerup1.png',
		'./res/space-powerup2.png',
		'./res/space-powerup3.png',
		'./res/space-ship_1.png',
		'./res/space-stars.png',
		'./res/space-meteor_small.png',
		'./res/space-meteor_big.png',
		'./res/space-enemy_propeller.png',
		'./res/space-enemy_spinner.png',
		'./res/space-enemy_spidey.png',
		'./res/space-enemy_tank.png',
		'./res/space-enemy_boss1.png',
		'./res/space-meteorex.png',
		'./res/space-playerex.png',
		'./res/space-smallex.png',
		'./res/space-smallex2.png',
		'./res/space-bossex.png',
		'./res/space-ebullet.png',
		'./res/space-ebullet2.png',
		'./res/space-pbullet.png',
		'./res/space-pbullet2.png',
		'./res/space-healthBar.png',
	);

	game.fps = 60;
	game.scale = 1;
	game.onload = function() {
		console.log("SpaceShips Loaded.");
		var mainMenu = new MainMenu();
		game.pushScene(mainMenu);
	}
	game.start();   
};

// MainMenu
var MainMenu = Class.create(Scene, {
	initialize: function() {
        Scene.apply(this);

        var game = Game.instance;
        this.backgroundColor = 'black';

        // labels
		const label1 = new Label('Welcome to');
		label1.x = 130;
		label1.y = 120;        
		label1.color = 'white';
		label1.font = '42px strong';
		label1.textAlign = 'center';
		label1._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label2 = new Label('SpaceShips');
		label2.x = 128;
		label2.y = 170;        
		label2.color = 'yellow';
		label2.font = '54px strong';
		label2.textAlign = 'center';
		label2._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label3 = new Label('Start');
		label3.x = 128;
		label3.y = 420;        
		label3.color = 'lightgreen';
		label3.font = '32px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		const label4 = new Label('Controls');
		label4.x = 128;
		label4.y = 470;        
		label4.color = 'orange';
		label4.font = '32px strong';
		label4.textAlign = 'center';
		label4._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		const label5 = new Label('LeaderBoard');
		label5.x = 128;
		label5.y = 520;        
		label5.color = 'lightgreen';
		label5.font = '32px strong';
		label5.textAlign = 'center';
		label5._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		spaceShip = new SpaceShip();
		spaceShip.x = game.width/2 - spaceShip.width/2;
		spaceShip.y = 300;

		// groups
		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		// add child
		this.addChild(backgroundGroup);
		this.addChild(spaceShip);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);
		this.addChild(label4);
		this.addChild(label5);

		// default setup
	    this.generateStarTimer = 0;

		for (var i = 0; i < 100; i++) {
			var star = new Star(Math.floor(Math.random() * 560), Math.floor(Math.random() * 780));
			this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
		}

		// add listeners
		this.addEventListener(Event.TOUCH_START, this.click);
		this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    click: function(evt) {
    	if (evt.x >= 224 && evt.x <= 336 && evt.y >= 420 && evt.y <= 450) {
    		var game = Game.instance;
	    	var gameScene = new GameScene();
			game.pushScene(gameScene);
		} else if (evt.x >= 209 && evt.x <= 351 && evt.y >= 470 && evt.y <= 500) {
			var game = Game.instance;
	    	var controls = new Controls();
			game.pushScene(controls);
		} else if (evt.x >= 174 && evt.x <= 386 && evt.y >= 520 && evt.y <= 550) {
			var game = Game.instance;
	    	var leaderBoardSolo = new LeaderBoardSolo();
			game.pushScene(leaderBoardSolo);
		}

   	},
   	update: function(evt) {
   		// set spawn rates
		randomStarTime = Math.round(Math.random() * 6) + 5;
   		// generate star
	    this.generateStarTimer += evt.elapsed * 0.1;
	    if (this.generateStarTimer >= randomStarTime) {
	        var star = new Star(Math.floor(Math.random() * 560), -20);
	        this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
	    }
   	}
});

// GameSceneOver  
var GameSceneOver = Class.create(Scene, {
    initialize: function(score, mode) {
        Scene.apply(this);

        var game = Game.instance;
        this.backgroundColor = 'black';
        this.mode = mode;

        // labels
		const label1 = new Label('Game Over!');
		label1.x = 130;
		label1.y = 120;        
		label1.color = 'red';
		label1.font = '64px strong';
		label1.textAlign = 'center';
		label1._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label2 = new Label('Your Score:');
		label2.x = 130;
		label2.y = 250;        
		label2.color = 'white';
		label2.font = '36px strong';
		label2.textAlign = 'center';

		const label3 = new Label(score);
		label3.x = 128;
		label3.y = 310;        
		label3.color = 'yellow';
		label3.font = '48px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		const label4 = new Label('Restart');
		label4.x = 128;
		label4.y = 550;        
		label4.color = 'lightgreen';
		label4.font = '32px strong';
		label4.textAlign = 'center';
		label4._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label5 = new Label('Back to Menu');
		label5.x = 128;
		label5.y = 600;        
		label5.color = 'orange';
		label5.font = '32px strong';
		label5.textAlign = 'center';
		label5._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		spaceShip = new SpaceShip();
		spaceShip.x = game.width/2 - spaceShip.width/2;
		spaceShip.y = 430;

		// get leaderboard
		if (this.mode == 'solo') {
			this.checkLeaderBoard(SOLOURL, score, this.announceScore, this);
		} else {
			this.checkLeaderBoard(DUOURL, score, this.announceScore, this);
		}

		// groups
		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		// add child
		this.addChild(backgroundGroup);
		this.addChild(spaceShip);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);
		this.addChild(label4);
		this.addChild(label5);

		// default setup
	    this.generateStarTimer = 0;

		for (var i = 0; i < 100; i++) {
			var star = new Star(Math.floor(Math.random() * 560), Math.floor(Math.random() * 780));
			this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
		}

		// add listeners
		this.addEventListener(Event.TOUCH_START, this.click);
		this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    checkLeaderBoard: function(url, score, callback, parent) {
    	var xhr = new XMLHttpRequest();
    	mode = parent.mode;

	  	xhr.onreadystatechange = function() {
	    	if (xhr.readyState === 4) {
	    		data = JSON.parse(xhr.responseText);
	    		var newHighScore = false;
	    		if (data.length < 10) {
	    			newHighScore = true;
	    		} else {
		    		for (var i = 0; i < data.length; i++) {
		    			if (score >= data[i]["score"]) {
		    				newHighScore = true;
		    				break;
		    			}
		    		}
		    	}
	    		if (newHighScore == true) {
	    			callback(data, parent);
	    			var xhr2 = new XMLHttpRequest();
	    			if (mode == "solo") {
	    				xhr2.open("POST", SOLOURL);
	    			} else {
	    				xhr2.open("POST", DUOURL);
	    			}
	    			var username = prompt("You entered top 10 in the leaderboard! Please enter your name:", "");
	    			if (username == "" || username == null) {
	    				username = "Guest";
	    			}
					xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					xhr2.send(JSON.stringify({"username": username, "score": score}));
	    		}
	    	}
	  	}
	  	xhr.open('GET', url, true);
	  	xhr.send('');
    },
	announceScore: function(data, parent) {
		const label = new Label('New High Score!');
		label.x = 128
		label.y = 375
		label.color = 'orange';
		label.font = '24px strong';
		label.textAlign = 'center';
		label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		parent.addChild(label);
	},
    click: function(evt) {
    	if (evt.x >= 224 && evt.x <= 336 && evt.y >= 500 && evt.y <= 600) {
    		var game = Game.instance;
	    	var gameScene = new GameScene();
			game.replaceScene(gameScene);
		} else if (evt.x >= 204 && evt.x <= 356 && evt.y >= 550 && evt.y <= 650) {
    		var game = Game.instance;
	    	var mainMenu = new MainMenu();
			game.replaceScene(mainMenu);
		}
   	},
   	update: function(evt) {
   		// set spawn rates
		randomStarTime = Math.round(Math.random() * 6) + 5;
   		// generate star
	    this.generateStarTimer += evt.elapsed * 0.1;
	    if (this.generateStarTimer >= randomStarTime) {
	        var star = new Star(Math.floor(Math.random() * 560), -20);
	        this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
	    } 
    }
});
