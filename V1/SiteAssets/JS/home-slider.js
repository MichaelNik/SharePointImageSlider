$(document).ready(function() {
	
	function Slider(timerDelay){
		this.currentSlideID = 1;
		this.numOfSlides = 0;
		this.timer;
		this.timerDelay = timerDelay ? timerDelay * 1000 : false;
		
		this.setUpSlider(true);
		if(timerDelay){
			this.initSliderTimer();
		}
	}
	
	Slider.prototype = {
		
		goToSlide : function(slideID){
			var me = this;
			
			me.currentSlideID = slideID;
			me.slideIcons.removeClass('active');
			me.slideInfos.removeClass('active');
			me.slides.removeClass('active');
			$('#slide-'+me.currentSlideID).addClass('active');
			$('#slide-icon-'+me.currentSlideID).addClass('active');
			$('#slide-info-'+me.currentSlideID).addClass('active');

		},
		
		initSliderTimer : function(){
			var me = this;
			//console.log('initSliderTimer ');
			me.timer = setInterval(function(){
				//console.log('timer triggered');
				if(me.currentSlideID == me.numOfSlides){
					me.currentSlideID = 1;
				}
				else{
					me.currentSlideID++;
				}
				me.goToSlide(me.currentSlideID);
			}, me.timerDelay);
		},
		
		setUpSlider : function(){
			var me = this;
			
			me.slideIcons = $('.slide-icon');
			me.slideInfos = $('.slide-info');
			me.slides = $('.slide');
			me.numOfSlides = me.slides.length;
			
			me.slideIcons.on('click', function(){
				clearInterval(me.timer);
				var slideID= $(this).attr('data-slide-id');
				me.goToSlide(slideID);
			});
		}
		
	}
	
	function setUpSlider(data){
		var delayBetweenSlides = 3;
		//console.log('setting up slider');
		var numOfSlides = 0;
		var slideContainer = $('#slide-container');
		var sliderIcons = $('#slider-icons');
		var slideInfoContainer = $('#slide-info-container');
		data.each(function(){
			var item = $(this);
			var image = item.attr('ows_Slide_x0020_Image');
			var title = item.attr('ows_Title');
			var subHeading = item.attr('ows_Sub_x002d_Heading_x0020_Text') ? item.attr('ows_Sub_x002d_Heading_x0020_Text') : '';
			if(image && title){
				numOfSlides++;
				var active = numOfSlides==1 ? ' active' : '';
				slideContainer.append('<div id="slide-'+numOfSlides+'" class="slide'+active+'">'+
									  	  image+
									  '</div>');
				}
				
				
				sliderIcons.append('<div id="slide-icon-'+numOfSlides+'" data-slide-id="'+numOfSlides+'" class="slide-icon'+active+'"></div>');
				
				slideInfoContainer.append('<div id="slide-info-'+numOfSlides+'" class="slide-info'+active+'">'+
											  '<h2>'+title+'</h2>'+
											  '<p>'+subHeading+'</p>'+
										  '</div>');
		});
		
		var slider = new Slider(delayBetweenSlides);

	}
	cssWeb.getHeroSliderImages(setUpSlider);
	
	//var slider = new Slider(8);
});