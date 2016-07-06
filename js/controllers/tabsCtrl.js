app.controller('tabsCtrl', function($scope, $ionicPopup, $timeout, popups, $rootScope, converter, randomize)
{

	$scope.askTask = function(etape)
	{
		if(etape == 1)
		{		
	    	if($scope.interface.programs[$scope.parameters.index_pgm].timer_d==undefined)
	    	{
	    		$scope.interface.programs[$scope.parameters.index_pgm].timer_d = $timeout(function()
	    		{
	        	$scope.interface.programs[$scope.parameters.index_pgm].hour_tmp_d = new Date();
	    			timer_d($scope.interface.programs[$scope.parameters.index_pgm]);
	    		},100);
	    	}				    	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_ask_task= true;	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_time_delay_task= false;
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_resp_task= true;
			$scope.interface.programs[$scope.parameters.index_pgm].state_setpoint = 1;
		} 
		else 
		{
            $timeout.cancel($scope.interface.programs[$scope.parameters.index_pgm].timer_d);
            $scope.delayApprTmp = converter.zeroInit($scope.interface.programs[$scope.parameters.index_pgm].min_d)+":"+converter.zeroInit($scope.interface.programs[$scope.parameters.index_pgm].sec_d)+":"+$scope.interface.programs[$scope.parameters.index_pgm].msec_d;
	    	if($scope.interface.programs[$scope.parameters.index_pgm].timer_r==undefined)
	    	{
	    		$scope.interface.programs[$scope.parameters.index_pgm].timer_r = $timeout(function()
	    		{
	    			$scope.interface.programs[$scope.parameters.index_pgm].hour_tmp_r = new Date();
	    			timer_r($scope.interface.programs[$scope.parameters.index_pgm]);
	    		},100);
	    	}	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_ask_task= true;	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_time_delay_task= true;	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_resp_task= false;
			$scope.interface.programs[$scope.parameters.index_pgm].state_waiting = 1;    	            
		}			
	}

	$scope.respTask = function(s, g, n)
	{
            $timeout.cancel($scope.interface.programs[$scope.parameters.index_pgm].timer_r);
            $scope.realApprTmp = converter.zeroInit($scope.interface.programs[$scope.parameters.index_pgm].min_r)+":"+converter.zeroInit($scope.interface.programs[$scope.parameters.index_pgm].sec_r)+":"+$scope.interface.programs[$scope.parameters.index_pgm].msec_r;			
            var dateJour = new Date();
        		var dateString = dateJour.getFullYear() + "-" + (dateJour.getMonth()+1) + "-" + dateJour.getDate();
            $scope.interface.programs[$scope.parameters.index_pgm].data.push({
           			"debut": $scope.interface.programs[$scope.parameters.index_pgm].hour_tmp_d,
           			"reaction": $scope.delayApprTmp,
           			"realisation": $scope.realApprTmp,
           			"seul": s,
           			"guide": g,
           			"none": n,
           			"datestring": dateString
			});

			$scope.interface.programs[$scope.parameters.index_pgm].disabled_ask_task= false;	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_time_delay_task= true;	
			$scope.interface.programs[$scope.parameters.index_pgm].disabled_resp_task= true;
			$scope.interface.programs[$scope.parameters.index_pgm].min_d = 0;			
			$scope.interface.programs[$scope.parameters.index_pgm].sec_d = 0;
			$scope.interface.programs[$scope.parameters.index_pgm].msec_d = 0;
			$scope.interface.programs[$scope.parameters.index_pgm].timer_d = undefined;
			$scope.interface.programs[$scope.parameters.index_pgm].min_r = 0;
			$scope.interface.programs[$scope.parameters.index_pgm].sec_r = 0;
			$scope.interface.programs[$scope.parameters.index_pgm].msec_r = 0;
			$scope.interface.programs[$scope.parameters.index_pgm].timer_r = undefined;
			$scope.interface.programs[$scope.parameters.index_pgm].state_setpoint = 0;
			$scope.interface.programs[$scope.parameters.index_pgm].state_waiting = 0;  


			$scope.interface.programs[$scope.parameters.index_pgm].nb_s += s;
			$scope.interface.programs[$scope.parameters.index_pgm].nb_g += g;
			$scope.interface.programs[$scope.parameters.index_pgm].nb_n += n;
			$scope.interface.programs[$scope.parameters.index_pgm].cumul_d += converter.getTimerInSeconds($scope.delayApprTmp);
			$scope.interface.programs[$scope.parameters.index_pgm].avg_d = Math.round($scope.interface.programs[$scope.parameters.index_pgm].cumul_d/($scope.interface.programs[$scope.parameters.index_pgm].nb_s+$scope.interface.programs[$scope.parameters.index_pgm].nb_g+$scope.interface.programs[$scope.parameters.index_pgm].nb_n)*100)/100;
			$scope.interface.programs[$scope.parameters.index_pgm].cumul_r += converter.getTimerInSeconds($scope.realApprTmp);
			$scope.interface.programs[$scope.parameters.index_pgm].avg_r = Math.round($scope.interface.programs[$scope.parameters.index_pgm].cumul_r/($scope.interface.programs[$scope.parameters.index_pgm].nb_s+$scope.interface.programs[$scope.parameters.index_pgm].nb_g+$scope.interface.programs[$scope.parameters.index_pgm].nb_n)*100)/100;		
	}

	$scope.existATask = function()
	{
		for(var pro in $scope.interface.programs)
		{
			if($scope.interface.programs[pro].behavior != undefined)
				return true;
		}
		return false;
	}

	$scope.existAnothertask = function()
	{
		var count = 0;
		for(var pro in $scope.interface.programs)
		{
			if($scope.interface.programs[pro].behavior != undefined)
				count++;
		}
		if(count >=2)
			return  true;
		else
			return false;
	}

	$scope.previousTask = function()
	{
		$scope.parameters.index_pgm--;
		if($scope.parameters.index_pgm <= -1)
			$scope.parameters.index_pgm = 2;
		while($scope.interface.programs[$scope.parameters.index_pgm].behavior==undefined)
		{
			$scope.parameters.index_pgm--;
			if($scope.parameters.index_pgm < 0)
				$scope.parameters.index_pgm = 2;
		}		
	}

	$scope.nextTask = function()
	{
		$scope.parameters.index_pgm++;
		if($scope.parameters.index_pgm > 2)
			$scope.parameters.index_pgm = 0;
		while($scope.interface.programs[$scope.parameters.index_pgm].behavior==undefined)
		{
			$scope.parameters.index_pgm++;
			if($scope.parameters.index_pgm > 2)
				$scope.parameters.index_pgm = 0;
		}		
	}

    function timer_d(target)
    {

        var now = new Date();
        var diff = now.getTime() - target.hour_tmp_d.getTime();
        var diff = new Date(diff);
        target.timer_d = $timeout(function()
        {
            target.min_d = diff.getMinutes();
            target.sec_d = diff.getSeconds();
            target.msec_d = diff.getMilliseconds();
            timer_d(target);
        }, 10);  
    }	

    function timer_r(target)
    {
        var now = new Date();
        var diff = now.getTime() - target.hour_tmp_r.getTime();
        var diff = new Date(diff);
        target.timer_r = $timeout(function()
        {
            target.min_r = diff.getMinutes();
            target.sec_r = diff.getSeconds();
            target.msec_r = diff.getMilliseconds();
            timer_r(target);
        }, 10);      	
    }    
});