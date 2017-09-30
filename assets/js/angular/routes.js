'use strict';

module.exports = function(app) {
    app.config(routes);
}

function routes($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home',
        template: require('html!./routes/home/home.view.html'),
        controller: 'HomeController'
    });
}