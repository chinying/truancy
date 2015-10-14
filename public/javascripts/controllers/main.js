angular.module('attendance-controller', [])
  .controller('mainController', ['$scope', '$http', 'Attendance', function($scope, $http, Lesson){

    //debug
    window.SCOPE = $scope;

    //GET request
    Lesson.list()
      .success(function(data){
        $scope.lessons = data;
        var t = parseData();
        $scope.totalTime = t.totalDuration;
        $scope.hoursAttended = t.hoursAttended;
        $scope.lessonsAttended = t.lessonsAttended;
        $scope.attendancePercentage =  t.percentage;
      });

    $scope.attend = function(e){
      var parentId = e.target.parentElement.parentElement.id;
      var flag = (e.target.parentElement.parentElement.classList.contains('lesson-attended')) ? 0 : 1;
      console.log(parentId, flag);
      parentId = parentId.split('-');
      parentId = parentId[1];
      Lesson.attended(parentId, flag)
        .success(function(data){
          $(e.target.parentElement.parentElement).toggleClass('lesson-attended');
          if (flag){
            updateStats(parentId, 1);
            //console.log("should increment");
          } else{
            updateStats(parentId, -1);
            //console.log("decrement");
          }
          console.log(data);
        });
      //console.log(parentId + " got clicked");
      //console.log(classes);
    }

    //private methods

    var parseData = function(){
      var lessons = $scope.lessons;
      var N = lessons.length;
      var totalDuration = 0;
      var hoursAttended = 0;
      var lessonsAttended = 0;
      for (i=0; i<N; i++){
        totalDuration += lessons[i].duration;
        if (lessons[i].attended){
          hoursAttended += lessons[i].duration;
          lessonsAttended++;
        }
      }

      return {
        'totalDuration' : totalDuration,
        'hoursAttended' : hoursAttended,
        'lessonsAttended' : lessonsAttended,
        'percentage' : hoursAttended / totalDuration * 100
      };
    };

    var updateStats = function(_id, flag){
      $scope.hoursAttended += (flag)*($scope.lessons[_id].duration);
      $scope.lessonsAttended += (flag);

      //needs to be recalculated
      $scope.attendancePercentage = ($scope.hoursAttended / $scope.totalTime) * 100;
    };

  }]);
