'use strict';

/**
 * @ngdoc function
 * @name flightFareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flightFareApp
 */
angular.module('flightFareApp')
  .controller('MainCtrl', function ($scope) {
    
    $scope.formData={
    	fromDt : new Date(),
    	toDt : new Date(),
    	minDate : new Date(),
    	fromDest: "MIA"
    }
	$scope.formData.toDt.setDate($scope.formData.fromDt.getDate() + 3);

	$scope.searchFlight = function(){

	}

  });
