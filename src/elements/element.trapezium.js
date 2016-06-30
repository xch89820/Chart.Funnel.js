/**
 *
 * Extend trapezium element
 * @author Jone Casper
 * @email xu.chenhui@live.com
 *
 */

"use strict";

module.exports = function(Chart) {
	var helpers = Chart.helpers,
		globalOpts = Chart.defaults.global;

	globalOpts.elements.trapezium = {
		backgroundColor: globalOpts.defaultColor,
		borderWidth: 0,
		borderColor: globalOpts.defaultColor,
		borderSkipped: 'bottom',
		type: 'isosceles'  // isosceles, scalene
	};

	// Thanks for https://github.com/substack/point-in-polygon
	var pointInPolygon = function (point, vs) {
		// ray-casting algorithm based on
		// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

		var x = point[0], y = point[1];

		var inside = false;
		for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
			var xi = vs[i][0], yi = vs[i][1];
			var xj = vs[j][0], yj = vs[j][1];

			var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	};

	Chart.elements.Trapezium = Chart.Element.extend({
		getCorners: function () {
			var vm = this._view;
			var globalOptionTrapeziumElements = globalOpts.elements.trapezium;

			var corners = [],
				type = vm.type || globalOptionTrapeziumElements.type,
				top = vm.y,
				borderWidth = vm.borderWidth || globalOptionTrapeziumElements.borderWidth,
				upHalfWidth = vm.upperWidth / 2,
				botHalfWidth = vm.bottomWidth / 2,
				halfStroke = borderWidth / 2;

			halfStroke = halfStroke < 0 ? 0 : halfStroke;

			// An isosceles trapezium
			if (type == 'isosceles') {
				var x = vm.x;

				// Corner points, from bottom-left to bottom-right clockwise
				// | 1 2 |
				// | 0 3 |
				corners = [
					[x - botHalfWidth + halfStroke, vm.base],
					[x - upHalfWidth + halfStroke, top + halfStroke],
					[x + upHalfWidth - halfStroke, top + halfStroke],
					[x + botHalfWidth - halfStroke, vm.base]
				];
			} else if (type == 'scalene') {
				var x1 = vm.x1,
					x2 = vm.x2;

				corners = [
					[x2 - botHalfWidth + halfStroke, vm.base],
					[x1 - upHalfWidth + halfStroke, top + halfStroke],
					[x1 + upHalfWidth - halfStroke, top + halfStroke],
					[x2 + botHalfWidth - halfStroke, vm.base]
				];
			}


			return corners;
		},
		draw: function () {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var globalOptionTrapeziumElements = globalOpts.elements.trapezium;

			var corners = this.getCorners();
			this._cornersCache = corners;

			ctx.beginPath();
			ctx.fillStyle = vm.backgroundColor || globalOptionTrapeziumElements.backgroundColor;
			ctx.strokeStyle = vm.borderColor || globalOptionTrapeziumElements.borderColor;
			ctx.lineWidth = vm.borderWidth || globalOptionTrapeziumElements.borderWidth;

			// Find first (starting) corner with fallback to 'bottom'
			var borders = ['bottom', 'left', 'top', 'right'];
			var startCorner = borders.indexOf(
				vm.borderSkipped || globalOptionTrapeziumElements.borderSkipped,
				0);
			if (startCorner === -1)
				startCorner = 0;

			function cornerAt(index) {
				return corners[(startCorner + index) % 4];
			}

			// Draw rectangle from 'startCorner'
			ctx.moveTo.apply(ctx, cornerAt(0));
			for (var i = 1; i < 4; i++)
				ctx.lineTo.apply(ctx, cornerAt(i));

			ctx.fill();
			if (vm.borderWidth) {
				ctx.stroke();
			}
		},
		height: function () {
			var vm = this._view;
			if (!vm) {
				return 0;
			}

			return vm.base - vm.y;
		},
		inRange: function (mouseX, mouseY) {
			var vm = this._view;
			if (!vm) {
				return false;
			}
			var corners = this._cornersCache ? this._cornersCache : this.getCorners();
			return pointInPolygon([mouseX, mouseY], corners);
		},
		inLabelRange: function (mouseX) {
			var x,
				vm = this._view;

			if (!vm) {
				return false;
			}

			if (vm.type == 'scalene') {
				if (vm.x1 > vm.x2) {
					return mouseX >= vm.x2 - vm.bottomWidth / 2 && mouseX <= vm.x1 + vm.upperWidth / 2;
				} else {
					return mouseX <= vm.x2 + vm.bottomWidth / 2 && mouseX >= vm.x1 - vm.upperWidth / 2;
				}
			}

			var maxWidth = Math.max(vm.upperWidth, vm.bottomWidth);
			return mouseX >= vm.x - maxWidth / 2 && mouseX <= vm.x + maxWidth / 2;

		},
		tooltipPosition: function () {
			var vm = this._view;
			return {
				x: vm.x || vm.x2,
				y: vm.base - (vm.base - vm.y)/2
			};
		}
	});
};