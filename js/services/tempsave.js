app.factory('tempsave', function($http, $rootScope)
{
    var reader = {};

    reader.exe = function(data)
    {
		$http({
		    method: 'POST',
		    url: 'scripts/write_json.php',
		    data: {data}
		});
    };
    return reader;
});