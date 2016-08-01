'use strict';

angular.module('newApp')
  .controller('productCtrl', ['$scope', 'applicationService', 'pluginsService', function ($scope, applicationService, pluginsService) {
     $scope.$on('$destroy', function () {
          $('table').each(function () {
              if ($.fn.dataTable.isDataTable($(this))) {
                  $(this).dataTable({
                      "bDestroy": true
                  }).fnDestroy();
              }
          });
      });

        $scope.check = function(){
            var k =angular.element(document.querySelectorAll(".bootstrap-tagsinput"));
            var count = k[0].children.length;

            console.log(k[0].children);
            console.log(count);
            k[0].children[count-1].value = 'green';
            console.log(k[0].children[count-1].value);
        };


  }]);
