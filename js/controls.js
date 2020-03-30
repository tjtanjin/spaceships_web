enchant();

// LeaderBoardSolo
var Controls = Class.create(Scene, {
	initialize: function() {
        Scene.apply(this);

        var game = Game.instance;
        game.keybind(32, 'shoot');
        this.backgroundColor = 'black';

        // labels
		const label1 = new Label('Single Player Controls');
		label1.x = 128;
		label1.y = 80;        
		label1.color = 'lightgreen';
		label1.font = '30px strong';
		label1.textAlign = 'center';
		label1._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label2 = new Label('Player 1: Arrow keys to move,<br> Space to shoot.');
		label2.x = 128;
		label2.y = 150;        
		label2.color = 'orange';
		label2.font = '24px strong';
		label2.textAlign = 'center';
		label2._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label3 = new Label('Two Player Controls');
		label3.x = 128;
		label3.y = 400;        
		label3.color = 'lightgreen';
		label3.font = '30px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label4 = new Label('Player 1: Arrow keys to move, P to shoot.');
		label4.x = 128;
		label4.y = 470;        
		label4.color = 'orange';
		label4.font = '24px strong';
		label4.textAlign = 'center';
		label4._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label5 = new Label('Player 2: W & D keys to move, Space to shoot.');
		label5.x = 128;
		label5.y = 520;        
		label5.color = 'orange';
		label5.font = '24px strong';
		label5.textAlign = 'center';
		label5._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label6 = new Label('Back');
		label6.x = 128;
		label6.y = 670;        
		label6.color = 'grey';
		label6.font = '32px strong';
		label6.textAlign = 'center';
		label6._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		// groups
		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		// add child
		this.addChild(backgroundGroup);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);
		this.addChild(label4);
		this.addChild(label5);
		this.addChild(label6);

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

