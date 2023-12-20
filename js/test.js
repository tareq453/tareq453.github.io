

$(document).ready(function() {

	// When the window and all images are loaded, hide the loader and show the content
	window.addEventListener('load', function() {
		console.log('Website has finished loading all resources.');
		/*const loader = document.querySelector('.loader');*/
		/*const content = document.querySelector('.content');*/

		/*loader.style.display = 'none';*/
		/*content.style.display = 'block';*/
		/*content.style.visibility = 'visible';*/

	});
	console.log("hello2");



	/*
	< !--js / jquery stuff-- >*/

	$('a[href^="#"]').on('click', function(e) {
		console.log("nav clicked");
		e.preventDefault();

		const targetId = $(this).attr('href');
		const targetSection = $(targetId);

		$('.navbar-collapse').collapse('hide');

		if (targetSection.length) {
			const navbarHeight = $('.navbar').outerHeight(); // Get the fixed navbar height
			const scrollToPosition = targetSection.offset().top - navbarHeight;

			$('html, body').animate({
				scrollTop: scrollToPosition
			}, 100);
		}
	});

	console.log("ready document");
	/*$(".scroll-container").draggable({
		axis: "x" // Only allow horizontal dragging
	});*/

	$('#contact-form').submit(function(event) {
		event.preventDefault();
		var status = $('#my-form-status');
		var formData = new FormData($(this)[0]);

		$.ajax({
			url: $(this).attr('action'),
			method: $(this).attr('method'),
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			success: function(response) {
				if (response && response.ok) {
					Swal.fire({
						icon: 'success',
						title: 'Success!',
						text: 'Thanks for your submission!',
					});
					$('#contact-form')[0].reset();
				} else {
					if (response && response.errors) {
						var errorMessages = response.errors.map(function(error) {
							return error.message;
						}).join(", ");
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: errorMessages,
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'There was a problem submitting your form',
						});
					}
				}
			},
			error: function() {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'There was a problem submitting your form',
				});
			}
		});
	});

})
