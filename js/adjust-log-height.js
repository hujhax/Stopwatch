function adjustLogHeight(){
    var BOTTOM_OFFSET = 10;
    var newLogHeight = $(window).height() - $(".log").offset().top - BOTTOM_OFFSET;
    $(".log").height(newLogHeight);
}

$(window).resize(function(){
    adjustLogHeight();
});

$(window).load(function(){
    adjustLogHeight();
});
