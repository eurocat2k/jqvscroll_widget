$(function(){
    console.log(`Ready...`);
    $('.box').css({'top': parseInt(Math.random() * $('.wrapper').height() / 2), 'left': parseInt(Math.random() * $('.wrapper').width() / 2)});
    $cfl = $('.cfl').vscroller();
    $cfl.vscroller({step: 10, min: 10, max: 100, visible: 5});
    $('.box').draggable({
        cancel: ".cfl"
    });
    console.log({$cfl});
});