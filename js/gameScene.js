enchant();

// GameScene  
var GameScene = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function(mode, device) {
        var game, bg, spaceShip, playerGroup, effectsGroup, enemyGroup, pBulletGroup, smallex, meteorex, bossex, enemyCruiser, healthBar;
        Scene.apply(this);
        this.device = device;

        game = Game.instance;
        game.keybind(27, 'quit');
        game.keybind(32, 'shoot');
        game.keybind(80, 'shootalt');
        game.keybind(65, 'leftalt');
        game.keybind(68, 'rightalt');
        this.backgroundColor = 'black';

        // default setup
        this.mode = mode;
        this.smallex = new Audio('./res/space-sound_smallex.wav');
        this.meteorex = new Audio('./res/space-sound_meteorex.wav');
        this.bossex = new Audio('./res/space-sound_bossex.wav');
        var audioDict = {
        	"smallMeteor": this.meteorex,
        	"bigMeteor": this.meteorex,
        	"enemyShip": this.smallex,
        	"boss": this.bossex
    	}
    	this.audioDict = audioDict;

        // labels
		const label = new Label('SCORE<br>0');
		label.x = -100;
		label.y = 10;        
		label.color = 'white';
		label.font = '16px strong';
		label.textAlign = 'center';
		label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		this.scoreLabel = label;      

		// Background group
		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		// Player group
		playerGroup = new Group();
		this.playerGroup = playerGroup;

		// Effects group
		effectsGroup = new Group();
		this.effectsGroup = effectsGroup;

		// PowerUp group
		powerUpGroup = new Group();
		this.powerUpGroup = powerUpGroup;

		// EnemyPropeller group
		enemyGroup = new Group();
		this.enemyGroup = enemyGroup;

		// pBullet group
		pBulletGroup = new Group();
		this.pBulletGroup = pBulletGroup;

		// SpaceShip
		spaceShip = new SpaceShip(pBulletGroup, 1);
		spaceShip.x = game.width/2 - spaceShip.width/2;
		spaceShip.y = 700;
		this.spaceShip = spaceShip;
		if (this.mode == "duo") {
			// setup player two
			spaceShip.x -= 150
			spaceShip2 = new SpaceShip(pBulletGroup, 2);
			spaceShip2.x = game.width/2 - spaceShip2.width/2 + 150;
			spaceShip2.y = 700;
			this.spaceShip2 = spaceShip2;
		}

		this.addChild(backgroundGroup);

		if (device == "mobile") {
			// mobile controls
			this.move = false;
			this.toRight = false;
			this.toLeft = false;
			var rightArrow = new Arrow("right");
			rightArrow.x = 480;
			rightArrow.y = 710;
			var leftArrow = new Arrow("left");
			leftArrow.x = 23;
			leftArrow.y = 710;
			this.addChild(rightArrow);
			this.addChild(leftArrow);
			this.addEventListener(Event.TOUCH_START, this.touchMoveStart);
			this.addEventListener(Event.TOUCH_END, this.touchMoveStop);
		}

        // add child
        this.addChild(playerGroup);
        this.addChild(enemyGroup);
        this.addChild(pBulletGroup);
        this.playerGroup.addChild(spaceShip);
        if (this.mode == "duo") {
        	this.playerGroup.addChild(spaceShip2);
       	}
        this.addChild(powerUpGroup);
        this.addChild(effectsGroup); 
        this.addChild(label);

        // add listeners
        this.addEventListener(Event.ENTER_FRAME, this.update);

        // initialize values
        this.generateStarTimer = 0;
        this.generateMeteorTimer = 0;
        this.generateEnemyPropellerTimer = 0;
        this.generateEnemySpinnerTimer = 0;
        this.generateEnemySpideyTimer = 0;
        this.generateEnemyTankTimer = 0;
        this.generatePowerUp1Timer = 0;
        this.generatePowerUp2Timer = 0;
        this.generatePowerUp3Timer = 0;
        this.scoreTimer = 0;
		this.score = 0;
		bossTime = false;

		this.player1life1 = new PlayerLife(1);
		this.player1life2 = new PlayerLife(1);
		this.player1life3 = new PlayerLife(1);
		this.effectsGroup.addChild(this.player1life1);
		this.effectsGroup.addChild(this.player1life2);
		this.effectsGroup.addChild(this.player1life3);
		if (this.mode == "duo") {
			this.player2life1 = new PlayerLife(2);
			this.player2life2 = new PlayerLife(2);
			this.player2life3 = new PlayerLife(2);
			this.effectsGroup.addChild(this.player2life1);
			this.effectsGroup.addChild(this.player2life2);
			this.effectsGroup.addChild(this.player2life3);
		}

		for (var i = 0; i < 100; i++) {
			var star = new Star(Math.floor(Math.random() * 560), Math.floor(Math.random() * 780));
			this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
		}
    },
    touchMoveStart: function(evt) {
    	if (evt.x >= 445 && evt.x <= 557 && evt.y >= 683 && evt.y <= 775) {
    		this.toRight = true;
    		this.move = true;
    	} else if (evt.x >= 3 && evt.x <= 115 && evt.y >= 683 && evt.y <= 775) {
    		this.toLeft = true;
    		this.move = true;
    	}
    },
    touchMoveStop: function(evt) {
    	this.move = false;
    	this.toRight = false;
    	this.toLeft = false;
    },
    update: function(evt) {
    	var moveSpeed = 7;
    	var game = Game.instance;
		var randomStarTime, randomMeteorTime, randomEnemyPropellerTime,
			randomEnemySpinnerTime, randomEnemySpideyTime, randomEnemyTankTime,
			randomPowerUp1Time, randomPowerUp2Time, randomPowerUp3Time

		if (game.input.quit) {
			game.replaceScene(new GameSceneOver(this.score, this.mode));
		}

    	// Score increase as time passes
		this.scoreTimer += evt.elapsed * 0.01;
		if (this.scoreTimer >= 0.5) {
		    this.setScore(this.score + 1);
		    this.scoreTimer -= 0.5;
		}

		// set spawn rates
		randomStarTime = Math.round(Math.random() * 6) + 5;

		if (this.score < 500) {
			randomMeteorTime = Math.round(Math.random() * 6) + 80;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 220;
			this.generateEnemySpinnerTimer = -1;
			this.generateEnemySpideyTimer = -1;
			this.generateEnemyTankTimer = -1;
			this.generatePowerUp1Timer = -1;
			this.generatePowerUp2Timer = -1;
			this.generatePowerUp3Timer = -1;
		} else if (this.score >= 500 && this.score < 1500) {
			randomMeteorTime = Math.round(Math.random() * 6) + 75;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 200;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 260;
			this.generateEnemySpideyTimer = -1;
			this.generateEnemyTankTimer = -1;
			randomPowerUp1Time = Math.round(Math.random() * 201) + 2550;
			this.generatePowerUp2Timer = -1;
			this.generatePowerUp3Timer = -1;
		} else if (this.score >= 1500 && this.score < 2250) {
			randomMeteorTime = Math.round(Math.random() * 6) + 70;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 180;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 240;
			this.generateEnemySpideyTimer = -1;
			this.generateEnemyTankTimer = -1;
			this.generatePowerUp1Timer = -1;
			randomPowerUp2Time = Math.round(Math.random() * 201) + 2250;
			this.generatePowerUp3Timer = -1;
		} else if (this.score >= 2250 && this.score < 3500) {
			randomMeteorTime = Math.round(Math.random() * 6) + 70;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 170;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 245;
			this.generateEnemySpideyTimer = -1;
			this.generateEnemyTankTimer = -1;
			randomPowerUp1Time = Math.round(Math.random() * 201) + 2650;
			this.generatePowerUp2Timer = -1;
			this.generatePowerUp3Timer = -1;
		} else if (this.score >= 3500 && this.score < 4000) {
			randomMeteorTime = Math.round(Math.random() * 6) + 70;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 160;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 230;
			randomEnemySpideyTime = Math.round(Math.random() * 11) + 280;
			this.generateEnemyTankTimer = -1;
			this.generatePowerUp1Timer = -1;
			randomPowerUp2Time = Math.round(Math.random() * 301) + 1750;
			randomPowerUp3Time = Math.round(Math.random() * 201) + 2200;
		} else if (this.score >= 4000 && this.score < 5500) {
			randomMeteorTime = Math.round(Math.random() * 6) + 65;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 150;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 210;
			randomEnemySpideyTime = Math.round(Math.random() * 11) + 250;
			this.generateEnemyTankTimer = -1;
			randomPowerUp1Time = Math.round(Math.random() * 201) + 2650;
			this.generatePowerUp2Timer = -1;
			this.generatePowerUp3Timer = -1;
		} else if (this.score >= 5500 && this.score < 6000) {
			randomMeteorTime = Math.round(Math.random() * 6) + 65;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 150;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 210;
			randomEnemySpideyTime = Math.round(Math.random() * 11) + 250;
			randomEnemyTankTime = Math.round(Math.random() * 11) + 280;
			randomPowerUp1Time = Math.round(Math.random() * 301) + 2300;
			this.generatePowerUp2Timer = -1;
			randomPowerUp3Time = Math.round(Math.random() * 201) + 2700;
		} else if (this.score >= 6000 && this.score < 8000) {
			randomMeteorTime = Math.round(Math.random() * 6) + 65;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 140;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 200;
			randomEnemySpideyTime = Math.round(Math.random() * 11) + 240;
			randomEnemyTankTime = Math.round(Math.random() * 11) + 270;
			randomPowerUp1Time = Math.round(Math.random() * 401) + 2200;
			randomPowerUp2Time = Math.round(Math.random() * 301) + 2500;
			randomPowerUp3Time = Math.round(Math.random() * 201) + 2800;
		} else if (this.score >= 8000 && this.score < 10000) {
			randomMeteorTime = Math.round(Math.random() * 6) + 60;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 130;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 190;
			randomEnemySpideyTime = Math.round(Math.random() * 11) + 230;
			randomEnemyTankTime = Math.round(Math.random() * 11) + 260;
			randomPowerUp1Time = Math.round(Math.random() * 401) + 2000;
			randomPowerUp2Time = Math.round(Math.random() * 301) + 2400;
			randomPowerUp3Time = Math.round(Math.random() * 201) + 3700;
		} else if (this.score >= 10000) {
			randomMeteorTime = Math.round(Math.random() * 6) + 65;
			randomEnemyPropellerTime = Math.round(Math.random() * 11) + 120;
			randomEnemySpinnerTime = Math.round(Math.random() * 11) + 180;
			randomEnemySpideyTime = Math.round(Math.random() * 11) + 220;
			randomEnemyTankTime = Math.round(Math.random() * 11) + 250;
			randomPowerUp1Time = Math.round(Math.random() * 401) + 2000;
			randomPowerUp2Time = Math.round(Math.random() * 301) + 2300;
			randomPowerUp3Time = Math.round(Math.random() * 201) + 2600;
		}

		// check bossTime
		if (this.score == 2250 && bossTime == false) {
			enemyCruiser = new EnemyCruiser(this.enemyGroup, 1);
			healthBar = new HealthBar(150);
			this.enemyGroup.addChild(enemyCruiser);
			this.effectsGroup.addChild(healthBar);
            bossTime = true;
		} else if (this.score == 4000 && bossTime == false) {
			enemyCruiser = new EnemyCruiser(this.enemyGroup, 2);
			healthBar = new HealthBar(175);
			this.enemyGroup.addChild(enemyCruiser);
			this.effectsGroup.addChild(healthBar);
            bossTime = true;
		} else if (this.score == 6000 && bossTime == false) {
			enemyCruiser = new EnemyCruiser(this.enemyGroup, 3);
			healthBar = new HealthBar(175);
			this.enemyGroup.addChild(enemyCruiser);
			this.effectsGroup.addChild(healthBar);
            bossTime = true;
		} else if (this.score == 8000 && bossTime == false) {
			enemyCruiser = new EnemyCruiser(this.enemyGroup, 4);
			healthBar = new HealthBar(200);
			this.enemyGroup.addChild(enemyCruiser);
			this.effectsGroup.addChild(healthBar);
            bossTime = true;
		} else if (this.score == 10000 && bossTime == false) {
			enemyCruiser = new EnemyCruiser(this.enemyGroup, 5);
			healthBar = new HealthBar(250);
			this.enemyGroup.addChild(enemyCruiser);
			this.effectsGroup.addChild(healthBar);
            bossTime = true;
		}

		// generate entities

		// generate star
	    this.generateStarTimer += evt.elapsed * 0.1;
	    if (this.generateStarTimer >= randomStarTime) {
	        var star = new Star(Math.floor(Math.random() * 560), -20);
	        this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
	    }

		// pause enemy ship spawn during bossTime
		if (bossTime == false) {

			// generate meteor
		    this.generateMeteorTimer += evt.elapsed * 0.1;
		    meteorType = ["smallMeteor", "bigMeteor"];
		    type = meteorType[Math.floor(Math.random())];
		    if (this.generateMeteorTimer >= randomMeteorTime) {
		        var meteor = new Meteor(type);
		        this.enemyGroup.addChild(meteor);
		        this.generateMeteorTimer = 0;
		    }

		    // generate enemypropeller
		    this.generateEnemyPropellerTimer += evt.elapsed * 0.1;
		    if (this.generateEnemyPropellerTimer >= randomEnemyPropellerTime) {
		        var enemyPropeller = new EnemyPropeller(Math.floor(Math.random() * 364) + 98, -300);
		        this.enemyGroup.addChild(enemyPropeller);
		        this.generateEnemyPropellerTimer = 0;
		    }

		    // generate enemyspinner
		    this.generateEnemySpinnerTimer += evt.elapsed * 0.1;
		    if (this.generateEnemySpinnerTimer >= randomEnemySpinnerTime) {
		        var enemySpinner = new EnemySpinner(this.enemyGroup, Math.floor(Math.random() * 344) + 108, -300);
		        this.enemyGroup.addChild(enemySpinner);
		        this.generateEnemySpinnerTimer = 0;
		    }

		    // generate enemyspidey
		    this.generateEnemySpideyTimer += evt.elapsed * 0.1;
		    if (this.generateEnemySpideyTimer >= randomEnemySpideyTime) {
		        var enemySpidey = new EnemySpidey(this.enemyGroup, Math.floor(Math.random() * 344) + 108, -300);
		        this.enemyGroup.addChild(enemySpidey);
		        this.generateEnemySpideyTimer = 0;
		    }

		    // generate enemytank
		    this.generateEnemyTankTimer += evt.elapsed * 0.1;
		    if (this.generateEnemyTankTimer >= randomEnemyTankTime) {
		        var enemyTank = new EnemyTank(this.enemyGroup, Math.floor(Math.random() * 344) + 108, -300);
		        this.enemyGroup.addChild(enemyTank);
		        this.generateEnemyTankTimer = 0;
		    }

		    // generate powerup1
		    this.generatePowerUp1Timer += evt.elapsed * 0.1;
		    if (this.generatePowerUp1Timer >= randomPowerUp1Time) {
		        var powerUp1 = new PowerUp(this.powerUpGroup, 1);
		        this.powerUpGroup.addChild(powerUp1);
		        this.generatePowerUp1Timer = 0;
		    }

		    // generate powerup2
		    this.generatePowerUp2Timer += evt.elapsed * 0.1;
		    if (this.generatePowerUp2Timer >= randomPowerUp2Time) {
		        var powerUp2 = new PowerUp(this.powerUpGroup, 2);
		        this.powerUpGroup.addChild(powerUp2);
		        this.generatePowerUp2Timer = 0;
		    }

		    // generate powerup3
		    this.generatePowerUp3Timer += evt.elapsed * 0.1;
		    if (this.generatePowerUp3Timer >= randomPowerUp3Time) {
		        var powerUp3 = new PowerUp(this.powerUpGroup, 3);
		        this.powerUpGroup.addChild(powerUp3);
		        this.generatePowerUp3Timer = 0;
		    }
		} else {
			healthBar.trackHealth(enemyCruiser.health);
		}

	    // Check collision against player
		for (var i = this.enemyGroup.childNodes.length - 1; i >= 0; i--) {
	    	var enemy = this.enemyGroup.childNodes[i];
	    	for (var j = this.playerGroup.childNodes.length - 1; j >= 0; j--) {
	    		var player = this.playerGroup.childNodes[j];
	    		if (enemy.intersect(player)) {
		    		enemy.explode(this.effectsGroup, this.audioDict[enemy.type]);
		    		player.explode(this.effectsGroup);
		    		if (enemy.type == "laser") {
						player.health -= 0.06;
		    		} else {
					    this.enemyGroup.removeChild(enemy);
						player.health -= 1;
					}
					if (player.health <= -1) {
						this.playerGroup.removeChild(player);
					}
					break;
				}
	    	}
		}

		for (var i = this.powerUpGroup.childNodes.length - 1; i >= 0; i--) {
	    	var powerUp = this.powerUpGroup.childNodes[i];
	    	for (var j = this.playerGroup.childNodes.length - 1; j >= 0; j--) {
	    		var player = this.playerGroup.childNodes[j];
		    	if (powerUp.intersect(player)) {
		    		player.powerUp(powerUp.powerValue);
				    this.powerUpGroup.removeChild(powerUp);
					break;
				}
			}
		}

		// Check player bullet collision
		for (var i = this.pBulletGroup.childNodes.length - 1; i >= 0; i--) {
		    var pBullet = this.pBulletGroup.childNodes[i];
		    // laser tracing
		    if (pBullet.type == "laser") {
				if (game.input.left && !game.input.right){
				    pBullet.x -= moveSpeed;
				} else if(game.input.right && !game.input.left){
				    pBullet.x += moveSpeed;
				}
		    }
		    for (var j = this.enemyGroup.childNodes.length - 1; j >= 0; j--) {
		    	var enemy = this.enemyGroup.childNodes[j];
		    	if (pBullet.intersect(enemy)) {
		    		pBullet.explode(this.effectsGroup, this.smallex);
		    		if (pBullet.type == "bullet") {
			    		this.pBulletGroup.removeChild(pBullet);
			    	}
			    	if (enemy.health <= 0) {
			    		enemy.explode(this.effectsGroup, this.audioDict[enemy.type]);
			    		if (enemy.type == "boss") {
			    			var powerUp3 = new PowerUp(this.powerUpGroup, 3);
		        			this.powerUpGroup.addChild(powerUp3);
			    			bossTime = false;
			    		}
			    		if (enemy.type != "laser") {
							this.enemyGroup.removeChild(enemy);
						}        
					} else {
						enemy.health -= 1;
					}
					break;
		    	}
		    }
		}

		// keyboard input
		if (this.mode == "solo") {
			// player 1 controls
			if(game.input.left && !game.input.right){
			    this.spaceShip.x -= moveSpeed;
			} else if(game.input.right && !game.input.left){
			    this.spaceShip.x += moveSpeed;
			}
			if (game.input.shoot && this.spaceShip.health > -1) {
				this.spaceShip.shoot();
			}
		} else {
			// player 1 controls
			if(game.input.leftalt && !game.input.rightalt){
			    this.spaceShip.x -= moveSpeed;
			} else if(game.input.rightalt && !game.input.leftalt){
			    this.spaceShip.x += moveSpeed;
			}
			if (game.input.shoot && this.spaceShip.health > -1) {
				this.spaceShip.shoot();
			}
			// player 2 controls
			if(game.input.left && !game.input.right){
			    this.spaceShip2.x -= moveSpeed;
			} else if(game.input.right && !game.input.left){
			    this.spaceShip2.x += moveSpeed;
			}
			if (game.input.shootalt && this.spaceShip2.health > -1) {
				this.spaceShip2.shoot();
			}
		}
		if (this.device == "mobile") {
			if (this.move) {
		    	if (this.toRight) {
		    		this.spaceShip.x += moveSpeed;
		    	} else {
		    		this.spaceShip.x -= moveSpeed;
		    	}
	        }
	        this.spaceShip.shoot();
	    }

		// player life display
		if (this.spaceShip.health > 1) {
            this.player1life1.x = 442;
            this.player1life1.y = 10;
            this.player1life2.x = 462;
            this.player1life2.y = 10;
            this.player1life3.x = 482;
            this.player1life3.y = 10;
        } else if (this.spaceShip.health <= 1 && this.spaceShip.health > 0) {
            this.player1life1.x = 442;
            this.player1life1.y = -100;
            this.player1life2.x = 462;
            this.player1life2.y = 10;
            this.player1life3.x = 482;
            this.player1life3.y = 10;
        } else if (this.spaceShip.health <= 0 && this.spaceShip.health > -1) {
            this.player1life1.x = 442;
            this.player1life1.y = -100;
            this.player1life2.x = 462;
            this.player1life2.y = -100;
            this.player1life3.x = 482;
            this.player1life3.y = 10;
        } else {
        	this.player1life1.x = 442;
            this.player1life1.y = -100;
            this.player1life2.x = 462;
            this.player1life2.y = -100;
            this.player1life3.x = 482;
            this.player1life3.y = -100;
        }

        if (this.mode == "duo") {
        	if (this.spaceShip2.health > 1) {
	            this.player2life1.x = 442;
	            this.player2life1.y = 30;
	            this.player2life2.x = 462;
	            this.player2life2.y = 30;
	            this.player2life3.x = 482;
	            this.player2life3.y = 30;
	        } else if (this.spaceShip2.health <= 1 && this.spaceShip2.health > 0) {
	            this.player2life1.x = 442;
	            this.player2life1.y = -100;
	            this.player2life2.x = 462;
	            this.player2life2.y = 30;
	            this.player2life3.x = 482;
	            this.player2life3.y = 30;
	        } else if (this.spaceShip2.health <= 0 && this.spaceShip2.health > -1) {
	            this.player2life1.x = 442;
	            this.player2life1.y = -100;
	            this.player2life2.x = 462;
	            this.player2life2.y = -100;
	            this.player2life3.x = 482;
	            this.player2life3.y = 30;
	        } else {
	        	this.player2life1.x = 442;
	            this.player2life1.y = -100;
	            this.player2life2.x = 462;
	            this.player2life2.y = -100;
	            this.player2life3.x = 482;
	            this.player2life3.y = -100;
	        }
        }

        if (this.mode == "solo") {
        	if (this.spaceShip.health <= -1) {
        		game.replaceScene(new GameSceneOver(this.score, this.mode, this.device)); 
        	}
        } else {
        	if (this.spaceShip.health <= -1 && this.spaceShip2.health <= -1) {
        		game.replaceScene(new GameSceneOver(this.score, this.mode, this.device)); 
        	}

        }
	},
	setScore: function (value) {
	    this.score = value;
	    this.scoreLabel.text = 'SCORE<br>' + this.score;
	}
});