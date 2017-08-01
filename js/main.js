(function($){ 
	"use strict";

	// styling elements
	$('.select, .radio, .checkbox').styler();
	$('.js-pet-photo').styler();

	$(document).on('click', '.js-modal', function(e) {
		$('body').prepend('<div class="modal__cover"></div>');
		$('.modal__cover').css('height',$(document).height());
		$($(this).attr('href')).addClass('modal--active');
		e.preventDefault();
	});
	$(document).on('click', '.modal__cover, .modal__close', function(e) {
		$('.modal__cover').remove();
		$('.modal').removeClass('modal--active');
		e.preventDefault();
	});

	// hide search in header on document click
	if ($(window).width() < 992) {
		$(document).click(function() {
			$('.header__search').fadeOut('fast');
			$('.header').removeClass('header__search--active');
		});
	}
	$(document).click(function() {
		$('.quick-filter__filter-item').removeClass('quick-filter__filter-item--active');
		$('.quick-filter__sub').removeClass('quick-filter__sub--active');
		$('.header__cart-content').removeClass('header__cart-content--active');
		$('.header__cart').removeClass('header__cart--active');
		$('.category__wrap').removeClass('category__wrap--active');
		$('.account__pet-autocomplete').removeClass('account__pet-autocomplete--active');
	});

	$('.js-form-clear').click(function(e) {
		$(this).closest('form').find('input, textarea').val('');
		e.preventDefault();
	})

	// mobile menu
	var menu = $('.menu');
	$('.burger, .footer__burger').click(function(e) {
		$(menu).addClass('menu--active');
		$('.nav__list').clone().appendTo('.menu__nav');
		$('.header .logo, .header__feedback, .header__callback').clone().appendTo('.menu__system');
		$('.footer__nav-block:last-child').clone().appendTo('.menu__info');
		e.preventDefault();
	});
	$('.menu__close').click(function(e) {
		$(menu).removeClass('menu--active');
		$('.menu__nav, .menu__system, .menu__info').html('');
		e.preventDefault();
	});
	$('.menu').swipe({
		swipeLeft:function() {
			$(menu).removeClass('menu--active');
			$('.menu__nav, .menu__system, .menu__info').html('');
		},
		threshold:40
	});

	// show and hide filter on catalog page
	$('.js-catalog-filter').click(function() {
		$('.sidebar').addClass('sidebar--active');
	});
	$('.filter__close').click(function(e) {
		$('.sidebar').removeClass('sidebar--active');
		e.preventDefault();
	});
	$('.sidebar').swipe({
		swipeLeft:function() {
			$('.sidebar').removeClass('sidebar--active');
		},
		threshold:40
	});

	// header search dropdown
	$('.header__search-category').styler();
	$('.header__search--mobile').click(function() {
		$('.header__search').slideToggle('fast');
		$('.header').toggleClass('header__search--active');
		$('.header__search-category').trigger('refresh');
		return false;
	});
	$('.header__search').click(function(e) {
		e.stopPropagation();
	});

	// show categories and cart on mobile
	$('.category__title').click(function() {
		$('.category__wrap').toggleClass('category__wrap--active');
		return false;
	});
	$('.category__wrap').click(function(e) {
		e.stopPropagation();
	});
	if ( $(window).width() < 992 ) {
		$('.category__item-link').click(function(e) {
			$(this).parent().toggleClass('category__item--active');
			$(this).next('.category__sub').fadeToggle('fast');
			e.preventDefault();
		});
	}
	if ( $(window).width() > 992 ) {
		$('.js-header-cart').click(function() {
			$(this).toggleClass('header__cart--active');
			$('.header__cart-content').toggleClass('header__cart-content--active');
			return false;
		});
		$('.header__cart-content').click(function(e) {
			e.stopPropagation();
		})
	}

	// homepage slider init
	$('.js-slider').flickity({
		cellSelector: '.slider__item',
		pageDots: false,
	});


	// more/less buttons into a addToCart section
	$('.catalog__addToCart-spin').on('click', function(e) {
		var $button = $(this);
		var oldValue = $button.parent().find('.catalog__addToCart-count').val();
		oldValue = oldValue.replace(' шт','');
		if ($button.hasClass('catalog__addToCart-more')) {
			var newVal = parseFloat(oldValue) + 1 + ' шт';
		} else {
			if (oldValue > 1) {
				var newVal = parseFloat(oldValue) - 1 + ' шт';
			} else {
				newVal = 1 + ' шт';
			}
		}
		$button.parent().find("input").val(newVal);
		e.preventDefault();
	});

	// newest products carousel
	$('.js-newest').flickity({
		cellSelector: '.catalog__item',
		wrapAround: true,
		//groupCells: true,
		cellAlign: 'left',
		pageDots: false,
	});

	// quick filter submenu
	$('.quick-filter__filter-link').click(function() {
		$('.quick-filter__filter-item').removeClass('quick-filter__filter-item--active');
		$('.quick-filter__sub').removeClass('quick-filter__sub--active');
		$(this).parent().toggleClass('quick-filter__filter-item--active');
		$(this).next('.quick-filter__sub').toggleClass('quick-filter__sub--active');
		return false;
	});
	$('.quick-filter__sub').click(function(e) {
		e.stopPropagation();
	})

	// faq carousel
	$('.js-faq').flickity({
		cellSelector: '.faq__item',
		pageDots: false,
	});

	// filter searching
	var fParent = $('.filter__search');
	var fSearch = $('.filter__search-input');
	var fItem = $('.filter__search-item');
	var fNotFound = $('.filter__notFound').hide();
	fParent.each(function() {
		var $this = $(this);
		if ( $this.find(fSearch).length) {
			$this.find(fSearch).val('').keyup();
			$this.find(fNotFound).hide();
			$this.find(fSearch).keyup(function() {
				var fQuery = $this.find(fSearch).val();
				$this.find(fItem).each(function() {
					if (!$(this).html().match(new RegExp('.*?' + fQuery + '.*?', 'i'))) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});
				if ($this.find(fItem).filter(':visible').length < 1) {
					$this.find(fNotFound).show();
				} else {
					$this.find(fNotFound).hide();
				}
			});
		}
	})

	$('.js-newest-select').styler({
		selectSmartPositioning: false,
	});

	$('.filter__title').click(function(e) {
		$(this).toggleClass('filter__title--opened');
		$(this).next('.filter__content').toggleClass('filter__content--active');
		e.preventDefault();
	});

	var $container = $('.catalog__products').infiniteScroll({
		path: '.pagination__next',
		append: '.row',
		history: 'push',
		loadOnScroll: false,
	});
	var $viewMoreButton = $('.js-catalog-load');
	$viewMoreButton.on('click', function() {
		$container.infiniteScroll('loadNextPage');
		$container.infiniteScroll('option', {
			loadOnScroll: true,
		});
		$viewMoreButton.hide();
	});

	$('.js-product-photos').click(function(e) {
		$('.product__photos-item').removeClass('product__photos-item--active');
		$(this).parent('.product__photos-item').addClass('product__photos-item--active');
		$('.product__big-photo').find('img').hide().attr('src',$(this).attr('href')).fadeIn('fast');
		$('.product__big-photo').find('img').hide().attr('data-magnify-src',$(this).attr('href')).fadeIn('fast');
		if ( $(window).width() > 992 ) {
			$('.zoom').magnify();
		}
		e.preventDefault();
	});

	$('.js-rating').barrating({
		theme: 'fontawesome-stars-o',
		onSelect:function(value, text, event) {
			console.log('selected value = ' + value);
		}
	});

	$('.product__descr-title').click(function(e) {
		$('.product__descr-title').removeClass('product__descr-title--active');
		$('.product__descr-content').removeClass('product__descr-content--active');
		$(this).addClass('product__descr-title--active');
		$(this).next('.product__descr-content').addClass('product__descr-content--active');
		e.preventDefault();
	});

	$('.checkout__delivery-block').removeClass('checkout__delivery-block--active');
	$('.checkout__delivery-item input').each(function() {
		var thisID = $(this).attr('id');
		if ( $(this).is(':checked') ) {
			$(this).closest('.checkout__delivery').find('.checkout__delivery-block[data-for='+ thisID +']').addClass('checkout__delivery-block--active');
		}
		$(this).change(function() {
			$('.checkout__delivery-block').removeClass('checkout__delivery-block--active');
			$(this).closest('.checkout__delivery').find('.checkout__delivery-block[data-for='+ thisID +']').toggleClass('checkout__delivery-block--active');
		});
	});

	$('.js-pet-autocomplete').keyup(function() {
		if( $(this).val().length > 2 ) {
			$(this).next('.account__pet-autocomplete').addClass('account__pet-autocomplete--active');
		} else {
			$(this).next('.account__pet-autocomplete').removeClass('account__pet-autocomplete--active');
		}
	});
	$('.account__pet-autocomplete').click(function(e) {
		e.stopPropagation();
	});

	// массив месяцев
	var monthArr = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	$('.pet-month__spin').on('click', function(e) {
		var $button = $(this);
		var oldValue = $button.closest('.account__pet-month').find('.pet-month__count').val();
		if ($button.hasClass('pet-month__spin-more')) {
			var newVal = monthArr[($.inArray(oldValue, monthArr) + 1) % monthArr.length];
			var newValNumber = ($.inArray(oldValue, monthArr) + 1) % monthArr.length;
		} else {
			var newVal = monthArr[($.inArray(oldValue, monthArr) - 1 + monthArr.length) % monthArr.length];
			var newValNumber = ($.inArray(oldValue, monthArr) - 1 + monthArr.length) % monthArr.length;
		}
		$button.closest('.account__pet-month').find('.pet-month__count').val(newVal);
		$button.closest('.account__pet-birthday').find('.js-pet-birthday').val(newValNumber+1)
		e.preventDefault();
		calculateAge();
	});
	$('.account__pet-day, .account__pet-year').keyup(function() {
		calculateAge();
	});

	var calculateAge = function() {
		var now = new Date();
		var birthday = $('.account__pet-year').val() + "-" + $('.js-pet-birthday').val() + "-" + $('.account__pet-day').val();
		var past = new Date(birthday);
		var nowYear = now.getTime();
		var pastYear = past.getTime();
		var age = nowYear - pastYear;
		$('.account__pet-age').text(parseInt(age / 31557600000) + ' лет');
	};

})(jQuery);