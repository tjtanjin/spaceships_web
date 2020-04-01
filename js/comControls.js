enchant();

// LeaderBoardSolo
var ComControls = Class.create(Scene, {
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

		const label3 = new Label('Arrow keys to move');
		label3.x = 128;
		label3.y = 150;        
		label3.color = 'orange';
		label3.font = '24px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label4 = new Label('Space to shoot');
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

		const label6 = new Label('Player 1:');
		label6.x = 128;
		label6.y = 380;        
		label6.color = 'orange';
		label6.font = '24px strong';
		label6.textAlign = 'center';
		label6._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label7 = new Label('Arrow keys to move');
		label7.x = 128;
		label7.y = 400;        
		label7.color = 'orange';
		label7.font = '24px strong';
		label7.textAlign = 'center';
		label7._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label8 = new Label('P to shoot');
		label8.x = 128;
		label8.y = 420;        
		label8.color = 'orange';
		label8.font = '24px strong';
		label8.textAlign = 'center';
		label8._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label9 = new Label('Player 2:');
		label9.x = 128;
		label9.y = 460;        
		label9.color = 'orange';
		label9.font = '24px strong';
		label9.textAlign = 'center';
		label9._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label10 = new Label('W & D keys to move');
		label10.x = 128;
		label10.y = 480;        
		label10.color = 'orange';
		label10.font = '24px strong';
		label10.textAlign = 'center';
		label10._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label11 = new Label('Space to shoot');
		label11.x = 128;
		label11.y = 500;        
		label11.color = 'orange';
		label11.font = '24px strong';
		label11.textAlign = 'center';
		label11._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label12 = new Label('Back');
		label12.x = 128;
		label12.y = 670;        
		label12.color = 'grey';
		label12.font = '32px strong';
		label12.textAlign = 'center';
		label12._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

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
		spaceShip1 = new SpaceShip(pBulletGroup, 1);
		spaceShip1.x = game.width/2 - spaceShip1.width/2 - 150;
		spaceShip1.y = 550;
		this.spaceShip1 = spaceShip1;
		spaceShip2 = new SpaceShip(pBulletGroup, 2);
		spaceShip2.x = game.width/2 - spaceShip2.width/2 + 150;
		spaceShip2.y = 550;
		this.spaceShip2 = spaceShip2;

		// add child
		this.addChild(backgroundGroup);
		this.addChild(spaceShip);
		this.addChild(spaceShip1);
		this.addChild(spaceShip2);
		this.addChild(pBulletGroup);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);
		this.addChild(label4);
		this.addChild(label5);
		this.addChild(label6);
		this.addChild(label7);
		this.addChild(label8);
		this.addChild(label9);
		this.addChild(label10);
		this.addChild(label11);
		this.addChild(label12);

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

	    if(game.input.leftalt && !game.input.rightalt){
		    this.spaceShip1.x -= moveSpeed;
		} else if(game.input.rightalt && !game.input.leftalt){
		    this.spaceShip1.x += moveSpeed;
		}
		if (game.input.shoot && this.spaceShip.health > -1) {
			this.spaceShip.shoot();
			this.spaceShip1.shoot();
		}
		// player 2 controls
		if(game.input.left && !game.input.right){
			this.spaceShip.x -= moveSpeed;
		    this.spaceShip2.x -= moveSpeed;
		} else if(game.input.right && !game.input.left){
			this.spaceShip.x += moveSpeed;
		    this.spaceShip2.x += moveSpeed;
		}
		if (game.input.shootalt && this.spaceShip2.health > -1) {
			this.spaceShip2.shoot();
		}
   	}
});

