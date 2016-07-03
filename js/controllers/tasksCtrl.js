app.controller('tasksCtrl', function($scope, $timeout, $rootScope, $state, converter)
{
    $scope.goToInterface = function()
    {
        $state.go("tabs.interface");
    }

    $scope.nextStep = function(s, task, currentStep)
    {
    	var i = 0;
    	while((task.id != $scope.tasks[i].id) && ($scope.tasks[i]))
    		i++;
        
        $scope.tmpTask.push({"id_tache": $scope.tasks[i].id, 
                                   "id_task": $scope.tasks[i].steps[currentStep].infos.id, 
                                   "ordre": $scope.tasks[i].steps[currentStep].infos.ordre,
                                   "date": converter.getCurrentDate(),
                                   "heure": converter.getHour(),
                                   "mode": s,
                                   "numessai": "A calculer au moment du transferts SELECT MAX..."});
        // console.log($scope.tmpTask);
    	currentStep++;

        if(currentStep >= $scope.tasks[i].nbStep)
        {   
            $scope.tasks[i].data.push($scope.tmpTask);
            console.log($scope.tasks[i])
            $scope.tmpTask = [];
            $scope.tasks[i].currentStep = 0;
            $scope.parameters.disabledTask = true;
            $scope.parameters.disabledLaunchTask = false;
            var i = 0;
            while($scope.tasks[i])
            {
                $scope.tasks[i].disabled = false;
                i++;
            }            
        } else 
        {
            $scope.tasks[i].currentStep = currentStep;
        }
    }

    $scope.showTask = function(task)
    {
    	var i = 0;
    	while((task.id != $scope.tasks[i].id) && ($scope.tasks[i]))
    		i++;

    	var j = 0;
			while($scope.tasks[j])
			{
				$scope.tasks[j].class = "button button-small button-light";
				$scope.tasks[j].show = false;
				j++;
			}    	
			$scope.tasks[i].class = "button button-small button-stable no-border-bottom";
			$scope.tasks[i].show = true;
    }

    $scope.begin = function(task)
    {
        $scope.parameters.disabledTask = false;
        $scope.parameters.disabledLaunchTask = true;
        var i = 0;
        while($scope.tasks[i])
        {
            $scope.tasks[i].disabled = true;
            i++;
        }
    }
});
