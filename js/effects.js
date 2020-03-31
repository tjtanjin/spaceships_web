enchant();

var Explosion = Class.create(Sprite, {    
	initialize: function(x, y, type) {
	    // default setup
	    if (type == "onDeath") {
	    	Sprite.apply(this, [64, 36]);
	    	this.image = Game.instance.assets['./res/space-smallex2.png'];
	    } else if (type == "onDamage") {
	    	Sprite.apply(this,[32, 18]);
	    	this.image = Game.instance.assets['./res/space-smallex.png'];
	    } else if (type == "meteor") {
	    	Sprite.apply(this,[40, 44]);
	    	this.image = Game.instance.assets['./res/space-meteorex.png'];
	    } else if (type == "boss") {
	    	Sprite.apply(this,[61, 59]);
	    	this.image = Game.instance.assets['./res/space-bossex.png'];
	    } else {
	    	Sprite.apply(this,[30, 32]);
	    	this.image = Game.instance.assets['./res/space-playerex.png'];
	    }
	    this.rotationSpeed = Math.random() * 100 - 50;
	    this.rotation = Math.floor( Math.random() * 360);  
	    this.animationDuration = 0;
	    this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.x = x;
	    this.y = y;
	},
	update: function(evt) { 
		this.animationDuration += evt.elapsed * 0.01;
		this.rotation += this.rotationSpeed * evt.elapsed * 0.001;       
	    if (this.animationDuration >= 0.4) {
	    	if (this.frame == 5) {
	    		this.parentNode.removeChild(this);  
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.4;
		    }
    	}
	}
});

var Star = Class.create(Sprite, {   
	initialize: function(x, y) {
		// default setup
	    Sprite.apply(this,[7.5, 7.5]);
	    this.image = Game.instance.assets['./res/space-stars.png'];
	    this.addEventListener(Event.ENTER_FRAME, this.update);
	    this.x = x;
	    this.y = y;
	    this.animationDuration = 0;
	},
	update: function(evt) { 
		this.animationDuration += evt.elapsed * 0.01;     
	    if (this.animationDuration >= 0.4) {
	    	if (this.frame == 3) {
	    		this.frame = 0;  
	    	} else {
		        this.frame += 1;
		        this.animationDuration -= 0.4;
		    }
    	}
    	var game = Game.instance;
	    var ySpeed = 50;
	    
		this.y += ySpeed * evt.elapsed * 0.001;        
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);        
	    }
	}
});

var PlayerLife = Class.create(Sprite, {
	initialize: function(num) {
		// default setup
		if (num == 1) {
		    Sprite.apply(this,[77, 45]);
		    this.image = Game.instance.assets['./res/space-player1life.png'];
		} else {
			Sprite.apply(this,[77, 45]);
		    this.image = Game.instance.assets['./res/space-player2life.png'];
		}
	},
});

var HealthBar = Class.create(Sprite, {
	initialize: function(max) {
		// default setup
		this.max = max;
		Sprite.apply(this,[450, 18]);
		this.image = Game.instance.assets['./res/space-healthBar.png'];
		this.x = 120;
		this.y = 40;
		this.addEventListener(Event.ENTER_FRAME, this.trackHealth);
	},
	trackHealth: function(currentValue) {
		this.width = currentValue / this.max * 320
	}
});
