function setCookie(lang, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = lang + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(lang) {
    var language = lang + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(language) == 0) {
            return c.substring(language.length, c.length);
        }
    }
    return "";
}

var language = getCookie("language");
if (language == "" || language == null) {
  if (window.navigator.language == "en") {
    var language = "en";
  } else {
    var language = "fr";
  }
  setCookie("language", language, 30);
}