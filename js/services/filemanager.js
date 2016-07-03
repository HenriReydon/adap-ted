app.factory('filemanager', function($http, $rootScope, cordovaFile)
{
    var reader = {};

    reader.checkDir = function()
    {
        $cordovaFile.checkDir(cordova.file.dataDirectory, 'CIBOdatafolder')
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }

    reader.checkFile = function()
    {
        $cordovaFile.checkFile(cordova.file.dataDirectory, 'local_bdd.json')
        .then(function (success)
        {
            if($scope.fileSystem.waitingCommand=="update local_bdd")
            {
                //build list
                var behavior_list = JSON.stringify($scope.behaviors_liste)
                writeExistingFile(file, behavior_list);
            }
            else if($scope.fileSystem.waitingCommand=="read local_bdd")
            {
                $scope.readAsText('local_bdd.json');
            }
        }, function (error) {
            $scope.createFile(file)
        });
    }

    reader.createDir = function()
    {
        $cordovaFile.createDir(cordova.file.dataDirectory, "CIBOdatafolder", false)
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }

    reader.createFile = function()
    {
        $cordovaFile.createFile(cordova.file.dataDirectory, 'local_bdd.json', true)
        .then(function (success) 
        {
            //build list
            var behavior_list = JSON.stringify($scope.behaviors_liste)
            writeExistingFile('local_bdd.json', behavior_list);
        }, function (error) 
        {
            // error
        });
    }

    reader.writeExistingFile = function(content)
    {
        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, 'local_bdd.json', content)
        .then(function (success) 
        {
            // success
        }, function (error) 
        {
            // error
        });
    }

    reader.readAsText = function()
    {
        $cordovaFile.readAsText(cordova.file.dataDirectory, 'local_bdd.json')
        .then(function (success) 
        {
            //$scope.behaviors = success ?
        }, function (error) 
        {
            // error
        });
    }

    reader.getFreeDiskSpace = function()
    {
        $cordovaFile.getFreeDiskSpace()
        .then(function (success) {
             // success in kilobytes
        }, function (error) {
              // error
        });
    }
    return reader;
});