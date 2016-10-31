// USER MESSAGES

function showWarning(object,text){
   $(object).parent().addClass('has-error');
   setTimeout(function(){$(object).parent().removeClass('has-error');},5000);
}
function userMessage(message, displayButtons,buttonName,goTO) {
    $('#userMessageText').text(message);
    $('#userNotification').fadeToggle();

    if (displayButtons == true) {
        $('#userMessageButtonConfirm').val(buttonName);
        $('#userMessageButtons').show();
    } else {
        $('#userMessageButtons').hide();
        setTimeout(function () {
            $('#userNotification').fadeToggle();
        }, 2000);
    }
}

function closeError(){
        $('#userNotification').fadeToggle();
}

function checkError(obj) {
    var error = false;
    if (obj.error == true) {
        userMessage(obj.error_message, false);
        error = true;
    }
    return error;
}

// SCROLLS
function scrollBottom() {
    $("html, body").animate({
        scrollTop: $(document).height()
    }, "fast");
    return false;
}

function scrollTop() {
    $("html, body").animate({
        scrollTop: 0
    }, "fast");
    return false;
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function updateLanguage() {
    $('.lang').each( function(){
        var typo= $(this).prop("tagName");      
        switch(typo){
            case "INPUT":
                $(this).attr('placeholder',languages.language[activeLanguage][$(this).data('lang')]);

            break;
            
            default:
                var text=languages.language[activeLanguage][$(this).data('lang')];
                $(this).html(text);
            break;
        }
    });
}

function setText(id){
    text=languages.language[activeLanguage][id];
    return text;
}


$('.infoSectionTitle').click(function(){
     $(this).next().slideToggle('slow');
     $(this).find('span').toggleClass('rotate180'); 
});


$('#buttonNav').click(function() {
    $(this).toggleClass("closeNav");
    $('.sidebar').toggleClass('closed');
}); 

$('#settingsButton').click(function(){
     $('#settingsMenu').slideToggle('slow');
});


function preserveLineBreak(text){
   text= text.replace(/(?:\r\n|\r|\n)/g, '<br />');
   return text;
}







function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}


function checkCookie(name) {
    var cookie = getCookie(name);
	var val;
	switch (name){
		case 'GatherLanguage':	
			if (cookie != null && cookie != ""){
				if(cookie =="en" || cookie =="es"){
					val = cookie;
				}else{
					val=languages.config.base;
				}
			}else{
				val=languages.config.base;
			}
		break;

		case 'GatherWidgetID':
		    if (cookie != null && cookie != "") {
				val =cookie;
			}else {
				var randomstring=randomString(30);
				setCookie("GatherWidgetID",randomstring,40*365); 
				val=randomstring;
			}
			break;

		case 'Gather':
			if (cookie != null && cookie != "") {
				val = JSON.parse(cookie);
			}else{
		    	window.location.href = 'index.html';
			}
			break;
		case 'GatherDomain':
			if (cookie != null && cookie != "") {
            	val = cookie;
			}else{
		    	window.location.href = 'index.html';
			}
			break;
		case 'GatherTotReports':
		    val =  JSON.parse(cookie);
			break;	
			
		default:
	       	val =  cookie;
	}
	return val;
}
	

// GET VARIABLES FROM URL
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


// INITIALIZE SERVER XMLREQUEST
function getXMLHTTPRequest() {
    try {
        req = new XMLHttpRequest(); /// FIREFOX CHROME
    } catch (err1) {
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP"); //IE
        } catch (err2) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP"); //DIFFERENT
            } catch (err3) {
                req = false;
            }
        }
    }
    return req;
};



function doRequest(page, request, callback) {
    var xmlRequest = new getXMLHTTPRequest(); // Initialize XMLREQUEST BASED ON BROWSER
    xmlRequest.open("POST", page, true); // CONNECT TO THE SERVER FILE
    if (page != "../Login") {
		if(typeof usr.token != "undefined"){
        	xmlRequest.setRequestHeader("gathertoken", usr.token._id);
        	xmlRequest.setRequestHeader("gatherplatform", "WEB");
        	xmlRequest.setRequestHeader("gatherclientid", usr.token.client_id);
		}
    }
    xmlRequest.send(request);
    xmlRequest.onreadystatechange = function () { // IF THE SERVER IS CONNECTED
        if (xmlRequest.readyState == 4 && xmlRequest.status == 200) { // IF THE SERVER IS READY AND RESPONDED PROPERLY 
            var response = xmlRequest.responseText; // GET THE CONTENT
            var tempObj = JSON.parse(response);
            var error = false;
            if (tempObj.error == true || tempObj.usr_error == true) {
                userMessage(tempObj.error_message, false);
            } else {
                delete tempObj.error;
                delete tempObj.error_message;
                if (tempObj.usr_error != "undefined") {
                    delete tempObj.usr_error;
                }
                callback.call(tempObj);
            }
        } else if (xmlRequest.status != 200) {
            userMessage("Error Connecting to the server", false);
		      }
    }
}


function doImageRequest(page,fd,myFormData,callback) {
    console.log("imagerequest");
    var xmlRequest = new getXMLHTTPRequest(); // Initialize XMLREQUEST BASED ON BROWSER
    xmlRequest.open("POST", page, true); // CONNECT TO THE SERVER FILE
    if (page != "../Login") {
        if(typeof usr.token != "undefined"){
            var boundary=Math.random().toString().substr(2);
            var multipart ="";
            for (var key in myFormData) {
                console.log(key, myFormData[key]);
                multipart += "--" + boundary
                + "\r\nContent-Disposition: form-data; name=uploadedfile; filename=" + key
                + "\r\nContent-type: application/octet-stream"
                + "\r\n\r\n" + myFormData[key] + "\r\n";
            }
            
            multipart += "--"+boundary+"--\r\n";

            xmlRequest.setRequestHeader("gathertoken", usr.token._id);
            xmlRequest.setRequestHeader("gatherplatform", "WEB");
            xmlRequest.setRequestHeader("gatherclientid", usr.token.client_id);
            xmlRequest.setRequestHeader('Content-Type','multipart/form-data;boundary=' + boundary);
        }
    }
    xmlRequest.send(multipart);

    xmlRequest.onreadystatechange = function () { // IF THE SERVER IS CONNECTED
        if (xmlRequest.readyState == 4 && xmlRequest.status == 200) { // IF THE SERVER IS READY AND RESPONDED PROPERLY 
            var response = xmlRequest.responseText; // GET THE CONTENT
            var tempObj = JSON.parse(response);
            var error = false;
            if (tempObj.error == true || tempObj.usr_error == true) {
                userMessage(tempObj.error_message, false);
            } else {
                delete tempObj.error;
                delete tempObj.error_message;
                if (tempObj.usr_error != "undefined") {
                    delete tempObj.usr_error;
                }
                callback.call(tempObj);
            }
        } else if (xmlRequest.status != 200) {
            userMessage("Error Connecting to the server", false);
              }
    }
}


function doRequestNoHeader(page, request, callback) {
    var xmlRequest = new getXMLHTTPRequest(); // Initialize XMLREQUEST BASED ON BROWSER
    xmlRequest.open("POST", page, true); // CONNECT TO THE SERVER FILE
	xmlRequest.setRequestHeader("gatherplatform", "WEB");
    xmlRequest.send(request);
    xmlRequest.onreadystatechange = function () { // IF THE SERVER IS CONNECTED
        if (xmlRequest.readyState == 4 && xmlRequest.status == 200) { // IF THE SERVER IS READY AND RESPONDED PROPERLY 
            var response = xmlRequest.responseText; // GET THE CONTENT
            var tempObj = JSON.parse(response);
            var error = false;
            if (tempObj.error == true || tempObj.usr_error == true) {
                userMessage(tempObj.error_message, false);
            } else {
                delete tempObj.error;
                delete tempObj.error_message;
                if (tempObj.usr_error != "undefined") {
                    delete tempObj.usr_error;
                }
                callback.call(tempObj);
            }
        } else if (xmlRequest.status != 200) {
            userMessage("Error Connecting to the server", false);
		      }
    }
}



function millisToDate(value){
    var m = moment(value);
    var date = m.format("l");
    return date;
}   

function millisToFullDate(value){
    var m = moment(value);
    var date = m.format("MM/DD/YYYY hh:mm A");
    return date;
}

function millisToHour(value){
    var m = moment(value);
    var date = m.format("LT");
    return date;
}   

function dateToMillisFromValue(value){
    var millis=moment(value).valueOf();
    return millis;
}

function dateToMillisFromId(id){
    var millis=$(id).data("DateTimePicker").date().valueOf();
    return millis;
}   


