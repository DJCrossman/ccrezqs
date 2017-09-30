'use strict';

module.exports = (app) => {
    app.controller('PetController', PetController);
}

function PetController($scope, $state, $rootScope) {
    $scope.currentPage = $state.current.name;
    
    $rootScope.$on('$stateChangeStart', function(e, toState) {
        $scope.currentPage = toState.name;
    });

}