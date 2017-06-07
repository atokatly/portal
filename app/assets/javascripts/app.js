(function() {
  var app = angular.module('roomPage', []);

  app.controller('RoomController', ['$http', function($http){
    console.log("Hi there Anthony I'm Angular")


    // $http.get('/rooms').success(function(data){
    //   room.products = data;
    //   });
  }]);
})();
