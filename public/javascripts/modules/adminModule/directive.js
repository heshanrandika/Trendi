/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('trendiEntitlements',[function () {
        function link( scope, element, attributes, controller ) {

            scope.entitlementGroups = [];

            scope.initSelect =function(entitlementGroup){
                var selected =  _.filter(entitlementGroup.entitlements, function(obj){
                    return !obj.select
                });
                if(selected.length>0){
                    entitlementGroup.select = false;
                }else{
                    entitlementGroup.select = true;
                }
            };

            var init = function(){
                if(scope.oldEntitlements.length > 0){
                    _.each(scope.inputEntitlements, function(obj){
                        var exist = _.filter(scope.oldEntitlements, function(oldObj){
                            return (obj._id == oldObj._id);
                        });
                        if(exist.length>0){
                            obj.select = true;
                        }
                    })

                }
                var entitlementGrouping =  _.groupBy(scope.inputEntitlements,'belongingModule');
                _.map(entitlementGrouping,function(value, key){
                    scope.entitlementGroups.push(
                        {
                            category:key,
                            entitlements: value,
                            select : false
                        })
                });

                _.each(scope.entitlementGroups,function(obj){
                    scope.initSelect(obj);
                })
                scope.outputEntitlements = scope.entitlementGroups;


            };
            init();

            /*            scope.$watch('scope.outputEntitlements', function(current, old){
             if(current != old){
             console.log("change value")
             }
             });*/

            scope.selectAll = function(entitlementObj){
                _.each(entitlementObj.entitlements,function(k){
                    k.select = entitlementObj.select;
                });
                scope.outputEntitlements = scope.entitlementGroups;
            };

        }
        return {
            restrict: 'E',
            scope :{
                inputEntitlements:'=',
                oldEntitlements:'=',
                outputEntitlements:'='
            },
            link: link,
            templateUrl: "/views/adminModule/entitlementsView/trendi.entitlements.html"

        };
    }]);

})(com.TRENDI.CATEGORY.modules.adminModule);