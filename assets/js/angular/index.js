'use strict';

require('angular');
require('angular-ui-router');

var module = angular.module('App', [
    'ui.router'
]);

require('./routes/home.controller.js')(module);

require('./routes.js')(module);