var HighCharts = require( "highcharts" );

function GraphView( debit, credit ) {
  this.debit = debit;
  this.credit = credit;
  console.log( this.debit );
  this.display();
}

GraphView.prototype = {
  display: function() {
    var myChart = HighCharts.chart('graph-space', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Ins & Outs'
        },
        xAxis: {
            categories: ['In', 'Out' ]
        },
        yAxis: {
            title: {
                text: 'Totals'
            }
        },
        series: [{
            data: [{ y: this.credit, color: 'green' }, { y: this.debit, color: 'red' }],
            label: [ 'In', 'Out' ]
        }]
    });
  }
}

module.exports = GraphView;