(function(){
	angular.module('myApp').
		component('dashboardComponent', {
			templateUrl: '/partials/dashboard',
			controller: DashboardController
		})

			function DashboardController(){
				this.foo
				
				this.update = function(val) {
					this.foo = val.split('')
				}
								// Update…
				// var p = d3.select("body")
				//   .selectAll("p")
				//   .data(this.foo)
				//     .text(function(d) { return d + 'bar'; });



				// // Enter…
				// p.enter().append("p")
				//     .text(function(d) { return d; });

				// // Exit…
				// p.exit().remove();
			}
})()