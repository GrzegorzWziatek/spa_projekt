'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.geo
 * @description
 * # geo
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('geo', ['$http', '$q', function ($http, $q) {
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

    this.getMultipleAddress = function(data, callback) {
      var uri;
      var promises = []
      for (var i=0; i< data.length; i++) {
        uri = url.replace('CHANGE', window.encodeURIComponent(data[i]))
        promises.push(
          $http({
          method: 'GET',
          url: uri,
          withCredentials: false
        }));
      }

      $q.all(promises).then(function(res) {
        var ret = {
          from: res[0].data.results[0].geometry.location,
          to: res[1].data.results[0].geometry.location
        }

        callback(ret)

      })

    }




  }]);
