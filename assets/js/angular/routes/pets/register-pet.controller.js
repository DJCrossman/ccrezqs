'use strict';

module.exports = (app) => {
    app.controller('RegisterPetController', RegisterPetController);
}

function RegisterPetController($scope) {
    $scope.genders = ['male', 'female', 'other'];
    $scope.open1 = function() {
        
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };
    $scope.params = {
        name: '',
        birthdate: null,
        age: '',
        medications: '',
        gender: ''
    }
}