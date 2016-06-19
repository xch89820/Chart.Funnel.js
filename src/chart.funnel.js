/**
 *
 * Main file of Chart.Funnel.js
 * @author Jone Casper
 * @email xu.chenhui@live.com
 *
 */

/* global window */
"use strict";

var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;

require('./elements/element.trapezium.js')(Chart);
require("./controllers/controller.funnel.js")(Chart);

module.exports = Chart;