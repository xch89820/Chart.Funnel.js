[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status](https://travis-ci.org/xch89820/Chart.Funnel.js.svg?branch=master)](https://travis-ci.org/xch89820/Chart.Funnel.js)

# chartjs-plugin-funnel
The funnel plugin for Chart.js > 2.7

## Installation

To download a zip, go to the chartjs-plugin-funnel on Github

To install via npm / bower:

```bash
npm install chartjs-plugin-funnel --save
```

## Preview

![chartjs-plugin-funnel](https://user-images.githubusercontent.com/36499752/37270921-0021a42c-25d1-11e8-8823-926758ad0061.jpg)


![chartjs-plugin-funnel](https://user-images.githubusercontent.com/36499752/37270922-003b924c-25d1-11e8-9795-11a6dc35c68a.jpg)


![chartjs-plugin-funnel](https://user-images.githubusercontent.com/36499752/37270924-00574fd2-25d1-11e8-933d-1a07ee16862d.jpg)


![chartjs-plugin-funnel](https://user-images.githubusercontent.com/36499752/37288346-514d2f0c-2607-11e8-8bcb-eacabd470d8f.jpg)


![chartjs-plugin-funnel](https://user-images.githubusercontent.com/36499752/37288348-521abcb0-2607-11e8-87cb-b52fc5575f44.jpg)


## Usage

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

Funnel chart support upside-down drawing or against left or right side drawing.

This plugin works with datalabels plugin.


You can find documentation for Chart.js at [www.chartjs.org/docs](http://www.chartjs.org/docs).

## Options

#### sort
Reverse or not, you can set 'desc' to draw an upside-down funnel.

default is 'asc'.

#### gap
The gap between to trapezium in our funnel chart. The unit is px.

default is 2

#### keep
Draw element against left or right side.

default is 'auto'.

#### topWidth
The top-width of funnel chart, defualt is 0

#### bottomWidth
The bottom-width of funnel chart, default use the width of canvas.

#### tooltips
The tooltips option is a special option for funnel chart, you should be careful if you want to rewrite the option.

The default option is
```js
{
   callbacks: {
		title: function (tooltipItem, data) {
			return '';
		},
		label: function (tooltipItem, data) {
			return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
		}
	}
}
```
## License

Chart.Funnel.js is available under the [MIT license](http://opensource.org/licenses/MIT).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: http://opensource.org/licenses/MIT

[npm-url]: https://www.npmjs.com/package/chartjs-plugin-funnel
[npm-version-image]: http://img.shields.io/npm/v/chartjs-plugin-funnel.svg?style=flat

[npm-downloads-image]: http://img.shields.io/npm/dm/chartjs-plugin-funnel.svg?style=flat
