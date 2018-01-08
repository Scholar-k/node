function Header(headerContainer, index) {
	this.headerContainer = headerContainer;
	this.selectedIndex = index;
	this.init();

}

Header.template = `
	<nav class="navbar navbar-default">
		<div class="container-fluid">
		    <div class="navbar-header">
		    	<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        	<span class="icon-bar"></span>
		        	<span class="icon-bar"></span>
		        	<span class="icon-bar"></span>
		      	</button>
		      <a class="navbar-brand" href="#">拉勾网后台</a>
		    </div>
		    
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      		<ul class="nav navbar-nav js-left">
	        		<li>
	        			<a href="/">首页</a>
	        		</li>
	        		<li>
	        			<a href="/list.html">职位管理</a>
	        		</li>
	        		<li>
	        			<a href="/entry.html">候选人管理</a>
	        		</li>
	      		</ul>
	      		<ul class="nav navbar-nav navbar-right js-right">
	      		</ul>
	    	</div>
  		</div>
	</nav>
`;

$.extend(Header.prototype, {
	init: function() {
		this.createDom();
		this.setSelected();
		this.getLoginInfo();
	},
	createDom: function() {
		this.element = $(Header.template);
		this.rightArea = this.element.find(".js-right");
		this.headerContainer.append(this.element);
	},
	setSelected: function() {
		var leftArea = this.element.find(".js-left"),
			leftItems = leftArea.find("li");
		leftItems.eq(this.selectedIndex).addClass("active").siblings().removeClass("active");
	},
	getLoginInfo: function() {
		$.ajax({
			url: "/api/isLogin",
			success: $.proxy(this.handleGetLoginSucc, this)
		})
	},
	handleGetLoginSucc: function(res) {
		if (res && res.data && res.data.isLogin) {
			this.createLogout();
		}else {
			this.createLogin();
			this.createRegister();
		}
	},
	createLogin: function() {
		this.login = new Login(this.rightArea, this.element);
	},
	createRegister: function() {
		this.register = new Register(this.rightArea, this.element);
	},
	createLogout: function() {
		this.logout = new Logout(this.rightArea);
	}
})