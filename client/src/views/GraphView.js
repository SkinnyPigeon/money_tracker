var HighCharts = require( "highcharts" );

function GraphView( debit, credit, transactions ) {
  this.debit = debit;
  this.credit = credit;
  this.transactions = transactions;
  this.time = [];
  this.total = [];
  this.makePlotPoints();
}

GraphView.prototype = {
  display: function() {
    var myChart = HighCharts.chart('bar-space', {
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
                text: null 
            }
        },
        series: [{
            data: [{ y: this.credit, color: 'green' }, { y: this.debit, color: 'red' }],
            label: [ 'In', 'Out' ],
            name: "Totals (£)"
        }],
        credits: {
            enabled: false
        }
    })
    var lineChart = HighCharts.chart( 'line-space', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Cash Flow'
        },
        xAxis: {
            type: 'datetime',
            categories: [ 'Time' ]
        },
        yAxis: {

        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: [{
            data: this.time 
        }]
    });
  },

  makePlotPoints: function() {
    for( var i = 0; i < this.transactions.length; i++ ) {
        this.time.push( this.makeUTC( this.transactions[i] ))
    }
    console.log( this.time )
  this.display();
  },

  makeUTC: function(  ) {

  }
}

module.exports = GraphView;