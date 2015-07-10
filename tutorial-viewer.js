if (Meteor.isClient) {
  ReactiveTabs.createInterface({
    template: 'basicTabs'
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
    }
  });
}

if (Meteor.isServer) {

}
