var app = angular.module('clicker', ['ionic']).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) 
{
   $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html",
      controller: "homeCtrl"
    })   
    .state('whatisthis', {
      url: "/whatisthis",
      templateUrl: "templates/whatisthis.html",
      controller: "homeCtrl"
    })
    .state('history', {
      url: "/history",
      templateUrl: "templates/history.html",
      controller: "historyCtrl"
    })
    .state('tabs', {
      url: "/tabs",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: "tabsCtrl"
    })
    .state('tabs.interface', {
      url: "/interface",
      views: {
        'content' : {
          templateUrl: "templates/interface.html",
          controller: "interfaceCtrl"
        }
      }
    })
    .state('alterable', {
      url: "/alterable",
      templateUrl: "templates/alterable.html",
      controller: "alterableCtrl"
    })  
    .state('tasks', {
      url: "/tasks",
      templateUrl: "templates/tasks.html",
      controller: "tasksCtrl"
    })  
  $urlRouterProvider.otherwise("/");

});