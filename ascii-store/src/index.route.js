export default function($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<aw-front-page></aw-front-page>'
    });

  $urlRouterProvider.otherwise('/');
}
