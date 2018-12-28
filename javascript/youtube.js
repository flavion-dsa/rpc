
var icon = document.createElement('i');
icon.setAttribute('class', 'circle icon');
icon.style.cssText = 'cursor:pointer; cursor:hand';

var progressBar = document.createElement('div');
progressBar.setAttribute('class', 'bar');
var progress = document.createElement('div');
progress.setAttribute('class', 'ui tiny red progress')
progress.style.cssText = 'cursor:pointer; cursor:hand'
progress.append(progressBar);
$(progress).progress({precision: 4, total: 100});

var meta = document.createElement('div');
meta.setAttribute('class', 'meta');
metaElapsed = document.createElement('div');
metaTotal = document.createElement('div');
meta.append(metaElapsed);
meta.append(metaTotal);


var toggleButton = function (play) {
  var state = play ? 'large pause icon' : 'large play icon';
  icon.removeAttribute('class');
  icon.setAttribute('class', state);
}

icon.onclick = function () {
  if (player.getPlayerState() == YT.PlayerState.PLAYING
      || player.getPlayerState() == YT.PlayerState.BUFFERING) {
    
    player.pauseVideo();
    toggleButton(false);
  } else {
    player.playVideo();
    toggleButton(true);
  }
};

$('.cards')
  .delegate('.header', 'click', function () {
    var videoId = $(this).attr('data-video');
    player.stopVideo();
    player.cueVideoById(videoId);
    
    $('.ui.blue.header').removeClass('ui blue');
    $(this).addClass('ui blue');

    $(progress).progress('remove success');
    toggleButton(false);
    $(this).parent().siblings().last().append(icon);
    $(this).parent().children().last().append(progress);
    $(this).after(meta);
  })
;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'vtxSQaJEhoM',
    playerVars: {
      autoplay: 0,
      fs: 0,
      rel: 0,
      enablejsapi: 1,
      modestbranding: 1,
      origin: 'http://www.resurrectionparishchoir.gq'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setVolume(100);
  event.target.setPlaybackQuality('small');
  toggleButton(false);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var playerTicks;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    icon.removeAttribute('class');
    icon.setAttribute('class', 'large undo icon')
    $(progress).progress('set error');
  }
  if (event.data == YT.PlayerState.PLAYING) {
    $(metaTotal).text(" / "+secondsToClock(player.getDuration()));
    playerTicks = setInterval(function () {
      $(progress).progress('set progress', getCurrentProgress());
      $(metaElapsed).text(secondsToClock(player.getCurrentTime()));
    }, 1000);
  } else if (event.data == YT.PlayerState.CUED) {
    $(progress).progress('reset');
    $(metaElapsed).text("00:00");
    $(metaTotal).text(" / 00:00");
  } else {
    clearTimeout(playerTicks);
  }
}

function stopVideo() {
  player.stopVideo();
}

function getCurrentProgress() {
  var playerTotalDuration = player.getDuration();
  var playerCurrentTime = player.getCurrentTime();
  return (playerCurrentTime/playerTotalDuration)*100;
}

function secondsToClock(duration) {
    var rawTime = Math.floor(duration);
    var min = Math.floor(rawTime % 3600 / 60);
    var sec = Math.floor(rawTime % 3600 % 60);
    
    var minDisplay = min < 10 ? "0"+min : ""+min;
    var secDisplay = sec < 10 ? "0"+sec : ""+sec;
    return minDisplay+":"+secDisplay;
}
