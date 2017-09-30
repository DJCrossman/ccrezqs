'use strict';

module.exports = (app) => {
    app.controller('HomeController', HomeController);
}

function HomeController($scope) {
    $scope.name = 'Taylor';
}