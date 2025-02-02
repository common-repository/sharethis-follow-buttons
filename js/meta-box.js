/**
 * Minute Control.
 *
 * @package ShareThisFollowButtons
 */

/* exported MinuteControl */
var MinuteControl = ( function( $, wp ) {
	'use strict';

	return {
		/**
		 * Holds data.
		 */
		data: {},

		/**
		 * Boot plugin.
		 *
		 * @param data
		 */
		boot: function( data ) {
			this.data = data;

			$( document ).ready(
				function() {
					this.init();
				}.bind( this )
			);
		},

		/**
		 * Initialize plugin.
		 */
		init: function() {
			this.$container = $( '#sharethis-follow-meta-box' );

			this.listen();
		},

		/**
		 * Initiate listeners.
		 */
		listen: function() {
			var self = this;

			// When checking an option in the meta box.
			this.$container.on(
				'click',
				'#sharethis-follow-bottom-post, #sharethis-follow-top-post',
				function() {
					var checked = $( this ).prop( 'checked' ),
					type        = $( this ).closest( '.button-setting-wrap' ).attr( 'id' ),
					placement   = $( this ).attr( 'class' );

					self.updateList( type, checked, placement );
				}
			);
		},

		/**
		 * Add / remove post to list.
		 *
		 * @param type
		 * @param checked
		 * @param placement
		 */
		updateList: function( type, checked, placement ) {

			// Update specifide list per checked.
			wp.ajax.post(
				'follow_update_list',
				{
					postid: this.data.postid,
					type: type,
					checked: checked,
					placement: placement,
					nonce: this.data.nonce
				}
			).always(
				function() {
				}
			);
		}
	};
} )( window.jQuery, window.wp );
