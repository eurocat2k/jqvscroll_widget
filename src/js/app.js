$(function(){
    console.log(`Ready...`);
    $('.box').css({'top': parseInt(Math.random() * $('.wrapper').height() / 2), 'left': parseInt(Math.random() * $('.wrapper').width() / 2)});
    $cfl = $('.cfl').vscroller({
        step: 5,           // step size - difference between two consecutive list element
        min: 280,           // minimum value in the list not below 0
        // opermin: 300,       // operational minimum - bottom of selectable values. Below this value the items (if any) disabled.
        max: 410,           // maximum value of the list not above 660
        // opermax: 380,       // operational maximum - top of selectable values.
        selected: 340,      // selected - shall be between operational range
        // longClick: 250,     // longpress delay
        // visible: 5,         // visible items in the list
        autoOpen: true,
        onChange: function(data) {
            console.log(`Executed user's callback function with param ${data}`);
        }
    });
    $cfl.vscroller({
        opermin: 300,       // operational minimum - bottom of selectable
        opermax: 380,       // operational maximum - top of selectable
        selected: 340,      // selected - shall be between operational range
        visible: 7,
        longClick: 250,     // longpress delay
        // onChange: function(data) {
        //     console.log(`Executed user's callback function with param ${data}`);
        // }
    });
    $('.box').draggable({
        cancel: ".cfl"
    });
    console.log({$cfl});
});