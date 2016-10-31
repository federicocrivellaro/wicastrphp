
function ExtractListData(res){
  for (var i = 0; i < res.length; i++) {
    var entity=res[i];
    if(isAvailableData(entity.spam)){
      if(entity.spam===false){
        if(isAvailableData(entity.map_text)){
          var li='<li class="row" data-id="'+entity._id+'">';
          if(entity.picture_url != entity.icon_url){
            li=li+'<div><img class="lazy"  data-original="'+checkHttps(entity.picture_url)+'"></div>';
          }
          li=li+'<div class="content">';
          if(hasCategories===true){
            li=li+'<div>'+
                    '<img src="'+checkHttps(entity.icon_url)+'"/>'+
                  '</div>';
          }
            li=li+'<div>'+
                    '<p class="date">'+moment(entity.insert_time).format('LLL')+'</p>'+
                    '<p>'+entity.map_text+'</p>'+
                  '</div>'+
                '</div>';  
          $('#listView ul').append(li);
        }
      }
    } 
  }
  $("img.lazy").lazyload({
    threshold : 200,
    effect:"fadeIn",
    hasLoader:true
  });
}


$(document).on('click','#listView li',function(){
  $('#mapInfoHeader').data('id',$(this).data('id'));
  $('#map_image').empty();
  openInfo();
});


function clearList(){
  $('#listView ul').empty();
}

