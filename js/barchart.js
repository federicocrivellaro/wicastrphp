function extractBarChartData(id,param,res){
  /* SAMPLE 
  ['data1', 90],
  ['data2', 10],
  ['data3', 20],
  */
  var totalObj={};
  if(isPrimary===false){
    $('#stat-categoriesTitle').text(domain.i18n.others[langs].attrs.buttons_text);
  }else{
    $('#stat-categoriesTitle').text(domain.buttons_text);
  } 

  for (var i = 0; i < res.length; i++) {
    var entity=res[i];
    if(isAvailableData(entity.spam)){
      if(entity.spam===false){
        var parameter=entity[param];
        if(isAvailableData(totalObj[parameter])){
          totalObj[parameter]=[parameter,totalObj[parameter][1]+1];
        }else{
          totalObj[parameter]=[parameter,1];
        }
      }
    }
  }
  drawBarChart(id,totalObj);
}

function drawBarChart(id,totalObj){
  var values = $.map( totalObj, function(value,key) {
    return [[value[0],value[1]]];
  });

  var legend = $.map( totalObj, function( value, key ) {
    return key;
  });

  var barchart = c3.generate({
    bindto: id,
    data: {
        columns: values,
        type: 'bar',
    },
    legend: {
        show: false
    },
    interaction: {
      enabled: false
    },
    tooltip: {
      show: false
    },
    axis: {
      x: {
        show: false
      }
    }
  });

  d3.select(id).append('div').attr('class', 'legendBarchart').selectAll('div')
  .data(legend)
  .enter().append('div')
  .attr('data-id', function (id) { return id; })
  .on('click', function (id) {
      $(this).toggleClass('disabled');
      barchart.toggle(id);
  })
  .html(function (id) {return '<span>'+id+'</span>'; })
  .append('div')
  .each(function (id) {
      d3.select(this).style('background-color', barchart.color(id));
  });

  $('.changeChart svg').click(function(){
    $(this).hide();
    var type=$(this).data("type");
    $('svg',$(this).parent()).not(this).fadeIn();
    barchart.transform(type);
  });
}


function toggle(id) {
    barChart.toggle(id);
}





