jQuery(document).ready(function($) {

	'use strict';

/*==========================================================*/
/* Preloader
/*==========================================================*/

	// $(window).on('load', function(){
	// 	$('#status').fadeOut();
	// 	$('#preloader').delay(350).fadeOut('slow');
	// });

/*==========================================================*/
/* Collapsible sidebar
/*==========================================================*/

	$('#sidebar-button, #overlay').click(function() {
		$('.portfolio-full').removeClass('portfolio-open');
		$('#top').removeClass('portfolio-open');
		$('#sidebar-button').toggleClass('open');
		$('body').toggleClass('sidebar-open');
		return false;
	});

/*==========================================================*/
/* Main menu
/*==========================================================*/

	$('#mainmenu ul > li:has(ul)').each(function() {
		$(this).addClass('expandable');
	});

	$('#mainmenu ul > li:has(ul) > a').click(function() {
		$(this).parent('li').toggleClass('expanded');
		$(this).parent('li').children('ul').slideToggle();
		return false;
	});

/*==========================================================*/
/* Swiper slider
/*==========================================================*/

	/* Initialize sliders */

	var swiper = [];
	$('.swiper').each(function(i,obj){
		swiper[i] = new Swiper(obj, {
			loop: false,
			calculateHeight: true

		});
		// Bind navigation arrows
		$(this).children('.nav-left').on('click', function(e){
			e.preventDefault();
			swiper[i].swipePrev();
		});
		$(this).children('.nav-right').on('click', function(e){
			e.preventDefault();
			swiper[i].swipeNext();
		});
	});

	/* Resize fix for IE11 */

	$(window).on('load', function(){
		swiper.forEach(function(entry) {
			window.setTimeout(function() { entry.resizeFix(); }, 500);
		});
	});

	/* Fullscreen slider */

	var fSwiper = new Swiper('#fullscreen-slider',{
		loop:true,
		autoplay:5000,

		onSlideChangeStart: function() {

			// Hide arrow on first and last slide
			if (fSwiper.activeIndex == 0) {
				$('#nav-arrows .nav-left').addClass('hidden');
			} else {
				$('#nav-arrows .nav-left').removeClass('hidden');
			};
			// if (fSwiper.activeIndex == (fSwiper.slides.length - 1)) {
			// 	$('#nav-arrows .nav-right').addClass('hidden');
			// } else {
			// 	$('#nav-arrows .nav-right').removeClass('hidden');
			// }
			var videohome = document.querySelector('#fullscreen-slider video');

			var promise = videohome.play();

			// promise won???t be defined in browsers that don't support promisified play()
			if (promise === undefined) {
					console.log('Promisified video play() not supported');
				}
				else {
					promise.then(function() {
							console.log('Video playback successfully initiated, returning a promise');
					}).catch(function(error) {
							console.log('Error initiating video playback: ', error);
					});
			}
		}

	});




	// Bind external navigation arrows for fullscreen slider
	$('#nav-arrows .nav-left').on('click', function(e){
		e.preventDefault();
		fSwiper.swipePrev();
	});
	$('#nav-arrows .nav-right').on('click', function(e){
		e.preventDefault();
		fSwiper.swipeNext();
	});
	// Resize videos in fullscreen slider
	function resizeToCover() {
		$('#fullscreen-slider .swiper-slide').each(function() {
			if ($(this).has('video').length) {
				var vid_w_orig = parseInt($(this).find('video').attr('width'));
				var vid_h_orig = parseInt($(this).find('video').attr('height'));
				var container_w = $(this).width();
				var container_h = $(this).height();
				// Use largest scale factor of horizontal / vertical
				var scale_h =  container_w / vid_w_orig;
				var scale_v =  container_h / vid_h_orig;
				var scale = scale_h > scale_v ? scale_h : scale_v;
				// Scale the video
				$(this).find('video').width(scale * vid_w_orig);
				$(this).find('video').height(scale * vid_h_orig);
				// Center the video
				$(this).find('video').css('left', ((container_w - scale * vid_w_orig) / 2));
				$(this).find('video').css('top', ((container_h - scale * vid_h_orig) / 2));
			}
		});
	}
	resizeToCover();
	function resizeToCoverSnap() {
		$('.snap').each(function() {
			if ($(this).has('video').length) {
				var vid_w_orig = parseInt($(this).find('video').attr('width'));
				var vid_h_orig = parseInt($(this).find('video').attr('height'));
				var container_w = $(this).width();
				var container_h = $(this).height();
				// Use largest scale factor of horizontal / vertical
				var scale_h =  container_w / vid_w_orig;
				var scale_v =  container_h / vid_h_orig;
				var scale = scale_h > scale_v ? scale_h : scale_v;
				// Scale the video
				$(this).find('video').width(scale * vid_w_orig);
				$(this).find('video').height(scale * vid_h_orig);
				// Center the video
				$(this).find('video').css('left', ((container_w - scale * vid_w_orig) / 2));
				$(this).find('video').css('top', ((container_h - scale * vid_h_orig) / 2));
			}
		});
	}
	resizeToCoverSnap();

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 $("#wave").attr('poster', 'img/poster_waves.jpg');
		$("#casa").attr('poster', 'img/poster_casa.jpg');
	};


/*==========================================================*/
/* On resize
/*==========================================================*/

	$(window).resize(function() {
		resizeToCover();
	});

/*==========================================================*/
/* On scroll
/*==========================================================*/

	$('#content').scroll(function(){
		// Add shadow to top header
		if ($('#content').scrollTop() > 0) {
			$('#top').addClass('shadow');
		} else {
			$('#top').removeClass('shadow');
		}
	});


/*==========================================================*/
/* Portfolio Item
/*==========================================================*/

	// $('article.portfolio a').click(function() {
	// 	var itemID = $(this).attr('href');
	// 	$('#top').addClass('portfolio-open');
	// 	$(itemID).addClass('portfolio-open');
	// 	return false;
	// });
	// $('#portfolio-close').click(function() {
	// 	$('.portfolio-full').removeClass('portfolio-open');
	// 	$('#top').removeClass('portfolio-open');
	// 	return false;
	// });

/*==========================================================*/
/* AJAX Contact form
/*==========================================================*/

	// $('#contact-form').submit(function() {
	// 	$.post('send.php', $(this).serialize(), function(data){
	// 		$('#contact-form').html('<p>' + data + '</p>');
	// 	});
	// 	return false;
	// });


});

/*==========================================================*/
/* Swiper slider
/*==========================================================*/

	$('.gallery').justifiedGallery({
		lastRow: 'nojustify',
		rowHeight: 250,
		maxRowHeight: 250,
		margins: 10
	}).on('jg.complete', function () {
		$(this).find('a').colorbox({
			maxWidth: '100%',
			maxHeight: '100%',
			opacity: 0.7,
			transition: 'elastic',
			current: ''
		});
	});

