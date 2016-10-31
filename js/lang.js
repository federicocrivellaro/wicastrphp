function language(appLang) {
    "use strict";
    if(isAvailableData(appLang)===false){
        appLang="en";
    }
    var language=appLang;
    var languages = {};
    this.loadLanguage = function(link,callback) {
        $.getJSON(link).done(function(data) {
            languages = data;
            callback.call();
        });
    };
    this.updateLanguage = function() {
        $('[data-lang]').each(function() {
            var typo = $(this).prop("tagName");
            switch (typo) {
                case "INPUT":
                    $(this).attr('placeholder', languages.language[language][$(this).data('lang')]);
                    break;
                default:
                    var text = languages.language[language][$(this).data('lang')];
                    $(this).html(text);
                    break;
            }
        });
    };

    this.setText = function(id) {
        var text = languages.language[language][id];
        return text;
    };

    this.getLanguages= function(){
        var availableLanguages=[];
        $.each(languages.language, function(key, value) {
            availableLanguages.push(key);
        });
        return availableLanguages;

    };
    this.whichLanguage= function(){
        return language;
    };
}

