app.factory('behaviors', function($http, $rootScope)
{
	var randomize = function(tab)
	{
		for(var mel = 0; mel <= tab.length; mel++)
		{
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
		var tab_app = [];
		var tab_mai = [];
		var tab_occ = [{"id":"1","name":"Imitation verbale","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"2","name":"Se pince les doigts","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"3","name":"Range son stylo","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"4","name":"Claque sur le visage","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"10","name":"Sort ses affaires","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"11","name":"Lève le doigt","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"12","name":"Crie","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"14","name":"Mordre le doigt","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"15","name":"Jet d'objets","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"16","name":"Met en bouche","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"17","name":"Se lève","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"20","name":"tape au visage","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"22","name":"Griffe","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"23","name":"main dans le pantalon","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"24","name":"pince","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"25","name":"Se secoue","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"26","name":"Tape mon bras\/main","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"27","name":"Attrape ma gorge","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"28","name":"Attrape mon poignet","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"30","name":"Tape la table","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"31","name":"griffe doigt","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"32","name":"tape sur le nez","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"34","name":"doigt dans le nez","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"35","name":"tape baton sur le nez","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"36","name":"cligner yeux","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"37","name":"Crie en jouant","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"38","name":"Dis non ","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"39","name":"porte la main au visage","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}, {"id":"40","name":"Lèche ","description":"Aucune description","occurence":"1","duree":"0","consigne":"0","id_categorie":"1"}];
		var tab_min = [{"id":"5","name":"Fait du Flapping","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"6","name":"Pousse un cri continu","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"7","name":"Temps attention","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"8","name":"Joue avec ses cheveux","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"9","name":"St\u00e9r\u00e9otypies verbales","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"18","name":"Court","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"21","name":"st\u00e9r\u00e9otypie doigts","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"29","name":"Me mord","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}, {"id":"33","name":"se regarde dans un reflet","description":"Aucune description","occurence":"0","duree":"1","consigne":"0","id_categorie":"1"}];
		
		tab_pgm = {"app": tab_app, "mai": tab_mai, "occ": tab_occ, "min": tab_min};
		$rootScope.$broadcast('cpts_received', tab_pgm);
    };
    return reader;
});


