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

  }]);
