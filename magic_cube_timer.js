function MagicCubeTimer(){
	var timer = {};
	var min=0, sec=0, ms=0;
	var times = 0;
	var intervalMin , intervalSec , intervalMs;
	var resultsArr = [];

	timer.init = function(){
		this.bindEvent();
	}

	timer.times = function(){
		if (times % 3 == 0) {
			timer.start();
		}else if(times % 3 == 1){
			timer.stop();
		}else{
			timer.zero();
		}
		times ++;
	}

	timer.bindEvent = function(){	
		document.onkeypress = function(e){
			if (e.keyCode == 32){
				timer.times()
			}
		}
		document.getElementById("main").onclick = function(){
			timer.times();
		}
	}

	timer.start = function(){
		timer.render();
	}
	timer.stop = function(){
		clearInterval(intervalMin);
		clearInterval(intervalSec);
		clearInterval(intervalMs);

		timer.result();

		min = 0; 
		sec = 0; 
		ms = 0;	
		if(times == 28){
			times = -1;
		}
	}
	timer.zero = function(){
		document.getElementById('min').innerHTML = "00";
		document.getElementById('sec').innerHTML = "00";
		document.getElementById('ms').innerHTML = "00";
	}

	timer.render = function(){
		timer.zero();
		timer.renderMs();
		timer.renderSec();
		timer.renderMin();
	}

	timer.renderMs = function(){
		ms = 0;
		intervalMs = setInterval(function(){
			ms ++;
			if (ms < 10) {
				document.getElementById('ms').innerHTML = '0' + ms;
			}else{
				document.getElementById('ms').innerHTML = ms;
			}
			if(ms == 99){
				ms = 0;
			}
		},10);
	}
	timer.renderSec = function(){
		sec = 0;
		intervalSec = setInterval(function(){
			sec ++;
			if (sec < 10) {
				document.getElementById('sec').innerHTML = '0' + sec;
			}else{
				document.getElementById('sec').innerHTML = sec;
			}
			if(sec == 59){
				sec = 0;
			}
		},1000);
	}
	timer.renderMin = function(){
		min = 0;
		intervalMin = setInterval(function(){
			min ++;
			if (min < 10) {
				document.getElementById('min').innerHTML = '0' + min;
			}else{
				document.getElementById('min').innerHTML = min;
			}
			if(min == 59){
				min = 0;
			}
		},1000 * 60);
	}

	timer.result = function(){
		var results = document.querySelectorAll('#history tbody tr td');
		results[(times-1)/3].innerHTML = 
			(min == 0? '' : min + ':') 
			+ (sec < 10 ? '0' + sec : sec) 
			+ '.' 
			+ (ms < 10 ? '0' + ms : ms)  ;
		
		var item = (min*60*100 + sec*100 + ms);
		resultsArr.push(item);
		var fast = Math.min.apply(null,resultsArr) / 100;
		var slowest = Math.max.apply(null,resultsArr) / 100;
		var all = 0;
		for(var i=0;i < resultsArr.length;i++){
			all += parseFloat(resultsArr[i]);
		}
		var average = (all / resultsArr.length / 100).toFixed(2);

		document.getElementById('fast').innerHTML = fast > 60 ? ((Math.floor(fast/60)) + ':' + (fast-(60 * (Math.floor(fast/60)))).toFixed(2)) : fast;
		document.getElementById('slowest').innerHTML = slowest > 60 ? ((Math.floor(slowest/60)) + ':' + (slowest-(60 * (Math.floor(slowest/60)))).toFixed(2)) : slowest;
		document.getElementById('average').innerHTML = average > 60 ? ((Math.floor(average/60)) + ':' + (average-(60 * (Math.floor(average/60)))).toFixed(2)) : average;
	}


	return timer;
}


var magic_cube_timer = MagicCubeTimer();

magic_cube_timer.init();