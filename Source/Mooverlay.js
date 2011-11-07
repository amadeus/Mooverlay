(function(){

var preventDefault = function(e){ e.preventDefault(); };

var Mooverlay = window.Mooverlay = new Class({

	Implements: [Options, Events],

	options: {
		width: 400,
		backgroundColor: '#fff',
		scroll: false,
		styles: {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#000',
			opacity: 0.5,
			zIndex: 9998
		}
	},

	shown: false,

	initialize: function(trigger, content, options){
		this.trigger = document.id(trigger);
		if (!this.trigger) return;

		this.setOptions(options);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		var o = this.options;

		this.overlay = new Element('div', {
			'class': 'mooverlay-shade',
			styles: o.styles,
			events: {
				click: this.hide,
				mousewheel: preventDefault
			}
		});

		this.container = new Element('div', {
			'class': 'mooverlay-content',
			styles: {
				position: 'fixed',
				top: '50%',
				left: '50%',
				marginLeft: -(o.width / 2),
				width: o.width,
				height: o.height,
				zIndex: 9999,
				backgroundColor: o.backgroundColor
			},
			events: {
				click: function(e){ e.stopPropagation(); }
			}
		});

		this.content = this.addContent(content);

		this.attach();
	},

	verticallyCenter: function(){
		this.container.setStyle('margin-top', -(this.container.getSize().y / 2));
	},

	addContent: function(){
		var args = Array.from(arguments);
		if (this.content) args.push(this.content);
		this.content = new Elements(args).inject(this.container);
	},

	attach: function(){
		this.trigger.addEvent('click', this.show);
	},

	detach: function(){
		this.trigger.removeEvent('click', this.show);
	},

	show: function(){
		if (this.shown) return;
		this.shown = true;
		this.overlay.inject(document.body);
		this.container.inject(document.body);
		this.verticallyCenter();
		this.fireEvent('show', [this.trigger, this.content, this.overlay]);
	},

	hide: function(){
		if (!this.shown) return;
		this.shown = false;
		this.overlay.dispose();
		this.container.dispose();
		this.fireEvent('hide', [this.trigger, this.content, this.overlay]);
	}
});

}).call(this);
