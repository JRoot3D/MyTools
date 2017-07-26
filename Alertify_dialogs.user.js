// ==UserScript==
// @name         Alertify Dialogs
// @version      0.1
// @author       JRoot3D
// ==/UserScript==

var keys = {
    ENTER: 13,
    ESC: 27,
    F1: 112,
    F12: 123,
    LEFT: 37,
    RIGHT: 39
};

function clearContents(element) {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}

if (!alertify.selectLanguage) {
    alertify.dialog('selectLanguage', function () {
        var input = document.createElement('SELECT');
        var p = document.createElement('P');
        return {
            main: function (_title, _message, _value, _onok, _oncancel) {
                this.set('title', _title);
                this.set('message', _message);
                this.set('value', _value);
                this.set('onok', _onok);
                this.set('oncancel', _oncancel);
                return this;
            },
            setup: function () {
                return {
                    buttons: [{
                        text: alertify.defaults.glossary.cancel,
                        key: keys.ESC,
                        invokeOnClose: true,
                        className: alertify.defaults.theme.cancel
                    }, {
                        text: alertify.defaults.glossary.ok,
                        key: keys.ENTER,
                        className: alertify.defaults.theme.ok
                    }],
                    focus: {
                        element: input,
                        select: true
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                input.className = alertify.defaults.theme.input;
                this.elements.content.appendChild(p);
                this.elements.content.appendChild(input);
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                if (typeof message === 'string') {
                    clearContents(p);
                    p.innerHTML = message;
                } else if (message instanceof window.HTMLElement && p.firstChild !== message) {
                    clearContents(p);
                    p.appendChild(message);
                }
            },
            settings: {
                message: undefined,
                labels: undefined,
                onok: undefined,
                oncancel: undefined,
                value: '',
                type: 'text',
                reverseButtons: undefined
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                    case 'message':
                        this.setMessage(newValue);
                        break;
                    case 'value':
                        clearContents(input);
                        for (var i = 0; i < newValue.length; i++) {
                            var option = document.createElement("OPTION");
                            option.setAttribute("value", newValue[i]);
                            option.text = newValue[i];
                            input.appendChild(option);
                        }
                        break;
                }
            },
            callback: function (closeEvent) {
                var returnValue;
                switch (closeEvent.index) {
                    case 1:
                        if (input.length > 0) {
                            this.settings.value = input.item(input.selectedIndex).value;
                            if (typeof this.get('onok') === 'function') {
                                returnValue = this.get('onok').call(this, closeEvent, this.settings.value);
                                if (typeof returnValue !== 'undefined') {
                                    closeEvent.cancel = !returnValue;
                                }
                            }
                        }
                        break;
                    case 0:
                        if (typeof this.get('oncancel') === 'function') {
                            returnValue = this.get('oncancel').call(this, closeEvent);
                            if (typeof returnValue !== 'undefined') {
                                closeEvent.cancel = !returnValue;
                            }
                        }
                        break;
                }
            }
        };
    });
}