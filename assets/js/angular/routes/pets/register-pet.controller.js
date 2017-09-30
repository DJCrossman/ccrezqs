'use strict';

module.exports = (app) => {
    app.controller('RegisterPetController', RegisterPetController);
}

function RegisterPetController($scope) {
    $scope.params = {
        name,
        age,
        medications
    }
}