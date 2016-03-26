window.addEventListener('load', function () {
	var $scope = {};
	$scope.currentLevel = 0;
	$scope.objects = {};

	canvas.init($scope);

	addBox(0, 'egyik', 20, 20);
	addBox(0, 'másik', 320, 120);
	addBox(0, 'harmadik', 120, 200);
	addBox(1, 'benne', 220, 70);

	//TODO separate by functions

	function addBox(level, name, x, y, onclick) {
		if (typeof $scope.objects[level + ''] == 'undefined') {
			$scope.objects[level + ''] = [];
		}
		if (typeof onclick == 'undefined') {
			onclick = function () {
				(function (shape) {
					setTimeout(function () {//csak hogy aszinron legyen a későbbiek miatt
						var newName = prompt('Mi legyen az új név?', shape.name);
						if (typeof newName == 'string') {
							shape.name = newName;
							canvas.redraw();
						}
					}, 1);
				})(this);
			}
		}
		$scope.objects[level + ''].push({name: name, x: x, y: y, w: 150, h: 200, onclick: onclick});
		canvas.redraw();
	}

	canvas.registerZoom(onZoom);

	function onZoom(direction) {
		if (direction > 0) {
			$scope.currentLevel++;
		} else {
			$scope.currentLevel--;
		}
		canvas.redraw();
	}
});
