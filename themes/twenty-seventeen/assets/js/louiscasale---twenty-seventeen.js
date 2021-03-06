/**
 * LouisCasale - Twenty Seventeen - v0.1.0
 * https://www.louiscasale.com
 * Copyright (c) 2016; * Licensed GPL-2.0+
 */
'use strict';

( function( $ ) {

	var louiscasale = {

		/**
		 * Declare carousel settings.
		 *
		 * @since 0.1.0
		 * @uses slick()
		 * @return void
		 */
		setCarouselSettings: function() {
			$( '.carousel.main' ).slick( {
				infinite: true,
				slidesToShow: 1,
				autoplay: true,
				autoplaySpeed: 3000
			} );
		},

		/**
		 * Fade in effect for images and titles on page load.
		 *
		 * @since 0.1.0
		 * @uses removeClass()
		 * @return void
		 */
		fadeInEffect: function() {
			if ( $( '.unloaded' ).length ) {
				$( 'figure.unloaded' ).removeClass( 'unloaded' );
				$( 'h5.unloaded' ).removeClass( 'unloaded' );
			}
		},

		/**
		 * Sends contact information to contact endpoint for processing.
		 *
		 * @since 0.1.0
		 * @uses click(), val(), ajax(), stringify()
		 * @return void
		 */
		sendContactInformation: function() {
			$( '.contact-btn' ).click(function() {
				var _id       = $( 'input[type=hidden]' ).val(),
					firstname = $( '#firstname' ).val(),
					lastname  = $( '#lastname' ).val(),
					email     = $( '#email' ).val(),
					subject   = $( '#subject' ).val(),
					message   = $( '#message' ).val(),
					data      = {
						'firstname' : firstname,
						'lastname' : lastname,
						'email' : email,
						'subject' : subject,
						'message' : message
					};

				if ( _id ) {
					data['_id'] = _id;
				}

				$.ajax( {
					url: LouisCasale.options.apiUrl  + '/contact/',
					type: 'post',
					headers: {
						'X-WP-Nonce': LouisCasale.options.nonce
					},
					data: JSON.stringify( data ),
					dataType: 'json',
					statusCode: {
						500: function() {
							$( '#message' )
								.addClass( 'alert-danger' )
								.text( 'There was an issue with your form submission.' )
								.show();
						}
					}
				} ).then(function( response ) {
					if ( response ) {
						$( '.message' )
							.addClass( 'alert-success' )
							.text( 'Email successfully sent.' )
							.show();
					}
				} );
			});
		},

		/**
		 * Disables right click of images.
		 *
		 * @since 0.1.0
		 * @uses on()
		 * @return void
		 */
		disableRightClick: function () {
			$( document ).on( 'contextmenu', 'figure div, #swipebox-slider img', function( e ) {
				return false;
			});
		},

		/**
		 * Custom swipebox functionality.
		 *
		 * @since 0.1.0
		 * @uses on(), show()
		 * @return void
		 */
		customSwipeboxFunctionality: function () {
			$( 'body' ).on( 'click', 'a[data-rel=lightbox]', function() {
				var id = $( this ).data( 'id' );

				$( '.custom-arrow' ).show();
			});
		},

		/**
		 * Click listener for galleries and contact buttons in nav menu.
		 *
		 * @since 0.1.0
		 * @uses on(), hasClass(), removeClass(), addClass()
		 * @return void
		 */
		pushdownMenu: function() {
			$( 'body' ).on( 'click', '#galleries', function() {
				if ( $( '.galleries' ).hasClass( 'display' ) ) {
					$( '.galleries' ).removeClass( 'display' );
				} else {
					$( '.galleries' ).addClass( 'display' );
				}
			});

			$( 'body' ).on( 'click', '#contact', function() {
				if ( $( '.contact' ).hasClass( 'display' ) ) {
					$( '.contact' ).removeClass( 'display' );
				} else {
					$( '.contact' ).addClass( 'display' );
				}
			});
		},

		/**
		 * LouisCasale class initializer.
		 *
		 * @since 0.1.0
		 * @uses setCarouselSettings(), fadeInEffect(), sendContactInformation(),
		 *       disableRightClick(), customSwipeboxFunctionality()
		 * @return void
		 */
		init: function() {
			this.setCarouselSettings();
			this.fadeInEffect();
			this.sendContactInformation();
			this.disableRightClick();
			this.customSwipeboxFunctionality();
			this.pushdownMenu();
		}

	};

	jQuery( document ).ready( function() {

		// Initialize the louiscasale class.
		louiscasale.init();

	} );

} )( jQuery );
