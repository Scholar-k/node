function Page() {}

$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createAddPosition();
		this.createPositinList();
		this.createPagination();
	},
	createHeader: function() {
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer, 1);
	},
	createAddPosition: function() {
		var positionContainer = $(".js-container");
		this.addPosition = new AddPosition(positionContainer);
		$(this.addPosition).on("change", $.proxy(this.handleAddPosition, this))
	},
	createPositinList: function() {
		var positionContainer = $(".js-container");
		this.positionList = new PositionList(positionContainer);
		$(this.positionList).on("change", $.proxy(this.handleListChange, this))
	},
	createPagination: function() {
		var paginationContainer = $(".js-pagination");
		this.pagination = new Pagination(paginationContainer);
		$(this.pagination).on("change", $.proxy(this.handlePaginationChange, this))
	},
	handleListChange: function(e) {
		this.pagination.setTotal(e.total)
	},
	handlePaginationChange: function(e) {
		this.positionList.changePage(e.page);
	},
	handleAddPosition: function() {
		this.positionList.getListInfo();
	}
})
