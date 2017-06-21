var HighCharts = require( "highcharts" );

function GraphView( debit, credit ) {
  this.debit = debit;
  this.credit = credit;
  this.display();
}

GraphView.prototype = {
  display: function() {
    var myChart = HighCharts.chart('graph-space', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas' ]
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [this.debit, this.credit]
        }, {
            name: 'John',
            data: [this.debit, this.credit]
        }]
    });
  }
}

module.exports = GraphView;