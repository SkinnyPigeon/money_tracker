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
            categories: [ 'Time' ],
            dateTimeLabelFormats: {
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e. %b',
                week: '%e. %b',
                month: '%b \'%y',
                year: '%Y'
            },
            tickInterval: 3600000 * 24
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
            data: (function () {
                console.log( this.time )
                var data = []
                for ( var i = 0; i < this.time.length; i++ ) {
                    data.push([
                        this.time[i], this.total[i]
                    ]);
                }
                return data;
            }.bind( this )())
            // pointInterval: 1000 * 60 * 60
        }],
        tooltip: {
            xDateFormat: "%d-%m-%Y",
            valuePrefix: "£"
        },


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
        this.total[ index ] -= transaction.amount
    } else {
        this.total[ index ] += transaction.amount
    }
    console.log( this.total[ index ]);
    return this.total[ index ];
  }
}

module.exports = GraphView;