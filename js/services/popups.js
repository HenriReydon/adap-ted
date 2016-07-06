app.factory('popups', function($ionicPopup, $timeout, $rootScope, $state) 
{
	var popups = {};
	var popup;

	popups.close = function()
	{
		if(popup!=undefined)
		popup.close();
	}

	popups.echec = function(msg)
	{
		popup = $ionicPopup.alert({
			title: '<i class="icon ion-ios-close"></i>Echec',
			template: msg
		});

		$timeout(function() {
			popup.close();
		}, 3000);
	}

	popups.cool = function(msg)
	{
		popup = $ionicPopup.alert({
			title: '<i class="icon ion-ios-checkmark"></i> Reussite',
			template: msg
		});

		$timeout(function() {
			popup.close(); 
		}, 3000);
	}

	popups.info = function(msg)
	{
		popup = $ionicPopup.alert({
			title: '<i class="icon ion-information-circled"></i> Info',
			template: msg
		});

		$timeout(function() {
			popup.close(); 
		}, 3000);
	}

	popups.aide = function(msg)
	{
		popup = $ionicPopup.alert({
		title: '<i class="icon ion-ios-help-outline"></i> Aide',
		template: msg
		});
		}

	popups.addOccurence = function($scope, is_max, index)
	{
		//$scope.parameters.input_behavior = {'name': "", 'check': false};
		popup = $ionicPopup.show({
			scope: $scope,
			templateUrl: 'templates/add_occurence.html',
			title: $scope.texts.m_bulle_add_occurence,
			buttons: [
			{
				text: $scope.texts.b_cancel, 
				onTap: function()
				{
					$scope.parameters.display_ul = false;
					$scope.parameters.activate_valid = false;
					delete $scope.parameters.input_behavior;
				}
			},
				{ 
					text: $scope.texts.b_valid, 
				onTap: function(e)
				{
					if(!$scope.parameters.activate_valid)
					{
						e.preventDefault();
						document.getElementById('input-bhv').style.border = "1px solid red";
					} 
					else 
					{
						$scope.addBehavior($scope.interface.occurences, index, is_max);
					}
				}
			}]
		});
	}

	popups.addTimer = function($scope, is_max, index)
	{
		popup = $ionicPopup.show({
			scope : $scope,
			templateUrl: 'templates/add_timer.html',
			title: $scope.texts.m_bulle_add_timer,
			buttons: [
			{ 
				text: $scope.texts.b_cancel, 
				onTap: function()
				{
					$scope.parameters.display_ul = false;
					$scope.parameters.activate_valid = false;
					delete $scope.parameters.input_behavior;
				}
			},
				{ 
					text: $scope.texts.b_valid, 
				onTap: function(e)
				{
					if(!$scope.parameters.activate_valid)
					{
						e.preventDefault();
						document.getElementById('input-bhv').style.border = "1px solid red";
					} 
					else 
					{
						$scope.addBehavior($scope.interface.timers, index, is_max, $scope.chosen_bhv);
					}
				}
			}]
		});
	}

	popups.addProgram = function($scope, is_max, index)
	{
		popup = $ionicPopup.show({
			templateUrl: 'templates/add_program.html',				
			scope: $scope,
			title: $scope.texts.m_bulle_add_behavior,
			buttons: [
			{ 
				text: $scope.texts.b_cancel, 
				onTap: function()
				{
					$scope.parameters.display_ul = false;
					$scope.parameters.activate_valid = false;
					delete $scope.parameters.input_behavior;
				}
			},
				{ 
					text: $scope.texts.b_valid, 
				onTap: function(e)
				{
					if(!$scope.parameters.activate_valid)
					{
						e.preventDefault();
						document.getElementById('input-bhv').style.border = "1px solid red";
					} 
					else 
					{
						$scope.addBehavior($scope.interface.programs, index, is_max, $scope.chosen_bhv);
					}
				}
			}]
		});
	}

	return popups;
});