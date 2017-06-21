var HighCharts = require( "highcharts" );

function GraphView() {
  this.display();
}

GraphView.prototype = {
  display: function() {
    var graph = new HighCharts();
  }
}

module.exports = GraphView;