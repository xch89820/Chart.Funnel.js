// Test the trapezium element

/** globals Chart **/
var Chart = require('chart.js');
var MockContext = require('./MockCanvasContext.js');
require('../src/chart.funnel.js');


describe('Funnel controller tests', function() {

    beforeEach(function() {
        window.addDefaultMatchers(jasmine);
    });

    afterEach(function() {
        window.releaseAllCharts();
    });


    it ('Should be constructed', function() {
       var  funnelChart = window.acquireChart({
            type: 'funnel',
            data: {
                datasets: [{
                    data: []
                }],
                labels: []
            }
        });

        expect(funnelChart).not.toBe(undefined);
        var meta = funnelChart.getDatasetMeta(0);
        expect(meta.type).toBe('funnel');
        expect(meta.controller).not.toBe(undefined);
        expect(meta.controller.index).toBe(0);
        expect(meta.data).toEqual([]);

        meta.controller.updateIndex(1);
        expect(meta.controller.index).toBe(1);
    });

    it ('Should create trapezium elements during initialization', function() {
        var funnelChart = window.acquireChart({
            type: 'funnel',
            data: {
                datasets: [{
                    data: [30, 60, 90]
                }],
                labels: [
                    "Red",
                    "Blue",
                    "Yellow"
                ]
            }
        });

        expect(funnelChart).not.toBe(undefined);
        var meta = funnelChart.getDatasetMeta(0);
        expect(meta.data.length).toBe(3);

        expect(meta.data[0] instanceof Chart.elements.Trapezium).toBe(true);
        expect(meta.data[1] instanceof Chart.elements.Trapezium).toBe(true);
        expect(meta.data[2] instanceof Chart.elements.Trapezium).toBe(true);
    });

    it ('Should draw all elements', function() {
        var funnelChart = window.acquireChart({
            type: 'funnel',
            data: {
                datasets: [{
                    data: [30, 60, 90]
                }],
                labels: [
                    "Red",
                    "Blue",
                    "Yellow"
                ]
            },
            options: {
                responsive: false
            }
        });

        var meta = funnelChart.getDatasetMeta(0);
        spyOn(meta.data[0], 'draw');
        spyOn(meta.data[1], 'draw');
        spyOn(meta.data[2], 'draw');

        funnelChart.update();

        expect(meta.data[0].draw.calls.count()).toBe(1);
        expect(meta.data[1].draw.calls.count()).toBe(1);
        expect(meta.data[2].draw.calls.count()).toBe(1);
    });

    it('should draw elements correctly', function() {
        var funnelChart = window.acquireChart({
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
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Chart.js Funnel Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        var meta = funnelChart.getDatasetMeta(0);

        funnelChart.update();

        [
            { x:  256, y: 64 ,base:212, upperWidth:0, bottomWidth: 170 },
            { x:  256, y: 214 ,base:362, upperWidth:170, bottomWidth: 341 },
            { x:  256, y: 364 ,base:512, upperWidth:341, bottomWidth: 512 }
        ].forEach(function(expected, i) {
                expect(meta.data[i]._datasetIndex).toEqual(0);
                expect(meta.data[i]._model.type).toBe('isosceles');
                expect(meta.data[i]._index).toBe(i);
                expect(meta.data[i]._model.x).toBeCloseToPixel(expected.x);
                expect(meta.data[i]._model.y).toBeCloseToPixel(expected.y);
                expect(meta.data[i]._model.upperWidth).toBeCloseToPixel(expected.upperWidth);
                expect(meta.data[i]._model.bottomWidth).toBeCloseToPixel(expected.bottomWidth);
            });
    });

    it('should draw elements correctly with keep options', function() {
        var funnelChart = window.acquireChart({
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
            },
            options: {
                responsive: true,
                keep: 'left',
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Chart.js Funnel Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        var meta = funnelChart.getDatasetMeta(0);

        funnelChart.update();

        [
            { x1:  0, x2: 85.3 , y: 64,base:212, upperWidth:0, bottomWidth: 170 },
            { x1:  85.3, x2: 170.6, y: 214 ,base:362, upperWidth:170, bottomWidth: 341 },
            { x1:  170.6, x2: 256, y: 364 ,base:512, upperWidth:341, bottomWidth: 512 }
        ].forEach(function(expected, i) {
                expect(meta.data[i]._datasetIndex).toEqual(0);
                expect(meta.data[i]._index).toBe(i);
                expect(meta.data[i]._model.type).toBe('scalene');
                expect(meta.data[i]._model.x1).toBeCloseToPixel(expected.x1);
                expect(meta.data[i]._model.x2).toBeCloseToPixel(expected.x2);
                expect(meta.data[i]._model.y).toBeCloseToPixel(expected.y);
                expect(meta.data[i]._model.upperWidth).toBeCloseToPixel(expected.upperWidth);
                expect(meta.data[i]._model.bottomWidth).toBeCloseToPixel(expected.bottomWidth);
            });
    });
});