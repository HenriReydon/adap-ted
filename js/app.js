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
      templateUrl: "templates/whatisthis.html",
      controller: "homeCtrl"
    })
    .state('history', {
      templateUrl: "templates/history.html",
      controller: "historyCtrl"
    })
    .state('tabs', {
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
      templateUrl: "templates/alterable.html",
      controller: "alterableCtrl"
    })  
    .state('tasks', {
      templateUrl: "templates/tasks.html",
      controller: "tasksCtrl"
    })  
    .state('debug', {
      templateUrl: "templates/debug.html"
    })
  $urlRouterProvider.otherwise("/");

});