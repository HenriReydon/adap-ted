app.controller('historyCtrl', function($scope, $ionicPopup, $timeout, colors, $state)
{
    var index = $scope.history.interfaces.length-1;

    $scope.swipeRight = function()
    {
    	index--;
        buildHistory(index);
    }

    $scope.swipeLeft = function()
    {
        index++;
        buildHistory(index);
    }

    //transfert.history_load();

    $scope.$on('history_load', function(event, data)
    {
        //var data = JSON.parse(data);
        /*console.log(data.histo);
        for(var i in data.histo)
            console.log(data.histo[i].int);*/        
    });    

    $scope.$on('build_history', function()
    {
        index = $scope.history.interfaces.length-1;
        buildHistory(index);
    });
    buildHistory(index);

    function buildHistory(current)
    {
    	for(var i=0; i<$scope.parameters.history_limit; i++)
	    {
            if($scope.history.interfaces[i]!=undefined)
            {
    	    	if(i<current-1)
    	    	{
    	    		var pos = "left:"+30*i+"px";
    	    		var race = -2;
    	    		var zindex = "z-index:"+i;
    	    	}
                else if(i==current-1)
                {
                    var pos = "left:"+30*i+"px";
                    var race = -1;
                    var zindex = "z-index:"+i;
                }
    	    	else if(i==current)
    	    	{
    	    		var pos = "left:25%";
    	    		var race = 0;
    	    		var zindex = "z-index:100";
    	    	}
    	    	else if(i==current+1)
    	    	{
    	    		var pos = "right:"+30*(6-i)+"px";
    	    		var race = 1;
    	    		var zindex = "z-index:"+(6-i);
    	    	}
                else
                {
                    var pos = "right:"+30*(6-i)+"px";
                    var race = 2;
                    var zindex = "z-index:"+(6-i);
                }
                $scope.history.interfaces[i].style={'style': 'position: absolute', 'style2': pos, 'style3': zindex, 'race': race};
            }
	    }
    }
    $scope.openHisto = function()
    {
        if($scope.history.interfaces[index]!=undefined)
        {
            $scope.interface.occurences = $scope.history.interfaces[index].interface.occurences;
            $scope.interface.timers = $scope.history.interfaces[index].interface.timers;
            $scope.interface.programs = $scope.history.interfaces[index].interface.programs;
            $state.go("tabs.interface");
        }
        else
            console.log('MOFO');
        
    }
});