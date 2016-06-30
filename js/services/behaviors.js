app.factory('behaviors', function($http, $rootScope)
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
        reader.exe = function()
        {
			$http({
				method: 'GET',
				// url : 'http://www.adap-ted.com/scripts/read_behavior.php',
				url : 'scripts/read_behaviors.php',
			}).
			success(function(data, status, headers, config)
			{
				//METTRE UN TIMER ?????
				var tab_pgm = {};
				var tab_app = [];
				var tab_mai = [];
				var tab_occ = [];
				var tab_min = [];

				//On récupère les comportements envahissants (occurences et minuteurs)
				for(var d in data['occ'])
				{
					var nom = (data['occ'][d].length > 34) ? data['occ'][d].substring(0, 33) + "..." : data['occ'][d];
					tab_occ.push({"id":d, "name":nom})
				}
				for(var d in data['min'])
				{
					var nom = (data['min'][d].length > 34) ? data['min'][d].substring(0, 33) + "..." : data['min'][d];
					tab_min.push({"id":d, "name":nom})
				}

				//On récupère la liste des aprentissages
				for(var d in data['app'])
					tab_app.push({"id":d, "name":data['app'][d]})
				//On mélange la liste
				randomize(tab_app);

				//Récupération de la liste des maintiens
				for(var d in data['mai'])
					tab_mai.push({"id":d, "name":data['mai'][d]})
				//Mélange
				randomize(tab_mai);

				tab_pgm = {"app": tab_app, "mai": tab_mai, "occ": tab_occ, "min": tab_min};
				$rootScope.$broadcast('cpts_received', tab_pgm);
			}).
			error(function(data, status, headers, config)
			{
				console.log('Erreur lecture comportements');
			});
        };
    return reader;
});