enchant();

// LeaderBoardSolo
var LeaderBoardSolo = Class.create(Scene, {
	initialize: function() {
        Scene.apply(this);

        var game = Game.instance;
        game.keybind(32, 'shoot');
        this.backgroundColor = 'black';

		const label1 = new Label('Top Solo Players');
		label1.x = 128;
		label1.y = 120;        
		label1.color = 'lightgreen';
		label1.font = '42px strong';
		label1.textAlign = 'center';
		label1._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label2 = new Label('Top Duo Players');
		label2.x = 128;
		label2.y = 620;        
		label2.color = 'lightgreen';
		label2.font = '32px strong';
		label2.textAlign = 'center';
		label2._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		const label3 = new Label('Back');
		label3.x = 128;
		label3.y = 670;        
		label3.color = 'grey';
		label3.font = '32px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		this.loadLeaderBoard(SOLOURL, this.generateData, this);

		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		this.addChild(backgroundGroup);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);


	    this.generateStarTimer = 0;

		for (var i = 0; i < 100; i++) {
			var star = new Star(Math.floor(Math.random() * 560), Math.floor(Math.random() * 780));
			this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
		}

		this.addEventListener(Event.TOUCH_START, this.click);
		this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    loadLeaderBoard: function(url, callback, parent) {
    	var xhr = new XMLHttpRequest();

	  	xhr.onreadystatechange = function() {
	    	if (xhr.readyState === 4) {
	      		callback(JSON.parse(xhr.responseText), parent);
	    	}
	  	}
	  	xhr.open('GET', url, true);
	  	xhr.send('');
	},
	generateData: function(data, parent) {
		var text, fontColour;
		for (var i = 0; i < 10; i++) {
			if (i == 0) {
				fontColour = 'red';
			} else if (i == 1) {
				fontColour = 'orange';
			} else if (i == 2) {
				fontColour = 'yellow';
			} else {
				fontColour = 'white';
			}
			if (data[i] != undefined) {
				text = (i + 1) + ".   " + data[i]["username"] + " - " + data[i]["score"]
			} else {
				break;
			}
			var label = new Label(text);
			label.x = -50 + 5 * text.length;
			label.y = 200 + i * 40;
			label.color = fontColour;
			label.font = '24px strong';
			label.textAlign = 'center';
			label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
			parent.addChild(label);
		}
	},
    click: function(evt) {
    	if (evt.x >= 174 && evt.x <= 386 && evt.y >= 620 && evt.y <= 650) {
    		var game = Game.instance;
    		var leaderBoardDuo = new LeaderBoardDuo();
    		game.replaceScene(leaderBoardDuo);
    	} else if (evt.x >= 224 && evt.x <= 336 && evt.y >= 670 && evt.y <= 700) {
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

// LeaderBoardDuo
var LeaderBoardDuo = Class.create(Scene, {
	initialize: function() {
        Scene.apply(this);

        var game = Game.instance;
        game.keybind(32, 'shoot');
        this.backgroundColor = 'black';

        // Label
		const label1 = new Label('Top Duo Players');
		label1.x = 128;
		label1.y = 120;        
		label1.color = 'lightgreen';
		label1.font = '42px strong';
		label1.textAlign = 'center';
		label1._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

		const label2 = new Label('Top Solo Players');
		label2.x = 128;
		label2.y = 620;        
		label2.color = 'lightgreen';
		label2.font = '32px strong';
		label2.textAlign = 'center';
		label2._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		const label3 = new Label('Back');
		label3.x = 128;
		label3.y = 670;        
		label3.color = 'grey';
		label3.font = '32px strong';
		label3.textAlign = 'center';
		label3._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"; 

		this.loadLeaderBoard(DUOURL, this.generateData, this);

		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		this.addChild(backgroundGroup);
		this.addChild(label1);
		this.addChild(label2);
		this.addChild(label3);


	    this.generateStarTimer = 0;

		for (var i = 0; i < 100; i++) {
			var star = new Star(Math.floor(Math.random() * 560), Math.floor(Math.random() * 780));
			this.backgroundGroup.addChild(star);
	        this.generateStarTimer = 0;
		}

		this.addEventListener(Event.TOUCH_START, this.click);
		this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    loadLeaderBoard: function(url, callback, parent) {
    	var xhr = new XMLHttpRequest();

	  	xhr.onreadystatechange = function() {
	    	if (xhr.readyState === 4) {
	      		callback(JSON.parse(xhr.responseText), parent);
	    	}
	  	}
	  	xhr.open('GET', url, true);
	  	xhr.send('');
	},
	generateData: function(data, parent) {
		var text, fontColour;
		for (var i = 0; i < 10; i++) {
			if (i == 0) {
				fontColour = 'red';
			} else if (i == 1) {
				fontColour = 'orange';
			} else if (i == 2) {
				fontColour = 'yellow';
			} else {
				fontColour = 'white';
			}
			if (data[i] != undefined) {
				text = (i + 1) + ".   " + data[i]["username"] + " - " + data[i]["score"]
			} else {
				break;
			}
			var label = new Label(text);
			label.x = -50 + 5 * text.length;
			label.y = 200 + i * 40;
			label.color = fontColour;
			label.font = '24px strong';
			label.textAlign = 'center';
			label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
			parent.addChild(label);
		}
	},
    click: function(evt) {
    	if (evt.x >= 174 && evt.x <= 386 && evt.y >= 620 && evt.y <= 650) {
    		var game = Game.instance;
    		var leaderBoardSolo = new LeaderBoardSolo();
    		game.replaceScene(leaderBoardSolo);
    	} else if (evt.x >= 224 && evt.x <= 336 && evt.y >= 670 && evt.y <= 700) {
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

