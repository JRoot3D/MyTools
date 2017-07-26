// ==UserScript==
// @name         Debug Tools
// @version      0.4
// @author       JRoot3D
// @match        http://localhost:85/*
// @match        http://localhost:80/*
// @require      https://cdn.jsdelivr.net/alertifyjs/1.10.0/alertify.min.js
// @require      https://github.com/JRoot3D/MyTools/raw/master/Common_functions.user.js
// @require      https://github.com/JRoot3D/MyTools/raw/master/Alertify_dialogs.user.js
// @resource     alertifyCSS https://cdn.jsdelivr.net/alertifyjs/1.10.0/css/alertify.min.css
// @resource     alertifyDefaultCSS https://cdn.jsdelivr.net/alertifyjs/1.10.0/css/themes/default.min.css
// @grant        GM_unregisterMenuCommand
// @grant        GM_registerMenuCommand
// @grant        GM_getResourceText
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @updateURL    https://github.com/JRoot3D/MyTools/raw/master/Debug_Tools.user.js
// @downloadURL  https://github.com/JRoot3D/MyTools/raw/master/Debug_Tools.user.js
// ==/UserScript==

(function () {
    'use strict';

    CF_addStyle('alertifyCSS');
    CF_addStyle('alertifyDefaultCSS');

    function selectLanguage() {
        var languages = ["bg_BG", "cs_CZ", "da_DK", "de_DE", "el_GR", "en_US", "es_ES", "fr_FR", "hr_HR", "hu_HU", "it_IT", "nl_NL", "pl_PL", "pt_BR", "pt_PT", "ro_RO", "ru_RU", "sk_SK", "sl_SI", "sv_SE", "tr_TR"];
        var currentLanguage = location.href.match(/[a-z]{2}_[A-Z]{2}/);

        alertify.selectLanguage('Select language', 'Language', languages, currentLanguage,
            function (evt, value) {
                var loc = location.href.replace(/[a-z]{2}_[A-Z]{2}/, value);
                location.href = loc;
            },
            function () {
                alertify.error('Cancel');
            });
    }

    function editQueryParam(param, caption, message){
        var paramValue = CF_getParameterByName(param);

        alertify.prompt(caption, message, paramValue, function(evt, value) {
            if (value.length > 0) {
                if (paramValue) {
                    location.href = location.href.replace(paramValue, value);
                } else {
                    location.href += "&" + param + "=" + value;
                }
            } else if (paramValue) {
                location.href = location.href.replace("&" + param + "=" + paramValue, "")
            }
        }, function() { alertify.error('Cancel'); }).set("reverseButtons", true);
    }

    function changeAccountName(){
        editQueryParam('accountName', 'Enter Account Name', 'Account Name');
    }

    GM_registerMenuCommand("Select language", selectLanguage);
    GM_registerMenuCommand("Change accountName", changeAccountName);
})();