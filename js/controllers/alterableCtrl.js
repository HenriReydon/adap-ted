app.controller('alterableCtrl', function($scope, popups, $timeout, colors, behaviors/*, filemanager*/)
{
    /*
    * Open a 
    */
    $scope.addOccurence = function()
    {
        for(var o in $scope.occurences)
        {
            if(!$scope.occurences[o].exist)
            {
                var max_occ = false;
                if(o==5) max_occ = true;
                    popups.behavior($scope, $scope.behaviors.occurences, $scope.occurences, max_occ, o);
                break;
            }
        }
    }

    $scope.helpOccurence = function()
    {

    }

    $scope.addProgramm = function()
    {
        for(var o in $scope.occurences)
        {
            if(!$scope.occurences[o].exist)
            {
                var max_occ = false;
                if(o==5) max_occ = true;
                    popups.behavior($scope, $scope.behaviors.occurences, $scope.occurences, max_occ, o);
                break;
            }
        }
    }

    

    $scope.addMinuteur = function()
    {
        for(var o in $scope.minuters)
        {
            if(!$scope.minuters[o].exist)
            {
                var max_min = false;
                if(o==3) max_min = true;
                popups.behavior($scope, $scope.behaviors.minuters, $scope.minuters, max_min, o);
                break;
            }
        }
    }

    $scope.helpMinuteur = function()
    {
        
    }

    $scope.chooseBehavior = function(choix)
    {
        document.getElementById('inputBhv').value = choix.name;
        document.getElementById('inputBhv').style.border = "1px solid green";
        $scope.parameters.displayUL = false;
        $scope.chosen_bhv = choix;
        $scope.parameters.activateValid = true;
    }

    $scope.changeInputBehavior = function(behavior_name)
    {
        if(behavior_name.length>0)
            $scope.parameters.activateValid = true;
        else
            $scope.parameters.activateValid = false;
        document.getElementById('inputBhv').style.border = "none";
        var behavior = {};
        behavior.name = behavior_name;
        $scope.chooseBehavior(behavior);
        $scope.parameters.displayUL= true;
    }

    $scope.addBehavior = function(buttons, index, is_max, behavior)
    {
        buttons[index].exist=true;
        buttons[index].behavior=$scope.chosen_bhv;
        //$scope.removeBehavior(behaviors, $scope.chosen_bhv);
        $scope.parameters.displayUL = false;
        $scope.parameters.activateValid = false;
        if(is_max)//If the maximum button is reached, hide the + button concerned
            buttons[parseInt(index)+1].exist = false;

        $scope.fileSystem.waitingCommand = "update behaviors";
        //$scope.checkFile();        
    }

    $scope.fileSystem.waitingCommand = "read behaviors";
    //$scope.checkFile();
    
});