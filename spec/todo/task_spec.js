describe("Todo.task", function() {
  describe("initialization", function() {
    it("sets attributes", function() {
      var task = new Todo.Task({title: "Some task", status: "complete"});

      expect(task.title).toEqual("Some task");
      expect(task.status).toEqual("complete");
    });

  });
});
