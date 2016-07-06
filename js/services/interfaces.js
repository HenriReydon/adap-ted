app.factory('interfaces', function($http, $rootScope)
{
	var randomize = function(tab){
		for(var mel = 0; mel <= tab.length; mel++){
			var first = Math.floor(Math.random() * ((tab.length-1) - 0));
			var second = Math.floor(Math.random() * ((tab.length-1) - 0));
			var tmp = tab[first];
			tab[first] = tab[second];
			tab[second] = tmp;
		}
	}

    var reader = {};
        reader.exe = function(codeInterface)
        {
			$http({
				method: 'GET',
				// url : 'http://www.adap-ted.com/scripts/load_interface_data.php?c='+codeInterface,
				url : 'scripts/load_interface_data.php?c='+codeInterface,
			}).
			success(function(data, status, headers, config)
			{
				
				var tab_int = {};
				var tab_usg = [];
				var tab_sit = [];
				// var tab_app = [];
				// var tab_mai = [];
				var tab_occ = [];
				var tab_min = [];

				//On récupère les comportements envahissants (occurences et timers)
				for(var d in data['occ'])
					tab_occ.push({"id":d, "name":data['occ'][d]})

				for(var d in data['min'])
					tab_min.push({"id":d, "name":data['min'][d]})

				for(var d in data['usager']){
					tab_usg.push({"id":d, "name": data['usager'][d]});
				}

				for(var d in data['situation'])
					tab_sit.push({"id":d, "name": data['situation'][d]});

				// tab_int = {"occ": tab_occ, "min": tab_min, "app": tab_app, "mai": tab_mai, "kid": tab_usg, "sit": tab_sit};
				tab_int = {"occ": tab_occ, "min": tab_min, "kid": tab_usg, "sit": tab_sit};
				$rootScope.$broadcast('interface_received', tab_int);
			}).
			error(function(data, status, headers, config)
			{
				console.log('Erreur lecture comportements');
			});
        };
    return reader;
});