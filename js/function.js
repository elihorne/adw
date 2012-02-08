killModal = function(){
    $('.modal').remove();
    $('.shadow').fadeOut('fast',function(){
        $('.shadow').remove();
        $('.super-pop').remove();
    });
};  


updateModal = function(nextSource){
    if($(nextSource).is(':last-child')) {
        $('.super-pop .right').fadeOut();
    } else {
        $('.super-pop .right').fadeIn();
    }
    
    if($(nextSource).is(':first-child')) {
        $('.super-pop .left').fadeOut();
    } else {
        $('.super-pop .left').fadeIn();
    }
    
    $('.super-pop img').load(function(){
            newWidth = $('.super-pop img').outerWidth();
            newHeight = $('.super-pop img').outerHeight();
            $('.super-pop').animate({
                'margin-left' : -newWidth/2,
                'margin-top' : -newHeight/2
            }, 500);
        });
    
    
};

$('.super-pop.photo .right').live('click', function(){
    currentPhoto = $('.active-photo');
    nextPhoto = currentPhoto.next();
    nextPhotoSrc = nextPhoto.find('img').attr('src');
    // update the modal
    currentPhoto.removeClass('active-photo');
    nextPhoto.addClass('active-photo');
    updateModal(nextPhoto);
    $('.super-pop img').attr('src', nextPhotoSrc);
    
    if(nextPhoto.find('.payload').length) {
        targetPayload = nextPhoto.find('.payload').html();
        
        if(typeof targetPayload != 'undefined') {
            $('.super-pop .payload').html(targetPayload);
        }
    }
    event.preventDefault();
});

$('.super-pop.photo .left').live('click', function(){
    currentPhoto = $('.active-photo');
    nextPhoto = currentPhoto.prev();
    nextPhotoSrc = nextPhoto.find('img').attr('src');
    // update the modal
    currentPhoto.removeClass('active-photo');
    nextPhoto.addClass('active-photo');
    updateModal(nextPhoto);
    $('.super-pop img').attr('src', nextPhotoSrc);
    
    if(nextPhoto.find('.payload').length) {
        targetPayload = nextPhoto.find('.payload').html();
        
        if(typeof targetPayload != 'undefined') {
            $('.super-pop .payload').html(targetPayload);
        }
    }
    event.preventDefault();
});

showModal= function(targetThumb){
    
    
    if($(targetThumb).hasClass('photoholder')) {
        firstItem = $('.thumb.active .photo-item:first');
        firstItem.addClass('active-photo');
        firstImage = firstItem.find('img');
        targetData = $(firstImage).attr('src');
        if(!$('.shadow').length) {
            $('.header').prepend('<div class="shadow">');
        }
        
        $('.shadow').html('<div class="super-pop photo"><a class="close replaced" href="#">close</a><a href="#" class="left replaced">left</a><a href="#" class="right replaced">right</a><img src="'+targetData+'"/></div>');
        
        $('.super-pop img').load(function(){
            newWidth = $('.super-pop img').outerWidth();
            newHeight = $('.super-pop img').outerHeight();
            $('.super-pop').animate({
                'margin-left' : -newWidth/2,
                'margin-top' : -newHeight/2
            }, 500);
        });
        
        
    } else {
        
        if($(targetThumb).hasClass('photo-item')) {
            targetData = $(targetThumb).find('img').attr('src');
            
        } else {
            targetData = $(targetThumb).attr('rel');
        }
        
        
        if(!$('.shadow').length) {
            $('.header').prepend('<div class="shadow">');
        }
        
        if(typeof targetData == 'undefined') {
            targetData = '';
        }
        
        if(targetData == '') {
            targetData = 'coming soon';
            $('.shadow').html('<div class="super-pop">'+targetData+'</div>');
        } else {
            if(targetData.indexOf('vimeo.com') > -1) {
                $('.shadow').html('<div class="super-pop vimeo"><a class="close replaced" href="#">close</a><iframe src="'+targetData+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" width="640" height="360" frameborder="0"></iframe></div>');
                
                
                
            } else {
                
                $('.shadow').html('<div class="super-pop photo"><a class="close replaced" href="#">close</a><img src="'+targetData+'"/></div>');
                $('.super-pop img').load(function(){
            newWidth = $('.super-pop img').outerWidth();
            newHeight = $('.super-pop img').outerHeight();
            $('.super-pop').animate({
                'margin-left' : -newWidth/2,
                'margin-top' : -newHeight/1.75
            }, 500);
        });
                
            }
        };
    };
    
    if($('.thumb.active .payload').length){
            targetPayload = $('.thumb.active .payload').html();
        } else {
            targetPayload = '';
        }
        
        if(typeof targetPayload != 'undefined') {
            $('<ul class="payload">'+targetPayload+'</ul>').appendTo('.super-pop');
        }
    $('.shadow').fadeIn('fast');
    //event.preventDefault();    
    }

$('.thumb').live('click', function(){
    $('.thumb').removeClass('active');
    $(this).addClass('active');
    if($(this).attr('rel').indexOf('vimeo') > -1) {
        trackTitle = $(this).parent().find('.title').text();
        _gaq.push(['_trackEvent', 'Videos', 'Click', trackTitle]);
    }
    showModal($('.thumb.active'));    
});







$('.gallery-toggle').live('click', function(){
    targetThumb = $(this).parents().find('.gallery .photo-item:first');
    targetThumb.addClass('active-photo');
    targetData = $(targetThumb).find('img').attr('src');
    
    if(!$('.shadow').length) {
        $('.header').prepend('<div class="shadow">');
    }
    $('.shadow').html('<div class="super-pop photo"><a class="close replaced" href="#">close</a><a href="#" class="left replaced">left</a><a href="#" class="right replaced">right</a><img src="'+targetData+'"/></div>');
    
    $('.super-pop img').load(function(){
        newWidth = $('.super-pop img').outerWidth();
        newHeight = $('.super-pop img').outerHeight();
        $('.super-pop').animate({
            'margin-left' : -newWidth/2,
            'margin-top' : -newHeight/2
        }, 500);
    });
    
    if($('.active-photo .payload').length){
        targetPayload = $('.active-photo .payload').html();
    } else {
        targetPayload = '';
    }
    
    if(typeof targetPayload != 'undefined') {
        $('<ul class="payload">'+targetPayload+'</ul>').appendTo('.super-pop');
    }
    
    $('.shadow').fadeIn('fast');
    event.preventDefault();
});







$('.super-pop .close').live('click',function(){
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
			imageWidth = imageWidth/2;
			imageHeight = imageHeight/2;
			
			$('.lightbox img').attr({
				'width' : imageWidth,
				'height' : imageHeight
			});
		};
		
		
		
		
		$('.lightbox').css({
			'margin-left' : -imageWidth/2,
			'margin-top' : -imageHeight/2
		});
	}
}


showViaKeypress = function(message){
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



deepLink = function(){
    target = window.location.hash;
    
    if(target.length) {
        target = target.split('#');
        target = target[1];
       
        var targetName = [];
        var targetData = [];
        
        $('.items .thumb').each(function(i){
            targetClean = ($(this).parent().find('.title').text());
            targetClean = targetClean.split(' ').join('');
            targetClean = targetClean.split('/').join('');
            targetClean = targetClean.split(':').join('');
            targetClean = targetClean.split('-').join('').toLowerCase();
            
            
            targetName.push(targetClean);
            targetData.push($(this).attr('rel'));
        });
        
        
        if(targetName.indexOf(target) != -1) {
            itemCount = targetName.indexOf(target);
            itemName = target;
            itemData = targetData[itemCount];
            $('.thumb[rel="'+itemData+'"]').addClass('active');
            targetThumb = $('.items .thumb.active');
            trackTitle = $('.items .thumb.active').parent().find('.title').text();
            _gaq.push(['_trackEvent', 'Videos', 'Direct', trackTitle]);
            showModal(targetThumb); 
            
        } else {}
    }
    
};

deepLink();




/*
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
*/