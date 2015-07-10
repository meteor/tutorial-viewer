if (Meteor.isClient) {
  FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
      redirect('/tutorial/blaze');
    }]
  });

  FlowRouter.route('/tutorial/:slug', {
    name: "tutorial"
  });

  ReactiveTabs.createInterface({
    template: 'dynamicTabs',
    onChange: function (slug) {
      FlowRouter.go("tutorial", {slug: slug});
    }
  });

  Template.body.helpers({
    stepIndices: function () {
      return _.range(BLAZE_TUT.length);
    },
    tabs: function () {
      return [
        { name: "Blaze", slug: "blaze" },
        { name: "Angular", slug: "angular" },
        { name: "React", slug: "react" }
      ]
    },
    getContentBlaze: function () {
      return BLAZE_TUT[Template.parentData(1).valueOf()].contentTemplate;
    },
    getContentReact: function () {
      return REACT_TUT[Template.parentData(1).valueOf()].contentTemplate;
    },
    getContentAngular: function () {
      return ANGULAR_TUT[Template.parentData(1).valueOf()].contentTemplate;
    },
    activeTab: function () {
      return FlowRouter.getParam("slug");
    }
  });
}

if (Meteor.isServer) {

}
