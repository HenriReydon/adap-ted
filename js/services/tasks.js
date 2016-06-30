app.factory('tasks', function($http, $rootScope)
{
    var reader = {};
        reader.exe = function(id_usager, id_situation)
        {
			$http({
				method: 'GET',
				// url : 'http://www.adap-ted.com/scripts/get_tasks.php',
				url : 'scripts/get_tasks.php',
				params: {'id_usager': id_usager, 'id_situation': id_situation}
			}).
			success(function(data, status, headers, config)
			{
				var tab_tasks = [];
				if(data != -1)
				{
					var first = 0;
					for(var d in data)
					{
							var lastStep = 1;
							var steps = [];

							while(data[d].steps[lastStep])
							{
								steps.push({'infos': data[d].steps[lastStep]})
								lastStep++;
							}
								
							if(first == 0)
								tab_tasks.push({"id": data[d].infos.id, 
															"intitule": data[d].infos.intitule, 
															"description": data[d].infos.description, 
															"steps": steps, 
															"data": [],
															"currentStep": 0,
															"class": "button button-small button-stable no-border-bottom",
															"show": true,
															"disabled": false,
															"nbStep": (lastStep-1)});
							else tab_tasks.push({"id": data[d].infos.id, 
															"intitule": data[d].infos.intitule, 
															"description": data[d].infos.description, 
															"steps": steps,  
															"data": [],
															"currentStep": 0,
															"class": "button button-small button-light",
															"show": false,
															"disabled": false,
															"nbStep": (lastStep-1)});
						first++;
					}
				}
				else 
				{
					tab_tasks.push({"id": 0, 
												"intitule": "Aucune tâche trouvée.", 
												"description": "Aucune informations.", 
												"steps": [{"infos": {"id": 0, "intitule": "Aucune informations", "description": "Aucune informations"}}],
												"currentStep": 0,
												"class": "button button-small button-stable",
												"show": true,
												"disabled": true,
												"nbStep": 3});					
				}
				$rootScope.$broadcast('tasks_received', tab_tasks);
			});
		}
	return reader;
});