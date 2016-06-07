var socket = io();
var SFKB = angular.module('sfkb', []);
SFKB.controller('amoba', ['$scope', function ($scope) {
	$scope.login = function (name) {
		socket.emit('username', name);
	};
	$scope.challenge = function (user) {
		socket.emit('challenge', user);
	};
	$scope.challengers = [];
	$scope.challengeAccepted = function (acceptedUser) {
		for (var i = 0; i < $scope.challengers.length; i++) {
			var user = $scope.challengers[i];
			$scope.challengeRejected(user);
		}
		socket.emit('challenge accepted', acceptedUser);
	};
	$scope.challengeRejected = function (user) {
		socket.emit('challenge rejected', user);
	};
	socket.on('username accepted', function (username) {
		$scope.username = username;
		$scope.state = 'noop';
		$scope.$apply();
	});
	socket.on('username declined', function () {
		delete $scope.username;
		$scope.$apply();
	});
	socket.on('userlist', function (userlist) {
		$scope.userlist = userlist;
		$scope.$apply();
	});
	socket.on('challenge', function (user) {
		$scope.challengers.push(user);
		$scope.$apply();
	});
	socket.on('game', function (msg) {
		$scope.challengers = [];
		$scope.state = 'game';
		$scope.$apply();
	});
}]);
