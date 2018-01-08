function UpdateCandidate(container) {
	this.container = container;
	this.id = '';
	this.init();
}

UpdateCandidate.ModelTemp = `
	<div class="modal fade js-updatepos-modal" role="dialog" aria-labelledby="UpdateCandidateLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="UpdateCandidateLabel">修改候选人</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-name">姓名</label>
			  <input type="text" class="form-control js-name" id="updatepos-name" placeholder="请输入姓名">
			</div>
			<div class="form-group">
			  <label for="addpos-candidate">面试职位</label>
			  <input type="text" class="form-control js-candidate" id="updatepos-candidate" placeholder="请输入面试职位">
			</div>
			<div class="form-group">
			  <label for="addpos-salary">期望薪资</label>
				 <select class="form-control js-salary" id="updatepos-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-35k</option>
				  <option>35k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="addpos-address">所在城市</label>
			  <input type="text" class="form-control js-address" id="updatepos-address" placeholder="请输入所在城市">
			</div>
			<div class="form-group">
			  <label for="addpos-logo">个人照片</label>
			  <input type="file" class="form-control js-logo" id="updatepos-logo">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			修改成功
	      </div>
	    </div>
	  </div>
	</div>
`

$.extend(UpdateCandidate.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.element = $(UpdateCandidate.ModelTemp);
		this.nameElem = this.element.find(".js-name");
		this.candidateElem = this.element.find(".js-candidate");
		this.salaryElem = this.element.find(".js-salary");
		this.addressElem = this.element.find(".js-address");
		this.logoElem = this.element.find(".js-logo");
		this.succNoticeElem = this.element.find(".js-succ-notice");
		this.container.append(this.element);
	},
	showItem: function(id) {
		this.element.modal("show");
		this.getCandidateInfo(id);
	},
	getCandidateInfo: function(id) {
		$.ajax({
			url: "/api/getCandidate",
			data: {
				id: id
			},
			success: $.proxy(this.handleGetCandidateInfoSucc, this)
		})
	},
	handleGetCandidateInfoSucc: function(res) {
		if (res && res.data && res.data.info) {
			var info = res.data.info;
			this.nameElem.val(info.name);
			this.candidateElem.val(info.candidate);
			this.salaryElem.val(info.salary);
			this.addressElem.val(info.address);
			this.id = info._id;
		}
	},
	bindEvents: function() {
		var submitBtn = this.element.find(".js-submit");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		var name = this.nameElem.val(),
			candidate = this.candidateElem.val(),
			salary = this.salaryElem.val(),
			address = this.addressElem.val(),
			logo = this.logoElem[0].files[0];

		var formData = new FormData();
		formData.append("name", name);
		formData.append("candidate", candidate);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("id", this.id);
		formData.append("logo", logo);

		$.ajax({
			type: "POST",
			url: "/api/updateCandidate",
			cache: false,
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleUpdateCandidateSucc, this)
		})
	},
	handleUpdateCandidateSucc: function(res) {
		console.log(res);
		if (res && res.data && res.data.update) {
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay, this), 2000);
			$(this).trigger("change");
		}
	},
	handleDelay: function() {
		this.succNoticeElem.addClass("hide");
		this.element.modal("hide");
	}

})