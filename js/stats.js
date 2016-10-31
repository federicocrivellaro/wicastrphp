function ExtractStatsData(res){
  var totalObj={};
  moment.locale("en");
  for (var i = 0; i < res.length; i++) {
    var entity=res[i];
    if(isAvailableData(entity.spam)){
      if(entity.spam===false){
        var date=moment(entity.insert_time).format('YYYY-MM-01');
        if(isAvailableData(totalObj[date])){
          totalObj[date]=totalObj[date]+1;
        }else{
          totalObj[date]=1;
        }
      }
    }
  }
  drawTotalReports(totalObj);
  moment.locale(appLang);
}

function drawTotalReports(totalObj){
  var dates = $.map( totalObj, function( value, key ) {
    return key;
  });
  dates.unshift('x');
  var values = $.map( totalObj, function( value, key ) {
    return value;
  });
  values.unshift('Number of reports');
  $('#totalReportsNumber').text(entities.length);
  var chart = c3.generate({
    bindto: '#totalReports',
    data: {
        x: 'x',
        columns: [dates,values],
        type: 'area-step'
    },
    interaction: {
      enabled: true
    },
    color: {
      pattern: ['#48c9af']
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          rotate: 75,
          format: '%m %Y' // '%b %y'
        },
      },
      y: {
        show: false
      }
    }
  });
  chart.legend.hide();
}

var myTimeFormatter = function(date) {
    return moment(date).format("LL");
};


function loadChart(chart,callback){
  switch(chart){
    case "barchart":
      extractBarChartData("#barchart","type_name",entities);
    break;
  }
  callback.call();
}





