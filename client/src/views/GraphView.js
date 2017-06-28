var HighCharts = require( "highcharts" );

function GraphView( debit, credit, transactions ) {
  this.debit = debit;
  this.credit = credit;
  this.transactions = transactions;
  this.time = [];
  this.total = [0];
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
            categories: ['In', 'Out', 'Remaining' ]
        },
        yAxis: {
            title: {
                text: null 
            }
        },
        series: [{
            data: [{ y: this.credit, color: 'green' },
                     { y: this.debit, color: 'red' },
                     { y: this.total[ this.total.length - 1 ], color: 'blue' }],
            label: [ 'In', 'Out', 'Remaining' ],
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
            categories: [ 'Time' ],
            minTickInterval: 24 * 3600 * 1000,
            dateTimeLabelFormats: {
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e. %b',
                week: '%e. %b',
                month: '%b \'%y',
                year: '%Y'
            },
            labels: {
                format: '{value:%d-%m-%Y}'
            }
        },
        yAxis: {
            title: {
                text: 'Balance (£)'
            }
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: [{
            data: (function () {
                console.log( this.time )
                var data = []
                for ( var i = 0; i < this.time.length; i++ ) {
                    data.push([
                        this.time[i], 

                        // .toFixed(2)

                        parseFloat(Math.round(this.total[i] * 100) / 100).toFixed(2)
                    ]).bind( this );
                }
                return data;
            }.bind( this )()),
            name: "Life =>"
        }],
        tooltip: {
            xDateFormat: "%d-%m-%Y",
            valuePrefix: "£"
        },
        credits: {
            enabled: false
        }
    });
  },

  makePlotPoints: function() {
    for( var i = 0; i < this.transactions.length; i++ ) {
        this.time.push( this.makeUTC( this.transactions[i].created_at ));
        this.total.push( this.makeTotal( this.transactions[i], i ));
    }
    console.log( this.time );
    this.display();
  },

  makeUTC: function( weirdTimeStamp ) {
    var year = weirdTimeStamp.substr( 0, 4 );
    year = parseInt( year );
    var month = weirdTimeStamp.substr( 5, 2 );
    month = parseInt( month );
    month  -= 1;
    var day = weirdTimeStamp.substr( 8, 2 ); 
    day = parseInt( day );

    var hour = weirdTimeStamp.substr( 11, 2 );
    hour = parseInt( hour );
    var minute = weirdTimeStamp.substr( 14, 2 );
    minute = parseInt( minute );
    var second = weirdTimeStamp.substr( 17, 2 );
    second = parseInt( second );

    return Date.UTC( year, month, day );
  },

  makeTotal: function( transaction, index ) {
    if( transaction.debit ) {
        this.total[ index ] -= 
        // transaction.amount
        parseFloat(Math.round(transaction.amount * 100) / 100).toFixed(2)
    } else {
        this.total[ index ] += 
        // transaction.amount
        parseFloat(Math.round(transaction.amount * 100) / 100).toFixed(2)
    }
    console.log( this.total[ index ]);
    return this.total[ index ];
  }
}

module.exports = GraphView;