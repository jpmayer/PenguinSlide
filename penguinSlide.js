// A simple game in which the player chooses one of three options rock, paper, or scissors
dojo.require("dojox.timing._base");
var score2 = 0;
var gameover = false;
var talked = false;
function updateScore(){
		dojo.byId('score').innerHTML = "Score = " + score2;
	};

dojo.declare('penguinSlide', [ ], {
    score: 0,           // current score
	mins: 1,
	secs: 00,
	
	
	TimerRunning: false,

    // the constructor gets called when we create the object
    constructor: function(canvas_id) {

        dojo.connect(window, 'keydown', this, 'keyDown');
		this.t = new dojox.timing.Timer();
		this.mins = 1;
		this.secs = 00;
		this.penguin = dojo.create('img', { src: 'penguino.png' });
		this.pleft = 400;
		this.ptop =  150;
		this.up = false;
		dojo.style('penguin', 'left', this.pleft + 'px');
		
		this.fishP = 0;
		this.fishType = true;
		
		
		this.p = document.getElementById('penguin')
		this.dead = dojo.create('img', { src: 'pdead.png' });
		this.fallRight = dojo.create('img', { src: 'pfalling2.png' });
		this.fallLeft = dojo.create('img', { src: 'pfalling.png' });
		this.iceberg = dojo.create('img', { src: 'icefat.png' });
		this.iceLeanLeft = dojo.create('img', { src: 'icefat2.png' });
		this.iceLeanRight = dojo.create('img', { src: 'icefat3.png' });
		this.fish = dojo.create('img', { src: 'fishie2.png' });
		this.puffFish = dojo.create('img', { src: 'puffy.png' });
		this.pop = dojo.create('img', { src: 'pop.png' });
        // initialize audio
        uow.getAudio({ defaultCaching: true }).then(dojo.hitch(this, function(a) {
            this.audio = a;  // save the audio object for later use
            this.newGame();
        }));
        
    },
	
	//Start a new game
	newGame: function() {
	this.updateTimer();
	this.audio.say({
		text: "Welcome to Penguin Slide"
		});
	
	},
	
	changeFishLocation: function() {
		this.audio.play({url: 'pop2/a0'})
		var pp = dojo.style(dojo.byId('fish'), 'left');
		var ppt = dojo.style(dojo.byId('fish'), 'top');
		dojo.attr(dojo.byId('pop'), 'hidden', true);
		dojo.style(dojo.byId('pop'), 'left', pp + 'px');
		dojo.style(dojo.byId('pop'), 'top', ppt +'px');
		dojo.attr(dojo.byId('pop'), 'hidden', false);
		var i = Math.floor(Math.random()*6);
		if(i%2==0){
			dojo.attr(dojo.byId('fish'), {src: 'puffy.png'});
			this.fishType = true;
		}
		else{
			dojo.attr(dojo.byId('fish'), {src: 'fishie2.png'});
			this.fishType = false;
		}
		if(i==this.fishP){
			if(i<5){
				this.fishP = i+1;
			}
			else{
				this.fishP = i-1;
			}
		}
		else{
			this.fishP=i;
		}
		

		if(this.fishP==0){
			dojo.style(dojo.byId('fish'), 'left' , 200);
			dojo.style(dojo.byId('fish'), 'top' , 250);
		}
		else if(this.fishP==1){
			dojo.style(dojo.byId('fish'), 'left' , 400);
			dojo.style(dojo.byId('fish'), 'top' , 250);
		}
		else if(this.fishP==2){
			dojo.style(dojo.byId('fish'), 'left' , 600);
			dojo.style(dojo.byId('fish'), 'top' , 250);
		}
		else if(this.fishP==3){
			dojo.style(dojo.byId('fish'), 'left' , 200);
			dojo.style(dojo.byId('fish'), 'top' , 50);
		}
		else if(this.fishP==4){
			dojo.style(dojo.byId('fish'), 'left' , 400);
			dojo.style(dojo.byId('fish'), 'top' , 50);
		}
		else if(this.fishP==5){
			dojo.style(dojo.byId('fish'), 'left' , 600);
			dojo.style(dojo.byId('fish'), 'top' , 50);
		}
	},
	
	play: function() {
        var dis = -this.getDistance();
		
        var self = this;
        this.audio.play({url: 'drop/a' + dis}).callAfter(function() {
            // insert a random delay between chirps
			console.log(dis);
            self.timer = setTimeout(function() {
                if(self.chirping){
                    self.play();
                }
            }, 5000);
        });
    },
	
	getDistance: function() {
		if(this.fishP==0){
			return this.round5(((this.pleft-200)/700)*270);
		}
		else if(this.fishP==1){
			return this.round5(((this.pleft-400)/700)*270);
		}
		else if(this.fishP==2){
			return this.round5(((this.pleft-600)/700)*270);
		}
		else if(this.fishP==3){
			return this.round5(((this.pleft-200)/700)*270);
		}
		else if(this.fishP==4){
			return this.round5(((this.pleft-400)/700)*270);
		}
		else if(this.fishP==5){
			return this.round5(((this.pleft-600)/700)*270);
		}
	},
	
	round5: function(x){ //code from http://www.hashbangcode.com/blog/javascript-round-nearest-5-368.html
		return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
	},
//	clear: function() {
//	},
	
	
	
	
	
	updateTimer: function() {
        this.t.setInterval(1000);
		console.log('mins = '+this.mins);
		console.log('secs = '+this.secs);
		var min = this.mins;
		var sec = this.secs;
		var s = 0;
		var self = this;
		
        this.t.onTick = function() {
			if(min==0 && sec==0){
				gameover = true;
			}
			else{
				gameover = false;
				if(sec==0)
				{
					min--;
					sec=60;
				}
				sec--;
				if(sec<10)
					sec=0+""+sec;
				score2 += 27;
				console.log(score2);
				updateScore();
				self.play();
				dojo.byId('timer').innerHTML = "Time Remaining "+ min + ":" + sec;
			}
			
        }
		
        this.t.start();
     },
	  	
	keyDown: function(e) {
		console.log('keyDown', e);
        if(gameover){
			if(talked){
				if(e.keyCode == dojo.keys.DOWN_ARROW){
					gameover = false;
					talked = false;
					score2 = 0;
					this.mins = 1;
					this.sec = 00;
					dojo.attr(dojo.byId('penguin'), {src: 'penguino.png'});
					this.pleft = 400;
					this.ptop =  150;
					this.up = false;
					this.t.stop();
					this.updateTimer();
					dojo.style('penguin', 'left', this.pleft + 'px');
				}
			}
			
			else{
				talked = true;
				this.audio.say({
					text: "Game Over. Congratulations! You scored " + score2 + "points. Press Down to restart game."
				});
			}
		}
		else{
			talked = false;
			if(e.keyCode == dojo.keys.RIGHT_ARROW) {
				this.pleft += 20;
				dojo.style(dojo.byId('penguin'), 'left' , this.pleft + 'px');
				if(this.pleft>=760){
					this.pleft=760;
					dojo.attr(dojo.byId('penguin'), {src: 'pfalling2.png'});
				}
				else{
					if(this.up){
						this.ptop = 150;
						dojo.attr(dojo.byId('penguin'), {src: 'penguino.png'});
						dojo.style(dojo.byId('penguin'), 'top', this.ptop + 'px');
						this.up=false;
						
					}
					else{
						dojo.attr(dojo.byId('penguin'), {src: 'penguino.png'});
					}
				}
			} else if (e.keyCode == dojo.keys.LEFT_ARROW) {
				this.pleft -= 20;
				if(this.pleft<=60){
					this.pleft=60;
					dojo.attr(dojo.byId('penguin'), {src: 'pfalling.png'});
				}
				else{
					if(this.up){
						this.ptop = 150;
						dojo.attr(dojo.byId('penguin'), {src: 'penguino.png'});
						dojo.style(dojo.byId('penguin'), 'top', this.ptop + 'px');
						this.up=false;
					}
					else{
						dojo.attr(dojo.byId('penguin'), {src: 'penguino.png'});
					}
				}
				console.log('left', this.pleft);
				dojo.style(dojo.byId('penguin'), 'left' , this.pleft + 'px');
			} else if (e.keyCode == dojo.keys.DOWN_ARROW) {
				this.ptop = 150;
				this.up=false;
				dojo.attr(dojo.byId('penguin'), {src: 'penguino.png'});
				dojo.style(dojo.byId('penguin'), 'top' , this.ptop + 'px');
			} else if (e.keyCode == dojo.keys.UP_ARROW){
				this.ptop = 70;
				this.up = true;
				dojo.attr(dojo.byId('penguin'), {src: 'pjump.png'});
				dojo.style(dojo.byId('penguin'), 'top' , this.ptop + 'px');
			}
			
			if(this.fishP==0){
				if(this.fishType){
					if(this.pleft>61 && this.pleft<283 && this.up==false){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
				else{
					if(this.pleft>61 && this.pleft<316 && this.up==false){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
			}
			else if(this.fishP==1){
				if(this.fishType){
					if(this.pleft>261 && this.pleft<483 && this.up==false){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
				else{
					if(this.pleft>261 && this.pleft<516 && this.up==false){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
			}
			else if(this.fishP==2){
				if(this.fishType){
					if(this.pleft>461 && this.pleft<683 && this.up==false){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
				else{
					if(this.pleft>461 && this.pleft<716 && this.up==false){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
			}
			else if(this.fishP==3){
				if(this.fishType){
					if(this.pleft>61 && this.pleft<283 && this.up==true){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
				else{
					if(this.pleft>61 && this.pleft<316 && this.up==true){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
			}
			else if(this.fishP==4){
				if(this.fishType){
					if(this.pleft>261 && this.pleft<483 && this.up==true){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
				else{
					if(this.pleft>261 && this.pleft<516 && this.up==true){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
			}
			else if(this.fishP==5){
				if(this.fishType){
					if(this.pleft>461 && this.pleft<683 && this.up==true){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
				else{
					if(this.pleft>461 && this.pleft<716 && this.up==true){
						console.log('collide');
						this.changeFishLocation();
						score2 += 1000;
					}
				}
			}
			updateScore();
		}
	}
});



// kick off the game by creating the object
function main() {
    var s = new penguinSlide('c');
}

// don't start until everything is loaded
dojo.ready(main);

