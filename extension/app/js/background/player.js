var Player = new (function () {
	soundManager.setup({
		url: '/app/lib/',
		flashVersion: 9,
		onready: function () {
		}
	});
	var currentPlayingSoundId = -1;
	var playList = new Array();
	var isLoop = true;
	var playingSound;
	var playerChangeListener;
	var volume = 50;
	
	this.init = function (playerUIChangeListener) {
		playerChangeListener = playerUIChangeListener;
	}

	this.setPlayList = function(audios) {
		playList = audios;
		currentPlayingSoundId = 0;
	}

	this.playSound = function (soundId) {
		for (var i in playList) {
			if (playList[i].id == soundId) {
				currentPlayingSoundId = parseInt(i);
				break;
			}
		}
		doPlay();
	}

	this.play = function () {
		doPlay();
	}

	this.next = function () {
		doNext();
	}

	this.prev = function () {
		doPrev();
	}

	this.stop = function () {
		doStop();
	}

	this.toggle = function () {
		doToggle();
	}
	
	this.updatePosition = function(range) {
		var max = playingSound.duration;
		var newPosition = (range * max) / 10000;
		playingSound.setPosition(newPosition);
	}
	
	this.updateVolume = function(newVolume) {
		volume = newVolume;
		playingSound.setVolume(volume);
	}
	
	var doPlay = function () {
		doStop();
		var audio = playList[currentPlayingSoundId];
		playingSound = soundManager.createSound({
			url: audio.url,
			onplay: function () {
				playerChangeListener(0, 10000, audio.title);
			},
			onfinish: function () {
				doNext();
			},
			whileplaying: function () {
				playerChangeListener(playingSound.position, playingSound.duration, audio.title, volume);
			}
		});
		playingSound.setVolume(volume);
		playingSound.play();
		Player.sound = playingSound;
	}

	var doStop = function () {
		if (typeof playingSound !== "undefined") {
			playingSound.destruct();
		}
	}

	var doToggle = function () {
		if (typeof playingSound !== "undefined") {
			playingSound.togglePause();
		}
	}

	var doNext = function () {
		var next = currentPlayingSoundId + 1;
		if (next >= playList.length) {
			if (isLoop) {
				currentPlayingSoundId = 0;
			}
		} else {
			currentPlayingSoundId = next;
		}
		doPlay();
	}

	var doPrev = function () {
		var prev = currentPlayingSoundId - 1;
		if (prev < 0) {
			if (isLoop) {
				currentPlayingSoundId = playList.length - 1;
			}
		} else {
			currentPlayingSoundId = prev;
		}
		doPlay();
	}
})();