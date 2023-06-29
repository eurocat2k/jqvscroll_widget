$(function(){
    console.log(`Ready...`);
    let lastOpenedCFL;
    let top1, top2, left1, left2;
    top1 = parseInt((Math.random() * $(".wrapper").height()) / 2);
    left1 = parseInt(Math.random() * $('.wrapper').width() / 2);
    top2 = parseInt((Math.random() * $(".wrapper").height()) / 2);
	left2 = parseInt((Math.random() * $(".wrapper").width()) / 2);
    if (!$('#box1').hasClass('dragged')) {
        $("#box1").css({
            top: top1,
            left: left1,
        });
    }
    if (!$("#box2").hasClass("dragged")) {
        $("#box2").css({
            top: top2,
            left: left2,
        });
    }
    let $cfl1 = $("#box1 .cfl").vscroller({
        step: 5, // step size - difference between two consecutive list element
        min: 280, // minimum value in the list not below 0
        // opermin: 300,       // operational minimum - bottom of selectable values. Below this value the items (if any) disabled.
        max: 410, // maximum value of the list not above 660
        // opermax: 380,       // operational maximum - top of selectable values.
        selected: 340, // selected - shall be between operational range
        // longClick: 250,     // longpress delay
        // visible: 5,         // visible items in the list
        autoOpen: true,
        onChange: function (data) {
            console.log(`Executed user's callback function with param ${data}`);
        },
        onOpened: function (data) {
            lastOpenedCFL = data;
            console.log(`Executed onOpened callback`, $(data));
        }
    });
    $cfl1.vscroller({
        opermin: 300, // operational minimum - bottom of selectable
        opermax: 380, // operational maximum - top of selectable
        selected: 340, // selected - shall be between operational range
        visible: 7,
        longClick: 250, // longpress delay
    }).on("executeOpenedCB", function (ev, cb) {
        console.log(`Open cb called`, $(cb));
        return false;
    });

    let $cfl2 = $("#box2 .cfl").vscroller({
        step: 5, // step size - difference between two consecutive list element
        min: 280, // minimum value in the list not below 0
        // opermin: 300,       // operational minimum - bottom of selectable values. Below this value the items (if any) disabled.
        max: 410, // maximum value of the list not above 660
        // opermax: 380,       // operational maximum - top of selectable values.
        selected: 340, // selected - shall be between operational range
        // longClick: 250,     // longpress delay
        // visible: 5,         // visible items in the list
        autoOpen: true,
        onChange: function (data) {
            console.log(`Executed user's callback function with param ${data}`);
        },
        onOpened: function (data) {
            lastOpenedCFL = data;
            console.log(`Executed onOpened callback`, $(data));
        }
    });

    $cfl2.vscroller({
        opermin: 385, // operational minimum - bottom of selectable
        // opermax: 410, // operational maximum - top of selectable
        selected: 390, // selected - shall be between operational range
        visible: 7,
        longClick: 230, // longpress delay
    });

    $("#box1").draggable({
        cancel: ".cfl",
        start: function (ev, ui) {
            $(this).addClass("dragged");
            // $(this).css({ 'z-index': 999 });
        },
        stop: function (ev, ui) {
            let position = $(this).offset();
            // console.log("box1", { position });
            $(this).appendTo(".wrapper").css(position);
            // $(this).css({ "z-index": 100 });
        },
    }).on('mousedown', function (ev) {
        ev.preventDefault();
        if (lastOpenedCFL && (lastOpenedCFL !== this)) {
            $(lastOpenedCFL).vscroller("close");
        }
        let position = $(this).offset();
        $(this).appendTo(".wrapper").css(position);
        $(this).css({ "z-index": 999 });
    });
    $("#box2").draggable({
        cancel: ".cfl",
        start: function (ev, ui) {
            $(this).addClass("dragged");
            // $(this).css({ "z-index": 999 });
        },
        stop: function (ev, ui) {
            let position = $(this).offset();
            // console.log("box2", { position });
            $(this).appendTo(".wrapper").css(position);
            // $(this).css({ "z-index": 100 });
        },
    }).on("mousedown", function (ev) {
        ev.preventDefault();
        if (lastOpenedCFL && lastOpenedCFL !== this) {
            $(lastOpenedCFL).vscroller("close");
        }
        let position = $(this).offset();
        $(this).appendTo(".wrapper").css(position);
        $(this).css({ "z-index": 999 });
    });
    // console.log({$cfl1, $cfl2});
});
