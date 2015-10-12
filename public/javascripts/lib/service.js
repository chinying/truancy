angular.module('attendance-rest-service', [])
  .factory('Attendance', ['$http', function($http){
    var baseURL = "http://localhost:3000";
    return {
      list: function(){
        return $http.get(baseURL + '/api/');
      },
      attended: function(_id, state){
        return $http.post(baseURL + '/api/lesson/'+ _id +'/attend/' + state);
      }
    };
  }]);
