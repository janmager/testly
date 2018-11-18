var home = $(".home");
var startFormBox = $(".startCreatingFormBox");
var btnStart = $(".open-creator");

btnStart.click(function(){
  home.css({"display":"none"});
  startFormBox.css({"display":"flex"});
})
