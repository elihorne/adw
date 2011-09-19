var backNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1);
$.backstretch("images/backs/"+backNumber+".png");

$('.thumb').live('click', function(){
    $('.header').prepend('<div class="shadow"><div class="modal"><iframe src="http://player.vimeo.com/video/26293855?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" width="800" height="450" frameborder="0"></iframe></div></div>');
    $('.shadow').fadeIn('fast');
    event.preventDefault();
});

$('.shadow').live('click',function(){
    $('.modal').remove();
    $('.shadow').fadeOut('fast',function(){
        $('.shadow').remove();
    })
})