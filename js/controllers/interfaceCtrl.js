app.controller('interfaceCtrl', function($scope, popups, $timeout, $rootScope, $state, colors, converter, programmes)
{
    window.addEventListener('orientationchange', doOnOrientationChange);
    function doOnOrientationChange()
    {
        if((window.orientation == 90) || (window.orientation == -90))
            $state.go('tasks');
        else $state.go('tabs.interface');
    }

    $scope.afficherBulleComportement = function()
    {
    	popups.behavior($scope);
    }

    $scope.incrementeOccurence = function(index)
    {
    	$scope.interface.occurences[index].tick+=1;
        $scope.interface.occurences[index].data.push(converter.getCurrentDate()+"&"+converter.getHour());
        if($scope.interface.occurences[index].likert.exist)
            $scope.interface.occurences[index].likert.disabled = false;
    }

    $scope.setOccurenceIntensity = function(index_occ, index_int)
    {
        $scope.interface.occurences[index_occ].likert.disabled = true;
    }

    $scope.setTimerIntensity = function(index_tim, index_int)
    {
        $scope.interface.timers[index_tim].likert.disabled = true;
    }

    $scope.zeroInit = function(dat)
    {
        return converter.zeroInit(dat);
    }

    $scope.actionTimer = function(index)
    {
    	if($scope.interface.timers[index].timer==undefined)
    	{
    		$scope.interface.timers[index].timer = $timeout(function()
    		{
                $scope.interface.timers[index].hourTmp = new Date();
    			timer($scope.interface.timers[index], index);
    		},10);
            if($scope.interface.timers[index].likert.exist)
                $scope.interface.timers[index].likert.disabled = false;
    	}
    	else
		{
            $scope.interface.timers[index].occurrences++;
            $timeout.cancel($scope.interface.timers[index].timer);
            d = $scope.interface.timers[index].min+":"+$scope.interface.timers[index].sec+":"+$scope.interface.timers[index].msec;
            $scope.interface.timers[index].data.push({"h": $scope.interface.timers[index].hourTmp, "d": d});
			$scope.interface.timers[index].min = 0; 
            $scope.interface.timers[index].sec = 0;
            $scope.interface.timers[index].msec = 0;
            $scope.interface.timers[index].timer = undefined;

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
