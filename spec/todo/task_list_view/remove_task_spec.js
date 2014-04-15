describe("Todo.TaskListView#removeTask", function() {
  var task, list, repo, deferred;

  beforeEach(function() {
    html = $("<div>");
    repo = new Todo.TasksRepository();

    task = new Todo.Task({
        id:1234
      , title: "Some task"
      , status: "pending"
    });

    deferred = $.Deferred();
    spyOn(task, "remove").and.returnValue(deferred);

    list = new Todo.TaskListView(repo, html);
    list.init();

    repo.push(task);
  });

  it("removes task", function() {
    // Since we're asking for confirmation,
    // we need to stub the confirm method.
    spyOn(window, "confirm").and.returnValue(true);

    // First find the remove button and trigger the
    // click event.
    html.find(".remove").trigger("click");

    // Since we're stubbing the task.remove method,
    // we must resolve the deferred object.
    deferred.resolve(task);

    expect(html.find(".task").length).toEqual(0);
  });

  it("cancels removal", function() {
    // Since we're asking for confirmation,
    // we need to stub the confirm method.
    spyOn(window, "confirm").and.returnValue(false);

    // First find the remove button and trigger the
    // click event.
    html.find(".remove").trigger("click");

    expect(html.find(".task").length).toEqual(1);
  });
});
