var zIDE = angular.module('z-ide', []);
zIDE
	.controller('z-ide', ['$scope', 'canvas', function ($scope, canvas) {
		$scope.currentLevel = 0;
		$scope.objects = {};

		canvas.init($scope);

		addBox(0, 'egyik', 20, 20);
		addBox(0, 'másik', 320, 120);
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

	}])


	.factory('canvas', [function () {
		var ctx = null;
		var $scope;
		var drag = false;
		var canEdit = true;
		var canvasService = {
			init: function init(scope) {
				ctx = canvasService.getCanvasContext();
				ctx.font = '12px Arial';
				$scope = scope;
				canvasService.handleResizeEvent();
				canvasService.observeClickEvent();
				canvasService.observeDragEvent();
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
			observeDragEvent: function observeDragEvent() {
				var canvasElement = canvasService.getCanvasElement();
				canvasElement.addEventListener('mousedown', canvasService.handleCanvasMouseDown);
				canvasElement.addEventListener('mousemove', canvasService.handleCanvasMouseMove);
				canvasElement.addEventListener('mouseup', canvasService.handleCanvasMouseUp);
			},
			handleCanvasMouseDown: function handleCanvasMouseDown(e) {
				canvasService.iterateOnAllCurrentLevelItem(function (shape) {
					if (canvasService.isIn(e.clientX, e.clientY, shape)) {
						drag = {
							shape: shape,
							dx: e.clientX - shape.x,
							dy: e.clientY - shape.y
						};
					}
				});
			},
			handleCanvasMouseUp: function handleCanvasMouseUp(e) {
				drag = false;
				setTimeout(function () {
					canEdit = true;
				}, 100);
			},
			handleCanvasMouseMove: function handleCanvasMouseMove(e) {
				if (drag) {
					drag.shape.x = e.clientX - drag.dx;
					drag.shape.y = e.clientY - drag.dy;
					canEdit = false;
					canvasService.redraw();
				}
			},
			handleCanvasClick: function handleCanvasClick(e) {
				if (canEdit) {
					canvasService.iterateOnAllCurrentLevelItem(function (shape) {
						if (canvasService.isIn(e.clientX, e.clientY, shape)) {
							shape.onclick.call(shape);
						}
					});
				}
			},
			isIn: function isIn(x, y, shape) {
				return x > shape.x && x < shape.x + shape.w && y > shape.y && y < shape.y + shape.h;
			},
			redraw: function redraw() {
				console.log('redraw on ', $scope.currentLevel);
				canvasService.clear();
				ctx.beginPath();
				ctx.textBaseline = 'top';//nem lehet csak init-nél használni
				canvasService.iterateOnAllCurrentLevelItem(function (shape) {
					ctx.rect(shape.x, shape.y, shape.w, shape.h);
					ctx.fillText(shape.name, shape.x + 5, shape.y + 5);
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
