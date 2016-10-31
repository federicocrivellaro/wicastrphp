//_______________________________________________________
var theMap;
var mapSlider;
var markerArray=[];  // lo utlizamos para el marker Cluster
var activeMarkersIndex=[];
var markersList=[];
var size=20;


// START MAP !!!!!!!!!!!!!!!
//_______________________________________________________

function ExtractMapData(obj) {
    if(obj.length>0){
      initFilters();
      var locArrays = fillArray(obj);
      var bounds = createBounds(locArrays.locations);
      setTimeout(function(){
        theMap=initMap(bounds);
        makeMarkers(locArrays, theMap);
        initialize(bounds,theMap);   
      },2000); 
    }else{
      theMap=initMap(null);
    }
}



function fillArray(res) {
    var partecipantsCounter=0;
    var locArrays = new Object();
    locArrays.locations = [];
    locArrays.names = [];
    locArrays.images = [];
    locArrays.icons = [];
    locArrays.dates= [];
    locArrays.when= [];
    locArrays.mail= [];
    locArrays.mobile= [];
    locArrays.page=[];
    locArrays.fieldDate= [];
    locArrays.addresses = [];
    locArrays.summaries = [];
    locArrays.descriptions = [];
    locArrays.pictures = [];
    locArrays.fields = [];
    locArrays.comments= [];
    locArrays.IDs = [];
    locArrays.indexes = [];
    locArrays.twitterAccount=[];

    for (var i = 0; i < res.length; i++) {
      if(checkSourceAvailable(res[i].coordinates)){

      // ID 
      locArrays.indexes.push(i);
      locArrays.icons.push(res[i].icon_url);
  
      var id = res[i]._id;
      locArrays.IDs.push(id);
        
      // MARKER LOCATION
       var LatLong = new google.maps.LatLng(res[i].coordinates[0],res[i].coordinates[1]);
       locArrays.locations.push(LatLong);
        
      // TYPE NAME
      locArrays.names.push(checkSourceText(res[i].type_name));
      
      // TYPE ICON
      var image;
      try{image = res[i].picture_url;}catch (err){image = defaultSrc;}
      locArrays.images.push(image);
        
      // REPORT DATE 
      var date=new Date(res[i].insert_time);
      locArrays.dates.push(date.customFormat(  "#DD#/#MMM#/#YYYY#, #hhh#:#mm#"));
        
      // REPORT SUMMARY 
      locArrays.summaries.push(Autolinker.link(checkSourceText(res[i].summary_text)));
        
      // REPORT MAP TEXT
      if(checkSourceText(res[i].map_text)){
        var mymessage;
        try{
          var message=res[i].map_text;
          var start_pos = message.indexOf('<span>')+6;
          var end_pos = message.indexOf('</span>',start_pos);
          var text_to_get = message.substring(start_pos,end_pos);
          var date=new Date(text_to_get + " UTC");
          var localdate=date.customFormat( "#DD#/#MMM#/#YYYY#, #hhh#:#mm#" );
          mymessage=message.replace(text_to_get,localdate);
        }catch(error){
          mymessage=res[i].map_text;
        }
        mymessage=mymessage.replace(/\n/g, "<br>");
        var mymessageLinked=Autolinker.link(mymessage);
        locArrays.descriptions.push(mymessageLinked);
      }

      // FIELD SPECIFIC
      var pictures=""; // ARRAY TO STORE REPORT IMAGES
      var fields="";
      for (var x = 1; x < res[i].fields.length; x++) {

        var id=res[i].fields[x]._id;
        var uniqueId=res[i].fields[x].id;
        var textValue="";

      

        /* CUANDO */   
        if(res[i].fields[x].id=="580879c40a975a6aca3feba5"){ 
            var tempDate=(res[i].fields[x].value)? moment(res[i].fields[x].value).format('LLL'): "";
            locArrays.when.push(tempDate);
            if(checkSourceAvailable(res[i].fields[x].value)){
              fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+longToGoogleLocaleString(res[i].fields[x].value)+'</p></div>';
              textValue=longToGoogleLocaleString(res[i].fields[x].value);
              locArrays.fieldDate.push(res[i].fields[x].value);
            }else{
              locArrays.fieldDate.push(null);              
            }
        
        /* CORREO DE CONTACTO */
        }else if(res[i].fields[x].id=="580f22d10a975a2f4cc8eb18"){ 
          locArrays.twitterAccount.push(Autolinker.link(checkSourceText(res[i].fields[x].value)));    
        /* PAGE */   
        }else if(res[i].fields[x].id=="580879c40a975a6aca3febac"){ 
            locArrays.page.push(Autolinker.link(checkSourceText(res[i].fields[x].value)));  

        /* MAIL */   
        }else if(res[i].fields[x].id=="580879c40a975a6aca3febab"){ 
            locArrays.mail.push(Autolinker.link(checkSourceText(res[i].fields[x].value)));

        /* MOBILE */   
        }else if(res[i].fields[x].id=="580f22d10a975a2f4cc8eb19"){ 
            locArrays.mobile.push(checkSourceText(res[i].fields[x].value));

          
        }else{

          switch (id){
          
          case 1:
            if(checkSourceAvailable(res[i].fields[x].value)){
              partecipantsCounter=partecipantsCounter+res[i].fields[x].value;
              fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+res[i].fields[x].value+'</p></div>'; 
            }
          break; 

          case 6:
            if(checkSourceAvailable(res[i].fields[x].value)){
              pictures=pictures+'<li data-src="'+res[i].fields[x].value+'" data-thumb="'+res[i].fields[x].value+'"><img src="'+res[i].fields[x].value+'"/></li>'; 
              textValue=res[i].fields[x].value;
            }     
          break;

          case 4:
            if(checkSourceAvailable(res[i].fields[x].value.address)){
            // REPORT LOCATION 
            var maptext=res[i].fields[x].value.address+", "+res[i].fields[x].value.country;
            locArrays.addresses.push(maptext);
            fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+maptext+'</p></div>';         
            }
          break;
          case 11:
            if(checkSourceAvailable(res[i].fields[x].value)){
              var array=res[i].fields[x].value;
              var list=array.join();
              fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+list+'</p></div>'; 
            }
          break;
          case 15:
            if(checkSourceAvailable(res[i].fields[x].value)){
              var array=res[i].fields[x].value;
              var list=array.join();
              fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+list+'</p></div>'; 
            }
          break;
          case 3:  // DATE 
              if(checkSourceAvailable(res[i].fields[x].value)){
                fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+longToGoogleLocaleString(res[i].fields[x].value)+'</p></div>';
                textValue=longToGoogleLocaleString(res[i].fields[x].value);
                locArrays.fieldDate.push(res[i].fields[x].value);
              }else{
                locArrays.fieldDate.push(null);              
              }
          break;

          default :
            if(checkSourceAvailable(res[i].fields[x].value)){
              fields=fields+'<div class="row"><h3 class="titles col-xs-12"><span>'+res[i].fields[x].label+'</span></h3><p class="col-xs-12">'+Autolinker.link(res[i].fields[x].value)+'</p></div>'; 
            }
          }
        }
     }

      /* IF THE REPORT DOESN'T HAVE A FIELD ADD AN EMPTY VALUE TO TEH ARRAY */
      if(checkSourceAvailable(locArrays.twitterAccount[i])==false){
        locArrays.twitterAccount.push("");
      };

      if(checkSourceAvailable(locArrays.when[i])==false){
        locArrays.when.push("");
      };

      if(checkSourceAvailable(locArrays.mail[i])==false){
        locArrays.mail.push("");
      };

      if(checkSourceAvailable(locArrays.mobile[i])==false){
        locArrays.mobile.push("");
      };

      if(checkSourceAvailable(locArrays.page[i])==false){
        locArrays.page.push("");
      };
      /* END IF THE REPORT DOESN'T HAVE A FIELD */
      
      if(pictures!=""){
        locArrays.pictures.push(pictures); // PUSH REPORT ARRAY OF IMAGES

      }
      
      // COMMENTS 
      if(res[i].comments!=null){
        var comments="";
        for(c=0; c < res[i].comments.length; c++){
          comment="<blockquote>"+res[i].comments[c].text+"</blockquote>"
          comments=comments+comment;
        }
        locArrays.comments.push(comments); // PUSH REPORT ARRAY OF IMAGES
      }
      
      // FIELDS 
      if(fields!=""){
        locArrays.fields.push(fields); // PUSH REPORT ARRAY OF IMAGES
      }
    }
  }   
  $('#counter').text(partecipantsCounter);
  return locArrays;
}


function createBounds(TempLocations) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < TempLocations.length; i++) {
        bounds.extend(TempLocations[i]);
    }
    return bounds;
}



function initMap(bounds){
  var center= (bounds !== null)? bounds.getCenter() : new google.maps.LatLng(4.6486259,-74.2482363);
  var mapOptions = {
        center:center,
        zoom: 15,
        scrollwheel: true,
        mapTypeControl:false,
        streetViewControl: false,
        styles: [{
        stylers: [{
          saturation: -100
        }]
      }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(input);

    // START SEACH BOX
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    // SEARCH LISTENER AND MARKER CREATOR
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      var markers = [];
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(size,size),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(size,size)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
    });

    map.fitBounds(bounds);
  });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {}
  return map;
}

    

function initialize(bounds,map) {
    map.fitBounds(bounds);
    map.panToBounds(bounds);
    var listener = google.maps.event.addListener(map, "idle", function () {
        map.setZoom(15);
        google.maps.event.removeListener(listener);
        setTimeout(function(){
        $('#gth_mapNext').trigger('click'); 
        },1000);
    });
}


function makeMarkers(locArrays,map,filterID) {
  for (var i = 0; i < locArrays.locations.length; i++) {
    addMarker(locArrays,map,i,filterID);
  } // END FOR 
}

function addMarker(locArrays,map,i,filterID) {
  var icon=locArrays.icons[i];

  // create the marker on map
  var marker = new google.maps.Marker({
  position: locArrays.locations[i],
  map: map,
  title: locArrays.IDs[i],
  icon: {
    size: new google.maps.Size(size,size),
    scaledSize: new google.maps.Size(size,size),
    url: icon
   }
  });

  // Create the post display 
  var infowindow = new google.maps.InfoWindow({
      content: buildInfo(locArrays,i)
  });

  // add the click listener on marker to trigger the post view
  google.maps.event.addListener(marker, 'click', function () {
    $('#mapInfo').html(infowindow.getContent());
    animateMarker(marker);
    makeMapSlider();    
  });

  // store the marker for future use
  markerObj={};
  markerObj.id=locArrays.IDs[i];
  markerObj.marker=marker;
  markerObj.infowindow=infowindow;
  markerObj.fieldDate=locArrays.fieldDate[i];
  markerObj.name=locArrays.names[i];
  markerObj.images=checkHttps(locArrays.images[i]);
  markerObj.insert_time=locArrays.dates[i];
  markerObj.summaries=locArrays.summaries[i];
  markerObj.map_text=locArrays.descriptions[i];

  activeMarkersIndex.push(i); // save the index of active markers - all at start
  markersList.push(markerObj);// save the list of markers in array
  markerArray.push(marker);// save for clusters
  createClusters(locArrays,i);

}
         
function createClusters(locArrays,i){
  if(locArrays.locations.length==(i+1)){
    var clusterStyles = [
      {
          textColor: 'black',
          url: 'imgs/cluster/m1.png',
            height: size,
          width: size,
        },
        {
        textColor: 'black',
        url: 'imgs/cluster/m2.png',
        height: size,
        width: size,
        },
      {
          textColor: 'black',
          url: 'imgs/cluster/m3.png',
          height: size,
          width: size,
        },
      { 
          textColor: 'black',
          url: 'imgs/cluster/m4.png',
          height: size,
          width: size,
        },          
      {
          textColor: 'black',
          url: 'imgs/cluster/m5.png',
          height: size,
          width: size,
        }
    ];
    markerCluster = new MarkerClusterer(theMap, markerArray, {
      maxZoom: 10,
      gridSize:30,
      zoomOnClick: true,
      styles: clusterStyles,
    });     
  }
}

        
        



function buildInfo(locArrays,i){
  //And now for the info window
  var contentString="";
  // PICTURES
  if(checkSourceAvailable(locArrays.pictures[i])){
    contentString=contentString+  
    '<div class="row no-margin"><div id="gth_slideContainer" class="col-xs-12">'+locArrays.pictures[i]+'</div></div>';
  }
  contentString=contentString+
  '<div id="mapInfoNav" data-id="'+locArrays.IDs[i]+'">'+
    '<div class="header">'+
      '<div class="about">'+
        '<div class="date">'+locArrays.when[i]+'</div>'+
        '<div class="contact">'+locArrays.twitterAccount[i]+'</div>'+
        '<div class="page">'+locArrays.page[i]+'</div>'+
        '<div class="mail">'+locArrays.mail[i]+'</div>'+
        '<div class="mobile">'+locArrays.mobile[i]+'</div>'+
      '</div>'+  
      '<div class="info">'+
        '<p>'+locArrays.summaries[i]+'</p>'+ 
      '</div>'+  
    '</div>'+
    '<div class="divider"></div>';

    // ADD ALL FIELDS 
    if(checkSourceAvailable(locArrays.fields[i])){
      contentString=contentString+
      '<div class="fields">'+
            locArrays.fields[i]+  
      '</div>';     
    }

    // ADD A COMMENT 
    contentString=contentString+
    '<form role="form" id="mapCommentForm" data-index="'+locArrays.indexes[i]+'">'+
      '<div class="row" id="textComment">'+
          '<label for="exampleInputEmail1" class="col-xs-12"><h3 class="titles><span class="underlined">Tu comentario</span></h1></label>'+
          '<div class="col-xs-12">'+
            '<textarea rows="2" name="commentText"></textarea>'+
          '</div>'+  
      '</div>'+
      '<div class="row">'+
          '<div class="col-sm-12">'+
            '<button type="submit" class="button" id="mapCommentButton">'+
                '<span>Submit</span>'+
            '</button>'+
            '<div class="alert alert-danger" id="mapErrorNullComment">Comment cannot be blank</div>'+
          '</div>'+
      '</div>'+   
    '</form>';

    // COMMENTS 
    var insertComments="";
    if(checkSourceAvailable(locArrays.comments[i])){
        insertComments=locArrays.comments[i];
    }
    contentString=contentString+
    '<div class="divider"></div>'+
    '<div class="row no-margin">'+
      '<div class="col-xs-12 gth_comments">'+insertComments+'</div> '+    
    '</div>';     
  // CLOSE BOX
  contentString=contentString+'</div>'; 
  return contentString;

}

        
          


/*----------------------------------
    NEXT AND PREV POSTS
----------------------------------*/
$(document).on('click', "#gth_mapPrev", function() {
  var index=$('#mapInfo').data('index');
  var prev=(index-1) > -1 ? index-1 : activeMarkersIndex.length-1 ;
  $('#mapInfo').data('index',prev);

  if(checkSourceAvailable(markersList[activeMarkersIndex[prev]])){
    var selectedMarker=markersList[activeMarkersIndex[prev]];

    $('#mapInfo').html(selectedMarker.infowindow.getContent());
    animateMarker(selectedMarker.marker);
    centerMarker(selectedMarker.marker);    
    makeMapSlider();     
  }
});



$(document).on('click', "#gth_mapNext", function() {
  var index=$('#mapInfo').data('index');
  var next=(index+1) < activeMarkersIndex.length? index+1 : 0 ;
  $('#mapInfo').data('index',next);

  if(checkSourceAvailable(markersList[activeMarkersIndex[next]])){
    var selectedMarker=markersList[activeMarkersIndex[next]];
    $('#mapInfo').html(selectedMarker.infowindow.getContent());
    animateMarker(selectedMarker.marker);
    centerMarker(selectedMarker.marker); 
    makeMapSlider();    
  }
});

function centerMarker(marker){
  var latLng = marker.getPosition(); // returns LatLng object
  theMap.setCenter(latLng); // setCenter takes a LatLng object   
}

function animateMarker(marker){
  marker.setAnimation(google.maps.Animation.BOUNCE);        
    setTimeout(function(){
    marker.setAnimation(null);
  },1200);
}


/*----------------------------------
    GEO LOCATION 
----------------------------------*/
$('.locateMe').click(function(){
  geolocateMe();
});

function geolocateMe(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
      if (map.getZoom() <= 4) map.setZoom(15);

    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


/*----------------------------------
  FILTERS 
----------------------------------*/

function initFilters(){
  var now = moment();
  $('.filterDatePicker').datetimepicker({
      defaultDate: now,
      format: "L",
      inline: true,
      collapse:false
  });
  $('.filterDatePicker').on("dp.change", function (e) {
    var from=$(this).data("DateTimePicker").date().valueOf();
    $('.toggle','#filterDate').find('span').text(millisToDate(from));
    updateActiveMarkers(from);  
    $('.datesContainer').slideToggle();
    /*callEntities(from,function(){
      loadNewMapData(this);
    });*/ 
  });
}


/*----------------------------------
    DATE FILTER
----------------------------------*/
$('#filterDate .toggle').click(function(){
  $('.datesContainer').slideToggle();
});

/* REQUEST TO SERVER THE REPORTS SINCE INSERT_TIME
$('.datesContainer > div:not(.filterDatePicker)').click(function(){
    var clicked=$(this);
    var text=clicked.text();
    var parent=clicked.closest('#filterDate');
    $('.toggle',parent).find('span').text(text);
    var date=clicked.data('when');
    var from;
    switch (date){
      case 'today':
        from=moment().startOf('day').valueOf();
      break;
      case 'yesterday':
        from=moment().subtract(1,'days').startOf('day').valueOf();
      break;
      case 'week':
        from=moment().subtract(1,'days').startOf('day').valueOf();
      break;
      case 'month':
        from=moment().startOf('month');
      break;
    }
    $('.datesContainer').slideToggle();
    callEntities(from,function(){
      loadNewMapData(this);
    });
});
*/


$('.datesContainer > div:not(.filterDatePicker)').click(function(){
    $('.datesContainer').slideToggle();
    var clicked=$(this);
    var text=clicked.text();
    var parent=clicked.closest('#filterDate');
    $('.toggle',parent).find('span').text(text);
    var date=clicked.data('when');
    var from;
    switch (date){
      case 'today':
        from=moment().startOf('day').valueOf();
      break;
      case 'yesterday':
        from=moment().subtract(1,'days').startOf('day').valueOf();
      break;
      case 'week':
        from=moment().subtract(1,'days').startOf('day').valueOf();
      break;
      case 'month':
        from=moment().startOf('month');
      break;
    }
    updateActiveMarkers(from);  
});


function updateActiveMarkers(from){
  activeMarkersIndex=[];
  for (var i = 0; i < markersList.length; i++) {
    if(markersList[i].fieldDate>from){
      activeMarkersIndex.push(i);
      markersList[i].marker.setVisible(true);
    }else{
      markersList[i].marker.setVisible(false);
    }
  }
  $('#gth_mapNext').trigger('click');
}




/*----------------------------------
    RESET MAP AND LOAD NEW DATA
----------------------------------*/

function loadNewMapData(obj){
  deleteMarkers();
  locArrays = fillArray(obj);
  makeMarkers(locArrays, theMap);
}


function deleteMarkers() {
  $('#mapInfo').html('');
  clearMarkers();
  markersList=[];

}

function clearMarkers() {
  setMapOnAll(null);
}

function setMapOnAll(map) {
  for (var i = 0; i < markersList.length; i++) {
    markersList[i].marker.setMap(map);
  }
}




/*----------------------------------
    MAP INFO BOX 
----------------------------------*/

function makeMapSlider(){
  if($('#gth_slideContainer li').length>1){
    mapSlider=$("#gth_slideContainer").lightSlider({
          gallery:true,
          galleryMargin: 10,
          item:1,
          loop:true,
          pager:false,
          thumbItem:9,
          slideMargin:0,
          enableDrag: false,
          prevHtml:'prev',
          nextHtml:'next',
          currentPagerPosition:'middle',
          selector: '#gth_slideContainer li',
      }); 
  }

}

$(document).on('submit','#mapCommentForm', function(e) { 
  e.preventDefault(e);  //prevent form from submitting 
  if($(this).data('status')!='busy'){
    $(this).data('status','busy');
    var index=$(this).data('index');
    $('#commentButton').hide(); 
    $('#commentLoading').show();
    var data = $(this).find('textarea[name="commentText"]').val();
    if(data==null || data=="" || data=="undefined"){
      $('#mapCommentButton').show();
      $("#mapErrorNullComment").show(); 
    }else{
      $("#mapErrorNullComment").hide();
      var comment = new Object();
      comment.text=data;
      if(entities[index].comments!=null){
        entities[index].comments.push(comment);
      }else{
        entities[index].comments=[comment];
      }
      var newEntity=new Object();
        if(typeof obj!="undefined" && obj!=null){
            newEntity.client_id=obj.domains[0].client_id;
      }else{
            newEntity.client_id=client_id;
      }
      newEntity.entity=entities[index];
      var jsonString = JSON.stringify(newEntity);
      doRequestNoHeader(baseRoot+"SaveEntity",jsonString, function () {
        $( '#mapCommentForm input' ).each(function(){
            this.reset();
        });
        comment="<p>"+data+"</p>"
        var commentBox= $('<blockquote>',{html:comment});
        commentBox.appendTo($('.gth_comments'));
        $('#mapCommentButton').show();
      });
    }
  }
});

/*----------------------------------
    MAP RESIZE
----------------------------------*/
var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(google.maps.event.trigger(map, "resize"), 100);
});
$('#expandMap').click(function(){
  clearTimeout(resizeTimer);
    resizeTimer = setTimeout(google.maps.event.trigger(map, "resize"), 100);
});




