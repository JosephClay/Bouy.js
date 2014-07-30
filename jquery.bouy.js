// http://mattdsmith.com/float-label-pattern/
(function($) {

	var Bouy = function(elem, options) {
		this.opts = $.extend({}, this.defaults, options || {});

		var input = this.input = $(elem),
			parent = this.parent = input.parent(),
			isRequired = !!this.input.prop('required'),
			placeholder = this.placeholder = this.input.attr('data-bouy-placeholder') || this.input.attr('placeholder'),
			label = this.label = this._buildLabel();

		parent.addClass(this.opts.wrapperClass);
		if (isRequired) { parent.addClass(this.opts.requiredClass); }
		parent.append(label);

		this._bind();
		this.check();
	};

	Bouy.prototype = {
		defaults: {
			bouyClass: 'Bouy',
			wrapperClass: 'Bouy-Wrapper',

			activeClass: 'Bouy-Active',
			requiredClass: 'Bouy-Required',

			labelHtml: '<span class="{bouyClass}">{placeholder}</span>'
		},

		_buildLabel: function() {
			return $(
				this.opts.labelHtml.replace('{bouyClass}', this.opts.bouyClass)
									.replace('{placeholder}', this.placeholder)
			);
		},

		_bind: function() {
			var self = this;
			this.input.on('keyup.Bouy blur.Bouy change.Bouy', function() {
				self.check();
			});
		},
		_unbind: function() {
			this.input.off('keyup.Bouy blur.Bouy change.Bouy');
		},

		check: function() {
			if (this.input.val() !== '') {
				this.parent.addClass(this.opts.activeClass);
				return;
			}
			
			this.parent.removeClass(this.opts.activeClass);
		},

		destroy: function() {
			this._unbind();

			this.parent.removeClass(this.opts.wrapperClass)
						.removeClass(this.opts.activeClass)
						.removeClass(this.opts.requiredClass);

			this.input.removeClass(this.opts.inputClass);

			this.parent = this.input = null;
		}
	};

	$.fn['bouy'] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'bouy') ) {
				$.data(this, 'bouy', new Bouy(this, options));
			}
		});
	};

}(jQuery));