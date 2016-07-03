app.controller('historyCtrl', function($scope, $ionicPopup, $timeout, colors, $state, interfaces)
{
    var index = 3;

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

    buildHistory(index);

    function buildHistory(current)
    {
    	for(var i=0; i<=6; i++)
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
	    	if(!$scope.history.builded)
                $scope.history.interfaces.push({'style': 'position: absolute', 'style2': pos, 'style3': zindex, 'race': race})
            else
            {
                $scope.history.interfaces[i].style2 = pos;
                $scope.history.interfaces[i].style3 = zindex;
                $scope.history.interfaces[i].race = race;
            }
	    }
        $scope.history.builded = true;
    }
    $scope.openHisto = function()
    {
        interfaces.exe("AB123");      
        $state.go("tabs.interface");
    }
    $scope.$on('interface_received', function(event, data)
    {
        for(var d in data.occ)
        {
            $scope.occurences.push({"tick":0, "mode": true, "exist": true, 'style': 'border-color: '+colors.palette_occ(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_occ(d), "data": []});
            $scope.occurences[$scope.occurences.length-1].comportement = data.occ[d];
        }

        for(var d in data.min)
        {
            $scope.minuteurs.push({"min":0, "sec":00, "msec":0, "occurrences":0, 'timer': undefined, "mode": true, 'style': 'border-color: '+colors.palette_min(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(d), "exist": true, "data": []});
            $scope.minuteurs[$scope.minuteurs.length-1].comportement = data.min[d];
        }
        for(var d in data.kid)
        {
            $scope.preparation.usager={'id': data.kid[d].id, 'name':data.kid[d].name};
        }
    });  
});