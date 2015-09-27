$(document).ready(function(){
	var url = new Array(); 
	var metadata =  new Array();
	for (var i = 0; i < master.length; i++) {
		var dset=master[i];
		url.push(dset["url"]);
		metadata.push(dset["name"]);
	}
	
	var sindex= Math.floor(Math.random() * url.length);
	
	var container = $('.container');
    var cover = $('.cover');
    var p = $('#p');
    var m = $('#m');
    var prev = $('#prev');
    var next = $('#next');
    var shuffle = $('#shuffle');
    var song = new Audio(url[sindex]);
    resetSong(sindex);
    var usong = $('.song');
    var duration = song.duration;
    
    var played= [sindex];
	
	var ptoggle=false;
	p.on('click', function(e) {
        e.preventDefault();
        if(!ptoggle){
        	song.play();
        	$("#pimg").attr("class", "clip pos-2");
        	ptoggle=true;
        }
        else {
        	song.pause();
        	$("#pimg").attr("class", "clip pos-1");
        	ptoggle=false;
        }
    });
	
	var mtoggle=false;
	m.on('click', function(e) {
        e.preventDefault();
        if(!mtoggle){
        	song.volume = 0;
        	$("#mimg").attr("class", "clip pos-4");
        	mtoggle=true;
        }
        else {
        	song.volume = 1;
        	$("#mimg").attr("class", "clip pos-3");
        	mtoggle=false;
        }
    });
    
    prev.on('click', function(e) {
    	e.preventDefault();
    	song.pause();
    	if(sindex<=0){
	        sindex = 0;
	        played = [sindex];
	    }
	    else {
	    	sindex-=1;
	    }
	    if(!(($.inArray(sindex, played)) > 0)){
	         played.push(sindex);
	    }
    	resetSong(sindex);
    	song.play();
    	
    });
    
    next.on('click', function(e) {
    	e.preventDefault();
    	song.pause();
    	if(sindex>=url.length){
	        sindex=0;
	        played=[sindex];
	    }
	    else {
	    	sindex+=1;
	    }
	    if(!(($.inArray(sindex, played)) > 0)){
	         played.push(sindex);
	    }
    	resetSong(sindex);
    	song.play();
    	
    });
    
    shuffle.on('click', function(e){
    	e.preventDefault();
    	sindex= Math.floor(Math.random() * url.length);
    	while(($.inArray(sindex, played)) > 0) {
    		if(played.length>=url.length) {
    			played=[sindex];
    			break;
    		}
    		sindex= Math.floor(Math.random() * url.length);
    	}
    	played.push(sindex);
    	song.pause();
    	resetSong(sindex);
    	song.play();
    });
    
    usong.on('click', function(e) {
    	e.preventDefault();
    	var sindex=parseInt(this.id);
    	song.pause();
    	if(!(($.inArray(sindex, played)) > 0)){
	        played.push(sindex);
	    }
    	resetSong(sindex);
    	song.play();
    });
    
    function resetSong(sindex) {
	    var index=url.indexOf(song.src);
	    $("#" + index + "").html("Song" + metadata[index]);
	    song.src = url[sindex];
	    song.load();
	    $("#seek").attr("value", 0);
	    var index=url.indexOf(song.src);
	    $("#" + index + "").html("<b> Song" + metadata[index] + "</b>");
    }
    
    $("#seek").bind("change", function() {
        song.currentTime = $(this).val();
    });
    
    song.addEventListener('timeupdate',function (){
	    curtime = parseInt(song.currentTime, 10);
	    $("#seek").attr("value", curtime);
	    if(curtime==0){$("#seek").attr("max", song.duration);}
	    if ((curtime + 1) >= parseInt(song.duration, 10)) {
	    	sindex +=1;
	        if(sindex>=url.length){
	        	sindex=0;
	        	played=[sindex];
	        }
	        if(!(($.inArray(sindex, played)) > 0)){
	        	played.push(sindex);
	        }
	        resetSong(sindex);
	        song.play();
	    }
	});
});