

var report = {};

/*----------------------------------
    stop auto scrolling when input
    is focuse
----------------------------------*/




function buildReport(){
    for (var key in report) delete report[key];
    // far from being an perforance solution. 
    // need to find a better way to make a deep copy with proto
    // this is not ok jQuery.extend(true, {}, domain.fields)
    report.fields = JSON.parse(JSON.stringify(domain.fields));
    report.coordinates=[];
    report.domain_id=domain._id;
    report.client_id=domain.client_id;
    report.type_id =categories[0].types[0].type_id;
    report.type_name =categories[0].types[0].type_name;
}

function drawForm() {
    closeAfterPost();
    buildReport();
    for (i = 0; i < domain.fields.length; i++) {
        var id = domain.fields[i]._id;
        var label = domain.fields[i].label;
        var mandatory = false;
        if (domain.fields[i].mandatory == true) {
            label = "* " + label;
            mandatory = true;
        }
        var field;
        switch (id) {
            case 1: // PROGRESS BAR 
                field =
                    '<div class="form-group row alert " data-mandatory="' + mandatory + '">'+
                        '<label class="control-label" for="editReportField' + i + '">' + label + '</label>'+
                        '<input type="text" readonly id="editReportField' + i + '" data-id="' + id + '" class="form-control readout" value="0"></input>'+
                        '<div id="editReportFieldSlider' + i + '"  data-fieldindex="' + i + '" class="margin-top gth_spinner"></div>'+
                    '</div>';
                report.fields[i].value = null;

                break;
            case 3: // DATE 
                field ='<div class="form-group row alert " data-mandatory="' + mandatory + '">'+
                            '<label class="control-label" for="editReportField' + i + '">' + label + '</label>'+
                            '<input class="form-control" type="text" id="editReportField' + i + '" data-id="' + id + '" data-fieldindex="' + i + '" ></input>'+
                        '</div>';
                report.fields[i].value = null;
                break;
            case 4: // LOCATION
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label" for="editReportField' + i + '">' + label + '</label><input type="text" id="editReportFieldMapInput" data-id="' + id + '"   data-fieldindex="' + i + '" class="form-control" ></input><div class="rInterfaceMap" id="editReportFieldMap"></div></div>');
                report.fields[i].value = null;
                break;
            case 5: // TEXT AREA
                field =
                    '<div class="form-group row alert " data-mandatory="' + mandatory + '">' +
                      '<label class="col-xs-12 control-label" for="editReportField' + i + '">' + label + '</label>' +
                      '<textarea class="col-xs-12 editReportFieldTextarea" rows="3" id="editReportField' + i + '" data-id="' + id + '" data-fieldindex="' + i + '" data-type="editReportField" ></textarea>' +
                    '</div>';
                report.fields[i].value = null;
                break;
            case 6: // PICTURE
                field = $('<div class="form-group row alert pictureField" data-mandatory="' + mandatory + '"><label class="control-label col-xs-12 no-padding" for="editReportField' + i + '">' + label + '</label><label class="control-label" for="editReportField' + i + '"><img src="'+assetsRoot+'assets/imgs/picture.png"></label><input class="form-control hidden" id="editReportField' + i + '" data-type="editReportField" data-id="' + id + '"   data-fieldindex="' + i + '" type="file"></input></div>');
                report.fields[i].value = null;
                break;
            case 8: // SOCIAL
                var fb = domain.fields[i].useFb;
                var tw = domain.fields[i].useTwitter;
                report.fields[i].value = [false, false];
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label col-xs-12 no-padding">' + label + '</label></div>');
                if (fb == true) {
                    var $fb = ('<button type="button" class="btn btn-default editReportFieldSocial" data-id="' + id + '" data-social="facebook"  data-fieldindex="' + i + '">Facebook</button>');
                    field.append($fb);
                }
                if (tw == true) {
                    var $tw = ('<button type="button" class="btn btn-default margin-left editReportFieldSocial" data-id="' + id + '"  data-social="twitter" data-fieldindex="' + i + '">Twitter</button>');
                    field.append($tw);
                }
                break;
            case 11: // TEXT BUTTONS
                report.fields[i].value = null;
                var multi = domain.fields[i].multiselection;
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label col-xs-12 no-padding">' + label + '</label><div class="editReportFieldBtnGroup" data-multiselection="' + multi + '" data-id="' + id + '"  data-fieldindex="' + i + '"></div>');
                for (x = 0; x < domain.fields[i].textOptions.length; x++) {
                    var val = domain.fields[i].textOptions[x];
                    var $button;
                    var $button = $('<button class="btn btn-default col-xs-12">' + val + '</button>');
                    $button.appendTo(field.children().eq(1));
                }
                break;
            case 12: // SPINNER
                report.fields[i].value = null;
                var val = "no value";
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label col-xs-12 no-padding">' + label + '</label><div class="dropdown"  id="editReportField' + i + '" data-id="' + id + '"  data-fieldindex="' + i + '"></div>');
                var $dropButton = $('<button class="btn btn-default dropdown-toggle" type="button" id="editReportField' + i + 'Button" data-toggle="dropdown"><span>' + val + '</span><span class="caret"></span></button>');
                $dropButton.appendTo(field.children().eq(1));
                var $dropList = $('<ul class="dropdown-menu editReportFieldSpinner" role="menu" aria-labelledby="editReportField' + i + 'Button"></ul>');
                var $button = $('<li><a role="menuitem" href="#">no value</a></li>');
                $button.appendTo($dropList);
                for (x = 0; x < domain.fields[i].textOptions.length; x++) {
                    var val = domain.fields[i].textOptions[x];
                    var $button = $('<li><a role="menuitem" href="#">' + val + '</a></li>');
                    $button.appendTo($dropList);
                }
                $dropList.appendTo(field.children().eq(1));
                break;
            case 13: // NUMBER
                report.fields[i].value = null;
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label" for="editReportField' + i + '">' + label + '</label><input type="text" id="editReportField' + i + '" data-id="' + id + '"   data-fieldindex="' + i + '" class="form-control numeric" data-type="editReportField" ></input></div>');
                break;
            case 14: // NUMBER
                report.fields[i].value = null;
                var description = domain.fields[i].description;
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label" for="editReportField' + i + '">' + label + '</label><p>' + description + '</p></div>');
                break;
            case 15: // IMAGE BUTTONS
                report.fields[i].value = null;
                var multi = domain.fields[i].multiselection;
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label col-xs-12 no-padding">' + label + '</label><div class="editReportFieldBtnGroup" data-multiselection="' + multi + '" data-id="' + id + '"  data-fieldindex="' + i + '"></div>');
                for (x = 0; x < domain.fields[i].textOptions.length; x++) {
                    var val = domain.fields[i].textOptions[x];
                    var image = domain.fields[i].imageOptions[x];
                    var $button = $('<button class="btn btn-default col-xs-6 col-md-6 editReportFieldBtnGroupImage"><div style=background:url("' + image + '")/></button>');
                    var $val;
                    if (domain.fields[i].showTextUnderImages == true) {
                        $val = $('<div class="col-xs-12" style="white-space:normal">' + val + '</div>');
                    } else {
                        $val = $('<div class="col-xs-12 hidden">' + val + '</div>');
                    }
                    $val.appendTo($button);
                    $button.appendTo(field.children().eq(1));
                }
                break;
            default:
                report.fields[i].value = null;
                field = $('<div class="form-group row alert " data-mandatory="' + mandatory + '"><label class="control-label" for="editReportField' + i + '">' + label + '</label><input type="text" id="editReportField' + i + '" data-id="' + id + '"   data-fieldindex="' + i + '" data-type="editReportField" class="form-control" ></input></div>');
        }

        $('#gth_form .formfields').append(field);

        if (id == 13) {
            $('.numeric').numeric();
        }
        if (id == 1) {
            var min=parseFloat((domain.fields[i].min_value)? domain.fields[i].min_value: 0 );
            var max=parseFloat((domain.fields[i].max_value)? domain.fields[i].max_value: 100 );
            var step=parseFloat((domain.fields[i].step)? domain.fields[i].step: 0 );

            $('#editReportFieldSlider' + i).slider({
                value:0,
                min: min,
                max: max,
                step: step,
                slide: function(event, ui) {
                    fieldIndex = $(this).data('fieldindex');
                    $('#editReportField' + fieldIndex).val(ui.value);
                    report.fields[fieldIndex].value = ui.value;
                    removeAlert(this);
                }
            });
        }

        // DATE TIME PICKER 
        if (id == 3){
            var now = moment();
           $('#editReportField'+i).datetimepicker({
                defaultDate: now,
                format: "LLL",
                focusOnShow:false,
                inline: true,
                sideBySide: true,
                collapse:false
            });
            $('#editReportField'+i).on("dp.change", function (e) {
                var fieldIndex = $(this).data('fieldindex');
                report.fields[fieldIndex].value=$(this).data("DateTimePicker").date().valueOf();
                removeAlert(this);

            });
        }
        if (id == 4) {
            addresspickerMap = $('#editReportFieldMapInput').addresspicker({
                language: "en",
                reverseGeocode: true,
                updateCallback: showCallbackMap,
                autocomplete: 'default',
                mapOptions: {
                    zoom: 10,
                    center: new google.maps.LatLng(4.6486259,-74.2482363),
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                elements: {
                    map: "#editReportFieldMap",
                }
            });
            gmarker = addresspickerMap.addresspicker("marker");
            gmarker.setVisible(true);
            addresspickerMap.addresspicker("updatePosition");
        }

    }
}


// CLEAR DATE FIELD
$(document).on('click', '.dateClear', function(event) {
    event.preventDefault(event);
    fieldInput = $(this).closest('div').find('input');
    fieldInput.val(null);
    fieldIndex = fieldInput.data('fieldindex');
    report.fields[fieldIndex].value = null;
});

// MAP FILL   
function showCallbackMap(geocodeResult, parsedGeocodeResult) {
    removeAlert($('#editReportFieldMapInput'));

    fieldIndex = $('#editReportFieldMapInput').data('fieldindex');
    report.coordinates = new Array;

    report.coordinates[0] = checkSourceAvailableNull(parsedGeocodeResult.lat);
    report.coordinates[1] = checkSourceAvailableNull(parsedGeocodeResult.lng);

    report.fields[fieldIndex].value = new Object;
    report.fields[fieldIndex].value.lat = checkSourceAvailableNull(parsedGeocodeResult.lat);
    report.fields[fieldIndex].value.lg = checkSourceAvailableNull(parsedGeocodeResult.lng);
    report.fields[fieldIndex].value.address = checkSourceAvailableNull(geocodeResult.formatted_address);
    report.fields[fieldIndex].value.city = checkSourceAvailableNull(parsedGeocodeResult.locality);
    report.fields[fieldIndex].value.zip_code = checkSourceAvailableNull(parsedGeocodeResult.postal_code);
    report.fields[fieldIndex].value.country = null;
    try {
        var country = parsedGeocodeResult.country;
        var shortCountry;
        for (i = 0; i < geocodeResult.address_components.length; i++) {
            if (checkSourceAvailable(geocodeResult.address_components[i].long_name)) {
                if (geocodeResult.address_components[i].long_name == country) {
                    report.fields[fieldIndex].value.country = geocodeResult.address_components[i].short_name;
                }
            }
        }
    } catch (err) {}

}

// CLEAR MAP FILL   
$(document).on('change', '#editReportFieldMapInput', function() {
    removeAlert($('#editReportFieldMapInput'));
    fieldIndex = $('#editReportFieldMapInput').data('fieldindex');
    if ($(this).val() == "" || $(this).val() == "undefined" || $(this).val() == "null") {
        delete report.fields[fieldIndex].value;
        report.coordinates = null;
    }
});

// EIDT REPORT 

$(document).on('click', '.editReportFieldSocial', function(event) {
    event.preventDefault(event);
    var social = $(this).data('social');
    fieldIndex = $(this).data('fieldindex');

    $(this).toggleClass('btn-primary btn-default');
    var newArray = [];

    $(this).parent().children('button').each(function(index, element) {
        if ($(this).hasClass('btn-primary')) {
            newArray.push(true);
            socialPublish[index] = true;
        } else {
            newArray.push(false);
            socialPublish[index] = false;
        }
    });
    report.fields[fieldIndex].value = newArray;
    removeAlert(this);

});


$(document).on('click', '.editReportFieldBtnGroup button', function(event) {
    event.preventDefault(event);
    var multi = $(this).parent().data('multiselection');
    fieldIndex = $(this).parent().data('fieldindex');
    if (multi == true) {
        $(this).toggleClass('btn-primary btn-default');

    } else {
        if ($(this).hasClass('btn-primary')) {
            $(this).removeClass('btn-primary').addClass('btn-default');
        } else {
            $(this).addClass('btn-primary').removeClass('btn-default').siblings().removeClass('btn-primary').addClass('btn-default');
        }
    }
    var newArray = [];
    $(this).parent().children('.btn-primary').each(function(index, element) {
        var value = $(this).text();
        newArray.push(value);
    });
    report.fields[fieldIndex].value = newArray;
    removeAlert(this);

});

$(document).on('click', '.editReportFieldSpinner li', function(event) {
    event.preventDefault(event);
    var val = $(this).children().eq(0).text();
    $(this).parent().prev().children().eq(0).text(val);
    fieldIndex = $(this).closest('.dropdown').data('fieldindex');
    if (val == "no value") { val = null; }
    report.fields[fieldIndex].value = val;
    removeAlert(this);
});


$(document).on("change", '.editReportFieldTextarea', function() {
    var value = $(this).val();
    fieldIndex = $(this).data('fieldindex');
    report.fields[fieldIndex].value = value;
    removeAlert(this);
});


$(document).on('change', 'input', function() {
    contentEdited = true;
    var type = $(this).data("type");
    var id = this.id;

    var object = this;
    switch (type) {
        /* MODAL EDIT REPORT */
        case "editReportField":
            var value = $(object).val();
            fieldIndex = $(this).data('fieldindex');
            fieldId = $(this).data('id');
            switch (fieldId) {
                case 6:
                    var oldIconSrc = $(this).prev().find("img").attr('src');
                    imageUpload(this, oldIconSrc, null, null, false, function() {
                        var newurl = this;
                        report.fields[fieldIndex].value = newurl;
                        $(object).prev().find("img").attr('src', newurl);
                    });
                    break;
                case 11:
                    report.fields[fieldIndex].value = value;
                    break;
                case 14:
                    report.fields[fieldIndex].value = value;
                    break;
                case 15:
                    report.fields[fieldIndex].value = value;
                    break;
                default:
                    report.fields[fieldIndex].value = value;
            }
    }

    removeAlert(this);

});

function removeAlert(obj) {
    var $box = $(obj).closest('.form-group');
    if ($box.hasClass('alert-danger')) {
        $box.removeClass('alert-danger');
    };
}

function longToGoogleLocaleString(value) {
    var date = new Date(value);
    label = date.toLocaleString();
    return label;
}


$('#gth_form').on('submit',function (e) {
    e.preventDefault();
    $('#submittingForm').show();
    var submitButton=$('button[type=submit]',this);
    report.insert_time=new Date().getTime();
    report.uuid=uuid;
    report.source="WEB";
    var reporteReady=true;

    if(checkSourceAvailable(report.coordinates)==false){
        report.coordinates=null;
    }else{
        if(checkSourceAvailable(report.coordinates[0])==false || checkSourceAvailable(report.coordinates[1])==false){
         report.coordinates=null;
        }
    }

    for(i=0; i < report.fields.length; i++){
        if(report.fields[i].mandatory==true){
            if(report.fields[i].value==null || report.fields[i].value=="undefined" || report.fields[i].value==""){
                reporteReady=false;
                $('.formfields > div').eq(i).addClass('alert-danger');
            }
        }
    }
    if(reporteReady!=true){
        var $message=$('<div class="alert alert-danger" role="alert" id="alertMessage">Please fill all the mandatory ( symbol * ) fields</div>')    
        $(submitButton).after($message);
        setTimeout(function(){
            $('#alertMessage').remove();    
            $('button[type=submit]').removeAttr('disabled');
        }, 3000);       
    }else{
        /*var messages=composeMessages(); 
        report.map_text=messages[0];
        if(socialPublish[0]==true){
            report.fb_text=messages[1];
        }else{
            report.fb_text=null;
        }
        if(socialPublish[1]==true){
            report.twitter_text=messages[2];
        }else{
            report.twitter_text=null;
        }*/


        sendReport();
    }
});

function composeMessages(){
    var typeName="--Typename--";
    var messages=new Array;

    if(checkSourceAvailable(domain.map_text)){
        messages[0]=domain.map_text;
        if(messages[0].indexOf(typeName)>-1){
            messages[0]=messages[0].replace(typeName,String(report.type_name));
        }
    }
    if(checkSourceAvailable(domain.fb_text) && socialPublish[0]==true){
        messages[1]=domain.fb_text;
        if(messages[1].indexOf(typeName)>-1){
            messages[1]=messages[1].replace(typeName,String(report.type_name));
        }   
    }
    
    if(checkSourceAvailable(domain.twitter_text) && socialPublish[1]==true){
        messages[2]=domain.twitter_text;
        if(messages[2].indexOf(typeName)>-1){
            messages[2]=messages[2].replace(typeName,String(report.type_name));
        }   
    }

    // LABELS
    for(i=0; i < report.fields.length; i++){
        var label='--'+report.fields[i].label+'--';
        var id=report.fields[i]._id;
        var value;
        if(checkSourceAvailable(report.fields[i].value)){
            switch (id){
                case 3: // DATE
                    var date = new Date(report.fields[i].value);
                    var n=date.customFormat( "#MM#/#DD#/#YYYY# #hh#:#mm#:#ss#" );
                    value=n;
                 break;
                 case 4: // LOCATION
                    value=report.fields[i].value.address;
                 break;
                 case 11: // TEXT BUTTON
                    value=report.fields[i].value.join();
                 case 15: // TEXT BUTTON
                    value=report.fields[i].value.join();
                 default:
                    value=String(report.fields[i].value);   
            }
        }else{
            value="(not provided)";                 
        }
        if(checkSourceAvailable(messages[0])){
            if(messages[0].indexOf(label)>-1){
                messages[0]=messages[0].replace(label,value);
            }
        }
        
        if(checkSourceAvailable(messages[1])){
            if(checkSourceAvailable(domain.fb_text) && socialPublish[0]==true){
                if(messages[1].indexOf(label)>-1){
                    messages[1]=messages[1].replace(label,value);
                }
            }
        }
        if(checkSourceAvailable(messages[2])){
            if(checkSourceAvailable(domain.twitter_text) && socialPublish[1]==true){
                if(messages[2].indexOf(label)>-1){
                    messages[2]=messages[2].replace(label,value);
                }
            }
        }
    }
    return messages;
}




function sendReport(){
    var reportContainer=new Object;
    reportContainer.entity=report;
    var jsonString = JSON.stringify(reportContainer);
    doRequestNoHeader(baseRoot+"SaveEntity",jsonString, function () {
        var savedObj = this;
        if(checkSourceAvailable(savedObj.blocked)==true && savedObj.blocked==true){
            $('#gth_blocked').show();
            setTimeout(function(){
                $('#gth_blocked').fadeOut();
                toggleViews('gth_buttonsContainer');
            },2000);
                
        }else{
            
            /*
            if(socialPublish[0]==true){
                setTimeout(function(){
                    startFacebook();
                },5000);
            }
            if(socialPublish[1]==true){
                setTimeout(function(){
                    startTwitter();
                },1000);
            }
            */
            closeAfterPost();           
        }
    });
}

function closeAfterPost(){
    $('#gth_form')[0].reset();
    $('.editReportFieldBtnGroup button').removeClass('btn-primary');
    $('.editReportFieldBtnGroup button').removeClass('btn-primary');
    $('.pictureField label img').attr('src',defaultSrc);
    $('#submittingForm').hide();
    $('#gth_thanks').show();
    buildReport();
    setTimeout(function(){
        $('#gth_thanks').hide();   
    },4000);
}



