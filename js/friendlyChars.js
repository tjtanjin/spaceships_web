enchant();

var SpaceShip = Class.create(Sprite, {    
	initialize: function(pBulletGroup) {
		// default setup
	    Sprite.apply(this,[115, 67]);
	    this.image = Game.instance.assets['./res/space-ship_1.png'];
	    this.animationDuration = 0;
	    this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.health = 2;
	    this.pBulletGroup = pBulletGroup;
	    this.shootTime = 0;
	    this.powerType = 0;
	    this.powerUp1Time = 0;
		this.powerUp2Time = 0;
        this.powerUp4Time = 0;
        this.type = "player";
	},
	explode: function(effectsGroup) {
		var dispX = Math.floor(Math.random() * 5) + 40;
		var dispY = Math.floor(Math.random() * 15) + 5;
		var explosion = new Explosion(this.x + dispX, this.y + dispY, "player");
		effectsGroup.addChild(explosion);
		sound = new Audio('./res/space-sound_playerex.wav');
		sound.play();
	},
	powerUp: function(type) {
		var powerUpSound;
		this.powerUp1Time = 0;
		this.powerUp2Time = 0;
        this.powerUp4Time = 0;
        if (type == 3) {
        	powerUpSound = new Audio('./res/space-sound_heal.wav');
        	this.health += 1;
        	if (this.health > 2) {
        		this.health = 2;
        	}
        } else {
        	powerUpSound = new Audio('./res/space-sound_powerup.wav');
        	this.powerType = type;
       	}
		powerUpSound.play();
	},
	shoot: function(evt) {
		if (this.powerType == 0) {
			if (this.shootTime >= 0.18) {     
			    var pBullet1 = new PlayerBullet(this.x + 30, this.y, "bullet");
			    var pBullet2 = new PlayerBullet(this.x + 78, this.y, "bullet");
				this.pBulletGroup.addChild(pBullet1);
				this.pBulletGroup.addChild(pBullet2);
				this.shootTime = 0;
				var pBulletSound = new Audio('./res/space-sound_pbullet.wav');
				pBulletSound.play();
			}
		} else if (this.powerType == 1) {
			if (this.shootTime >= 0.18) {     
			    var pBullet1 = new PlayerBullet(this.x + 30, this.y, "bullet");
			    var pBullet2 = new PlayerBullet(this.x + 78, this.y, "bullet");
			    var pBullet3 = new PlayerBullet(this.x + 54, this.y - 15, "bullet");
				this.pBulletGroup.addChild(pBullet1);
				this.pBulletGroup.addChild(pBullet2);
				this.pBulletGroup.addChild(pBullet3);
				this.shootTime = 0;
				var pBulletSound = new Audio('./res/space-sound_pbullet.wav');
				pBulletSound.play();
			}
		} else if (this.powerType == 2) {
			if (this.shootTime >= 0.14) {
				var pBullet1 = new PlayerBullet(this.x + 31, this.y - 700, "laser");
			    var pBullet2 = new PlayerBullet(this.x + 79, this.y - 700, "laser");
				this.pBulletGroup.addChild(pBullet1);
				this.pBulletGroup.addChild(pBullet2);
				this.shootTime = 0;
				var pBulletSound = new Audio('./res/space-sound_pbullet2.wav');
				pBulletSound.play();
			}
		}
	},
	update: function(evt) { 
		this.shootTime += evt.elapsed * 0.001;       
	    this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.25) {
	    	if (this.frame == 5) {
	    		this.frame = 0;
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.25;
		    }
    	}
    	if (this.x > 560 - 116) {
            this.x = 560 - 116
    	}
        if (this.x < 0) {
            this.x = 0
        }

        if (this.powerType == 1) {
        	this.powerUp1Time += evt.elapsed * 0.01; 
            if (this.powerUp1Time > 80) {
                this.powerType = 0;
                this.powerUp1Time = 0;
            }
        } else if (this.powerType == 2) {
        	this.powerUp2Time += evt.elapsed * 0.01;
        	if (this.powerUp2Time > 44) {
        		this.powerType = 0;
        		this.powerUp2Time = 0;
        	}
        }
	}
});

var PlayerBullet = Class.create(Sprite, {  
	initialize: function(x, y, type) {
		// default setup
	    if (type == "bullet") {
		    Sprite.apply(this,[6, 29]);
		    this.image = Game.instance.assets['./res/space-pbullet.png'];
		} else {
			Sprite.apply(this,[4, 726]);
		    this.image = Game.instance.assets['./res/space-pbullet2.png'];
		}
	    this.animationDuration = 0;
	    this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.x = x;
	    this.y = y;
	    this.type = type;
	},
	explode: function(effectsGroup, sound) {
		var explosion = new Explosion(this.x, this.y - 25, "onDamage");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) {
		this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.15) {
	    	if (this.frame == 5) {
	    		if (this.type == "bullet") {
	    			this.frame = 0;
	    		} else {
	    			this.parentNode.removeChild(this);
	    		}
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.15;
		    }
    	}
		var game = Game.instance;
	    
	    if (this.type == "bullet") {
			this.y -= 8          
		    if (this.y < 0) {
		        this.parentNode.removeChild(this);        
		    }
		}
	}
});

var PowerUp = Class.create(Sprite, {    
	initialize: function(powerUpGroup, powerValue) {
	    // default setup
	    if (powerValue == 1) {
		    Sprite.apply(this,[22, 27]);
		    this.image = Game.instance.assets['./res/space-powerup1.png'];
		} else if (powerValue == 2) {
			Sprite.apply(this,[22, 27]);
		    this.image = Game.instance.assets['./res/space-powerup2.png'];
		} else if (powerValue == 3) {
			Sprite.apply(this,[22, 27]);
		    this.image = Game.instance.assets['./res/space-powerup3.png'];
		}
	    this.animationDuration = 0;
	    this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.x = Math.floor(Math.random() * 550) + 10;
	    this.y = -this.height; 
	    this.health = 0;
	    this.powerValue = powerValue;
	    this.type = "powerUp"
	},
	explode: function(effectsGroup, sound) {
		var explosion = new Explosion(this.x, this.y + 25, "onDamage");
		effectsGroup.addChild(explosion);
		sound.currentTime = 0;
		sound.play();
	},
	update: function(evt) {
		this.animationDuration += evt.elapsed * 0.01;       
	    if (this.animationDuration >= 0.25) {
	    	if (this.frame == 3) {
	    		this.frame = 0;
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.25;
		    }
    	}
		var game = Game.instance;
	    
		this.y += 6.5        
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }
	}
});
