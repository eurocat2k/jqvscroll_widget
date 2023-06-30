;(function($,window,document,undefined){
    console.log(`Plugin added into jQuery...`);
    const defaults = {
        min: 0,
        max: 660,
        step: 5,
        minStep: 1,
        maxStep: 10,
        visible: 7,
        minVisible: 5,
        maxVisible: 11,
        autoOpen: false,
        minLongPressTimeOut: 250,
        maxLongPressTimeOut: 550,
        longPressTimeOut: 300,
        focused: 'first',
        animate: false,
        delay: 25,
    };
    const cssNoSelect = {
        '-webkit-user-select': 'none', /* Safari */
        '-ms-user-select': 'none', /* IE 10 and IE 11 */
        'user-select': 'none', /* Standard syntax */
    }
    const cssVsItemSelected = {
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'width': 'var(--vsItemWidth)',
        'height': 'var(--vsItemHeight)',
        'background-color': 'var(--vsItemBGColorSelected)',
        'color': 'var(--vsItemColorSelected)'
    };
    const cssVsItemNormal = {
        'display': 'flex',
        'justify-content': 'center',
        'width': 'var(--vsItemWidth)',
        'height': 'var(--vsItemHeight)',
        'background-color': 'var(--vsItemBGColor)',
        'font-size': 'var(--vsFontSize)',
        'font-weight': 'var(--vsFontWeight)',
        'color': 'var(--vsItemColor)',
    };
    const cssVsItemDisabled = {
        'display': 'flex',
        'justify-content': 'center',
        'width': 'var(--vsItemWidth)',
        'height': 'var(--vsItemHeight)',
        'background-color': 'var(--vsItemUnSelectableBGColor)',
        'font-size': 'var(--vsFontSize)',
        'font-weight': 'var(--vsFontWeight)',
        'color': 'var(--vsItemUnSelectableColor)',
    };
    const cssVsItemHover = {
        'background-color': 'var(--vsItemBGColorHover)',
        'color': 'var(--vsItemColorHover)'
    };
    const cssVsItemSelectedHover = {
        'background-color': 'var(--vsItemBGColorHoverSelected)',
        'color': 'var(--vsItemColorHoverSelected)'
    }
    function onHover(ev) {
        // console.log({ev});
        let tgt = ev.target;
        switch(ev.type) {
            case "mouseover":
                if ($(tgt).hasClass('vs_selected')) {
                    // selected hover effect
                    $(tgt).css(cssVsItemSelectedHover);
                } else {
                    // normal hover effect
                    $(tgt).css(cssVsItemHover);
                }
                break;
            case "mouseout":
                if ($(tgt).hasClass('vs_selected')) {
                    // reset selected hover effect
                    $(tgt).css(cssVsItemSelected);
                } else {
                    // reset normal hover effect
                    $(tgt).css(cssVsItemNormal);
                }
                break;
            default:
                break;
        }
    }
    function roundInt(v, n) {
        try {
            // console.log({v, n});
            let _v, _n, _low, _high;
            if (typeof v !== "undefined" && typeof n !== "undefined") {
                if (Number.isFinite(v) && Number.isFinite(n)) {
                    if (Number.isInteger(v) && Number.isInteger(n)) {
                        _v = v, _n = n;
                    } else {
                        _v = v + .5 >> 0;
                        _n = n + .5 >> 0;
                    }
                    // calculate low and high values
                    _low = Math.floor(_v / _n) * _n;
                    _high = Math.ceil(_v / _n) * _n;
                    return Math.abs(_v - _low) < Math.abs(_v - _high) ? _low : _high;
                } else {
                    throw new Error(`Either one argument is not Number/Integer...`);
                }
            } else {
                throw new Error(`Invalid or missing arguments for function: _roundInt( value: {Integer}, rounding: {Integer});`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    function stepUpdate(ev, data) {
        let self = this;
        let min, max, step, count;
        // set shall be 1, 5, 10 so if we round the given step value, then we can check and keep the value in valid range
        step = roundInt(data.step, 1);
        // console.log(`Step updating ${step}`, data.step);
        step = step < defaults.minStep ? defaults.minStep : step;
        if (step >= defaults.minStep && step <= defaults.maxStep) {
            self.options.count = (self.options.max - self.options.min) / step;
            // if number of list items going to be less then visible items then ignore the step value change
            // console.log(`Count = ${self.options.count}`, `IsEnough = ${self.options.count >= self.options.visible}`, `Visible = ${self.options.visible}`);
            if (self.options.count >= self.options.visible) {
                self.options.step = step;
                // console.log(`Step updated ${step}`);
            }
        }
    }
    function minUpdate(ev, data) {
        let self = this;
        let value = roundInt(data.min, self.options.step);
        // console.log(`Min updating...`, value, self.options.min, self.options.max);
        let count = (self.options.max - value) / self.options.step;
        if (count > self.options.visible) {
            self.options.count = count;
            if ((value + (self.options.visible * self.options.step)) < self.options.max && value >= defaults.min) {
                self.options.min = value;
                self.options.operMin = value;
            }
        }
    }
    function maxUpdate(ev, data) {
        let self = this;
        let value = roundInt(data.max, self.options.step);
        // console.log(`Max updating...`, value, self.options.min, self.options.max);
        let count = (value - self.options.min) / self.options.step;
        if (count > self.options.visible) {
            self.options.count = count;
            if ((value - (self.options.visible * self.options.step)) > self.options.min && value <= defaults.max) {
                self.options.max = value
                self.options.operMax = value;
            }
        }
    }
    function visibleUpdate(ev, data) {
        let self = this;
        // console.log(`Visible updating...`, data.visible);
        self.options.visible = data.visible;
        // console.log(`Visible updated...`, self.options.visible);
    }
    function autoOpenUpdate(ev, data) {
        let self = this;
        // console.log(`AutoOpen updating...`, data.autoOpen);
        self.options.autoOpen = data.autoOpen;
        // console.log(`AutoOpen updated...`, self.options.autoOpen);
    }
    function animateUpdate(ev, data) {
        let self = this;
        // console.log(`AutoOpen updating...`, data.autoOpen);
        self.options.animate = data.animate;
        // console.log(`AutoOpen updated...`, self.options.autoOpen);
    }
    function selectTimeOut(ev, data) {
        let self = this;
        // console.log(`SelectTimeOut updating...`, data.selectTimeOut);
        self.options.longPressTimeOut = data.selectTimeOut;
        // console.log(`SelectTimeOut updated...`, self.options.longPressTimeOut);
    }
    function disableContextMenu(ev) {
        let self = this, type = ev.type, tgt = ev.target;
        ev.preventDefault();
        // console.log({type, tgt, self});
        if ($(ev.target).hasClass('cfl_vsitem')) {
            if (self) {
                self.hide();
            }
        }
        return false;
    }
    function longPress(e, data) {
        let self = this;
        e.preventDefault();
        e.stopPropagation();
        let type = e.type;
        let tgt = e.target;
        // console.log({type, tgt});
        switch(type){
            case "mousedown":
                if (e.button === 2) {
                    if (tgt === $(self.options.dom.cfl_static_value).get(0)) {
                        return false;
                    } else {
                        // console.log(`Context menu detected....`);
                        self.hide();    // close list without change....
                        return false;
                    }
                }
                self.options.pressTimer = window.setTimeout(function() {
                    // console.log(`Longpress detected on vsstatic....`);
                    if (tgt === $(self.options.dom.cfl_static_value).get(0)) {
                        self.show();
                    }
                    return false;
                }, self.options.longPressTimeOut);
                break;
            case "mouseup":
                e.preventDefault();
                clearTimeout(self.options.pressTimer);
                break;
            default:
                break;
        }
        return self;
    }
    function selectCFL(e, data) {
        let self = this;
        e.preventDefault();
        e.stopPropagation();
        let type = e.type;
        let tgt = e.target;
        // console.log(`selectCFL`, {type, tgt}, self.options.selected);
        switch(type){
            case "mousedown":
                if (e.button === 2) {
                    if (tgt === $(self.options.dom.cfl_static_value).get(0)) {
                        return false;
                    } else {
                        // console.log(`Context menu detected....`);
                        // self.hide();    // close list without change....
                        return function() {
                            self.element.trigger("_hide")
                            return false;
                        };

                    }
                }
                self.options.pressTimer = window.setTimeout(function() {
                    // console.log(`Longpress detected on vsitem ${$(tgt).data("cfl")}....`);
                    if (tgt === $(self.options.dom.cfl_static_value).get(0)) {
                        self.show();
                    } else {
                        // trigger a selected CFL event....
                        if (self.options.selectInitiated === false) {
                            self.element.trigger("onSelect", {'cfl': $(tgt).data('cfl')});
                        }
                    }
                    return false;
                }, self.options.longPressTimeOut);
                break;
            case "mouseup":
                e.preventDefault();
                clearTimeout(self.options.pressTimer);
                self.options.selectInitiated = false;
                // return false;
                break;
            default:
                break;
        }
        return self;
    }
    function onSelect(ev, data) {
        let self = this;
        if (self.options.selectInitiated === false) {
            // console.log(`Select new value ${data.cfl}`);
            self.options.selectInitiated = true;
            if (self.options.autoOpen) {
                self.options.autoOpen = false;
            }
            self.hide();
            self.options.selected = parseInt(data.cfl);
            if (self.options.onChange && typeof self.options.onChange === "function") {
                self.options.onChange(self.options.selected);
            }
            self._refresh();
        }
        return false;
    }
    function onOpened(ev, data) {
        if (self.options.onOpen && typeof self.options.onOpen === "function") {
            self.options.onChange(self.options.selected(self));
        }
    }
    function selectedUpdate(ev, data) {
        let self = this, value = parseInt(data.selected);
        console.log(`Selected CFL updating...`, value, self.options.operMin, self.options.operMax);
        if (value >= self.options.operMin && value <= self.options.operMax) {
            self.options.selected = value;
            console.log(`Selected CFL updating...`, self.options.selected);
        }
        return false;
    }
    function focusedUpdate(ev, data) {
        let self = this;
        self.options.focused = data.focused;
    }
    function scrollMouseWheel(ev) {
        let self = this;
        let evt = window.event || ev;
        evt = evt.originalEvent ? evt.originalEvent : evt;
        var delta = evt.detail ? evt.detail * (30) : evt.wheelDelta;
        let level = $(self.options.divT).text();
        let centerPos = $(self.options.dom.cfl_vscontainer).height() / 2 - $(self.options.dom.cfl_vstrip).children(1).height() / 2;
        if (delta < 0) {
            // console.log({delta, level, min: self.options.min, divT: $(self.options.divT).get(0), cfl: $(self.options.divT).text()});
            if (level > self.options.min) {
                self.options.divT = $(self.options.divT).next();
                let scrollTo = $(self.options.divT);
                var position = scrollTo.offset().top - $(self.options.dom.cfl_vscontainer).offset().top + $(self.options.dom.cfl_vscontainer).scrollTop();
                if (self.options.animate) {
                    $(self.options.dom.cfl_vscontainer).animate({
                        scrollTop: position - centerPos
                    }, self.options.delay);
                } else {
                    $(self.options.dom.cfl_vscontainer).scrollTop(position - centerPos);
                }
            }
        } else {
            // console.log({delta, level, max: self.options.max, divT: $(self.options.divT).get(0), cfl: $(self.options.divT).text()});
            if (level < self.options.max) {
                self.options.divT = $(self.options.divT).prev();
                let scrollTo = $(self.options.divT);
                var position = scrollTo.offset().top - $((self.options.dom.cfl_vscontainer)).offset().top + $((self.options.dom.cfl_vscontainer)).scrollTop();
                if (self.options.animate) {
                    $((self.options.dom.cfl_vscontainer)).animate({
                        scrollTop: position - centerPos
                    }, self.options.delay);
                } else {
                    $(self.options.dom.cfl_vscontainer).scrollTop(position - centerPos);
                }
            }
        }
        return false;
    }
    function operMinUpdate(ev, data) {
        let self = this;
        self.options.operMin = data.opermin;
    }
    function operMaxUpdate(ev, data) {
        let self = this;
        self.options.operMax = data.opermax;
    }
    function executeCB(ev, data) {
        let self = this;
        self.options.onChange = data.cb;
        data.cb(self.options.selected); // execute callback function with param of selected altitude
    }
    function executeOpenedCB(ev, data) {
        let self = this;
        self.options.onOpened = data.cb;
        data.cb(self);  // execute callback function with param of self as expected - to be able to handle object from main app
    }
    // The widget
    $.widget("namespace.vscroller", {
        // constants
        widgetName: "vscroller",
        version: "1.0.0",
        // options
        options: {
            min: defaults.min,
            max: defaults.max,
            step: defaults.step,
            visible: defaults.visible,
            selected: undefined,
            count: 0,
            autoOpen: false,
            longPressTimer: undefined,
            longPressTimeOut: defaults.longPressTimeOut,
            selectInitiated: false,
            dom: {
                element: undefined,
                cfl_container: undefined,
                cfl_static_value: undefined,
                cfl_vscontainer: undefined,
                cfl_vstrip: undefined,
            },
            focused: defaults.focused,      // or 'last'
            divT: undefined,                // reference DOM element for scrolling...
            animate: defaults.animate,      //
            delay: defaults.delay,          // animate delay
            operMin: defaults.min,
            operMax: defaults.max,
            onChange: function () { },      // custom callback on change
            onOpened: function () { },      // custom callback on open
        },
        _create: function() {
            let self = this;
            // prepare :root
            // console.log(`isTHERE VSUID: "${$(":root").css('--vsUID')}"?`);
            let uid = $(":root").css('--vsUID');
            if (typeof uid === "undefined") {
                $(":root").css({
                    "--vsUID": "VSCROLL_123456789ABDEF",
                    "--vsFontFamily": "Arial, Helvetica, sans-serif",
                    "--vsFontSize": "14px",
                    "--vsFontWeight": 500,
                    "--vsFontWeightBold": 600,
                    "--vsFontWeightThin": 400,
                    "--vsItemHeight": "16px",
                    "--vsItemWidth": "40px",
                    "--vsItemBGColor": "rgba(228, 227, 220, .9)",
                    "--vsItemColor": "rgb(0, 0, 0)",
                    "--vsItemUnSelectableBGColor": "rgba(161, 161, 161, 0.9)",
                    "--vsItemUnSelectableColor": "rgb(51, 43, 43)",
                    "--vsItemBGColorSelected": "rgb(0, 117, 226)",
                    "--vsItemColorSelected": "rgb(253, 253, 250)",
                    "--vsItemBGColorHover": "rgb(250, 212, 0)",
                    "--vsItemColorHover": "rgb(38, 43, 53)",
                    "--vsItemBGColorHoverSelected": "rgb(0, 129, 50)",
                    "--vsItemColorHoverSelected": "rgb(255, 255, 255)",
                    "--vsVisibleItems": 7,
                    "--vsStripBG": "rgba(228, 227, 220, .9)",
                });
            }
            // construct new list with event handlers
            self._construct();
        },
        destroy: function() {
            $.Widget.prototype.destroy.apply( this, arguments );
        },
        _focus: function() {
            try {
                // assume that list is visible
                let self = this, divT;
                let $vsContainer = $(self.options.dom.cfl_vscontainer);
                let $cfl_vscontainer = $(self.options.dom.cfl_vscontainer);
                let $stripList = $vsContainer.find(self.options.dom.cfl_vstrip);
                let $scrollTo;
                if (self.options.selected) {
                    // do using .vs_selected item
                    $scrollTo = $stripList.find('.vs_selected');
                    let $selected = $(self.options.dom.cfl_vscontainer).find('.vs_selected').index();
                    if ($selected < 0) {
                        let _newValue = roundInt(self.options.selected, self.options.step);
                        self.options.selected = _newValue;
                        let $elem = $stripList.find(`div:contains(${_newValue})`);
                        let index = $elem.index() + 1;
                        $scrollTo = $stripList.children(`:nth-child(${index})`);
                        $scrollTo.addClass('vs_selected');
                        divT = self.options.divT = $stripList.find('.vs_selected');
                    }
                } else {
                    // do set initial focus according to the options
                    if (self.options.focused.match(/first/g)) {
                        // focus on top most
                        $scrollTo = $stripList.children().first();
                        divT = self.options.divT = $stripList.children().first();
                    } else if (self.options.focused.match(/last/g)) {
                        let $scrollTo = $stripList.children().last()
                        divT = self.options.divT = $stripList.children().last();
                    }
                }
                //
                let centerPos = $cfl_vscontainer.height() / 2 - $stripList.children(1).height() / 2;
                var position = $scrollTo.offset().top - $cfl_vscontainer.offset().top + $cfl_vscontainer.scrollTop();
                if (self.options.animate) {
                    $vsContainer.animate({
                        scrollTop: position - centerPos
                    },500);
                } else {
                    $vsContainer.scrollTop(position - centerPos);
                }
                return 0;
            } catch (error) {
                console.log(error);
            }
        },
        // methods
        show: function() {
            let self = this;
            $(self.options.dom.cfl_vscontainer).show();
            self._focus();
        },
        open: function() {
            let self = this;
            $(self.options.dom.cfl_vscontainer).show();
            self._focus();
        },
        hide: function() {
            let self = this;
            $(self.options.dom.cfl_vscontainer).hide();
        },
        close: function() {
            let self = this;
            $(self.options.dom.cfl_vscontainer).hide();
        },
        //
        _construct: function() {
            let self = this;
            self.options.dom.element = self.element;
            // get mousewheel event
            let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            //
            if (self.options.dom.cfl_vstrip) {
                if ($(self.options.dom.cfl_vstrip).get(0)) {
                    // remove event listeners from each elements
                    $(self.options.dom.cfl_vstrip)
                        .children()
                        .each(function (i, e) {
                            // hover event off
                            $(e).off("mouseover", onHover);
                            $(e).off("mouseoout", onHover);
                            $(e).off("mousedown", selectCFL);
                            $(e).off("mouseup", selectCFL);
                            $(e).off("contextmenu", disableContextMenu);
                            $(e).off("onSelect", disableContextMenu);
                        });
                    //
                    $(self.options.dom.cfl_vscontainer)
                        .get(0)
                        .removeEventListener(mousewheelevt, scrollMouseWheel);
                    // $(self.options.dom.cfl_vscontainer).off({
                    //     mousewheelevt: scrollMouseWheel,
                    // })
                    //
                    $(self.element).off({
                        stepUpdate: stepUpdate,
                        minUpdate: minUpdate,
                        maxUpdate: maxUpdate,
                        visibleUpdate: visibleUpdate,
                        autoOpenUpdate: autoOpenUpdate,
                        selectTimeOut: selectTimeOut,
                        contextmenu: disableContextMenu,
                        _hide: disableContextMenu,
                        selectedUpdate: selectedUpdate,
                        focusedUpdate: focusedUpdate,
                        animateUpdate: animateUpdate,
                        operMinUpdate: operMinUpdate,
                        operMaxUpdate: operMaxUpdate,
                    });
                    $(self.options.dom.cfl_static_value).off({
                        mouseup: longPress,
                        mousedown: longPress,
                    });
                    $(self.element).empty();
                    $(":root").css("--vsVisibleItems", self.options.visible);
                }
            }
            $(self.options.dom.element).append('<div class="cfl_container" style="display: flex; justify-content: center;"><div class="cfl_static_value">000</div><div class="cfl_vscontainer" style="position: absolute; border: solid 1px black; width: var(--vsItemWidth); height: calc(var(--vsVisibleItems) * var(--vsItemHeight)); overflow: hidden; display: flex; justify-content: center;"><div class="cfl_vstrip" style="width: var(--vsItemWidth); position: absolute;display: flex; flex-direction: column; align-items: center; background-color: var(--vsStripBG);" ></div></div></div>');
            // add list elements
            let _elem;
            for (let v = self.options.max; v >= self.options.min; v -= self.options.step) {
                // is in oper range?
                if (v >= self.options.operMin && v <= self.options.operMax) {
                    _elem = $(`<div class="cfl_vsitem" data-cfl="${v.toString(10).padStart(3, "0")}">${v.toString(10).padStart(3, "0")}</div>`);
                    if (self.options.selected && parseInt(self.options.selected) === v) {
                        $(_elem).addClass('vs_selected');
                        $(_elem).css(cssVsItemSelected);
                    } else {
                        $(_elem).css(cssVsItemNormal);
                    }
                    // hover effect normal item
                    _elem.on("mouseover", onHover).on("mouseout", onHover);
                    _elem.on("mousedown", selectCFL.bind(self)).on("mouseup", selectCFL.bind(self));
                } else {
                    _elem = $(`<div class="cfl_vsitem" data-cfl="${v.toString(10).padStart(3, "0")}">${v.toString(10).padStart(3, "0")}</div>`);
                    $(_elem).addClass('vs_disabled');
                    $(_elem).css(cssVsItemDisabled);
                }
                _elem.on("contextmenu", disableContextMenu.bind(self));
                $(self.options.dom.cfl_vstrip).append(_elem);
                //  add no-select to top element
                $(self.options.dom.element).css(cssNoSelect);
                // save and updat DOM elements
                self.options.dom.cfl_container = $(self.options.dom.element).find('.cfl_container');
                self.options.dom.cfl_static_value = $(self.options.dom.element).find('.cfl_static_value');
                self.options.dom.cfl_vscontainer = $(self.options.dom.element).find('.cfl_vscontainer');
                self.options.dom.cfl_vstrip = $(self.options.dom.element).find('.cfl_vstrip');
            }
            // add event handlers
            self.element.on({
                "stepUpdate": stepUpdate.bind(self),
                "minUpdate": minUpdate.bind(self),
                "maxUpdate": maxUpdate.bind(self),
                "visibleUpdate": visibleUpdate.bind(self),
                "autoOpenUpdate": autoOpenUpdate.bind(self),
                "selectTimeOut": selectTimeOut.bind(self),
                "contextmenu": disableContextMenu.bind(self),
                "_hide": disableContextMenu.bind(self),
                "onSelect": onSelect.bind(self),
                "selectedUpdate": selectedUpdate.bind(self),
                "focusedUpdate": focusedUpdate.bind(self),
                "animateUpdate": animateUpdate.bind(self),
                "operMinUpdate": operMinUpdate.bind(self),
                "operMaxUpdate": operMaxUpdate.bind(self),
                "executeCB": executeCB.bind(self),
                "executeOpenedCB": executeOpenedCB.bind(self),
            });
            // add longpress event listener on static value field
            $(self.options.dom.cfl_static_value).on("mouseup", longPress.bind(self)).on("mousedown", longPress.bind(self));
            // add mouse wheel event
            // $(self.options.dom.cfl_vscontainer).on(mousewheelevt.passive, scrollMouseWheel.bind(self)); // mousewheel event set passive....
            self.options.divT = $(self.options.dom.cfl_vscontainer).find('.vs_selected');
            // let min = self.options.min;
            // let max = self.options.max;
            $(self.options.dom.cfl_vscontainer).get(0).addEventListener(mousewheelevt, scrollMouseWheel.bind(self), {capture: true, passive: true});
            // set static value if set
            if (self.options.selected) {
                $(self.options.dom.cfl_static_value).text(self.options.selected.toString(10).padStart(3, "0"));
            }
            // Finally hide vlist of autoOpen is 'false'
            if (self.options.autoOpen === false) {
                self.hide();    // do not show list if it is not enabled by autoOpen option
            }
        },
        _refresh: function() {
            let self = this;
            // update and redraw
            self._construct();
        },
        _setOption: function(key, value) {
            let self = this;
            console.log({_setOption: {key, value}});
            switch(key) {
                case "step":
                    if (Number.isInteger(value)){
                        if (value === defaults.minStep || value === defaults.step || value === defaults.maxStep) {
                            self.element.trigger("stepUpdate", {step: value});
                        }
                    }
                    break;
                case "max":
                case "min":
                    if (Number.isInteger(value)) {
                        if (value >= defaults.min && value <= defaults.max) {
                            if (key.match(/^min$/)) {
                                self.element.trigger("minUpdate", {min: value});
                            } else if (key.match(/^max$/)) {
                                self.element.trigger("maxUpdate", {max: value});
                            }
                        }
                    }
                    break;
                case "opermax":
                case "opermin":
                    if (Number.isInteger(value)) {
                        if (value >= self.options.min && value <= self.options.max) {
                            if (key.match(/^opermin$/)) {
                                self.element.trigger("operMinUpdate", {opermin: value});
                            } else if (key.match(/^opermax$/)) {
                                self.element.trigger("operMaxUpdate", {opermax: value});
                            }
                        }
                    }
                    break;
                case "visible":
                    if (Number.isInteger(value)) {
                        if (value === defaults.minVisible || value === defaults.visible || value === defaults.maxVisible) {
                            self.element.trigger("visibleUpdate", {visible: value});
                        }
                    }
                    break;
                case "autoOpen":
                    if (typeof value === 'boolean') {
                        self.element.trigger("autoOpenUpdate", {autoOpen: value});
                    } else {
                        self.element.trigger("autoOpenUpdate", {autoOpen: false});  // default behaviour...
                    }
                    break;
                case "animate":
                    if (typeof value === 'boolean') {
                        self.element.trigger("animateUpdate", {animate: value});
                    } else {
                        self.element.trigger("animateUpdate", {animate: false});  // default behaviour...
                    }
                    break;
                case "longClick":
                    if (Number.isInteger(value)) {
                        if (value >= defaults.minLongPressTimeOut && value <= defaults.maxLongPressTimeOut) {
                            self.element.trigger("selectTimeOut", {selectTimeOut: value});
                        }
                    }
                    break;
                case "selected":
                    if (Number.isInteger(value)) {
                        if (value >= self.options.min && value <= self.options.max) {
                            console.log(`self.element.trigger("selectedUpdate", {selected: ${value}});`);
                            self.element.trigger("selectedUpdate", {selected: value});
                        }
                    }
                    break;
                case "focused":
                    if (typeof value === 'string') {
                        if (value.match(/^first$/) || value.match(/^last$/)) {
                            self.element.trigger("focusedUpdate", {focused: value.toLowerCase()});
                        } else {
                            self.element.trigger("focusedUpdate", {focused: defaults.focused});
                        }
                    }
                    break;
                case "onChange":
                    if (typeof value === "function") {
                        self.element.trigger("executeCB", {cb: value});
                        // self.options.onChange();
                    }
                    break;
                case "onOpen":
                    if (typeof value === "function") {
                        console.log(`set onOpen handler`);
                        self.element.trigger("executeOpenedCB", { cb: value });
                    }
                    break;
                default:
                    break;
            }
            // self._refresh();
        },
        _setOptions: function(opts) {
            console.log({ opts });
            let self = this;
            if (opts && typeof opts === "object") {
                // ordered processing...
                if (opts['visible']) {
                    self._setOption('visible', opts['visible']);
                }
                if (opts['step']) {
                    self._setOption('step', opts['step']);
                }
                if (opts['min']) {
                    self._setOption('min', opts['min']);
                }
                if (opts['max']) {
                    self._setOption('max', opts['max']);
                }
                if (opts['opermin']) {
                    self._setOption('opermin', opts['opermin']);
                }
                if (opts['opermax']) {
                    self._setOption('opermax', opts['opermax']);
                }
                if (opts['autoOpen']) {
                    self._setOption('autoOpen', opts['autoOpen']);
                }
                if (opts['selected']) {
                    self._setOption('selected', opts['selected']);
                }
                if (opts['animate']) {
                    self._setOption('animate', opts['animate']);
                }
                if (opts['longClick']) {
                    self._setOption('longClick', opts['longClick']);
                }
                if (opts['onChange']) {
                    self._setOption('onChange', opts['onChange']);
                }
                if (opts["onOpen"]) {
                    self._setOption("onOpen", opts["onOpen"]);
                }
            }
            // update at the end of the chain...
            self._refresh();
        }

    });
})(jQuery, window, document);
