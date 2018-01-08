function Page() {}

$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createAddCandidate();
		this.createCandidateList();
		this.createCandidate();
	},
	createHeader: function() {
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer, 2);
	},
	createAddCandidate: function() {
		var candidateContainer = $(".js-container");
		this.addCandidate = new AddCandidate(candidateContainer);
		$(this.addCandidate).on("change", $.proxy(this.handleAddCandidate, this))
	},
	createCandidateList: function() {
		var candidateContainer = $(".js-container");
		this.candidateList = new CandidateList(candidateContainer);
		$(this.candidateList).on("change", $.proxy(this.handleListChange, this))
	},
	createCandidate: function() {
		var candidateContainer = $(".js-candidate");
		this.candidate = new Candidate(candidateContainer);
		$(this.candidate).on("change", $.proxy(this.handleCandidateChange, this))
	},
	handleListChange: function(e) {
		this.candidate.setTotal(e.total)
	},
	handleCandidateChange: function(e) {
		this.candidateList.changePage(e.page);
	},
	handleAddCandidate: function() {
		this.candidateList.getListInfo();
	}
})
