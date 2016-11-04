var baseRoot = "https://gather.siineserver.com/GatherServerLive/";
var client_id = '57fc9a300a975a4e89011758';
var domain_id = '57fc9edc0a975a4e8901175d';

var reports=[];
var bottomBarcart;
$(document).ready(function() {

    
    /*$('.page').each(function(){
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
    });*/
   

    /*
    getJson('statics/revisiones',function(){
        
    });*/


    getJson("reports",function(){
        reports=this;
        if(reports.length===0){
            reports=[
                {"parameter":"10-20","total":3},
                {"parameter":"21-30","total":6},
                {"parameter":"31-40","total":2},
                {"parameter":"41-50","total":10}, 
                {"parameter":"50-61","total":3},
                {"parameter":"61-70","total":4}, 
                {"parameter":"71-80","total":6},
                {"parameter":"81-90","total":2},
                {"parameter":"91-100","total":1},      
            ];
        }
        bottomBarcart= new barchart('#barchart',reports);
    });


    $("#volume").roundSlider({
          sliderType: "min-range",
            circleShape: "full",
            min: 10,
            max: 100,
            value: 95,
            startAngle: 90,
            showTooltip:false,
            radius: (($( window ).innerHeight())/4) - 30,
            width: 20,
            handleShape: "dot",
            create:function(args){
                var value=args.value;
                $('form button').show(value);
                $('form button').text(value);
            },
            change: function (args) {
               var value=args.value;
               $('#number').val(value);
               $('form button').text(value);
            }
    });

    
    $('form').on('submit', function(e) {
        e.preventDefault();

        $('form button').trigger( "blur" );   
        var formData = $(this).serializeObject();
        var val=formData.volume;


        var index=0;
        
        if(val>20 && val<31){
            index=1;
        }else if(val>30 && val<41){
            index=2;
        }else if(val>40 && val<51){
            index=3;
        }else if(val>50 && val<61){
            index=4;
        }else if(val>60 && val<71){
            index=5;
        }else if(val>70 && val<81){
            index=6;
        }else if(val>80 && val<91){
            index=7;
        }else if(val>90){
            index=8;
        }

        reports[index].total=reports[index].total+1;

        jsonString=JSON.stringify(reports);
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
                bottomBarcart.update(data);
            },
            error: function(request, status, error) {

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
