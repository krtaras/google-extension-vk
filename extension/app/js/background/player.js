var Player = new (function() {
	soundManager.setup({
		url: '/app/lib/',
		flashVersion: 9,
		onready: function() {
		}
	});
	var currentPlayingSoundId = -1;
	var playList = new Array();
	var isLoop = false;
	
	var playingSound;
	
	var playSound = function() {
		var audio = playList[currentPlayingSoundId];
		if (typeof playingSound !== "undefined") {
			playingSound.destruct();
		}
		playingSound = soundManager.createSound({
			url: audio.url
		});
		playingSound.play();
	}
	
	this.init = function(audios, loop) {
		playList = audios;
		isLoop = loop;
		currentPlayingSoundId = 0;
	}
	
	this.play = function() {
		playSound();
	}
	
	this.next = function() {
		var next = currentPlayingSoundId + 1;
		if (next >= playList.length) {
			if (isLoop) {
				currentPlayingSoundId = 0;
			}
		} else {
			currentPlayingSoundId = next;
		}
		playSound();
	}

	this.prev = function() {
		var prev = currentPlayingSoundId - 1;
		if (prev < 0) {
			if (isLoop) {
				currentPlayingSoundId = playList.length - 1;
			}
		} else {
			currentPlayingSoundId = prev;
		}
		playSound();
	}
})();