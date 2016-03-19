var zIDE = angular.module('z-ide', []);
zIDE
	.controller('z-ide', ['$scope', 'canvas', function ($scope, canvas) {
		$scope.currentLevel = 0;
		$scope.objects = {};

		canvas.init($scope);

		addBox(0, 'egyik', 20, 20, function () {
			console.log('itt')
		});
		addBox(0, 'másik', 320, 120, function () {
			console.log('ott')
		});
		addBox(1, 'benne', 220, 70, function () {
			console.log('zoom')
		});

		//TODO separate by functions

		function addBox(level, name, x, y, onclick) {
			if (typeof $scope.objects[level + ''] == 'undefined') {
				$scope.objects[level + ''] = [];
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

	}])


	.factory('canvas', [function () {
		var ctx = null;
		var $scope;
		var canvasService = {
			init: function init(scope) {
				ctx = canvasService.getCanvasContext();
				$scope = scope;
				canvasService.handleResizeEvent();
				canvasService.observeClickEvent();
			},
			getCanvasElement: function getCanvasElement() {
				return document.getElementById('z-ide');
			},
			getCanvasContext: function getCanvasContext() {
				var canvasElement = canvasService.getCanvasElement();
				return canvasElement.getContext('2d');
			},
			handleResizeEvent: function handleResizeEvent() {
				window.addEventListener('resize', canvasService.viewPortWasResized);
				canvasService.viewPortWasResized();
			},
			viewPortWasResized: function viewPortWasResized() {
				ctx.canvas.height = window.innerHeight;
				ctx.canvas.width = window.innerWidth;
				canvasService.redraw();
			},
			observeClickEvent: function observeClickEvent() {
				var canvasElement = canvasService.getCanvasElement();
				canvasElement.addEventListener('click', canvasService.handleCanvasClick);
			},
			handleCanvasClick: function handleCanvasClick(e) {
				canvasService.iterateOnAllCurrentLevelItem(function (shape) {
					if (canvasService.isIn(e.clientX, e.clientY, shape)) {
						shape.onclick();
					}
				});
			},
			isIn: function isIn(x, y, shape) {
				return x > shape.x && x < shape.x + shape.w && y > shape.y && y < shape.y + shape.h;
			},
			redraw: function redraw() {
				console.log('redraw on ', $scope.currentLevel);
				canvasService.clear();
				ctx.beginPath();
				canvasService.iterateOnAllCurrentLevelItem(function (shape) {
					ctx.rect(shape.x, shape.y, shape.w, shape.h);
				});
				ctx.stroke();
				ctx.closePath();
			},
			iterateOnAllCurrentLevelItem: function iterateOnAllCurrentLevelItem(eachCallback) {
				if (typeof $scope.objects[$scope.currentLevel + ''] == 'object') {
					for (var i = 0, iMax = $scope.objects[$scope.currentLevel + ''].length; i < iMax; i++) {
						var shape = $scope.objects[$scope.currentLevel + ''][i];
						eachCallback(shape);
					}
				}
			},
			clear: function clear() {
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			},
			registerZoom: function registerZoom(onZoom) {
				ctx.canvas.addEventListener('DOMMouseScroll', handleScroll);
				ctx.canvas.addEventListener('mousewheel', handleScroll)
				function handleScroll(e) {
					var delta = e.wheelDelta ? e.wheelDelta / 40 : e.detail ? -e.detail : 0;
					if (delta) {
						onZoom(delta);
					}
					e.preventDefault();
				}
			}
		};
		return canvasService;
	}]);
