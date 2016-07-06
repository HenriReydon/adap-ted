app.controller('homeCtrl', function($scope, $ionicPopup, $timeout, 
                                    $state)
{
    $scope.checkCode = function()
    {
        code.exe($scope.codeInterface.text);
    }    

    $scope.$on('local_load', function(event, data)
    {
        console.log(data);
    });


    $scope.$on('valCheckCode', function(event, data)
    {
        if(data == 1) 
        {
            $scope.parameters.disabled_ref_button = false;
            $scope.parameters.classCode = "valid";
        } 
        else 
        {
            $scope.parameters.disabled_ref_button = true;
            $scope.parameters.classCode = "wrong";
        }
    });

	$scope.buildInterface = function()
    {
        interfaces.exe($scope.codeInterface.text);      
        $state.go("tabs.interface");
    }

    $scope.appIsRunning = function()
    {
        alert("L'application est en cours d'utilisation. Transferez, sauvegardez ou supprimez les données existantes si vous souhaitez changer d'interface.");
    }
});