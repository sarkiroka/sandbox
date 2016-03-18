var zIDE = angular.module('z-ide', []);
var ctx = null;
zIDE.controller('z-ide', ['$scope', function ($scope) {
	initCanvas();
}]);

//TODO separate by functions

function initCanvas(){
	ctx = getCanvasContext();
	handleResizeEvent();
}

function getCanvasContext() {
	var c = document.getElementById('z-ide');
	return c.getContext('2d');
}

function handleResizeEvent() {
	window.addEventListener('resize', viewPortWasResized);
	viewPortWasResized();
}

function viewPortWasResized() {
	ctx.canvas.height = window.innerHeight;
	ctx.canvas.width = window.innerWidth;
	redraw();
}

function redraw() {
	ctx.rect(20, 20, 150, 200);
	ctx.stroke();
}
