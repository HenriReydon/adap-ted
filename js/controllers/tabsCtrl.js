app.controller('tabsCtrl', function($scope, $ionicPopup, $timeout, popups, $rootScope, converter, randomize)
{

	$scope.askLearning = function(etape)
	{
		if(etape == 1)
		{		
	    	if($scope.apprentissages[$scope.parameters.indexApp].timerD==undefined)
	    	{
	    		$scope.apprentissages[$scope.parameters.indexApp].timerD = $timeout(function()
	    		{
	        	$scope.apprentissages[$scope.parameters.indexApp].hourTmpD = new Date();
	    			timerD($scope.apprentissages[$scope.parameters.indexApp]);
	    		},100);
	    	}				    	
			$scope.parameters.disabledAskLearning= true;	
			$scope.parameters.disabledTimeDelayLearning= false;
			$scope.parameters.disabledRespLearning= true;
		} 
		else 
		{
            $timeout.cancel($scope.apprentissages[$scope.parameters.indexApp].timerD);
            $scope.delayApprTmp = converter.zeroInit($scope.apprentissages[$scope.parameters.indexApp].minD)+":"+converter.zeroInit($scope.apprentissages[$scope.parameters.indexApp].secD)+":"+$scope.apprentissages[$scope.parameters.indexApp].msecD;
	    	if($scope.apprentissages[$scope.parameters.indexApp].timerR==undefined)
	    	{
	    		$scope.apprentissages[$scope.parameters.indexApp].timerR = $timeout(function()
	    		{
	    			$scope.apprentissages[$scope.parameters.indexApp].hourTmpR = new Date();
	    			timerR($scope.apprentissages[$scope.parameters.indexApp]);
	    		},100);
	    	}	
			$scope.parameters.disabledAskLearning= true;	
			$scope.parameters.disabledTimeDelayLearning= true;	
			$scope.parameters.disabledRespLearning= false;	    	            
		}			
	}

	$scope.respLearning = function(s, g, n)
	{
            $timeout.cancel($scope.apprentissages[$scope.parameters.indexApp].timerR);
            $scope.realApprTmp = converter.zeroInit($scope.apprentissages[$scope.parameters.indexApp].minR)+":"+converter.zeroInit($scope.apprentissages[$scope.parameters.indexApp].secR)+":"+$scope.apprentissages[$scope.parameters.indexApp].msecR;			
            var dateJour = new Date();
        		var dateString = dateJour.getFullYear() + "-" + (dateJour.getMonth()+1) + "-" + dateJour.getDate();
            $scope.apprentissages[$scope.parameters.indexApp].data.push({
           			"debut": $scope.apprentissages[$scope.parameters.indexApp].hourTmpD,
           			"reaction": $scope.delayApprTmp,
           			"realisation": $scope.realApprTmp,
           			"seul": s,
           			"guide": g,
           			"none": n,
           			"datestring": dateString
			});

			$scope.parameters.disabledAskLearning= false;	
			$scope.parameters.disabledTimeDelayLearning= true;	
			$scope.parameters.disabledRespLearning= true;
			$scope.apprentissages[$scope.parameters.indexApp].minD = 0;			
			$scope.apprentissages[$scope.parameters.indexApp].secD = 0;
			$scope.apprentissages[$scope.parameters.indexApp].msecD = 0;
			$scope.apprentissages[$scope.parameters.indexApp].timerD = undefined;
			$scope.apprentissages[$scope.parameters.indexApp].minR = 0;
			$scope.apprentissages[$scope.parameters.indexApp].secR = 0;
			$scope.apprentissages[$scope.parameters.indexApp].msecR = 0;
			$scope.apprentissages[$scope.parameters.indexApp].timerR = undefined;


			$scope.apprentissages[$scope.parameters.indexApp].nbS += s;
			$scope.apprentissages[$scope.parameters.indexApp].nbG += g;
			$scope.apprentissages[$scope.parameters.indexApp].nbN += n;
			$scope.apprentissages[$scope.parameters.indexApp].cumulD += converter.getTimerInSeconds($scope.delayApprTmp);
			$scope.apprentissages[$scope.parameters.indexApp].avgD = Math.round($scope.apprentissages[$scope.parameters.indexApp].cumulD/($scope.apprentissages[$scope.parameters.indexApp].nbS+$scope.apprentissages[$scope.parameters.indexApp].nbG+$scope.apprentissages[$scope.parameters.indexApp].nbN)*100)/100;
			$scope.apprentissages[$scope.parameters.indexApp].cumulR += converter.getTimerInSeconds($scope.realApprTmp);
			$scope.apprentissages[$scope.parameters.indexApp].avgR = Math.round($scope.apprentissages[$scope.parameters.indexApp].cumulR/($scope.apprentissages[$scope.parameters.indexApp].nbS+$scope.apprentissages[$scope.parameters.indexApp].nbG+$scope.apprentissages[$scope.parameters.indexApp].nbN)*100)/100;
			if($scope.parameters.indexApp == ($scope.apprentissages.length-1))
			{
				randomize.exe($scope.apprentissages);
				$scope.parameters.indexApp = 0;
			} else $scope.parameters.indexApp++;			
	}

	$scope.askLearned = function(etape)
	{	
		if(etape == 1)
		{		
	    	if($scope.maintiens[$scope.parameters.indexMai].timerD==undefined)
	    	{
	    		$scope.maintiens[$scope.parameters.indexMai].timerD = $timeout(function()
	    		{
	          $scope.maintiens[$scope.parameters.indexMai].hourTmpD = new Date();
	    			timerD($scope.maintiens[$scope.parameters.indexMai]);
	    		},100);
	    	}				    	
			$scope.parameters.disabledAskLearned= true;	
			$scope.parameters.disabledTimeDelayLearned= false;	
			$scope.parameters.disabledRespLearned= true;	    	
		} 
		else 
		{
            $timeout.cancel($scope.maintiens[$scope.parameters.indexMai].timerD);
            $scope.delayMaiTmp = converter.zeroInit($scope.maintiens[$scope.parameters.indexMai].minD)+":"+converter.zeroInit($scope.maintiens[$scope.parameters.indexApp].secD)+":"+$scope.maintiens[$scope.parameters.indexApp].msecD;
	    	if($scope.maintiens[$scope.parameters.indexMai].timerR==undefined)
	    	{
	    		$scope.maintiens[$scope.parameters.indexMai].timerR = $timeout(function()
	    		{
	    			$scope.maintiens[$scope.parameters.indexMai].hourTmpR = new Date();
	    			timerR($scope.maintiens[$scope.parameters.indexMai]);
	    		},100);
	    	}	
			$scope.parameters.disabledAskLearned= true;	
			$scope.parameters.disabledTimeDelayLearned= true;	
			$scope.parameters.disabledRespLearned= false;	    	            
		}		
	}

	$scope.respLearned = function(s, g, n)
	{
            $timeout.cancel($scope.maintiens[$scope.parameters.indexMai].timerR);
            $scope.realMaiTmp = converter.zeroInit($scope.maintiens[$scope.parameters.indexMai].minR)+":"+converter.zeroInit($scope.maintiens[$scope.parameters.indexMai].secR)+":"+$scope.maintiens[$scope.parameters.indexMai].msecR;			
            var dateJour = new Date();
        	var dateString = dateJour.getFullYear() + "-" + (dateJour.getMonth()+1) + "-" + dateJour.getDate();
            $scope.maintiens[$scope.parameters.indexMai].data.push({
           			"debut": $scope.maintiens[$scope.parameters.indexMai].hourTmpD,
           			"reaction": $scope.delayMaiTmp,
           			"realisation": $scope.realMaiTmp,
           			"seul": s,
           			"guide": g,
           			"none": n,
           			"datestring": dateString
			});

			$scope.parameters.disabledAskLearned= false;	
			$scope.parameters.disabledTimeDelayLearned= true;	
			$scope.parameters.disabledRespLearned= true;
			$scope.maintiens[$scope.parameters.indexMai].minD = 0;			
			$scope.maintiens[$scope.parameters.indexMai].secD = 0;
			$scope.maintiens[$scope.parameters.indexMai].msecD = 0;
			$scope.maintiens[$scope.parameters.indexMai].timerD = undefined;
			$scope.maintiens[$scope.parameters.indexMai].minR = 0;
			$scope.maintiens[$scope.parameters.indexMai].secR = 0;
			$scope.maintiens[$scope.parameters.indexMai].msecR = 0;
			$scope.maintiens[$scope.parameters.indexMai].timerR = undefined;


			$scope.maintiens[$scope.parameters.indexMai].nbS += s;
			$scope.maintiens[$scope.parameters.indexMai].nbG += g;
			$scope.maintiens[$scope.parameters.indexMai].nbN += n;
			$scope.maintiens[$scope.parameters.indexMai].cumulD += converter.getTimerInSeconds($scope.delayMaiTmp);
			$scope.maintiens[$scope.parameters.indexMai].avgD = Math.round($scope.maintiens[$scope.parameters.indexMai].cumulD/($scope.maintiens[$scope.parameters.indexMai].nbS+$scope.maintiens[$scope.parameters.indexMai].nbG+$scope.maintiens[$scope.parameters.indexMai].nbN)*100)/100;
			$scope.maintiens[$scope.parameters.indexMai].cumulR += converter.getTimerInSeconds($scope.realMaiTmp);
			$scope.maintiens[$scope.parameters.indexMai].avgR = Math.round($scope.maintiens[$scope.parameters.indexMai].cumulR/($scope.maintiens[$scope.parameters.indexMai].nbS+$scope.maintiens[$scope.parameters.indexMai].nbG+$scope.maintiens[$scope.parameters.indexMai].nbN)*100)/100;
			if($scope.parameters.indexMai == ($scope.maintiens.length-1))
			{
				randomize.exe($scope.maintiens);				
				$scope.parameters.indexMai = 0;
			} else $scope.parameters.indexMai++;
	}

    function timerD(target)
    {

        var now = new Date();
        var diff = now.getTime() - target.hourTmpD.getTime();
        var diff = new Date(diff);
        target.timerD = $timeout(function()
        {
            target.minD = diff.getMinutes();
            target.secD = diff.getSeconds();
            target.msecD = diff.getMilliseconds();
            timerD(target);
        }, 10);  
    }	

    function timerR(target)
    {
        var now = new Date();
        var diff = now.getTime() - target.hourTmpR.getTime();
        var diff = new Date(diff);
        target.timerR = $timeout(function()
        {
            target.minR = diff.getMinutes();
            target.secR = diff.getSeconds();
            target.msecR = diff.getMilliseconds();
            timerR(target);
        }, 10);      	
    }    
});