//created by yinshawn rao
	var fuckWords=[
		"求点草",
		"点不着我",
		"弱爆了",
		"手速不行",
		"累死你",
		"然并卵",
		"我在这",
		"来咬我啊",
		"我走了",
		"你不行啊"
	];

	var getRandom=function(min,max){
		return parseInt(Math.random()*(max-min)+min);
	}

	var ww=window.innerWidth;
	var wh=window.innerHeight;

	var bw=$(".start-button").width();
	var bh=$(".start-button").height();

	var minX=-((ww-bw)/2);
	var maxX=(ww-bw)/2-bw;

	var minY=-((wh-bh)/2);
	var maxY=(wh-bh)/2-bh;

	var start,end;
	var score=[];

	$(".start-button").on("mouseenter",function(){
		start=new Date().getTime();
		var newWord=fuckWords[getRandom(0,fuckWords.length)];
		var newX=getRandom(minX,maxX+1)+"px";
		var newY=getRandom(minY,maxY+1)+"px";
		var scale=getRandom(75,251);
		var opa=getRandom(2,11)/10;
		var time=getRandom(1,21)/10;
		$(this).text(newWord).css({
			"transform":"translate3d("+newX+","+newY+",0)",
			"-webkit-transform":"translate3d("+newX+","+newY+",0)",
			"transition":"all "+time+"s ease-in-out 0s",
			"-webkit-transition":"all "+time+"s ease-in-out 0s",
			"opacity":opa
		});
		$("html").css("font-size",scale+"%");
	}).on("mouseleave",function(){
		end=new Date().getTime();
		score.push((end-start)/1000);
		if(score.length==10){
			$("html").css("font-size","125%");
			var avg=(eval(score.join("+"))/score.length).toFixed(3);
			$(".score-avg span").html(avg);
			for(var i in score){
				$(".score-item").eq(i).html(score[i].toFixed(3));
			}
			var check;
			if(avg>=0&&avg<0.3){
				check="弱爆了~";
			}
			else if(avg>=0.3&&avg<0.6){
				check="勉强及格。";
			}
			else if(avg>=0.6&&avg<0.9){
				check="你已经超神了！";
			}
			else{
				check="你确定没开挂？";
			}
			$(".score-check").html(check);
			$(".shadow").show();
		}
	});

	$(".restart-button").click(function(){
		score.length=0;
		$(".start-button").css({
			"transition":"all .5s ease-in-out 0s",
			"-webkit-transition":"all .5s ease-in-out 0s",
		});
		$(".score-ban").addClass("denova").on("webkitAnimationEnd",function(){
			$(".shadow").hide();
			$(this).removeClass("denova").off("webkitAnimationEnd");
		}).on("animationend",function(){
			$(".shadow").hide();
			$(this).removeClass("denova").off("animationend");
		});
	});
