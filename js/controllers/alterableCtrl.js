app.controller('alterableCtrl', function($scope, bulles, $timeout, colors, behaviors, /*$cordovaFile*/)
{

    $scope.removeCpt = function (tab, obj)
    {
        var index = 0;
        while((index < tab.length) && (tab[index].id != obj.id))
            index++;
        if((index < tab.length))
            tab.splice(index, 1);
    }

    $scope.colors = ["red", "blue", "yellow", "green", "black", "white"];

    $scope.cpts = [];

    $scope.$on('cpts_received', function(event, data)
    {
        $scope.cpts = data;
    });

    $scope.$on('cpts_received', function(event, data)
    {
        $scope.behavior.occurences = data.occ;
        $scope.behavior.minuteurs = data.min;
        $scope.behavior.maintiens = data.mai;
        $scope.behavior.apprentissages = data.app;
        init();
    });
    $scope.checkDir = function()
    {
        $cordovaFile.checkDir(cordova.file.dataDirectory, "dir/other_dir")
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }
        
    $scope.checkFile = function()
    {
        $cordovaFile.checkFile(cordova.file.dataDirectory, "some_file.txt")
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }
    $scope.createDir = function()
    {
        $cordovaFile.createDir(cordova.file.dataDirectory, "new_dir", false)
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }

    $scope.createFile = function()
    {
        $cordovaFile.createFile(cordova.file.dataDirectory, "new_file.txt", true)
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }
    $scope.writeExistingFile = function()
    {
        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "file.txt", "text")
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }

    $scope.writeExistingFile = function()
    {
        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "file.txt", "text")
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }
    $scope.readAsText = function()
    {
        $cordovaFile.readAsText(cordova.file.dataDirectory, $scope.inputs.readFile)
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }

    $scope.getFreeDiskSpace = function()
    {
        $cordovaFile.getFreeDiskSpace()
        .then(function (success) {
             // success in kilobytes
        }, function (error) {
              // error
        });
    }

    function init()
    {
        for(var i=0; i<=7; i++)
        {
            if(i==6)
                $scope.occurences.push({"mode":false, "exist": true});//false mean + button
            else
                $scope.occurences.push({"tick":0, "mode": true, "exist": false, 'style': 'border-color: '+colors.palette_occ(i)+"; color:#fddbc7 !important; background-color:"+colors.palette_occ(i), "data": []});//false mean + button
        }

        for(var i=0; i<=4; i++)
        {
            if(i==4)
                $scope.minuteurs.push({"mode":false, "exist": true});//false mean + button
            else
                $scope.minuteurs.push({"hourTmp":"", "min":00, "sec":00, "msec":0, "occurrences":0, 'timer': undefined, "mode": true, "exist": false, 'style': 'border-color: '+colors.palette_min(i)+"; color: #fddbc7 !important; background-color:"+colors.palette_min(i), "data": []});//false mean + button
        }
    }

    $scope.addOccurence = function()
    {
        for(var o in $scope.occurences)
        {
            if(!$scope.occurences[o].exist)
            {
                var max_occ = false;
                if(o==5) max_occ = true;
                    bulles.behavior($scope, $scope.behavior.occurences, $scope.occurences, max_occ, o);
                break;
            }
        }
    }

    $scope.helpOccurence = function()
    {

    }

    $scope.addMinuteur = function()
    {
        for(var o in $scope.minuteurs)
        {
            if(!$scope.minuteurs[o].exist)
            {
                var max_min = false;
                if(o==3) max_min = true;
                bulles.behavior($scope, $scope.behavior.minuteurs, $scope.minuteurs, max_min, o);
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
        //$scope.parameters.displayUL= true;
    }

    $scope.addBehavior = function(buttons, behavior)
    {
        buttons[index].exist=true;
        buttons[index].behavior=$scope.chosen_bhv;
        //$scope.removeBehavior(behaviors, $scope.chosen_bhv);
        $scope.parameters.displayUL = false;
        $scope.parameters.activateValid = false;
        if(is_max)//If the maximum button is reached, hide the + button concerned
            buttons[parseInt(index)+1].exist = false;
        if()
    }
});