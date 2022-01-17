/*Variables*/
var gameLife;
var score;
var TotalScore=0;
var audio = {};
var numbertopOne = -50;
var numbertopTwo = -50;
var numbertopThree = -50;
var spinNumberSpeed=1;
var numbertopOneplus = -20;
var numbertopTwoplus = -20;
var numbertopThreeplus = -20;
var oneStop;
var twoStop;
var threeStop;
var firstNumberStop=2;
$(document).ready(function(){


	$("#gameBoard .joyStick .startButton").click(function(){
			gameLife = $("#gameBoard .gameLife .gameLifeCount").text();
	        audio["push"] = new Audio();
	        audio["push"].src = "./resources/latch.mp3"
            audio["push"].play();
		 $(this).animate({
		    top:"200px"
		  }, 600, function(){
		  	audio["spin"] = new Audio();
	        audio["spin"].src = "./resources/spin.mp3"
	        audio["spin"].loop;
            audio["spin"].play();
            $(this).animate({top:"0px"}, 200);
            
            if (gameLife-1 >= 0) {
            	$("#gameBoard .gameLife .gameLifeCount").text(gameLife-1);
            	defaultvariable();
            	oneStop =	Math.floor(Math.random() * 9)+1;
            	console.log(oneStop);
				spinNumber();
            }
            else{

            }
            


		  });
	});

   
});
function defaultvariable(){
	numbertopOne = -50;
	numbertopTwo = -50;
	numbertopThree = -50;
	spinNumberSpeed=1;
	numbertopOneplus = -20;
	numbertopTwoplus = -20;
	numbertopThreeplus = -20;
	$("#gameBoard  .number").css("top","-50000px");
}

function spinNumber(){
	$("#gameBoard .joyStick .startButton").css("pointer-events","none");
	numbertopOne += numbertopOneplus;
	numbertopTwo += numbertopTwoplus;
	numbertopThree += numbertopThreeplus;


	if (spinNumberSpeed === firstNumberStop ){ //numbertopone ını sıfırladın ama aşşada gine çağırdın mal!!
		console.log(oneStop);
		numbertopOneplus=0;
		score = oneStop*100;
		$("#gameBoard #gameBoxOne .number").animate({top:(oneStop*-320)-50}, 0,function(){twoStop=firstNumberStop+2;oneStop=0;});
		spinNumberSpeed+=1;
	}

	if (twoStop === spinNumberSpeed){ 
		numbertopTwoplus=0;
		var twoStopCol = twoStop;
		var rnd = Math.floor(Math.random() * 10);
		score+= rnd*10;
		$("#gameBoard #gameBoxTwo .number").animate({top:(rnd*-320)-50}, 0,function(){threeStop = twoStopCol+1;twoStop=0;});
	}

	if (threeStop === spinNumberSpeed){
		numbertopThreeplus=0;
		threeStop = Math.floor(Math.random() * 10);
		score += threeStop*1;
		$("#gameBoard #gameBoxThree .number").animate({top:(threeStop*-320)-50}, 0,function(){threeStop=0;});
	}
	if(numbertopOneplus	!= 0){$("#gameBoard #gameBoxOne .number").css("top",numbertopOne);}
	if(numbertopTwoplus	!= 0){$("#gameBoard #gameBoxTwo .number").css("top",numbertopTwo);}
	if(numbertopThreeplus != 0) {$("#gameBoard #gameBoxThree .number").css("top",numbertopThree); }
	else{ 
		var scoreBoardLocation=3-gameLife;  
		$(".gameScore:eq( "+scoreBoardLocation+" ) .gameText").text(score); 
		$(".gameScore:eq( "+scoreBoardLocation+" )").animate({bottom:-70},300);
		TotalScore+=score;
		$("#gameBoard .joyStick .startButton").css("pointer-events","unset");
		if (scoreBoardLocation==2){
			console.log(TotalScore);
			$(".gameScore:eq(3) .gameText").text(Math.floor(TotalScore/3));
			$(".gameScore:eq(3)").animate({bottom:-70},300);
			$("#gameBoard .joyStick .startButton").css("pointer-events","none");
		}
		gameLife-=1; 
		return;
	}

	if(numbertopOne <= -3150){numbertopOne=0; }
	if(numbertopTwo <= -3150){numbertopTwo=0; }
	if(numbertopThree <= -3150){numbertopThree=0; spinNumberSpeed+=1;}
	setTimeout(spinNumber,spinNumberSpeed);
}