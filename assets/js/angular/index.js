'use strict';

require('angular');
require('angular-ui-router');
require('./style/custom.css');

var module = angular.module('App', [
    'ui.router',
    require('angular-ui-bootstrap')
]);

require('./routes/home/home.controller.js')(module);
require('./routes/pets/pets.controller.js')(module);
require('./routes/pets/register-pet.controller.js')(module);

require('./routes.js')(module);