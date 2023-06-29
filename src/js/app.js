$(function(){
    console.log(`Ready...`);
    let boxZindex = 100;
    $('#box1').css({
        top: parseInt(Math.random() * $('.wrapper').height() / 2),
        left: parseInt(Math.random() * $('.wrapper').width() / 2),
        'z-index': 100,
    });
    $("#box2").css({
        top: parseInt((Math.random() * $(".wrapper").height()) / 2),
        left: parseInt((Math.random() * $(".wrapper").width()) / 2),
        "z-index": 100,
    });
    $cfl1 = $("#box1 .cfl").vscroller({
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
    });
    $cfl1.vscroller({
        opermin: 300,       // operational minimum - bottom of selectable
        opermax: 380,       // operational maximum - top of selectable
        selected: 340,      // selected - shall be between operational range
        visible: 7,
        longClick: 250,     // longpress delay
    });

    $cfl2 = $("#box2 .cfl").vscroller({
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
            $(this).css({ "z-index": 999 });
        },
        stop: function (ev, ui) {
            $(this).css({ "z-index": 100 });
        },
    });
    $("#box2").draggable({
        cancel: ".cfl",
        start: function (ev, ui) {
            let z = (boxZindex += 1);
            $(this).css({ "z-index": 999 });
        },
        stop: function (ev, ui) {
            $(this).css({ "z-index": 100 });
        },
    });
    console.log({$cfl1, $cfl2});
});
