'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.geo
 * @description
 * # geo
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('geo', ['$http', function ($http) {
    var url =  'https://maps.googleapis.com/maps/api/geocode/json?address=CHANGEA&key=AIzaSyB0N--7msHVuV2PypapDZUcbpLDngeVs2M';


    this.getAddress = function (address, callback) {
      var uri = url.replace('CHANGE', window.encodeURIComponent(address));
      $http({
        method: 'GET',
        url: uri,
        withCredentials: false
      }).then(function successCallback(response) {
        callback(response.data.results[0].geometry.location);
      }, function errorCallback() {
        callback(false);
      });

    }




  }]);
