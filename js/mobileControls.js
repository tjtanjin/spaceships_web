enchant();

// LeaderBoardSolo
var MobileControls = Class.create(Scene, {
	initialize: function() {
        Scene.apply(this);

        var game = Game.instance;
        game.keybind(27, 'quit');
        game.keybind(32, 'shoot');
        game.keybind(80, 'shootalt');
        game.keybind(65, 'leftalt');
        game.keybind(68, 'rightalt');
        this.backgroundColor = 'black';

        // labels
		const label1 = new Label('Single Player Controls');
		label1.x = 128;
		label1.y = 80;        
		label1.color = 'lightgreen';
		label1.font = '30px strong';
		label1.textAlign = 'center';
		label1._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label2 = new Label('Player 1:');
		label2.x = 128;
		label2.y = 130;        
		label2.color = 'orange';
		label2.font = '24px strong';
		label2.textAlign = 'center';
		label2._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label3 = new Label('Bottom key buttons to move');
		label3.x = 128;
		label3.y = 150;        
		label3.color = 'orange';
		label3.font = '24px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label4 = new Label('Automatic shooting');
		label4.x = 128;
		label4.y = 170;        
		label4.color = 'orange';
		label4.font = '24px strong';
		label4.textAlign = 'center';
		label4._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label5 = new Label('Two Player Controls');
		label5.x = 128;
		label5.y = 330;        
		label5.color = 'lightgreen';
		label5.font = '30px strong';
		label5.textAlign = 'center';
		label5._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label6 = new Label('Not supported on');
		label6.x = 128;
		label6.y = 380;        
		label6.color = 'red';
		label6.font = '24px strong';
		label6.textAlign = 'center';
		label6._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label7 = new Label('mobile phone');
		label7.x = 128;
		label7.y = 400;        
		label7.color = 'red';
		label7.font = '24px strong';
		label7.textAlign = 'center';
		label7._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label8 = new Label('Back');
		label8.x = 128;
		label8.y = 670;        
		label8.color = 'grey';
		label8.font = '32px strong';
		label8.textAlign = 'center';
		label8._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		// groups
		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		pBulletGroup = new Group();
		this.pBulletGroup = pBulletGroup;

		// SpaceShip
		spaceShip = new SpaceShip(pBulletGroup, 1);
		spaceShip.x = game.width/2 - spaceShip.width/2;
		spaceShip.y = 220;
		this.spaceShip = spaceShip;

		this.addChild(backgroundGroup);

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

		// add child
		this.addChild(spaceShip);
		this.addChild(pBulletGroup);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);
		this.addChild(label4);
		this.addChild(label5);
		this.addChild(label6);
		this.addChild(label7);
		this.addChild(label8);

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
    touchMoveStart: function(evt) {
    	if (evt.x >= 480 && evt.x <= 537 && evt.y >= 708 && evt.y <= 765) {
    		this.toRight = true;
    		this.move = true;
    	} else if (evt.x >= 23 && evt.x <= 80 && evt.y >= 708 && evt.y <= 765) {
    		this.toLeft = true;
    		this.move = true;
    	}
    },
    touchMoveStop: function(evt) {
    	this.move = false;
    	this.toRight = false;
    	this.toLeft = false;
    },
    click: function(evt) {
    	if (evt.x >= 224 && evt.x <= 336 && evt.y >= 670 && evt.y <= 700) {
    		var game = Game.instance;
    		game.popScene();
    	}
   	},
   	update: function(evt) {
   		var moveSpeed = 7;
   		var game = Game.instance;
   		// set spawn rates
		randomStarTime = Math.round(Math.random() * 6) + 5;
   		// generate star
	    this.generateStarTimer += evt.elapsed * 0.1;
	    if (this.generateStarTimer >= randomStarTime) {
	        var star = new Star(Math.floor(Math.random() * 560), -20);
	        this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
	    }

		if (this.move) {
	    	if (this.toRight) {
	    		this.spaceShip.x += moveSpeed;
	    	} else {
	    		this.spaceShip.x -= moveSpeed;
	    	}
        }
   	}
});

