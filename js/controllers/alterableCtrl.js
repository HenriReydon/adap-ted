app.controller('alterableCtrl', function($scope, popups, $timeout, colors, behaviors/*, filemanager*/)
{
    /*
    * Open a 
    */
    $scope.addOccurence = function()
    {
        for(var o in $scope.interface.occurences)
        {
            if(!$scope.interface.occurences[o].exist)
            {
                var max_occ = false;
                if(o==5) max_occ = true;
                    popups.addOccurence($scope, max_occ, o);
                break;
            }
        }
    }

    $scope.helpOccurence = function()
    {

    }


    $scope.addTimer = function()
    {
        for(var o in $scope.interface.timers)
        {
            if(!$scope.interface.timers[o].exist)
            {
                var max_min = false;
                if(o==3) max_min = true;
                popups.addTimer($scope, max_min, o);
                break;
            }
        }
    }

    $scope.helpTimer = function()
    {
        
    }

    $scope.addProgram = function()
    {
        for(var o in $scope.interface.programs)
        {
            if(!$scope.interface.programs[o].exist)
            {
                var max_pgm = false;
                if(o==2) max_pgm = true;
                    popups.addProgram($scope, max_pgm, o);
                break;
            }
        }
    }

    $scope.changeInputBehavior = function(behavior_name)
    {
        if(behavior_name.length>0)
        {
            $scope.parameters.activate_valid = true;
            var behavior = {};
            $scope.parameters.input_behavior.name = behavior_name;
            document.getElementById('input-bhv').value = behavior_name;
            document.getElementById('input-bhv').style.border = "1px solid green";
        }
        else
        {
            $scope.parameters.activate_valid = false;
            document.getElementById('input-bhv').style.border = "1px solid red";
        }
    }

    $scope.addBehavior = function(buttons, index, is_max)
    {
        buttons[index].exist = true;
        buttons[index].behavior = $scope.parameters.input_behavior;
        if(buttons[index].likert!=undefined)
            buttons[index].likert.exist = $scope.parameters.input_behavior_likert;
        delete $scope.parameters.input_behavior;
        delete $scope.parameters.input_behavior_likert;
        //$scope.removeBehavior(behaviors, $scope.chosen_bhv);
        $scope.parameters.display_ul = false;
        $scope.parameters.activate_valid = false;
        
        if(is_max)//If the maximum button is reached, hide the + button concerned
            buttons[parseInt(index)+1].exist = false;

        //$scope.fileSystem.waitingCommand = "update behaviors";
    }

    //$scope.fileSystem.waitingCommand = "read behaviors";
    
});