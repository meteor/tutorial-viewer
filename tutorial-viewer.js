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
}

if (Meteor.isServer) {

}
