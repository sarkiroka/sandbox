var zIDE = angular.module('z-ide', []);
zIDE.controller('z-ide', ['$scope', function ($scope) {
	var ctx = null;
	$scope.currentLevel = 0;
	$scope.objects = {};

	initCanvas();

	addShape('egyik', 20, 20, function () {
		console.log('itt')
	});
	addShape('másik', 320, 120, function () {
		console.log('ott')
	});

	//TODO separate by functions

	function initCanvas() {
		ctx = getCanvasContext();
		handleResizeEvent();
		observeClickEvent();
	}

	function getCanvasContext() {
		var canvas = getCanvasElement();
		return canvas.getContext('2d');
	}

	function getCanvasElement() {
		return document.getElementById('z-ide');
	}

	function handleResizeEvent() {
		window.addEventListener('resize', viewPortWasResized);
		viewPortWasResized();
	}

	function observeClickEvent() {
		var canvas = getCanvasElement();
		canvas.addEventListener('click', handleCanvasClick);
	}

	function handleCanvasClick(e) {
		iterateOnAllCurrentLevelItem(function (shape) {
			if (isIn(e.clientX, e.clientY, shape)) {
				shape.onclick();
			}
		});
	}

	function isIn(x, y, shape) {
		return x > shape.x && x < shape.x + shape.w && y > shape.y && y < shape.y + shape.h;
	}

	function viewPortWasResized() {
		ctx.canvas.height = window.innerHeight;
		ctx.canvas.width = window.innerWidth;
		redraw();
	}

	function addShape(name, x, y, onclick) {
		if (typeof $scope.objects[$scope.currentLevel] == 'undefined') {
			$scope.objects[$scope.currentLevel] = [];
		}
		$scope.objects[$scope.currentLevel].push({name: name, x: x, y: y, w: 150, h: 200, onclick: onclick});
		redraw();
	}

	function redraw() {
		iterateOnAllCurrentLevelItem(function (shape) {
			ctx.rect(shape.x, shape.y, shape.w, shape.h);
		});
		ctx.stroke();
	}

	function iterateOnAllCurrentLevelItem(eachCallback) {
		if (typeof $scope.objects[$scope.currentLevel] == 'object') {
			for (var i = 0, iMax = $scope.objects[$scope.currentLevel].length; i < iMax; i++) {
				var shape = $scope.objects[$scope.currentLevel][i];
				eachCallback(shape);
			}
		}
	}
}]);
