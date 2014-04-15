describe("Todo.TaskListView#addTask", function() {
  var task, list, repo;

  beforeEach(function() {
    html = $("<div/>");
    repo = $({}); // has the event emitter feature set

    task = new Todo.Task({
        id:1234
      , title: "Some task"
      , status: "pending"
    });

    list = new Todo.TaskListView(repo, html);
    list.init();
  });

  it("renders task", function() {
    repo.trigger("task.push", task);
    expect(html.find(".task").length).toEqual(1);
  });

  it("renders id", function() {
    repo.trigger("task.push", task);
    expect(html.find(".task").data("id")).toEqual(task.id);
  });

  it("renders title", function() {
    repo.trigger("task.push", task);
    expect(html.find(".task .task-title").text()).toEqual(task.title);
  });

  describe("pending task", function() {
    beforeEach(function() {
      repo.trigger("task.push", task);
    });

    it("renders status", function() {
      expect(html.find(".task").is(".pending")).toBeTruthy();
    });

    it("skips checkbox", function() {
      expect(html.find(".task :checkbox").is(":checked")).toBeFalsy();
    });
  });

  describe("done task", function() {
    beforeEach(function() {
      task.status = "done";
      repo.trigger("task.push", task);
    });

    it("renders status", function() {
      expect(html.find(".task").is(".done")).toBeTruthy();
    });

    it("marks checkbox", function() {
      expect(html.find(".task :checkbox").is(":checked")).toBeTruthy();
    });
  });
});
