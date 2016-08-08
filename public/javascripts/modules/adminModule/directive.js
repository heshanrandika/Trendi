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


mod.directive('tagsInput', [function() {

  function getItemProperty(scope, property) {
    if (!property)
      return undefined;

    if (angular.isFunction(scope.$parent[property]))
      return scope.$parent[property];

    return function(item) {
      return item[property];
    };
  }

  return {
    restrict: 'EA',
    scope: {
      model: '=ngModel'
    },
    template: '<div class="bootstrap-tagsinput"><span class="tag label label-primary">hjk<span data-role="remove"></span></span><input type="text" placeholder="" style="width: 3em !important;"></div>',
    replace: false,
    link: function(scope, element, attrs) {
      $(function() {
        if (!angular.isArray(scope.model))
          scope.model = [];

        var select = $('select', element);
        var typeaheadSourceArray = attrs.typeaheadSource ? attrs.typeaheadSource.split('.') : null;
        var typeaheadSource = typeaheadSourceArray ?
            (typeaheadSourceArray.length > 1 ?
                scope.$parent[typeaheadSourceArray[0]][typeaheadSourceArray[1]]
                : scope.$parent[typeaheadSourceArray[0]])
            : null;

        select.tagsinput(scope.$parent[attrs.options || ''] || {
          typeahead : {
            source   : angular.isFunction(typeaheadSource) ? typeaheadSource : null
          },
          itemValue: getItemProperty(scope, attrs.itemvalue),
          itemText : getItemProperty(scope, attrs.itemtext),
          confirmKeys : getItemProperty(scope, attrs.confirmkeys) ? JSON.parse(attrs.confirmkeys) : [13],
          tagClass : angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function(item) { return attrs.tagclass; }
        });

        for (var i = 0; i < scope.model.length; i++) {
          select.tagsinput('add', scope.model[i]);
        }

        select.on('itemAdded', function(event) {
          if (scope.model.indexOf(event.item) === -1)
            scope.model.push(event.item);
        });

        select.on('itemRemoved', function(event) {
          var idx = scope.model.indexOf(event.item);
          if (idx !== -1)
            scope.model.splice(idx, 1);
        });

        // create a shallow copy of model's current state, needed to determine
        // diff when model changes
        var prev = scope.model.slice();
        scope.$watch("model", function() {
          var added = scope.model.filter(function(i) {return prev.indexOf(i) === -1;}),
              removed = prev.filter(function(i) {return scope.model.indexOf(i) === -1;}),
              i;

          prev = scope.model.slice();

          // Remove tags no longer in binded model
          for (i = 0; i < removed.length; i++) {
            select.tagsinput('remove', removed[i]);
          }

          // Refresh remaining tags
          select.tagsinput('refresh');

          // Add new items in model as tags
          for (i = 0; i < added.length; i++) {
            select.tagsinput('add', added[i]);
          }
        }, true);
      });
    }
  };
}]);


})(com.TRENDI.ADMIN.modules.mainAdminModule);