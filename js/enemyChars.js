enchant();

var Meteor = Class.create(Sprite, {
    initialize: function(type) {
        // default setup
        if (type == "smallMeteor") {
	        Sprite.apply(this,[36, 36]);
	        this.image  = Game.instance.assets['./res/space-meteor_small.png']; 
	        this.health = 0;
	    } else {
	    	Sprite.apply(this,[63, 63]);
	        this.image  = Game.instance.assets['./res/space-meteor_big.png'];
	        this.health = 1;
	    }     
        this.rotationSpeed = Math.random() * 100 - 30;
        this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.x = Math.floor(Math.random() * 540) + 10;
	    this.y = -this.height;    
	    this.rotation = Math.floor(Math.random() * 360); 
	    this.type = type;   
	},
	explode: function(effectsGroup, sound) {
		var dispX = Math.floor(Math.random() * 5);
		var dispY = Math.floor(Math.random() * 15) + 10;
		var explosion = new Explosion(this.x + dispX, this.y + dispY, "meteor");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) { 
		var game = Game.instance;
	    var ySpeed = 320 + this.rotationSpeed;
	    
		this.y += ySpeed * evt.elapsed * 0.001;
		this.rotation += this.rotationSpeed * evt.elapsed * 0.05;           
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }
	}
});

var EnemyPropeller = Class.create(Sprite, {
    initialize: function(x, y) {
        // default setup
        Sprite.apply(this,[85, 98]);
        this.image  = Game.instance.assets['./res/space-enemy_propeller.png'];      
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.health = 1;     
		this.x = x;
		this.y = y;
		this.type = "enemyShip";
	},
	explode: function(effectsGroup, sound) {
		var dispX = Math.floor(Math.random() * 20) + 10;
		var dispY = Math.floor(Math.random() * 35) + 25;
		var explosion = new Explosion(this.x + dispX, this.y + dispY, "onDeath");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) { 
		this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.25) {
	    	if (this.frame == 5) {
	    		this.frame = 0;
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.25;
		    }
    	}
		var game = Game.instance;
	    var ySpeed = 250;
	    
		this.y += ySpeed * evt.elapsed * 0.001;          
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }
	}
});

var EnemySpinner = Class.create(Sprite, {
    initialize: function(enemyGroup, x, y) {
        // default setup
        Sprite.apply(this,[86, 108]);
        this.image  = Game.instance.assets['./res/space-enemy_spinner.png'];      
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.health = 2;    
	    this.x = x;
	    this.y = y;
	    this.enemyGroup = enemyGroup;
	    this.shootTime = 0;
	    this.type = "enemyShip";    
	},
	shoot: function (evt) {
	    var eBullet = new EnemyBullet(this.x + 35, this.y + 80, "bullet");
		this.enemyGroup.addChild(eBullet);
		var eBulletSound = new Audio('./res/space-sound_ebullet.wav');
		eBulletSound.play();
	},
	explode: function(effectsGroup, sound) {
		var dispX = Math.floor(Math.random() * 20) + 10;
		var dispY = Math.floor(Math.random() * 35) + 25;
		var explosion = new Explosion(this.x + dispX, this.y + dispY, "onDeath");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) { 
		this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.25) {
	    	if (this.frame == 5) {
	    		this.frame = 0;
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.25;
		    }
    	}
		var game = Game.instance;
	    var ySpeed = 180;
	    
		this.y += ySpeed * evt.elapsed * 0.001;          
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }

	    this.shootTime += evt.elapsed * 0.001;  
	    if (this.shootTime >= 1.2) {
	    	this.shoot();
	    	this.shootTime = 0;
	    }
	}
});

var EnemySpidey = Class.create(Sprite, {
    initialize: function(enemyGroup, x, y) {
        // default setup
        Sprite.apply(this,[90, 89]);
        this.image  = Game.instance.assets['./res/space-enemy_spidey.png'];      
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.health = 3;    
	    this.x = x;
	    this.y = y;
	    this.enemyGroup = enemyGroup;
	    this.shootTime = 0;
	    this.type = "enemyShip";    
	},
	shoot: function (evt) {
	    var eBullet1 = new EnemyBullet(this.x + 32, this.y + 65, "bullet");
	    var eBullet2 = new EnemyBullet(this.x + 42, this.y + 65, "bullet");
		this.enemyGroup.addChild(eBullet1);
		this.enemyGroup.addChild(eBullet2);
		var eBulletSound = new Audio('./res/space-sound_ebullet.wav');
		eBulletSound.play();
	},
	explode: function(effectsGroup, sound) {
		var dispX = Math.floor(Math.random() * 20) + 10;
		var dispY = Math.floor(Math.random() * 35) + 25;
		var explosion = new Explosion(this.x + dispX, this.y + dispY, "onDeath");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) { 
		this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.25) {
	    	if (this.frame == 5) {
	    		this.frame = 0;
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.25;
		    }
    	}
		var game = Game.instance;
	    var ySpeed = 155;
	    
		this.y += ySpeed * evt.elapsed * 0.001;          
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }

	    this.shootTime += evt.elapsed * 0.001;  
	    if (this.shootTime >= 1.0) {
	    	this.shoot();
	    	this.shootTime = 0;
	    }
	}
});

var EnemyTank = Class.create(Sprite, {
    initialize: function(enemyGroup, x, y) {
        // default setup
        Sprite.apply(this,[74, 76]);
        this.image  = Game.instance.assets['./res/space-enemy_tank.png'];      
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.health = 4;    
	    this.x = x;
	    this.y = y;
	    this.enemyGroup = enemyGroup;
	    this.shootTime = 0;
	    this.type = "enemyShip";
	    this.entranceTime = 0;
	    this.laserTime = 0;
	},
	shoot: function (evt) {
	    var eBullet = new EnemyBullet(this.x + 39, this.y + 55, "bullet");
		this.enemyGroup.addChild(eBullet);
		var eBulletSound = new Audio('./res/space-sound_ebullet.wav');
		eBulletSound.play();
	},
	laser: function (evt) {
		var eBullet = new EnemyBullet(this.x + 35, this.y + 83, "laser");
		this.enemyGroup.addChild(eBullet);
		this.laserTime = 0;
		var eBulletSound = new Audio('./res/space-sound_ebullet2.wav');
		eBulletSound.play();
	},
	explode: function(effectsGroup, sound) {
		var dispX = Math.floor(Math.random() * 20) + 10;
		var dispY = Math.floor(Math.random() * 35) + 25;
		var explosion = new Explosion(this.x + dispX, this.y + dispY, "onDeath");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) {
		this.entranceTime += evt.elapsed * 0.01;
		this.animationDuration += evt.elapsed * 0.01;  
	    if (this.animationDuration >= 0.25) {
	    	if (this.entranceTime < 4) {
		    	if (this.frame == 17) {
		    		this.frame = 10;
		    	} else {
			        this.frame += 1;
			        this.animationDuration -= 0.25;
			    }
			} else {
				if (this.frame == 17) {
		    		this.frame = 0;
		    	} else {
			        this.frame += 1;
			        this.animationDuration -= 0.25;
			    }
			}
    	}
		var game = Game.instance;
	    var ySpeed = 125;
	    
		this.y += ySpeed * evt.elapsed * 0.001;          
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }

	    this.shootTime += evt.elapsed * 0.001;  
	    if (this.shootTime >= 1.0) {
	    	this.shoot();
	    	this.shootTime = 0;
	    }

	    if (this.entranceTime >= 48) {
	    	this.laserTime += evt.elapsed * 0.001;
	    	if (this.laserTime >= 0.15) {
	    		this.laser();
	    		this.laserTime = 0;
	    	}
	    }
	}
});

var EnemyBullet = Class.create(Sprite, {     
	initialize: function(x, y, type) {
	    // default setup
	    if (type == "bullet") {
		    Sprite.apply(this,[16, 37]);
		    this.image = Game.instance.assets['./res/space-ebullet.png'];
		} else {
			Sprite.apply(this,[4, 726]);
		    this.image = Game.instance.assets['./res/space-ebullet2.png'];
		}
	    this.animationDuration = 0;
	    this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.x = x;
	    this.y = y;
	    this.health = 0;
	    this.type = type;
	},
	explode: function(effectsGroup, sound) {
		var explosion = new Explosion(this.x, this.y + 25, "onDamage");
		effectsGroup.addChild(explosion);
	},
	update: function(evt) {
		this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.15) {
	    	if (this.type == "bullet") {
		    	if (this.frame == 3) {
		    		this.frame = 0;
		    	} else {
		    		this.frame += 1;
					this.animationDuration -= 0.15;
		    	}
			} else {
				if (this.frame == 5) {
	    			this.parentNode.removeChild(this);
				} else {
					this.frame += 1;
					this.animationDuration -= 0.15;
				}
			}
    	} 
		var game = Game.instance;
	    
	    if (this.type == "bullet") {
			this.y += 8          
		    if (this.y > game.height) {
		        this.parentNode.removeChild(this);        
		    }
		}
	}
});

var EnemyCruiser = Class.create(Sprite, {
    initialize: function(enemyGroup, level) {
        // default setup
        Sprite.apply(this,[417, 227]);
        this.image  = Game.instance.assets['./res/space-enemy_boss1.png'];      
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.update);
        if (level == 1) {
        	this.health = 149;
        	this.shootRate = 1.0;
        	randomEnemyTime = Math.round(Math.random() * 11) + 350;
        } else if (level == 2) {
        	this.health = 174;
        	this.shootRate = 0.9;
        	randomEnemyTime = Math.round(Math.random() * 11) + 330;
        } else if (level == 3) {
        	this.health = 174;
        	this.shootRate = 0.8;
        	randomEnemyTime = Math.round(Math.random() * 11) + 310;
        } else if (level == 4) {
        	this.health = 199;
        	this.shootRate = 0.75;
        	randomEnemyTime = Math.round(Math.random() * 11) + 290;
        } else if (level == 5) {
        	this.health = 249;
        	this.shootRate = 0.7;
        	randomEnemyTime = Math.round(Math.random() * 11) + 270;
        }
        this.maxHealth = this.health;
	    this.x = 71.5
	    this.y = -this.height;
	    this.enemyGroup = enemyGroup;
	    this.shootTime = 0;
	    this.laserTime = 0;
	    changeValue = [1, -1];
	    this.changeX = changeValue[Math.floor(Math.random() * 1)];
	    this.changeY = 1;
	    this.frame = 8;
	    this.type = "boss";
	    this.generateEnemyTimer = 0;
	    this.level = level;
	},
	spawnEnemy: function (evt) {
		if (this.level == 1) {
		    var enemyPropeller1 = new EnemyPropeller(this.x + 25, this.y + 10);
		    var enemyPropeller2 = new EnemyPropeller(this.x + 307, this.y + 10);
		    this.enemyGroup.addChild(enemyPropeller1);
		    this.enemyGroup.addChild(enemyPropeller2);
		} else if (this.level == 2) {
			var enemySpinner1 = new EnemySpinner(this.enemyGroup, this.x + 25, this.y + 10);
		    var enemySpinner2 = new EnemySpinner(this.enemyGroup, this.x + 307, this.y + 10);
		    this.enemyGroup.addChild(enemySpinner1);
		    this.enemyGroup.addChild(enemySpinner2);
		} else if (this.level == 3) {
			var enemySpidey1 = new EnemySpidey(this.enemyGroup, this.x + 25, this.y + 10);
		    var enemySpidey2 = new EnemySpidey(this.enemyGroup, this.x + 307, this.y + 10);
		    this.enemyGroup.addChild(enemySpidey1);
		    this.enemyGroup.addChild(enemySpidey2);
		} else if (this.level == 4) {
			var enemyTank1 = new EnemyTank(this.enemyGroup, this.x + 25, this.y + 10);
		    var enemyTank2 = new EnemyTank(this.enemyGroup, this.x + 307, this.y + 10);
		    this.enemyGroup.addChild(enemyTank1);
		    this.enemyGroup.addChild(enemyTank2);
		} else if (this.level == 5) {
			var enemySpidey1 = new EnemySpidey(this.enemyGroup, this.x + 25, this.y + 10);
		    var enemySpidey2 = new EnemySpidey(this.enemyGroup, this.x + 307, this.y + 10);
		    this.enemyGroup.addChild(enemySpidey1);
		    this.enemyGroup.addChild(enemySpidey2);
		    var enemyTank1 = new EnemyTank(this.enemyGroup, this.x + 25, this.y + 10);
		    var enemyTank2 = new EnemyTank(this.enemyGroup, this.x + 307, this.y + 10);
		    this.enemyGroup.addChild(enemyTank1);
		    this.enemyGroup.addChild(enemyTank2);
		}
	},
	shoot: function (evt) {
	    var eBullet1 = new EnemyBullet(this.x + 77, this.y + 205, "bullet");
	    var eBullet2 = new EnemyBullet(this.x + 125, this.y + 205, "bullet");
	    var eBullet3 = new EnemyBullet(this.x + 277, this.y + 205, "bullet");
	    var eBullet4 = new EnemyBullet(this.x + 325, this.y + 205, "bullet");
		this.enemyGroup.addChild(eBullet1);
		this.enemyGroup.addChild(eBullet2);
		this.enemyGroup.addChild(eBullet3);
		this.enemyGroup.addChild(eBullet4);
		var eBulletSound = new Audio('./res/space-sound_ebullet.wav');
		eBulletSound.play();
	},
	laser: function (evt) {
		var eBullet = new EnemyBullet(this.x + 205, this.y + 220, "laser");
		this.enemyGroup.addChild(eBullet);
		this.laserTime = 0;
		var eBulletSound = new Audio('./res/space-sound_ebullet2.wav');
		eBulletSound.play();
	},
	explode: function(effectsGroup, sound) {
		var dispX1 = Math.floor(Math.random() * 100) + 80;
		var dispY1 = Math.floor(Math.random() * 175) + 25;
		var dispX2 = Math.floor(Math.random() * 100) + 90;
		var dispY2 = Math.floor(Math.random() * 175) + 35;
		var dispX3 = Math.floor(Math.random() * 100) + 100;
		var dispY3 = Math.floor(Math.random() * 175) + 45;
		var dispX4 = Math.floor(Math.random() * 100) + 110;
		var dispY4 = Math.floor(Math.random() * 175) + 55;
		var dispX5 = Math.floor(Math.random() * 100) + 120;
		var dispY5 = Math.floor(Math.random() * 175) + 65;
		var dispX6 = Math.floor(Math.random() * 100) + 130;
		var dispY6 = Math.floor(Math.random() * 175) + 75;
		var dispX7 = Math.floor(Math.random() * 100) + 140;
		var dispY7 = Math.floor(Math.random() * 175) + 85;
		var dispX8 = Math.floor(Math.random() * 100) + 150;
		var dispY8 = Math.floor(Math.random() * 175) + 95;
		var explosion1 = new Explosion(this.x + dispX1, this.y + dispY1, "boss");
		var explosion2 = new Explosion(this.x + dispX2, this.y + dispY2, "boss");
		var explosion3 = new Explosion(this.x + dispX3, this.y + dispY3, "boss");
		var explosion4 = new Explosion(this.x + dispX4, this.y + dispY4, "boss");
		var explosion5 = new Explosion(this.x + dispX5, this.y + dispY5, "boss");
		var explosion6 = new Explosion(this.x + dispX6, this.y + dispY6, "boss");
		var explosion7 = new Explosion(this.x + dispX7, this.y + dispY7, "boss");
		var explosion8 = new Explosion(this.x + dispX8, this.y + dispY8, "boss");
		effectsGroup.addChild(explosion1);
		effectsGroup.addChild(explosion2);
		effectsGroup.addChild(explosion3);
		effectsGroup.addChild(explosion4);
		effectsGroup.addChild(explosion5);
		effectsGroup.addChild(explosion6);
		effectsGroup.addChild(explosion7);
		effectsGroup.addChild(explosion8);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) { 
		this.animationDuration += evt.elapsed * 0.01;  
	    if (this.animationDuration >= 0.25) {
	    	if (this.health > 75) {
		    	if (this.frame == 14) {
		    		this.frame = 8;
		    	} else {
			        this.frame += 1;
			        this.animationDuration -= 0.25;
			    }
			} else {
				if (this.frame == 15) {
		    		this.frame = 0;
		    	} else {
			        this.frame += 1;
			        this.animationDuration -= 0.25;
			    }
			}
    	}

        // speed/direction
        if (this.y < 0) {
            this.y += this.changeY;
        }
        this.x += this.changeX;
        this.y += this.changeY;
        if (this.x <= 0 || this.x >= 143) {
            this.changeX *= -1;
        }
        if (this.y == 0) {
            this.changeY = 1;
        }
        if (this.y == 80) {
        	this.changeY = -1
        }

        // shooting behaviour
	    this.shootTime += evt.elapsed * 0.001;  
	    if (this.shootTime >= this.shootRate) {
	    	this.shoot();
	    	this.shootTime = 0;
	    }

	    // condition to shoot laser
	    if (this.health < 50) {
	    	this.laserTime += evt.elapsed * 0.001;
	    	if (this.laserTime >= 0.15) {
	    		this.laser();
	    		this.laserTime = 0;
	    	}
	    }

	    // spawning enemy behaviour
	    this.generateEnemyTimer += evt.elapsed * 0.1;
	    if (this.generateEnemyTimer >= randomEnemyTime) {
	    	this.spawnEnemy();
	    	this.generateEnemyTimer = 0;
	    }

	    // health regen behaviour
	    if (this.level >= 3 && this.health < this.maxHealth) {
	    	this.health += 0.01 * this.level;
	    }

	}
});
