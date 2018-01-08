function Pagination(container) {
	this.container = container;
	this.bindEvents();
}

$.extend(Pagination.prototype, {
	bindEvents: function() {
		this.container.on("click", $.proxy(this.handleClick, this));
	},
	handleClick: function(e) {
		var target = $(e.target),
			page = parseInt(target.text(), 8);
		$(this).trigger(new $.Event("change", {
			page: page
		}))
	},
	setTotal: function(total) {
		this.createDom(total);
	},
	createDom: function(total) {
		var str = "";
		for (var i = 1; i <= total; i++) {
			str += `<li><a href="javascript:;">${i}</a></li>`
		}
		this.container.html(str);
	}
})