if (Meteor.isClient) {
  var blazeTut = TutorialRegistry.tutorials.blaze;
  var angularTut = TutorialRegistry.tutorials.angular;
  var reactTut = TutorialRegistry.tutorials.react;

  FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
      redirect('/tutorial/0/blaze');
    }]
  });

  FlowRouter.route('/tutorial/:step/:slug', {
    name: "tutorial"
  });

  ReactiveTabs.createInterface({
    template: 'dynamicTabs',
    onChange: function (slug) {
      FlowRouter.go("tutorial", {
        slug: slug,
        step: FlowRouter.getParam("step")
      });
    }
  });

  Template.body.helpers({
    stepIndices: function () {
      return _.range(0, blazeTut.steps.length);
    },
    stepNumber: function () {
      return this.valueOf() + 1;
    },
    stepActiveClass: function () {
      return this.valueOf() == FlowRouter.getParam("step") && "active";
    },
    tabs: function () {
      return [
        { name: blazeTut.title, slug: "blaze" },
        { name: angularTut.title, slug: "angular" },
        { name: reactTut.title, slug: "react" }
      ]
    },
    getContentBlaze: function () {
      return blazeTut.steps[parseInt(FlowRouter.getParam("step"), 10)].template;
    },
    getContentReact: function () {
      return reactTut.steps[parseInt(FlowRouter.getParam("step"), 10)].template;
    },
    getContentAngular: function () {
      return angularTut.steps[parseInt(FlowRouter.getParam("step"), 10)].template;
    },
    activeTab: function () {
      return FlowRouter.getParam("slug");
    }
  });

  Template.body.events({
    "click .go-to-step": function () {
      FlowRouter.go("tutorial", {
        step: this.valueOf().toString(),
        slug: FlowRouter.getParam("slug")
      });
    }
  })

  

  var selectText = function (element) {
    var range, selection;

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  Template.codeBox.events({
    "click .select-all": function (event, template) {
      selectText(template.find(".code-box-content code"));
    }
  });
}
