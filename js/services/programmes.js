app.factory('programmes', function($http, $rootScope)
{
    var reader = {};
        reader.exe = function(id_usager, id_situation)
        {
			$http({
				method: 'GET',
				// url : 'http://www.adap-ted.com/scripts/get_programme.php',
				url : 'scripts/get_programmes.php',
				params: {'id_usager': id_usager, 'id_situation': id_situation}
			}).
			success(function(data, status, headers, config)
			{
				var tab_int = {};
				var tab_app = [];
				var tab_mai = [];

				for(var d in data['app'])
					tab_app.push({"id":d, "data":data['app'][d]})

				for(var d in data['mai'])
					tab_mai.push({"id":d, "data":data['mai'][d]})
				// console.log(tab_mai);
				tab_int = {"app": tab_app, "mai": tab_mai};
				$rootScope.$broadcast('programm_received', tab_int);
			});
		}
	return reader;
});