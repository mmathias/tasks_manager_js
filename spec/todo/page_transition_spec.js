describe("Todo.PageTransition", function(){
  var loading, page, transition;

  beforeEach(function() {
    $.fx.off = true;

    loading = $("<div/>");
    page = $("<div class='hidden'/>");
    transition = new Todo.PageTransition(loading, page);
  });

  afterEach(function() {
    $.fx.off = false;
  });

  it("hides loading element", function(){
    transition.run();
    expect(loading.is(".hidden")).toBeTruthy();
  });

  it("shows page element", function(){
    transition.run();
    expect(page.is(".hidden")).toBeFalsy();
  });
});
