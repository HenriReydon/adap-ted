app.controller('interfaceCtrl', function($scope, popups, $timeout, $rootScope, $state, colors, converter, programmes)
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
                                    'style': 'min-height:'+$scope.parameters.height_occurences+'px !important;border-color: '+colors.palette_occ(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_occ(d), 
                                    //'style': 'border-color: '+colors.palette_occ(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_occ(d), 
                                    "data": []});
            $scope.occurences[$scope.occurences.length-1].behavior = data.occ[d];
        }

        for(var d in data.min)
        {
            $scope.timers.push({"min":0, 
                                   "sec":0, 
                                   "msec":0, 
                                   "occurrences":0, 
                                   'timer': undefined, 
                                   "mode": true, 
                                   'style': 'min-height:'+$scope.parameters.height_timers+'px !important;border-color: '+colors.palette_min(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(d), 
                                   "exist": true, "data": []});
            $scope.timers[$scope.timers.length-1].behavior = data.min[d];
        }
    });      

    $scope.afficherBulleComportement = function()
    {
    	popups.behavior($scope);
    }

    $scope.incrementeOccurence = function(index)
    {
    	$scope.occurences[index].tick+=1;
        $scope.occurences[index].data.push(converter.getCurrentDate()+"&"+converter.getHour());
        if($scope.occurences[index].likert.exist)
            $scope.occurences[index].likert.disabled = false;
    }

    $scope.setOccurenceIntensity = function(index)
    {
        $scope.occurences[index].tick+=1;
        $scope.occurences[index].data.push(converter.getCurrentDate()+"&"+converter.getHour());
        if($scope.occurences[index].likert.exist)
            $scope.occurences[index].likert.disabled = false;
    }

    $scope.zeroInit = function(dat)
    {
        return converter.zeroInit(dat);
    }

    $scope.actionTimer = function(index)
    {
    	if($scope.timers[index].timer==undefined)
    	{
    		$scope.timers[index].timer = $timeout(function()
    		{
                $scope.timers[index].hourTmp = new Date();
    			timer($scope.timers[index], index);
    		},10);
    	}
    	else
		{
            $scope.timers[index].occurrences++;
            $timeout.cancel($scope.timers[index].timer);
            d = $scope.timers[index].min+":"+$scope.timers[index].sec+":"+$scope.timers[index].msec;
            $scope.timers[index].data.push({"h": $scope.timers[index].hourTmp, "d": d});
			$scope.timers[index] = {"min":0, 
                                       "sec":0, 
                                       "msec":0, 
                                       "occurrences":$scope.timers[index].occurrences, 
                                       "behavior":$scope.timers[index].behavior, 
                                       "timer": undefined, 
                                       "mode": true, 
                                       "exist": true, 
                                       "style": "border-color: "+colors.palette_min(index)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(index),
                                       "data": $scope.timers[index].data};

            $('#tim'+index+' .spantimer').removeClass('border-top');
            $('#tim'+index+' .spantimer').removeClass('border-right');
            $('#tim'+index+' .spantimer').removeClass('border-left');
            $('#tim'+index+' .spantimer').removeClass('border-bottom');
		}
    }

    $scope.transfererInterface = function()
    { 
        var allData = [{'occ': transfererOccurences()}, {'min': transfererTimers()}, {'pgm': transfererPrograme()}];
        transfert.exe(allData);
    } 

    function timer(target, index)
    {
        var now = new Date();
        var diff = now.getTime() - target.hourTmp.getTime();
        var diff = new Date(diff);
        target.timer = $timeout(function()
        {
            if($('#tim'+index+' .spantimer').hasClass('border-top') )
            {
                $('#tim'+index+' .spantimer').removeClass('border-top');
                $('#tim'+index+' .spantimer').addClass('border-right');
            }
            else if($('#tim'+index+' .spantimer').hasClass('border-right')) 
            {
                $('#tim'+index+' .spantimer').removeClass('border-right');
                $('#tim'+index+' .spantimer').addClass('border-bottom');
            }
            else if($('#tim'+index+' .spantimer').hasClass('border-bottom'))
            {
                $('#tim'+index+' .spantimer').removeClass('border-bottom');
                $('#tim'+index+' .spantimer').addClass('border-left');
                
            }
            else if($('#tim'+index+' .spantimer').hasClass('border-left'))
            {
                $('#tim'+index+' .spantimer').removeClass('border-left');
                $('#tim'+index+' .spantimer').addClass('border-top');
            }
            else
            {
                $('#tim'+index+' .spantimer').addClass('border-top');
            }
            target.min = diff.getMinutes();
            target.sec = diff.getSeconds();
            target.msec = diff.getMilliseconds();
            timer(target, index);
        }, 250);        
    }
    
    function transfererOccurences()
    {
        return -1;       
    }

    function transfererTimers()
    {
        return -1;
    }

    function transfererPrograme()
    {
        return -1;
    }

    function transfererTasks()
    {
        console.log($scope.tasks);
    }

});
