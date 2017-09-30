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
    }).state('pets', {
        url: '/pets',
        template: require('html!./routes/pets/pets.view.html'),
        controller: 'PetController'
    }).state('pets.register', {
        url: '/register',
        template: require('html!./routes/pets/register-pet.view.html'),
        controller: 'RegisterPetController'
    });
}