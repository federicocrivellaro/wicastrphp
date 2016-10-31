Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = this;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0){h=24;}
    if (h>12){h-=12;}
    hh = h<10?('0'+h):h;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};


function longToGoogleDate(value) {
    var date = new Date(value);
    return date.customFormat( "#MM#/#DD#/#YYYY#" );
}

function longToGoogleLocaleString(value) {
    var date = new Date(value);
    label = date.toLocaleString();
    return label;
}

function randomString(length) {
	var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i){ result += chars[Math.round(Math.random() * (chars.length - 1))];}
    return result;
}


function getButtonName(name) {
	var number=$('#typesContainer li').length;
	var goodToGo=false;
	var collectionIndex=getActiveCollectionIndex();
	var fieldName;

	while(goodToGo===false){
		var exists=false;
		number=number+1;
		fieldName=name +number.toString();
    	for (i = 0; i < objCategories.categories[collectionIndex].types.length; i++) {
    		if (fieldName == objCategories.categories[collectionIndex].types[i].type_name) {
				exists=true;
				break;
        	 }
    	}
		if(exists===false){
			goodToGo=true;
		}
	}
    return fieldName;
}


function getCampaignName(name) {
	var number=$('#campaignsList >div').length;
	var goodToGo=false;
	var fieldName;

	while(goodToGo===false){
		var exists=false;
		number=number+1;
		fieldName=name +number.toString();
    	for (i = 0; i < obj.domains.length; i++) {
    		if (fieldName == obj.domains.name) {
				exists=true;
				break;
        	 }
    	}
		if(exists===false){
			goodToGo=true;
		}
	}
    return fieldName;
}


function getFieldOptionName(name,fieldIndex,number){
	var goodToGo=false;
	var fieldName;

	while(goodToGo===false){
		var exists=false;
		number=number+1;
		fieldName=name +number.toString();
        for (i = 0; i < obj.domains[0].fields[fieldIndex].textOptions.length; i++) {
        	if (fieldName == obj.domains[0].fields[fieldIndex].textOptions[i]) {
				exists=true;
			}	
		}
    	
		if(exists===false){
			goodToGo=true;
		}
	}
    return fieldName;
}
			
			
function assignfieldName(name) {
    var d = new Date();
    var time = d.getTime();
    var n = time.toString();
    var fieldName;
    if (name !== null) {
        fieldName = name+ n;
    } else {
        fieldName = n;
    }
    return fieldName;
}

function checkSource(src){
	if(src!== null && src!="undefined"){
		return src;
	}else{
		return null;
	}
}



function checkSourceImg(src){
	if(src!= null && src!="undefined"){
		return src;
	}else{
		return defaultSrc;
	}
}

function checkSourceId(src){
	if(src!== null && src!="undefined"){
		return src;
	}else{
		return assignfieldName("temp-");
	}
}

function checkSourceName(src){
	if(src!== null && src!="undefined" && src!==""){
		return src;
	}else{
		return assignfieldName("name");
	}
}


function checkSourceText(src){
	if(src!== null && src!="undefined"){
		return src;
	}else{
		return "";
	}
}

function checkSourceAvailable(src){
	if(typeof src != "undefined" && src!=null && src!==""){
		return true;
	}else{
		return false;
	}
}

function checkSourceAvailableNull(src){
    if(typeof src != "undefined" && src!=null && src!==""){
        return src;
    }else{
        return null;
    }
}


function checkImgSrc(url,secondaryurl,callback) {
	
	if(url!==null && url!="undefined"){
		var imgSize = new Image();
		imgSize.onerror = function() {
			callback.call(defaultSrc);
   		};
	
		imgSize.onload = function () {
			callback.call(url);
   		 };
		imgSize.src = url;

	}else{
		callback.call(defaultSrc);
	}
}


function checkEntityImgSrc(index,field,callback) {
	var img;
	var icon=entity.entities[index].icon_url;
	if(icon===null || icon=="undefined"){
		icon=defaultSrc;
	}	
	if(field!==null){
		img =entity.entities[index].thumb_picture_url;
	}
	
	if(img!==null && img!="undefined"){
		var imgSize = new Image();
		imgSize.onerror = function() {
			callback.call(icon);
   		};
	
		imgSize.onload = function () {
			callback.call(img);
   		 };
		imgSize.src = img;

	}else{
		callback.call(icon);
	}
}

function httpToHttps(value){
	if(value.indexOf("https")==-1){
		value=value.replace('http','https');
	}
	return value;	
}



function daydiff(first, second) {
    return parseInt((second-first)/(1000*60*60*24));
}	





function getMapTextOutput(domainIndex){
	for(i=0; i < obj.domains[domainIndex].fields.length; i++){
		var id=obj.domains[domainIndex].fields[i]._id;
		if(id==4){
			if(checkSourceAvailable(obj.domains[domainIndex].fields[i].selValField)){
				return obj.domains[domainIndex].fields[i].selValField;
			}else{
				return "city";	
			}
		}
	}
}

function getMapTxtValue(mapOutput,mapValues){
	switch(mapOutput){
		case "country":
			if(checkSourceAvailable(countries[mapValues[mapOutput]])){
				return countries[mapValues[mapOutput]];
			}else{
				return mapValues[mapOutput];	
			}
		break;
		case "city":
			var country;
			if(checkSourceAvailable(countries[mapValues].country)){
				country=countries[mapValues].country;	 // CONVERT ES TO ESPAÑA	
			}else{
				country=mapValues.country;		
			}
			var result= mapValues[mapOutput]+", "+country;
			return result;
		default:
			return mapValues[mapOutput];
	}
}


// COUNTRIES CODES 

var countries={
    ALL:"Worldwide",
    AF: "Afghanistan",
    AX: "Åland Islands",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, The Democratic Republic of The",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Cote D'ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and Mcdonald Islands",
    VA: "Holy See (Vatican City State)",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic of",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea, Democratic People's Republic of",
    KR: "Korea, Republic of",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libyan Arab Jamahiriya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Macedonia, The Former Yugoslav Republic of",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia, Federated States of",
    MD: "Moldova, Republic of",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    AN: "Netherlands Antilles",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory, Occupied",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    SH: "Saint Helena",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and The Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and The South Sandwich Islands",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard and Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan, Province of China",
    TJ: "Tajikistan",
    TZ: "Tanzania, United Republic of",
    TH: "Thailand",
    TL: "Timor-leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe"
};

var languagesList=[{"alpha2":"aa","English":"Afar"},{"alpha2":"ab","English":"Abkhazian"},{"alpha2":"ae","English":"Avestan"},{"alpha2":"af","English":"Afrikaans"},{"alpha2":"ak","English":"Akan"},{"alpha2":"am","English":"Amharic"},{"alpha2":"an","English":"Aragonese"},{"alpha2":"ar","English":"Arabic"},{"alpha2":"as","English":"Assamese"},{"alpha2":"av","English":"Avaric"},{"alpha2":"ay","English":"Aymara"},{"alpha2":"az","English":"Azerbaijani"},{"alpha2":"ba","English":"Bashkir"},{"alpha2":"be","English":"Belarusian"},{"alpha2":"bg","English":"Bulgarian"},{"alpha2":"bh","English":"Bihari languages"},{"alpha2":"bi","English":"Bislama"},{"alpha2":"bm","English":"Bambara"},{"alpha2":"bn","English":"Bengali"},{"alpha2":"bo","English":"Tibetan"},{"alpha2":"br","English":"Breton"},{"alpha2":"bs","English":"Bosnian"},{"alpha2":"ca","English":"Catalan; Valencian"},{"alpha2":"ce","English":"Chechen"},{"alpha2":"ch","English":"Chamorro"},{"alpha2":"co","English":"Corsican"},{"alpha2":"cr","English":"Cree"},{"alpha2":"cs","English":"Czech"},{"alpha2":"cu","English":"Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic"},{"alpha2":"cv","English":"Chuvash"},{"alpha2":"cy","English":"Welsh"},{"alpha2":"da","English":"Danish"},{"alpha2":"de","English":"German"},{"alpha2":"dv","English":"Divehi; Dhivehi; Maldivian"},{"alpha2":"dz","English":"Dzongkha"},{"alpha2":"ee","English":"Ewe"},{"alpha2":"el","English":"Greek, Modern (1453-)"},{"alpha2":"en","English":"English"},{"alpha2":"eo","English":"Esperanto"},{"alpha2":"es","English":"Spanish; Castilian"},{"alpha2":"et","English":"Estonian"},{"alpha2":"eu","English":"Basque"},{"alpha2":"fa","English":"Persian"},{"alpha2":"ff","English":"Fulah"},{"alpha2":"fi","English":"Finnish"},{"alpha2":"fj","English":"Fijian"},{"alpha2":"fo","English":"Faroese"},{"alpha2":"fr","English":"French"},{"alpha2":"fy","English":"Western Frisian"},{"alpha2":"ga","English":"Irish"},{"alpha2":"gd","English":"Gaelic; Scottish Gaelic"},{"alpha2":"gl","English":"Galician"},{"alpha2":"gn","English":"Guarani"},{"alpha2":"gu","English":"Gujarati"},{"alpha2":"gv","English":"Manx"},{"alpha2":"ha","English":"Hausa"},{"alpha2":"he","English":"Hebrew"},{"alpha2":"hi","English":"Hindi"},{"alpha2":"ho","English":"Hiri Motu"},{"alpha2":"hr","English":"Croatian"},{"alpha2":"ht","English":"Haitian; Haitian Creole"},{"alpha2":"hu","English":"Hungarian"},{"alpha2":"hy","English":"Armenian"},{"alpha2":"hz","English":"Herero"},{"alpha2":"ia","English":"Interlingua (International Auxiliary Language Association)"},{"alpha2":"id","English":"Indonesian"},{"alpha2":"ie","English":"Interlingue; Occidental"},{"alpha2":"ig","English":"Igbo"},{"alpha2":"ii","English":"Sichuan Yi; Nuosu"},{"alpha2":"ik","English":"Inupiaq"},{"alpha2":"io","English":"Ido"},{"alpha2":"is","English":"Icelandic"},{"alpha2":"it","English":"Italian"},{"alpha2":"iu","English":"Inuktitut"},{"alpha2":"ja","English":"Japanese"},{"alpha2":"jv","English":"Javanese"},{"alpha2":"ka","English":"Georgian"},{"alpha2":"kg","English":"Kongo"},{"alpha2":"ki","English":"Kikuyu; Gikuyu"},{"alpha2":"kj","English":"Kuanyama; Kwanyama"},{"alpha2":"kk","English":"Kazakh"},{"alpha2":"kl","English":"Kalaallisut; Greenlandic"},{"alpha2":"km","English":"Central Khmer"},{"alpha2":"kn","English":"Kannada"},{"alpha2":"ko","English":"Korean"},{"alpha2":"kr","English":"Kanuri"},{"alpha2":"ks","English":"Kashmiri"},{"alpha2":"ku","English":"Kurdish"},{"alpha2":"kv","English":"Komi"},{"alpha2":"kw","English":"Cornish"},{"alpha2":"ky","English":"Kirghiz; Kyrgyz"},{"alpha2":"la","English":"Latin"},{"alpha2":"lb","English":"Luxembourgish; Letzeburgesch"},{"alpha2":"lg","English":"Ganda"},{"alpha2":"li","English":"Limburgan; Limburger; Limburgish"},{"alpha2":"ln","English":"Lingala"},{"alpha2":"lo","English":"Lao"},{"alpha2":"lt","English":"Lithuanian"},{"alpha2":"lu","English":"Luba-Katanga"},{"alpha2":"lv","English":"Latvian"},{"alpha2":"mg","English":"Malagasy"},{"alpha2":"mh","English":"Marshallese"},{"alpha2":"mi","English":"Maori"},{"alpha2":"mk","English":"Macedonian"},{"alpha2":"ml","English":"Malayalam"},{"alpha2":"mn","English":"Mongolian"},{"alpha2":"mr","English":"Marathi"},{"alpha2":"ms","English":"Malay"},{"alpha2":"mt","English":"Maltese"},{"alpha2":"my","English":"Burmese"},{"alpha2":"na","English":"Nauru"},{"alpha2":"nb","English":"Bokmål, Norwegian; Norwegian Bokmål"},{"alpha2":"nd","English":"Ndebele, North; North Ndebele"},{"alpha2":"ne","English":"Nepali"},{"alpha2":"ng","English":"Ndonga"},{"alpha2":"nl","English":"Dutch; Flemish"},{"alpha2":"nn","English":"Norwegian Nynorsk; Nynorsk, Norwegian"},{"alpha2":"no","English":"Norwegian"},{"alpha2":"nr","English":"Ndebele, South; South Ndebele"},{"alpha2":"nv","English":"Navajo; Navaho"},{"alpha2":"ny","English":"Chichewa; Chewa; Nyanja"},{"alpha2":"oc","English":"Occitan (post 1500); Provençal"},{"alpha2":"oj","English":"Ojibwa"},{"alpha2":"om","English":"Oromo"},{"alpha2":"or","English":"Oriya"},{"alpha2":"os","English":"Ossetian; Ossetic"},{"alpha2":"pa","English":"Panjabi; Punjabi"},{"alpha2":"pi","English":"Pali"},{"alpha2":"pl","English":"Polish"},{"alpha2":"ps","English":"Pushto; Pashto"},{"alpha2":"pt","English":"Portuguese"},{"alpha2":"qu","English":"Quechua"},{"alpha2":"rm","English":"Romansh"},{"alpha2":"rn","English":"Rundi"},{"alpha2":"ro","English":"Romanian; Moldavian; Moldovan"},{"alpha2":"ru","English":"Russian"},{"alpha2":"rw","English":"Kinyarwanda"},{"alpha2":"sa","English":"Sanskrit"},{"alpha2":"sc","English":"Sardinian"},{"alpha2":"sd","English":"Sindhi"},{"alpha2":"se","English":"Northern Sami"},{"alpha2":"sg","English":"Sango"},{"alpha2":"si","English":"Sinhala; Sinhalese"},{"alpha2":"sk","English":"Slovak"},{"alpha2":"sl","English":"Slovenian"},{"alpha2":"sm","English":"Samoan"},{"alpha2":"sn","English":"Shona"},{"alpha2":"so","English":"Somali"},{"alpha2":"sq","English":"Albanian"},{"alpha2":"sr","English":"Serbian"},{"alpha2":"ss","English":"Swati"},{"alpha2":"st","English":"Sotho, Southern"},{"alpha2":"su","English":"Sundanese"},{"alpha2":"sv","English":"Swedish"},{"alpha2":"sw","English":"Swahili"},{"alpha2":"ta","English":"Tamil"},{"alpha2":"te","English":"Telugu"},{"alpha2":"tg","English":"Tajik"},{"alpha2":"th","English":"Thai"},{"alpha2":"ti","English":"Tigrinya"},{"alpha2":"tk","English":"Turkmen"},{"alpha2":"tl","English":"Tagalog"},{"alpha2":"tn","English":"Tswana"},{"alpha2":"to","English":"Tonga (Tonga Islands)"},{"alpha2":"tr","English":"Turkish"},{"alpha2":"ts","English":"Tsonga"},{"alpha2":"tt","English":"Tatar"},{"alpha2":"tw","English":"Twi"},{"alpha2":"ty","English":"Tahitian"},{"alpha2":"ug","English":"Uighur; Uyghur"},{"alpha2":"uk","English":"Ukrainian"},{"alpha2":"ur","English":"Urdu"},{"alpha2":"uz","English":"Uzbek"},{"alpha2":"ve","English":"Venda"},{"alpha2":"vi","English":"Vietnamese"},{"alpha2":"vo","English":"Volapük"},{"alpha2":"wa","English":"Walloon"},{"alpha2":"wo","English":"Wolof"},{"alpha2":"xh","English":"Xhosa"},{"alpha2":"yi","English":"Yiddish"},{"alpha2":"yo","English":"Yoruba"},{"alpha2":"za","English":"Zhuang; Chuang"},{"alpha2":"zh","English":"Chinese"},{"alpha2":"zu","English":"Zulu"}];



/*----------------------------------
    FORM TO OBJECT
----------------------------------*/
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArrayClass();
    $.each(a, function() {
        var value=this.value;
        if(checkSourceAvailable(this['class'])){
            if(this['class'].indexOf('date')!=-1){
                value=dateToMillisFromValue(value);
            }
        }
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(value || '');
        } else {
            o[this.name] = value || '';
        }
    });
    return o;
};

/*----------------------------------
    CUSTOM SERIALIZE ARRAY WITH CLASS
----------------------------------*/
$.fn.serializeArrayClass = function() {
    var data = [], obj;
    $(this).find('select,textarea, input').each(function(){
        obj = {};
        obj.name = this.name;
        obj.value = this.value;
        obj.class = $(this).attr('class');
        data.push(obj);
    });
    return data;
};

/*----------------------------------
    FORM TO OBJECT INCLUDING HIDDEN AND DISABLED
----------------------------------*/
$.fn.serializeAllObjects = function() {
    var o = {};
    var a = this.serializeAll();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*----------------------------------
    FORM TO OBJECT INCLUDING HIDDEN AND DISABLED
----------------------------------*/
$.fn.serializeAll = function() {
    var data = $(this).serializeArray();
    $(':disabled[name]', this).each(function() {
        data.push({
            name: this.name,
            value: $(this).val()
        });
    });
    return data;
};



