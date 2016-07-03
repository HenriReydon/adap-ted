app.factory('popups', function($ionicPopup, $timeout, $rootScope, $state) 
{
  var popups = {};
  var popup;

  popups.close = function()
  {
    if(popup!=undefined)
      popup.close();
  };

  popups.echec = function(msg)
  {
    popup = $ionicPopup.alert({
      title: '<i class="icon ion-ios-close"></i>Echec',
      template: msg
    });

    $timeout(function() {
      popup.close();
    }, 3000);
  };

  popups.cool = function(msg)
  {
    popup = $ionicPopup.alert({
      title: '<i class="icon ion-ios-checkmark"></i> Reussite',
      template: msg
    });

    $timeout(function() {
      popup.close(); 
    }, 3000);
  };

  popups.info = function(msg)
  {
    popup = $ionicPopup.alert({
      title: '<i class="icon ion-information-circled"></i> Info',
      template: msg
    });

    $timeout(function() {
      popup.close(); 
    }, 3000);
  };

  popups.aide = function(msg)
  {
    popup = $ionicPopup.alert({
      title: '<i class="icon ion-ios-help-outline"></i> Aide',
      template: msg
    });
  };

  popups.behavior = function($scope, behaviorList, buttons, is_max, index)
  {
    $scope.behaviorList = behaviorList;
    console.log(behaviorList);
    popup = $ionicPopup.show({
      template: 
        '<input ng-model="input_behavior" id="inputBhv" type="text" ng-change="changeInputBehavior(input_behavior)">'+
        '<ul class="filterlist" ng-show="parameters.displayUL" id="listecpts">'+
        '<li ng-repeat="bhv in behaviorList | filter:input_behavior" ng-click="chooseBehavior(bhv)">{{bhv.name}}</li></ul>',
      scope: $scope,
      title: $scope.texts.m_bulle_add_behavior,
      buttons: [
      { text: $scope.texts.b_cancel, 
        onTap: function()
        {
          $scope.parameters.displayUL = false;
          $scope.parameters.activateValid = false;
        }},
      { text: $scope.texts.b_valid, 
        onTap: function(e)
        {
          if(!$scope.parameters.activateValid)
          {
            e.preventDefault();
            document.getElementById('inputBhv').style.border = "1px solid red";
          } else 
          {
            $scope.addBehavior(buttons, index, is_max, $scope.chosen_bhv);
          }
        }
      }]
    });
  };

  return popups;
});