var socket = io();
var x = 42;
setInterval(function () {
	socket.emit('test', x);
}, 1000);
socket.on('message', function (msg) {
	x = msg;
	console.log(msg);
});
var SFKB = angular.module('sfkb', []);
SFKB.controller('amoba', ['$scope', function ($scope) {
	$scope.login = function (name) {
		socket.emit('username', name);
		socket.on('username accepted', function (username) {
			$scope.username = username;
			$scope.$apply();
		});
		socket.on('username declined', function () {
			delete $scope.username;
			$scope.$apply();
		})
	}
}]);
