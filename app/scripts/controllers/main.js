'use strict';

/**
 * @ngdoc function
 * @name flightFareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flightFareApp
 */

// var apiKey=0;

Date.prototype.toAPIdateString = function() {
  return this.getFullYear()+"-"+("0" + (this.getMonth() + 1)).slice(-2)+"-"+("0" + this.getDate()).slice(-2);
};

angular.module('flightFareApp')
  .controller('MainCtrl', function ($scope,$http) {
    
    $scope.formData={
    	fromDt : new Date(),
    	toDt : new Date(),
    	minDate : new Date(),
    	fromDest: "MIA"
    }
	$scope.formData.toDt.setDate($scope.formData.fromDt.getDate() + 3);

	$scope.searchFlight = function(){

    var params=
      {
        "request": {
          "passengers": {
            "adultCount": 1
          },
          "solutions":50,
          "maxPrice": ("USD "+250),
          "saleCountry":"US",
          "slice": [
            {
              "origin": $scope.formData.fromDest,
              "destination": $scope.formData.toDest,
              "date":  $scope.formData.fromDt.toAPIdateString(),
              "permittedDepartureTime": {
                "earliestTime": "HH:MM",
                "latestTime": "HH:MM"
              },
              "maxStops":0
            },
            {
              "origin": $scope.formData.toDest,
              "destination": $scope.formData.fromDest,
              "date":  $scope.formData.toDt.toAPIdateString(),
              "permittedDepartureTime": {
                "earliestTime": "HH:MM",
                "latestTime": "HH:MM"
              },
              "maxStops":0
            }
          ]
        }
      }


    $http.post("https://www.googleapis.com/qpxExpress/v1/trips/search?key="+qpxKey,params )
    .then(
      function(res){
        alert(JSON.stringify(res))
        /*
            {"data":{"kind":"qpxExpress#tripsSearch","trips":{"kind":"qpxexpress#tripOptions","requestId":"DkpFTCAMUuUlcSmCD0Np0B","data":{"kind":"qpxexpress#data"}}},"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"url":"https://www.googleapis.com/qpxExpress/v1/trips/search?key=KEY HERE","data":{"request":{"passengers":{"adultCount":1},"slice":[{"origin":"MIA","destination":"BOS","date":"2016-02-19"},{"origin":"BOS","destination":"MIA","date":"2016-02-22"}]}},"headers":{"Accept":"application/json, text/plain, ","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"}"
        */
        
      },
      function(res){
        alert(JSON.stringify(res))}
    )
	}

  });
