'use strict';

/**
 * @ngdoc overview
 * @name newappApp
 * @description
 * # newappApp
 *
 * Main module of the application.
 */
var MakeApp = angular
  .module('newApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
      $routeProvider
       /* .when('/', {
            templateUrl: '/admin/layout4/angularjs/app/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .when('/products', {
            templateUrl: '/admin/layout4/angularjs/app/products/products.html',
            controller: 'productCtrl'
        })
        .when('/productst', {
            templateUrl: '/admin/layout4/angularjs/app/products/products.html',
            controller: 'productCtrl'
        })
        .when('/frontend', {
            templateUrl: '/admin/layout4/angularjs/app/frontend/frontend.html',
            controller: 'frontendCtrl'
        })
        .when('/charts', {
            templateUrl: '/admin/layout4/angularjs/app/charts/charts/charts.html',
            controller: 'chartsCtrl'
        })
        .when('/financial-charts', {
            templateUrl: '/admin/layout4/angularjs/app/charts/financialCharts/financialCharts.html',
            controller: 'financialChartsCtrl'
        })
        .when('/ui-animations', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/animations/animations.html',
            controller: 'animationsCtrl'
        })
        .when('/ui-buttons', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/Buttons/buttons.html',
            controller: 'buttonsCtrl'
        })
        .when('/ui-components', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/components/components.html',
            controller: 'componentsCtrl'
        })
        .when('/ui-helperClasses', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/helperClasses/helperClasses.html',
            controller: 'helperClassesCtrl'
        })
        .when('/ui-icons', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/icons/icons.html',
            controller: 'iconsCtrl'
        })
        .when('/ui-modals', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/modals/modals.html',
            controller: 'modalsCtrl'
        })
        .when('/ui-nestableList', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/nestableList/nestableList.html',
            controller: 'nestableListCtrl'
        })
        .when('/ui-notifications', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/notifications/notifications.html',
            controller: 'notificationsCtrl'
        })
        .when('/ui-portlets', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/portlets/portlets.html',
            controller: 'portletsCtrl'
        })
        .when('/ui-tabs', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/Tabs/tabs.html',
            controller: 'tabsCtrl'
        })
        .when('/ui-treeView', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/treeView/treeView.html',
            controller: 'treeViewCtrl'
        })
        .when('/ui-typography', {
            templateUrl: '/admin/layout4/angularjs/app/uiElements/typography/typography.html',
            controller: 'typographyCtrl'
        })
        .when('/email-templates', {
            templateUrl: '/admin/layout4/angularjs/app/mailbox/mailbox-templates.html',
            controller: 'mailboxTemplatesCtrl'
        })
          .when('/forms-elements', {
              templateUrl: '/admin/layout4/angularjs/app/forms/elements/elements.html',
              controller: 'elementsCtrl'
          })
             .when('/forms-validation', {
                 templateUrl: '/admin/layout4/angularjs/app/forms/validation/validation.html',
                 controller: 'elementsCtrl'
             })
            .when('/forms-plugins', {
                templateUrl: '/admin/layout4/angularjs/app/forms/plugins/plugins.html',
                controller: 'pluginsCtrl'
            })
          .when('/forms-wizard', {
              templateUrl: '/admin/layout4/angularjs/app/forms/wizard/wizard.html',
              controller: 'wizardCtrl'
          })
          .when('/forms-sliders', {
              templateUrl: '/admin/layout4/angularjs/app/forms/sliders/sliders.html',
              controller: 'slidersCtrl'
          })
          .when('/forms-editors', {
              templateUrl: '/admin/layout4/angularjs/app/forms/editors/editors.html',
              controller: 'editorsCtrl'
          })
            .when('/forms-input-masks', {
                templateUrl: '/admin/layout4/angularjs/app/forms/inputMasks/inputMasks.html',
                controller: 'inputMasksCtrl'
            })

           //medias
        .when('/medias-croping', {
            templateUrl: '/admin/layout4/angularjs/app/medias/croping/croping.html',
            controller: 'cropingCtrl'
        })
        .when('/medias-hover', {
            templateUrl: '/admin/layout4/angularjs/app/medias/hover/hover.html',
            controller: 'hoverCtrl'
        })
        .when('/medias-sortable', {
            templateUrl: '/admin/layout4/angularjs/app/medias/sortable/sortable.html',
            controller: 'sortableCtrl'
        })
          //pages
        .when('/pages-blank', {
            templateUrl: '/admin/layout4/angularjs/app/pages/blank/blank.html',
            controller: 'blankCtrl'
        })
        .when('/pages-contact', {
            templateUrl: '/admin/layout4/angularjs/app/pages/contact/contact.html',
            controller: 'contactCtrl'
        })
        .when('/pages-timeline', {
            templateUrl: '/admin/layout4/angularjs/app/pages/timeline/timeline.html',
            controller: 'timelineCtrl'
        })
             //ecommerce
        .when('/ecom-cart', {
            templateUrl: '/admin/layout4/angularjs/app/ecommerce/cart/cart.html',
            controller: 'cartCtrl'
        })
        .when('/ecom-invoice', {
            templateUrl: '/admin/layout4/angularjs/app/ecommerce/invoice/invoice.html',
            controller: 'invoiceCtrl'
        })
        .when('/ecom-pricingTable', {
            templateUrl: '/admin/layout4/angularjs/app/ecommerce/pricingTable/pricingTable.html',
            controller: 'pricingTableCtrl'
        })
          //extra
        .when('/extra-fullCalendar', {
            templateUrl: '/admin/layout4/angularjs/app/extra/fullCalendar/fullCalendar.html',
            controller: 'fullCalendarCtrl'
        })
        .when('/extra-google', {
            templateUrl: '/admin/layout4/angularjs/app/extra/google/google.html',
            controller: 'googleCtrl'
        })
        .when('/extra-slider', {
            templateUrl: '/admin/layout4/angularjs/app/extra/slider/slider.html',
            controller: 'sliderCtrl'
        })
        .when('/extra-vector', {
            templateUrl: '/admin/layout4/angularjs/app/extra/vector/vector.html',
            controller: 'vectorCtrl'
        })
        .when('/extra-widgets', {
            templateUrl: '/admin/layout4/angularjs/app/extra/widgets/widgets.html',
            controller: 'widgetsCtrl'
        })
          //tables
        .when('/tables-dynamic', {
            templateUrl: '/admin/layout4/angularjs/app/tables/dynamic/dynamic.html',
            controller: 'dynamicCtrl'
        })
        .when('/tables-editable', {
            templateUrl: '/admin/layout4/angularjs/app/tables/editable/editable.html',
            controller: 'editableCtrl'
        })
        .when('/tables-filter', {
            templateUrl: '/admin/layout4/angularjs/app/tables/filter/filter.html',
            controller: 'filterCtrl'
        })
        .when('/tables-styling', {
            templateUrl: '/admin/layout4/angularjs/app/tables/styling/styling.html',
            controller: 'stylingCtrl'
        })
          //user
        .when('/user-profile', {
            templateUrl: '/admin/layout4/angularjs/app/user/profile/profile.html',
            controller: 'profileCtrl'
        })
        .when('/user-sessionTimeout', {
            templateUrl: '/admin/layout4/angularjs/app/user/sessionTimeout/sessionTimeout.html',
            controller: 'sessionTimeoutCtrl'
        })
          //layout
        .when('/layout-api', {
            templateUrl: '/admin/layout4/angularjs/app/layout/api.html',
            controller: 'apiCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });*/
  });
