app.factory('colors', function() 
{
	var pal = {};

	pal.palette_occ = function(position)
	{
		var colors = [['#AD6E24', '#8c510a', '#663700'],
					['#d8b365', '#B18B39', '#896517'],
					['#E85850', '#d73027', '#AC1A12'],
					['#328F4E', '#1b7837', '#075C21'],
					['#89D4CF', '#5ab4ac', '#38968F'],
					['#0C7B73', '#01665e', '#00504A']];
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

	pal.palette_pro = function(position)
	{
		var colors = ['#4A6169','#4A6169','#4A6169', '#4A6169'];
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