$('.btn.edit-address').click(function () {
	$(this).hide();
	$(this).parents('td').siblings('.address-edit').show();
	$(this).siblings('.btn.edit-address-cancel').show();
	$(this).siblings('.btn.edit-address-submit').show();
	$(this).siblings('.btn.delete-address').hide();
	$(this).parents('td').siblings('.address-record').hide();
});

$('.btn.edit-address-submit').click(function () {
	$(this).hide();
	$(this).parents('td').siblings('.address-edit').hide();
	$(this).siblings('.btn.edit-address-cancel').hide();
	$(this).siblings('.btn.edit-address').show();
	$(this).siblings('.btn.delete-address').show();
	$(this).parents('td').siblings('.address-record').show();
});

$('.btn.edit-address-cancel').click(function () {
	$(this).hide();
	$(this).parents('td').siblings('.address-edit').hide();
	$(this).siblings('.btn.edit-address-submit').hide();
	$(this).siblings('.btn.edit-address').show();
	$(this).siblings('.btn.delete-address').show();
	$(this).parents('td').siblings('.address-record').show();
});

function getVariantFromOptions() {
	let variantArr = [];
	$('.product-category select').map(function (i, el) {
		variant = { value: $(el).val(), index: $(el).data('index') };
		variantArr.push(variant);
	});
	return variantArr;
}

function updateHistoryState(variant) {
	if (!history.replaceState || !variant) {
		return;
	}

	var newurl =
		window.location.protocol +
		'//' +
		window.location.host +
		window.location.pathname +
		'?variant=' +
		variant.id;

	window.history.replaceState({ path: newurl }, '', newurl);
}

$('.product-category select').on('change', function () {
	var selectedValues = getVariantFromOptions();
	var variants = window.product.variants;

	// Search for product variants based on what was selected in the dropdowns
	var found = _.find(variants, function (variant) {
		return selectedValues.every(function (values) {
			return _.isEqual(variant[values.index], values.value);
		});
	});
	updateHistoryState(found);
	$('#variant-id').val(found.id);
});

// // Flickity Carousel
$('.main-carousel').flickity({
	// options
	contain: true,
	autoPlay: true,
	wrapAround: true,
	lazyLoad: true,
	arrowShape: { x0: 10, x1: 60, y1: 50, x2: 65, y2: 45, x3: 20 },
});

$('.product-carousel').flickity({
	// options
	resize: false,
	contain: true,
	wrapAround: true,
	cellAlign: 'left',
});

// // add padding top to show content behind navbar
// $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
// // menu Scroll
// $(document).ready(function () {
// 	if ($('.smart-scroll').length > 0) {
// 		// check if element exists
// 		let last_scroll_top = 0;
// 		$('#main_nav').addClass('show');
// 		$('.navbar-toggler').addClass('hide');

// 		$(window).on('scroll', function () {
// 			scroll_top = $(this).scrollTop();
// 			if (scroll_top < last_scroll_top) {
// 				$('#main_nav').addClass('show');
// 				$('.navbar-toggler').addClass('hide');
// 			} else {
// 				$('#main_nav').removeClass('show');
// 				$('.navbar-toggler').removeClass('hide');
// 			}
// 			last_scroll_top = scroll_top;
// 		});
// 	}
// 	// detect scroll top or down
// });

// add padding top to show content behind navbar
$('body').css('padding-top', $('.navbar').outerHeight() + 'px');

// detect scroll top or down
if ($('.smart-scroll').length > 0) {
	// check if element exists
	var last_scroll_top = 0;
	$(window).on('scroll', function () {
		scroll_top = $(this).scrollTop();
		if (scroll_top < last_scroll_top) {
			$('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
		} else {
			$('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
		}
		last_scroll_top = scroll_top;
	});
}
