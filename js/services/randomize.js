app.factory('randomize', function() 
{
	var rdm = {};

	rdm.exe = function(tab)
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

	return rdm;
});




