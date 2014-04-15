Todo.StatsPanel = (function(){
  function StatsPanel(repo, container){
    this.repo = repo;
    this.container = container;
  }

  StatsPanel.fn = StatsPanel.prototype;

  StatsPanel.fn.init = function() {
    this.repo
      .on("task.update", $.proxy(this, "update"))
      .on("task.push", $.proxy(this, "update"))
      .on("task.remove ", $.proxy(this, "update"))
    ;
  };

  StatsPanel.fn.update = function() {
    var html = Todo.templates.stats(this.repo.stats());

    this.container.html(html);
  };

  return StatsPanel;
})();
