var baseRoot = "https://gather.siineserver.com/GatherServerLive/";
var client_id = '57fc9a300a975a4e89011758';
var domain_id = '57fc9edc0a975a4e8901175d';

var reports;

$(document).ready(function() {

    
    $('.page').each(function(){
        var pageIndex=$(this).index();
        $(this).hammer().bind("swiperight",function(ev){
            var $active=$('.active');
            console.log($active.prev().length);
            if($active.prev().length>0){
                var prev=$active.prev();
                $active.removeClass('active');
                prev.addClass('active');
            }
            
        }).bind("swipeleft",function(ev){
            var $active=$('.active');
            console.log($active.next().length);
            if($active.next().length>0){
                var next=$active.next();
                $active.removeClass('active');
                next.addClass('active');
            }
             
        });
        
    });
   

    /*
    getJson('statics/revisiones',function(){
        
    });*/


    getJson("reports",function(){
        var data=this;
        drawReports(data);
        pieBarChart('#dashboard',fData,fOptions);
    });

    radius=(($( window ).innerWidth())/2) - 30 ;
    $("#type").roundSlider({
          sliderType: "min-range",
            circleShape: "full",
            min: -100,
            max: 100,
            value: -100,
            startAngle: 90,
            editableTooltip: false,
            radius: radius,
            width: 20,
            handleShape: "dot"
    });


    
    $('form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();
        reports.push(formData);
        jsonString=JSON.stringify(reports);
        $('.val').html(jsonString);
        $('.feedback').html('start ajax');
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: 'post.php',
            cache: false,
            timeout: 2000,
            dataType: 'json',
            data: jsonString,
            success: function(data, status) {
                drawReports(data);
                $('.feedback').html('done');


            },
            error: function(request, status, error) {
                $('.feedback').html(error);

            }
        });
    });
    

    function getJson(file,callback) {
        $.ajax({
            // Post select to url.
            type: 'post',
            url: 'get.php?file='+file,
            dataType: 'json', // expected returned data format.
            success: function(data) {
                callback.call(data);
            },
            complete: function(data) {
                // do something, not critical.
            }
        });
    }


    function drawReports(data){
        reports=data;
        $('.list').empty();
        for (var i = 0; i < reports.length; i++) {
            $('.list').append('<p>'+reports[i]["value"]+'</p>');
        }

    }
});
