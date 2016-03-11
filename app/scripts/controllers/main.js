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

  function formatTripOption(data){

    data.trips.tripOption.forEach(function(trip){
      trip.slice.forEach(function(slice){
        slice.segment.forEach(function(segment){

          data.trips.data.carrier.forEach(function(el){
            if(el.code==segment.flight.carrier)
              segment.flight.carrierName = el.name
          })

          segment.leg.forEach(function(leg){
            data.trips.data.airport.forEach(function(airport){
              if(leg.origin==airport.code)
                leg.originName = airport.name;
              if(leg.destination == airport.code)
                leg.destinationName = airport.name;
            })
          })

        })
      })
    })

    return data.trips.tripOption
  }
  function getCleanTime(dt)
  {
    if(dt)
    {
      var h = dt.getHours(),
          m = dt.getMinutes()
      if(h<10)
        h="0"+h;
      if(m<10)
        m="0"+m;
      return h+":"+m
    }
  }

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

      if (!!$scope.formData.departureTimeEnable){
        params.request.slice[0].permittedDepartureTime.earliestTime 
            = getCleanTime($scope.formData.fromEarliestTime)||"00:00"
        params.request.slice[0].permittedDepartureTime.latestTime 
            = getCleanTime($scope.formData.fromLatestTime)||"23:59"
      }
      if (!!$scope.formData.arrivalTimeEnable){
        params.request.slice[1].permittedDepartureTime.earliestTime 
            = getCleanTime($scope.formData.toEarliestTime)||"00:00"
        params.request.slice[1].permittedDepartureTime.latestTime 
            = getCleanTime($scope.formData.toLatestTime)||"23:59"
      }

    // $http.post("https://www.googleapis.com/qpxExpress/v1/trips/search?key="+qpxKey,params )
    // .then(
    //   function(res){
    //     alert(JSON.stringify(res))
    //   },
    //   function(res){
    //     alert(JSON.stringify(res))}
    // )
	}
    var data = formatTripOption(mockup);
    //console.dir(data)
    $scope.trips= data;

  });

