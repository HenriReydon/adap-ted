app.directive('interface', function($state, $location, $timeout, $rootScope, $compile)
{
	return {
		restrict: 'A',
		link: function ($scope, $element, $attrs)
		{
			console.log($attrs);
			var race = $attrs.race;
			rotation();

			$attrs.$observe('race', function(attr)
			{
				race = attr;
				rotation();
			});
			
			function rotation()
			{
				if(race==-2 || race==-1)
				{
					$element.removeClass('right');
					$element.addClass('left');
				}
				else if(race==0)
				{
					$element.removeClass('left');
					$element.removeClass('right');
				}
				else if(race==1 || race==2)
				{
					$element.removeClass('left');
					$element.addClass('right');			
				}
			}
		}
	};
});