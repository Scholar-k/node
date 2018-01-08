function AddPosition(container) {
	this.container = container;
	this.init();
}

AddPosition.BtnTemp = `
	<button type="button" class="btn btn-info" data-toggle='modal' data-target='.js-addpos-modal'>增加</button>
`;

AddPosition.ModelTemp = `
	<div class="modal fade js-addpos-modal" role="dialog" aria-labelledby="AddPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddPositionLabel">新增职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="addpos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
			  <label for="addpos-salary">薪资范围</label>
			  <select class="form-control js-salary" id="addpos-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-35k</option>
				  <option>35k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="addpos-address">办公地点</label>
			  <input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入办公地点">
			</div>
			<div class="form-group">
			  <label for="addpos-logo">公司logo</label>
			  <input type="file" class="form-control js-logo" id="addpos-logo">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			添加成功
	      </div>
	      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
			对不起，您所注册的用户名已存在
	      </div>
	    </div>
	  </div>
	</div>
`

$.extend(AddPosition.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.btn = $(AddPosition.BtnTemp);
		this.modal = $(AddPosition.ModelTemp)
		this.succNoticeElem = this.modal.find(".js-succ-notice");
		this.container.append(this.btn);
		this.container.append(this.modal);
	},
	bindEvents: function() {
		var submitBtn = this.modal.find(".js-submit");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		var company = this.modal.find(".js-company").val(),
			position = this.modal.find(".js-position").val(),
			salary = this.modal.find(".js-salary").val(),
			address = this.modal.find(".js-address").val(),
			logo = this.modal.find(".js-logo")[0].files[0];

		// 创建一个表单数据的对象
		var formData = new FormData();
		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo);

		$.ajax({
			cache: false,
			type: "POST",
			url: "/api/addPosition",
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleAddPositionSucc, this)
		})
	},
	handleAddPositionSucc: function(res) {
		if (res && res.data && res.data.inserted) {
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay, this), 2000);
			$(this).trigger("change");
		}
	},
	handleDelay: function() {
		this.succNoticeElem.addClass("hide");
		this.modal.modal("hide");
	}

})