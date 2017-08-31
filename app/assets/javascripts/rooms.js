$(document).on('ready', function() {
  postersClick();
  learnMoreClick();
});

var postersClick = function(){
  $(".posters").on("click", function(event){
    var content = [];
    var name = [];
    var title = [];
    var contentCollection = $(".content");
    var nameCollection = $(".name");
    var titleCollection = $(".title");
    for(var i=0; i<contentCollection.length; i++){
      content.push(contentCollection[i]);
      name.push(nameCollection[i]);
      title.push(titleCollection[i]);
    }
    var image = this;
    var link = $(image).attr("link");
    content.forEach(function(element){
      var newlink = $(element).attr("link")
      if(link == newlink){
        $(element).addClass("selected");
        $(element).removeClass("hidden");
      } else {
        $(element).addClass("hidden");
        $(element).removeClass("selected");
      }
    });
    name.forEach(function(element){
      var newlink = $(element).attr("link")
      if(link == newlink){
        $(element).addClass("selected");
        $(element).removeClass("hidden");
      } else {
        $(element).addClass("hidden");
        $(element).removeClass("selected");
      }
    });
    title.forEach(function(element){
      var newlink = $(element).attr("link")
      if(link == newlink){
        $(element).addClass("selected");
        $(element).removeClass("hidden");
      } else {
        $(element).addClass("hidden");
        $(element).removeClass("selected");
      }
    });
  })
}
var learnMoreClick = function(){
  $(".roomButton").on("click", function(event){
    var content = [];
    var name = [];
    var title = [];
    var contentCollection = $(".content");
    var nameCollection = $(".name");
    var titleCollection = $(".title");
    for(var i=0; i<contentCollection.length; i++){
      content.push(contentCollection[i]);
      name.push(nameCollection[i]);
      title.push(titleCollection[i]);
    }
    var image = this;
    var link = $(image).attr("link");
    content.forEach(function(element){
      var newlink = $(element).attr("link")
      if(link == newlink){
        $(element).addClass("selected");
        $(element).removeClass("hidden");
      } else {
        $(element).addClass("hidden");
        $(element).removeClass("selected");
      }
    });
    name.forEach(function(element){
      var newlink = $(element).attr("link")
      if(link == newlink){
        $(element).addClass("selected");
        $(element).removeClass("hidden");
      } else {
        $(element).addClass("hidden");
        $(element).removeClass("selected");
      }
    });
    title.forEach(function(element){
      var newlink = $(element).attr("link")
      if(link == newlink){
        $(element).addClass("selected");
        $(element).removeClass("hidden");
      } else {
        $(element).addClass("hidden");
        $(element).removeClass("selected");
      }
    });
  })
}
