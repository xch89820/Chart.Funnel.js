[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]

# Chart.Funnel.js
The funnel plugin for Chart.js

## Installation

To download a zip, go to the Chart.Funnel.js on Github

To install via npm / bower:

```bash
npm install chartjs-funnel --save
```

## Usage

You can find documentation for Chart.js at [www.chartjs.org/docs](http://www.chartjs.org/docs).

To configure the funnel plugin, you can simply set chart type to `funnel`.

Simple example:
```js
var config = {
    type: 'funnel',
	data: {
		datasets: [{
			data: [30, 60, 90],
			backgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			],
			hoverBackgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			]
		}],
		labels: [
			"Red",
			"Blue",
			"Yellow"
		]	
	}
}
```

Please see `example` folder for more information

## License

Chart.Funnel.js is available under the [MIT license](http://opensource.org/licenses/MIT).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: http://opensource.org/licenses/MIT

[npm-url]: https://www.npmjs.com/package/chartjs-funnel
[npm-version-image]: http://img.shields.io/npm/v/chartjs-funnel.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/chartjs-funnel.svg?style=flat
