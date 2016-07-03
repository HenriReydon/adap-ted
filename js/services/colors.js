app.factory('colors', function() 
{
	var pal = {};

	pal.palette_occ = function(position)
	{
		var colors = ['#8c510a','#d8b365','#d73027','#1b7837','#5ab4ac','#01665e'];
		var color = "";
		var position = parseInt(position);
		switch(position)
		{
			case 0: color = colors[3]; break;
			case 1: color = colors[0]; break;
			case 2: color = colors[4]; break;
			case 3: color = colors[2]; break;
			case 4: color = colors[1]; break;
			case 5: color = colors[5]; break;
		}
		return color;
	}

	pal.palette_min = function(position)
	{
		var colors = ['#fc8d59','#af8dc3','#d53e4f', '#3288bd'];
		var color = "";
		var position = parseInt(position);
		switch(position)
		{
			case 0: color = colors[3]; break;
			case 1: color = colors[1]; break;
			case 2: color = colors[0]; break;
			case 3: color = colors[2]; break;
		}
		return color;
	}

	return pal;
});