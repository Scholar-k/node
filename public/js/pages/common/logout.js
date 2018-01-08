function Logout(container) {
	this.container = container;
	this.init();
}

Logout.Temp = `
	<li>
		<a href='javascript:;'>注销</a>
	</li>`;

$.extend(Logout.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.element = $(Logout.Temp);
		this.container.append(this.element);
	},
	bindEvents: function() {
		this.element.on("click", $.proxy(this.handleClick, this))
	},
	handleClick: function() {
		$.ajax({
			url: "/api/logout",
			success: $.proxy(this.handleLogoutSucc, this)
		})
	},
	handleLogoutSucc: function(res) {
		if (res && res.data && res.data.logout) {
			window.location.reload();
		}
	}
})