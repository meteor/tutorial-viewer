if (Meteor.isClient) {
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
      return _.range(0, BLAZE_TUT.length);
    },
    stepNumber: function () {
      return this.valueOf() + 1;
    },
    stepActiveClass: function () {
      return this.valueOf() == FlowRouter.getParam("step") && "active";
    },
    tabs: function () {
      return [
        { name: "Blaze", slug: "blaze" },
        { name: "Angular", slug: "angular" },
        { name: "React", slug: "react" }
      ]
    },
    getContentBlaze: function () {
      return BLAZE_TUT[parseInt(FlowRouter.getParam("step"), 10)].contentTemplate;
    },
    getContentReact: function () {
      return REACT_TUT[parseInt(FlowRouter.getParam("step"), 10)].contentTemplate;
    },
    getContentAngular: function () {
      return ANGULAR_TUT[parseInt(FlowRouter.getParam("step"), 10)].contentTemplate;
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

if (Meteor.isServer) {

}
