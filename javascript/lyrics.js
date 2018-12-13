
function parseUrlParameter(param) {
  var fullUrl = window.location.search.substring(1);
  var paramsArray = fullUrl.split('&');
  for (i in paramsArray) {
    var currentParam = paramsArray[i].split('=');
    if (currentParam[0] == param) {
      return currentParam[1];
    }
  }
}

function loadLyricsJSON(callback, hymn) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../assets/data/lyrics/'+hymn+'.json', true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
