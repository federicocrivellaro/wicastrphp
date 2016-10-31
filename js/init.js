var baseRoot = "https://gather.siineserver.com/GatherServerLive/";
var client_id = '57fc9a300a975a4e89011758';
var domain_id = '57fc9edc0a975a4e8901175d';

var reports;

$(document).ready(function() {

    getReports();


    $('form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();
        reports.push(formData);
        jsonString=JSON.stringify(reports);
        console.log(jsonString);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'charset':'utf-8'
            },
            type: 'POST',
            url: 'post.php',
            cache: false,
            timeout: 2000,
            dataType: 'json',
            data: jsonString,
            success: function(data, status) {
                drawReports(data);
            },
            error: function(request, status, error) {
                console.log(error);
            }
        });
    });


    function getReports(file) {
        var file="reports";
        $.ajax({
            // Post select to url.
            type: 'post',
            url: 'get.php?file=reports',
            dataType: 'json', // expected returned data format.
            success: function(data) {
                drawReports(data);
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
            $('.list').append('<p>'+reports[i]["title"]+'</p>');
        }

    }
});
