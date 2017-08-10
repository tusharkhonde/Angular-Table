angular.module('dashboard', ['resources.devices', 'filters.formatting'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve:{
      devices: ['Devices', function (Devices) {
        return Devices.all();
      }]
    }
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', 'devices', function ($scope, $location, devices) {
    $scope.devices = devices;
}])


.directive('topdevices', function() {
    return {
        template: '<ng-include src="getTemplateUrl()"/>',
        scope: {
            devices: '='
        },
        restrict: 'E',
        controller: function($scope) {
          $scope.getTemplateUrl = function() {
              return "app/dashboard/top-devices.tpl.html";
          }
        },
        link: (scope, element, attrs) => {
            
            console.log(scope.devices);
        
        }
      };
})

.directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

            element.bind('blur', function() {
                let value = element.html().replace(/(?:&nbsp;|<br>)/g,'');
                scope.$apply(function() {
                    ngModel.$setViewValue(value);
                });
            });

            ngModel.render = function(value) {
               element.html(value);
            };


            element.bind('keydown', function(event) {

                if (event.keyCode == 13) {
                    event.preventDefault();
                }

                if (event.which === 27) {

                    let value = element.html().replace(/(?:&nbsp;|<br>)/g,'');
                    ngModel.$setViewValue(value);
                    event.target.blur();
                    event.preventDefault();
                }

            });

        }
    };
});