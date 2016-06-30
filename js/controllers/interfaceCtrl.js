app.controller('interfaceCtrl', function($scope, bulles, $timeout, $rootScope, $state, colors, converter, tasks, programmes)
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
            $scope.minuteurs.push({"min":0, 
                                   "sec":0, 
                                   "msec":0, 
                                   "occurrences":0, 
                                   'timer': undefined, 
                                   "mode": true, 
                                   'style': 'min-height:'+$scope.parameters.heightMinuteurs+'px !important;border-color: '+colors.palette_min(d)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(d), 
                                   "exist": true, "data": []});
            $scope.minuteurs[$scope.minuteurs.length-1].behavior = data.min[d];
        }
    });      
    // AIDE ???
    $scope.afficherBulleComportement = function()
    {
    	bulles.behavior($scope);
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
    	if($scope.minuteurs[index].timer==undefined)
    	{
    		$scope.minuteurs[index].timer = $timeout(function()
    		{
                $scope.minuteurs[index].hourTmp = new Date();
    			timer($scope.minuteurs[index]);
    		},100);
    	}
    	else
		{
            $scope.minuteurs[index].occurrences++;
            $timeout.cancel($scope.minuteurs[index].timer);
            d = $scope.minuteurs[index].min+":"+$scope.minuteurs[index].sec+":"+$scope.minuteurs[index].msec;
            $scope.minuteurs[index].data.push({"h": $scope.minuteurs[index].hourTmp, "d": d});
			$scope.minuteurs[index] = {"min":0, 
                                       "sec":0, 
                                       "msec":0, 
                                       "occurrences":$scope.minuteurs[index].occurrences, 
                                       "behavior":$scope.minuteurs[index].behavior, 
                                       "timer": undefined, 
                                       "mode": true, 
                                       "exist": true, 
                                       'style': 'min-height:'+$scope.parameters.heightMinuteurs+'px !important;border-color: '+colors.palette_min(index)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(index), "data": $scope.minuteurs[index].data};
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
        if(/*bad*/false) 
            sqlButtonOccurence = "-1"; 

        return sqlButtonOccurence;       
    }

    function transfererMinuteurs()
    {
        var dateString;        
        var sqlButtonMinuteurs = "INSERT INTO minuteurs (id_usager, id_comportement, id_situation, debut, duree, datestring) VALUES";

        for(var d in $scope.minuteurs)
        {
            if($scope.minuteurs[d].mode)
            {
                if($scope.minuteurs[d].data.length > 0)
                {
                    for(var i in $scope.minuteurs[d].data)
                    {
                        var j = converter.zeroInit($scope.minuteurs[d].data[i].h.getDate());
                        var m = converter.zeroInit($scope.minuteurs[d].data[i].h.getMonth()+1);
                        var y = $scope.minuteurs[d].data[i].h.getFullYear();
                        dateString = y+"-"+m+"-"+j;
                        var timing = converter.zeroInit($scope.minuteurs[d].data[i].h.getHours())+":"+
                                     converter.zeroInit($scope.minuteurs[d].data[i].h.getMinutes())+":"+
                                     converter.zeroInit($scope.minuteurs[d].data[i].h.getSeconds());
                        sqlButtonMinuteurs += " (" + $scope.preparation.usager.id + ", ";
                        sqlButtonMinuteurs += $scope.occurences[d].behavior.id + ", ";
                        sqlButtonMinuteurs += $scope.preparation.sit.id + ", ";
                        sqlButtonMinuteurs += converter.getDateInSeconds(dateString, timing) + ", ";
                        sqlButtonMinuteurs += converter.getTimerInSeconds($scope.minuteurs[d].data[i].d) + ", '";
                        sqlButtonMinuteurs += dateString + "')," 
                    }
                }
            }
        }

        sqlButtonMinuteurs = converter.setCharAt(sqlButtonMinuteurs, [sqlButtonMinuteurs.length-1], ';');
        if(sqlButtonMinuteurs == "INSERT INTO minuteurs (id_usager, id_comportement, id_situation, debut, duree, datestring) VALUE;") 
            sqlButtonMinuteurs = "-1";

        return sqlButtonMinuteurs;
    }

    function transfererProgramme()
    {
        var dateString;
        var sqlProgrammeData = "INSERT INTO reponses (id_usager, id_comportement, id_situation, debut, reaction, realisation, seul, guide, none, appr, datestring) VALUES";

        for(var d in $scope.apprentissages)
        {
            if($scope.apprentissages[d].data.length > 0)
            {
                for(var i in $scope.apprentissages[d].data)
                {
                    var j = converter.zeroInit($scope.apprentissages[d].data[i].debut.getDate());
                    var m = converter.zeroInit($scope.apprentissages[d].data[i].debut.getMonth()+1);
                    var y = $scope.apprentissages[d].data[i].debut.getFullYear();
                    dateString = y+"-"+m+"-"+j;         
                    var timing = converter.zeroInit($scope.apprentissages[d].data[i].debut.getHours())+":"+
                                 converter.zeroInit($scope.apprentissages[d].data[i].debut.getMinutes())+":"+
                                 converter.zeroInit($scope.apprentissages[d].data[i].debut.getSeconds());

                    sqlProgrammeData += " (" + $scope.preparation.usager.id+", ";
                    sqlProgrammeData += $scope.apprentissages[d].infos.id+", ";
                    sqlProgrammeData += $scope.preparation.sit.id + ", ";
                    sqlProgrammeData += converter.getDateInSeconds(dateString, timing)+", ";
                    sqlProgrammeData += converter.getTimerInSeconds($scope.apprentissages[d].data[i].reaction)+", ";
                    sqlProgrammeData += converter.getTimerInSeconds($scope.apprentissages[d].data[i].realisation)+", ";
                    sqlProgrammeData += $scope.apprentissages[d].data[i].seul+", ";
                    sqlProgrammeData += $scope.apprentissages[d].data[i].guide+", ";
                    sqlProgrammeData += $scope.apprentissages[d].data[i].none+", ";
                    sqlProgrammeData += "1, '";
                    sqlProgrammeData += dateString+"'),";
                }
            }
        }

        for(var d in $scope.maintiens)
        {
            if($scope.maintiens[d].data.length > 0)
            {
                for(var i in $scope.maintiens[d].data)
                {
                    var j = converter.zeroInit($scope.maintiens[d].data[i].debut.getDate());
                    var m = converter.zeroInit($scope.maintiens[d].data[i].debut.getMonth()+1);
                    var y = $scope.maintiens[d].data[i].debut.getFullYear();
                    dateString = y+"-"+m+"-"+j;         
                    var timing = converter.zeroInit($scope.maintiens[d].data[i].debut.getHours())+":"+
                                 converter.zeroInit($scope.maintiens[d].data[i].debut.getMinutes())+":"+
                                 converter.zeroInit($scope.maintiens[d].data[i].debut.getSeconds());

                    sqlProgrammeData += " (" + $scope.preparation.usager.id+", ";
                    sqlProgrammeData += $scope.maintiens[d].infos.id+", ";
                    sqlProgrammeData += $scope.preparation.sit.id + ", ";
                    sqlProgrammeData += converter.getDateInSeconds(dateString, timing)+", ";
                    sqlProgrammeData += converter.getTimerInSeconds($scope.maintiens[d].data[i].reaction)+", ";
                    sqlProgrammeData += converter.getTimerInSeconds($scope.maintiens[d].data[i].realisation)+", ";
                    sqlProgrammeData += $scope.maintiens[d].data[i].seul+", ";
                    sqlProgrammeData += $scope.maintiens[d].data[i].guide+", ";
                    sqlProgrammeData += $scope.maintiens[d].data[i].none+", ";
                    sqlProgrammeData += "0, '";
                    sqlProgrammeData += dateString+"'),";
                }
            }
        }        
        
        sqlProgrammeData = converter.setCharAt(sqlProgrammeData, [sqlProgrammeData.length-1], ';');   
        if(sqlProgrammeData == "INSERT INTO reponses (id_usager, id_comportement, id_situation, debut, reaction, realisation, seul, guide, none, appr, datestring) VALUE;")
            sqlProgrammeData = "-1";

        return sqlProgrammeData;
    }

    function transfererTasks()
    {
        console.log($scope.tasks);
    }

});
