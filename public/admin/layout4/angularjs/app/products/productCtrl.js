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

var tagsData = [
  {id:1,tag:'Apple'},
  {id:2,tag:'Banana'},
  {id:3,tag:'Cherry'},
  {id:4,tag:'Cantelope'},
  {id:5,tag:'Grapefruit'},
  {id:6,tag:'Grapes',selected:true},
  {id:7,tag:'Lemon'},
  {id:8,tag:'Lime'},
  {id:9,tag:'Melon',selected:true},
  {id:10,tag:'Orange'},
  {id:11,tag:'Strawberry'},
  {id:11,tag:'Watermelon'}
];
       $scope.items = tagsData;
       $scope.item = {};
        $scope.check = function(){
            console.log($scope.items);
        };


  }]);
