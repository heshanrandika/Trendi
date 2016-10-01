/**
 * Created by heshan on 12/21/2015.
 */
(function (mod) {
    "use strict";
    mod.filter('htmlToPlaintext', function() {
            return function(text) {
                return  text ? String(text).replace(/<[^>]+>/gm, ' ') : ' ';
            };
        }
    );


    mod.filter('searchFilter', function() {
            var getValue = function(obj, path){
                var pathArray = path.split(".");
                var temp = obj;
                angular.forEach(pathArray, function(lvl) {
                    temp = temp[lvl];
                });
                return (temp+"").toLowerCase();
            };
            return function(items, search){
                if(angular.equals({}, search)){
                    return items;
                }
                var arr = [];
                angular.forEach(items, function(v){
                    var flag = true;
                    for(var i in search) {
                        if(!(search[i] == "")){
                            if(!(getValue(v,i).indexOf(search[i].toLowerCase()) === 0)){
                                flag = false;
                            }
                        }
                    }
                    if(flag)
                        arr.push(v);
                });

                return arr;
            }


        }
    );
})(com.TRENDI.ADMIN.modules.mainAdminModule);  /*   */