
var icon = document.createElement('i');
icon.setAttribute('class', 'circle icon');
icon.style.cssText = 'cursor:pointer; cursor:hand';

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
    toggleButton(false);
    $(this).parent().siblings().last().append(icon);
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
  //event.target.playVideo();
  player.setPlaybackQuality('small');
  toggleButton(player.getPlayerState() !== YT.PlayerState.CUED);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    toggleButton(false);
  }
}
function stopVideo() {
  player.stopVideo();
}
