function Login(container, modelContainer) {
	this.container = container;
	this.modelContainer = modelContainer;
	this.init();
}

Login.btnTemp = `
	<li>
		<a href='javascript:;' data-toggle='modal' data-target='.js-login-modal'>
			登陆
		</a>
	</li>`;

Login.ModelTemp = `
	<div class="modal fade js-login-modal" role="dialog" aria-labelledby="LoginLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="LoginLabel">登陆</h4>
	      </div>
	      <div class="modal-body">
	        <form>
					  <div class="form-group">
					    <label for="username">用户名</label>
					    <input type="email" class="form-control js-user" id="username" placeholder="请输入用户名">
					  </div>
					  <div class="form-group">
					    <label for="password">密码</label>
					    <input type="password" class="form-control js-pass" id="password" placeholder="请输入密码">
					  </div>
					</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	    </div>
	  </div>
	</div>
`

$.extend(Login.prototype, {
	init: function() {
		this.createBtn();
		this.createModel();
		this.bindEvents();
	},
	createBtn: function() {
		this.btn = $(Login.btnTemp);
		this.container.append(this.btn);
	},
	createModel: function() {
		this.model = $(Login.ModelTemp);
		this.modelContainer.append(this.model);
	},
	bindEvents: function() {
		var sumitBtn = this.model.find(".js-submit");
		sumitBtn.on("click", $.proxy(this.handleSumitBtnClick, this));
	},
	handleSumitBtnClick: function() {
		var username = this.model.find(".js-user").val(),
			password = this.model.find(".js-pass").val();
		
		$.ajax({
			url: "/api/login",
			type: "POST",
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleLoginSucc, this)
		})
	},
	handleLoginSucc: function(res) {
		if (res && res.ret && res.data && res.data.login) {
			window.location.reload();
		}
	}
})