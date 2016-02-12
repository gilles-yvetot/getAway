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
    
    $scope.fromDt = new Date();
    $scope.toDt = new Date();

  });
