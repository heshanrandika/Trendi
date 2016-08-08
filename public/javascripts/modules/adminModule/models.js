/**
 * Created by heshan on 8/7/2016.
 */
(function (mod) {
    "use strict";

    mod.controller('productModel',['$scope', '$modalInstance',function ($scope, uiModalInstance) {
    	$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
    	$scope.multipleDemo = {};
    	$scope.multipleDemo.colors2 = ['Blue','Red'];

    	 $scope.disable = function() {
    			$scope.disabled = true;
  		};
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

        $scope.ok = function () {
            uiModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            uiModalInstance.dismiss('cancel');
        };
    }]);



})(com.TRENDI.ADMIN.modules.mainAdminModule);