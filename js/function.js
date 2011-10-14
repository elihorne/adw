//var backNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
//$.backstretch("images/backs/bg-"+backNumber+".jpg");

killModal = function(){
    $('.modal').remove();
    $('.shadow').fadeOut('fast',function(){
        $('.shadow').remove();
    });
};  


showModal= function(targetThumb){
    
    //alert('targetThumb = ' + targetThumb);
    
    targetData = $(targetThumb).attr('rel');
    
    $('.thumb').removeClass('active');
    $(this).addClass('active');
    
    if(!$('.shadow').length) {
        $('.header').prepend('<div class="shadow">');
    }
    
    if(targetData == '') {
        targetData = 'coming soon';
        $('.shadow').html('<div class="super-pop">'+targetData+'</div>');
    } else {
        if(targetData.indexOf('vimeo.com') > -1) {
              //alert('targetData = ' + targetData);
            $('.shadow').html('<div class="super-pop vimeo"><iframe src="'+targetData+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" width="640" height="360" frameborder="0"></iframe></div>');
        } else {
            $('.shadow').html('<div class="super-pop photo"><img src="'+targetData+'"/></div>');
        }
    };
    $('.shadow').fadeIn('fast');
    event.preventDefault();    
    }

$('.thumb').live('click', function(){
    $(this).addClass('active');
    showModal($('.thumb.active'));    
});

$('.shadow').live('click',function(){
    killModal();
})

lightbox = function(targetImage) {
	if($('body').hasClass('lightboxed')) {
		$('.shadow, .lightbox').fadeOut('slow', function(){
			$('.shadow, .lightbox').remove();
		});
		$('body').removeClass('lightboxed');
	} else {
		$('body').prepend('<div class="shadow"></div><div class="lightbox"></div>').addClass('lightboxed');
		$('.lightbox').append('<img src="'+targetImage+'"/>');
		
		viewportWidth = $('body').outerWidth();
		viewportHeight = $('body').outerHeight();
		imageWidth = $('.lightbox img').outerWidth();
		imageHeight = $('.lightbox img').outerHeight();
		
		if(imageWidth > viewportWidth || imageHeight > viewportHeight ) {
			
			imageWidthOffsetQuantity = imageWidth - viewportWidth;
			imageWidthOffset = imageWidthOffsetQuantity/imageWidth;
			//alert(imageWidthOffset);
			imageWidth = imageWidth/2;
			imageHeight = imageHeight/2;
			
			$('.lightbox img').attr({
				'width' : imageWidth,
				'height' : imageHeight
			});
			//alert ('really too big');
		};
		
		
		
		
		$('.lightbox').css({
			'margin-left' : -imageWidth/2,
			'margin-top' : -imageHeight/2
		});
	}
}


showViaKeypress = function(message){
    //alert(message);
	if($('.super-pop').length) {
		$('.super-pop').remove();
	} else {
		$('body').append('<div class="super-pop">'+message+'</div>');
		$('.super-pop').fadeIn('fast');
		setTimeout("$('.super-pop').remove();", 1500);
	};
	
	
	if(message == 'right') {
			if($('.active-photo').is(':last-child')) {
				return false;
			} else {
				$('article.active .active-photo').removeClass('active-photo').next().addClass('active-photo');
			};
	};
	
	if(message == 'left') {
			if($('.active-photo').is(':first-child')) {
				return false;
			} else {
				$('article.active .active-photo').removeClass('active-photo').prev().addClass('active-photo');
			};

	};
	
	if(message == 'down') {
		if($('.thumb.active').is(':last-child')) {
			return false;
		} else {
			
			xCount = 1 + $('.thumb.active').prevAll().length;
			console.log(xCount);
			
			
			//$('thumb.active').removeClass('active-photo');
			
			//if(xCount > $('article.active').next().find('li').length) {
			//	console.log('inequity!');
			//	xCount = $('article.active').next().find('li').length;
			//};
			
			$('.thumb.active').removeClass('active').next().find('li:nth-child('+xCount+')').addClass('active');
			
			targetThumb = $('.thumb.active');
			showModal(targetThumb);			
			//$('article.active').removeClass('active').addClass('inactive').next().addClass('active');
			
		};
	};
	
	if(message == 'up') {
		if($('article.active').is(':first-child')) {
			return false;
		} else {
			
			xCount = 1 + $('.active-photo').prevAll().length;
			//console.log(xCount);
			
			$('.active-photo').removeClass('active-photo');
			
			
			
			if(xCount > $('article.active').prev().find('li').length) {
				//console.log('inequity!');
				xCount = $('article.active').prev().find('li').length;
			};
			$('article.active').prev().find('li:nth-child('+xCount+')').addClass('active-photo');
			$('article.active').removeClass('active').addClass('inactive').prev().addClass('active');
		};
	};
	
};

$(window).keydown(function(e) {
    if($('.super-pop').length) {
	switch(e.which)
	{
		// user presses the "escape"
		case 27:	killModal();
					break;
					
		case 13:	showViaKeypress('enter');
					break;	

		// user presses the "right" key
		case 39:	showViaKeypress('right');
					break;

		// user presses the "left" key
		case 37:	showViaKeypress("left", "&#8612;");
					break;

		// user presses the "top" key
		case 38:	showViaKeypress("up");
					break;
					
		// user presses the "g" key
		case 40:	showViaKeypress("down");
					break;	
					
		// user presses the "f" key
		case 32:	showViaKeypress("spacebar");
	}
    }  
});