// Test the trapezium element

/** globals Chart **/
var Chart = require('chart.js');
require('../src/elements/element.trapezium.js')(Chart);

describe('Trapezium element tests', function() {
    it ('Should be constructed', function() {
        var trapezium = new Chart.elements.Trapezium({
            _datasetIndex: 2,
            _index: 1
        });

        expect(trapezium).not.toBe(undefined);
        expect(trapezium._datasetIndex).toBe(2);
        expect(trapezium._index).toBe(1);
    });

    it ('Isosceles trapezium, should determine if in range', function() {
        var trapezium = new Chart.elements.Trapezium({
            _datasetIndex: 2,
            _index: 1
        });

        // Make sure we can run these before the view is added
        expect(trapezium.inRange(2, 2)).toBe(false);
        expect(trapezium.inLabelRange(2)).toBe(false);

        // Mock out the view as if the controller put it there
        // An 'zero' test
        trapezium._view = {
            y: 0,
            base: 0,
            x: 0,
            upperWidth: 0,
            bottomWidth: 0
        };

        expect(trapezium.inRange(2, 2)).toBe(false);
        expect(trapezium.inLabelRange(2)).toBe(false);

        // x,y in positive number
        trapezium._view = {
            y: 0,
            base: 5,
            x: 2,
            upperWidth: 2,
            bottomWidth: 4
        };
        expect(trapezium.inRange(1, 0)).toBe(true);
        expect(trapezium.inRange(0, 0)).toBe(false);
        expect(trapezium.inRange(2, 3)).toBe(true);
        expect(trapezium.inLabelRange(1)).toBe(true);
        expect(trapezium.inLabelRange(2)).toBe(true);
        expect(trapezium.inLabelRange(5)).toBe(false);

        // upper axis not in positive number
        trapezium._view = {
            y: 0,
            base: 5,
            x: 2,
            upperWidth: 10,
            bottomWidth: 4
        };
        expect(trapezium.inRange(0, 0)).toBe(true);
        expect(trapezium.inRange(2, 3)).toBe(true);
        expect(trapezium.inRange(10, 3)).toBe(false);
        expect(trapezium.inLabelRange(7)).toBe(true);
        expect(trapezium.inLabelRange(2)).toBe(true);
        expect(trapezium.inLabelRange(10)).toBe(false);
    });

    it ('Isosceles trapezium, should get the correct height', function() {
        var trapezium = new Chart.elements.Trapezium({
            _datasetIndex: 2,
            _index: 1
        });

        expect(trapezium.height()).toEqual(0);

        trapezium._view = {
            y: 0,
            base: 10,
            x: 4,
            upperWidth: 2,
            bottomWidth: 5
        };

        expect(trapezium.height()).toEqual(10);
    });

    it ('Scalene trapezium, should determine if in range', function() {
        var trapezium = new Chart.elements.Trapezium({
            _datasetIndex: 2,
            _index: 1
        });

        // Make sure we can run these before the view is added
        expect(trapezium.inRange(2, 2)).toBe(false);
        expect(trapezium.inLabelRange(2)).toBe(false);

        // Mock out the view as if the controller put it there
        // An 'zero' test
        trapezium._view = {
            y: 0,
            base: 0,
            x1: 0,
            x2: 0,
            upperWidth: 0,
            bottomWidth: 0,
            type :'scalene'
        };

        expect(trapezium.inRange(2, 2)).toBe(false);
        expect(trapezium.inLabelRange(2)).toBe(false);

        // x1 == x2 is an isosceles trapezium
        trapezium._view = {
            y: 0,
            base: 5,
            x1: 2,
            x2: 2,
            upperWidth: 2,
            bottomWidth: 4,
            type :'scalene'
        };
        expect(trapezium.inRange(1, 0)).toBe(true);
        expect(trapezium.inRange(0, 0)).toBe(false);
        expect(trapezium.inRange(2, 3)).toBe(true);
        expect(trapezium.inLabelRange(1)).toBe(true);
        expect(trapezium.inLabelRange(2)).toBe(true);
        expect(trapezium.inLabelRange(5)).toBe(false);

        // x1=1  x2=3
        trapezium._view = {
            y: 0,
            base: 5,
            x1: 1,
            x2: 3,
            upperWidth: 2,
            bottomWidth: 4,
            type :'scalene'
        };

        expect(trapezium.inRange(0, 0)).toBe(true);
        expect(trapezium.inRange(0, 1)).toBe(false);
        expect(trapezium.inRange(2, 2)).toBe(true);
        expect(trapezium.inLabelRange(0)).toBe(true);
        expect(trapezium.inLabelRange(2)).toBe(true);
        expect(trapezium.inLabelRange(5)).toBe(true);
        expect(trapezium.inLabelRange(6)).toBe(false);
    });
});