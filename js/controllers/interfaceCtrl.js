app.controller('interfaceCtrl', function($scope, popups, $timeout, $rootScope, $state, colors, converter, tasks, programmes)
{
    window.addEventListener('orientationchange', doOnOrientationChange);
    function doOnOrientationChange()
    {
        if((window.orientation == 90) || (window.orientation == -90))
            $state.go('tasks');
        else $state.go('tabs.interface');
    }

    $scope.$on('interface_received', function(event, data)
    {
        for(var d in data.kid)
        {
            $scope.preparation.usager = data.kid[d];
        }

        for(var d in data.sit)
            $scope.preparation.sit = data.sit[d];
        
        programmes.exe($scope.preparation.usager.id, $scope.preparation.sit.id);
        tasks.exe($scope.preparation.usager.id, $scope.preparation.sit.id);

        for(var d in data.occ)
        {
            $scope.occurences.push({"tick":0, 
                                    "mode": true, 
                                    "exist": true, 
                                    'style': 'min-height:'+$scope.parameters.heightOccurences+'px !important;border-color: '+colors.palette_occ(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_occ(d), 
                                    //'style': 'border-color: '+colors.palette_occ(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_occ(d), 
                                    "data": []});
            $scope.occurences[$scope.occurences.length-1].behavior = data.occ[d];
        }

        for(var d in data.min)
        {
            $scope.minuters.push({"min":0, 
                                   "sec":0, 
                                   "msec":0, 
                                   "occurrences":0, 
                                   'timer': undefined, 
                                   "mode": true, 
                                   'style': 'min-height:'+$scope.parameters.heightMinuteurs+'px !important;border-color: '+colors.palette_min(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(d), 
                                   "exist": true, "data": []});
            $scope.minuters[$scope.minuters.length-1].behavior = data.min[d];
        }
    });      
    // AIDE ???
    $scope.afficherBulleComportement = function()
    {
    	popups.behavior($scope);
    }

    $scope.incrementeOccurence = function(index)
    {
    	$scope.occurences[index].tick+=1;
        $scope.occurences[index].data.push(converter.getCurrentDate()+"&"+converter.getHour());
    }

    $scope.zeroInit = function(dat)
    {
        return converter.zeroInit(dat);
    }

    $scope.actionMinuteur = function(index)
    {
    	if($scope.minuters[index].timer==undefined)
    	{
    		$scope.minuters[index].timer = $timeout(function()
    		{
                $scope.minuters[index].hourTmp = new Date();
    			timer($scope.minuters[index]);
    		},100);
    	}
    	else
		{
            $scope.minuters[index].occurrences++;
            $timeout.cancel($scope.minuters[index].timer);
            d = $scope.minuters[index].min+":"+$scope.minuters[index].sec+":"+$scope.minuters[index].msec;
            $scope.minuters[index].data.push({"h": $scope.minuters[index].hourTmp, "d": d});
			$scope.minuters[index] = {"min":0, 
                                       "sec":0, 
                                       "msec":0, 
                                       "occurrences":$scope.minuters[index].occurrences, 
                                       "behavior":$scope.minuters[index].behavior, 
                                       "timer": undefined, 
                                       "mode": true, 
                                       "exist": true, 
                                       'style': 'min-height:'+$scope.parameters.heightMinuteurs+'px !important;border-color: '+colors.palette_min(index)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(index), "data": $scope.minuters[index].data};
		}
    }

    $scope.transfererInterface = function()
    { 
        var sqlButtonOccurence = transfererOccurences();
        var sqlButtonMinuteurs = transfererMinuteurs();
        var sqlProgrammeData = transfererProgramme();
        var allData = [{'occ': sqlButtonOccurence}, {'min': sqlButtonMinuteurs}, {'pgm': sqlProgrammeData}];
        transfert.exe(allData);
    } 

    function timer(target)
    {
        var now = new Date();
        var diff = now.getTime() - target.hourTmp.getTime();
        var diff = new Date(diff);
        target.timer = $timeout(function()
        {
            target.min = diff.getMinutes();
            target.sec = diff.getSeconds();
            target.msec = diff.getMilliseconds();
            timer(target);
        }, 10);        
    }
    
    function transfererOccurences()
    {
        return -1;       
    }

    function transfererMinuteurs()
    {
        return -1;
    }

    function transfererProgramme()
    {
        return -1;
    }

    function transfererTasks()
    {
        console.log($scope.tasks);
    }

});
