window.jQuery = window.$ = require("jquery");
window.moment = require('moment');
window._ = require('lodash');

import 'core-js/es6/promise';
import 'jquery-ui-npm/jquery-ui.min.js';
//import 'imports-loader?jquery!jquery-color/jquery.color.js';

jQuery.ui.autocomplete.prototype._resizeMenu = function () {
    var ul = this.menu.element;
    ul.outerWidth(this.element.outerWidth());
}

if (!localStorage['rh-app']) {
    localStorage['rh-app'] = JSON.stringify({
        followedDancer: null
    })
}

require("bootstrap");

require.ensure([], () => {
    require('./app');

})

