# Chart.Funnel.js
The funnel plugin for Chart.js

## Installation

To download a zip, go to the Chart.Funnel.js on Github

To install via npm / bower:

```bash
npm install Chart.Funnel.js --save
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