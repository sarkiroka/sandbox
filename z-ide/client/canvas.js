function canvas(){
	var ctx = null;
	var $scope;
	var drag = false;
	var canEdit = true;
}
canvas.init= function init(scope) {
	ctx = canvas.getCanvasContext();
	ctx.font = '12px Arial';
	$scope = scope;
	canvas.handleResizeEvent();
	canvas.observeClickEvent();
	canvas.observeDragEvent();
};
canvas.getCanvasElement= function getCanvasElement() {
	return document.getElementById('z-ide');
};
canvas.getCanvasContext= function getCanvasContext() {
	var canvasElement = canvas.getCanvasElement();
	return canvasElement.getContext('2d');
};
canvas.handleResizeEvent= function handleResizeEvent() {
	window.addEventListener('resize', canvas.viewPortWasResized);
	canvas.viewPortWasResized();
};
canvas.viewPortWasResized= function viewPortWasResized() {
	ctx.canvas.height = window.innerHeight;
	ctx.canvas.width = window.innerWidth;
	canvas.redraw();
};
canvas.observeClickEvent= function observeClickEvent() {
	var canvasElement = canvas.getCanvasElement();
	canvasElement.addEventListener('click', canvas.handleCanvasClick);
};
canvas.observeDragEvent= function observeDragEvent() {
	var canvasElement = canvas.getCanvasElement();
	canvasElement.addEventListener('mousedown', canvas.handleCanvasMouseDown);
	canvasElement.addEventListener('mousemove', canvas.handleCanvasMouseMove);
	canvasElement.addEventListener('mouseup', canvas.handleCanvasMouseUp);
};
canvas.handleCanvasMouseDown= function handleCanvasMouseDown(e) {
	canvas.iterateOnAllCurrentLevelItem(function (shape) {
		if (canvas.isIn(e.clientX, e.clientY, shape)) {
			canvas.drag = {
				shape: shape,
				dx: e.clientX - shape.x,
				dy: e.clientY - shape.y,
				originalX: shape.x,
				originalY: shape.y
			};
			shape.current = true;
		}
	});
};
canvas.handleCanvasMouseUp= function handleCanvasMouseUp(e) {
	if (canvas.drag) {
		delete canvas.drag.shape.current;
		canvas.redraw();
		if (canvas.isIgnorableMovement()) {
			canvas.restoreDargBeforePosition();
			canEdit = true;
		} else {
			setTimeout(function () {
				canEdit = true;
			}, 100);
		}
		canvas.drag = false;
	}
};
canvas.restoreDargBeforePosition= function restoreDargBeforePosition() {
	if (canvas.drag) {
		canvas.drag.shape.x = canvas.drag.originalX;
		canvas.drag.shape.y = canvas.drag.originalY;
		canvas.redraw();
	}
};
canvas.isIgnorableMovement= function isIgnorableMovement() {
	var dx = Math.abs(canvas.drag.originalX - canvas.drag.shape.x);
	var dy = Math.abs(canvas.drag.originalY - canvas.drag.shape.y);
	return dx + dy < 5;
};
canvas.handleCanvasMouseMove= function handleCanvasMouseMove(e) {
	if (canvas.drag) {
		canvas.drag.shape.x = e.clientX - canvas.drag.dx;
		canvas.drag.shape.y = e.clientY - canvas.drag.dy;
		canEdit = false;
		canvas.redraw();
	}
};
canvas.handleCanvasClick= function handleCanvasClick(e) {
	if (canEdit) {
		canvas.iterateOnAllCurrentLevelItem(function (shape) {
			if (canvas.isIn(e.clientX, e.clientY, shape)) {
				shape.onclick.call(shape);
			}
		});
	}
};
canvas.isIn= function isIn(x, y, shape) {
	return x > shape.x && x < shape.x + shape.w && y > shape.y && y < shape.y + shape.h;
};
canvas.redraw= function redraw() {
	console.log('redraw on ', $scope.currentLevel);
	canvas.clear();
	ctx.textBaseline = 'top';//nem lehet csak init-nél használni
	var current = null;
	canvas.iterateOnAllCurrentLevelItem(function (shape) {
		if (shape.current) {
			current = shape;
		} else {
			canvas.drawShape(shape);
		}
	});
	if (current) {
		canvas.drawShape(current);
	}
};
canvas.drawShape= function drawShape(shape) {
	ctx.beginPath();
	ctx.fillStyle = '#ccc';
	ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
	ctx.fillStyle = '#000000';
	ctx.rect(shape.x, shape.y, shape.w, shape.h);
	ctx.stroke();
	ctx.fillText(shape.name, shape.x + 5, shape.y + 5);
	ctx.closePath();
};
canvas.iterateOnAllCurrentLevelItem= function iterateOnAllCurrentLevelItem(eachCallback) {
	if (typeof $scope.objects[$scope.currentLevel + ''] == 'object') {
		for (var i = 0, iMax = $scope.objects[$scope.currentLevel + ''].length; i < iMax; i++) {
			var shape = $scope.objects[$scope.currentLevel + ''][i];
			eachCallback(shape);
		}
	}
};
canvas.clear= function clear() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
canvas.registerZoom= function registerZoom(onZoom) {
	ctx.canvas.addEventListener('DOMMouseScroll', handleScroll);
	ctx.canvas.addEventListener('mousewheel', handleScroll)
	function handleScroll(e) {
		var delta = e.wheelDelta ? e.wheelDelta / 40 : e.detail ? -e.detail : 0;
		if (delta) {
			onZoom(delta);
		}
		e.preventDefault();
	}
};
