if (Meteor.isClient) {
  ReactiveTabs.createInterface({
    template: 'basicTabs'
  });

  Template.body.helpers({
    tutorials: function () {
      return {
        BLAZE_TUT: BLAZE_TUT,
        ANGULAR_TUT: ANGULAR_TUT,
        REACT_TUT: REACT_TUT
      };
    },
    tabs: function () {
      return [
        { name: "Blaze", slug: "blaze" },
        { name: "Angular", slug: "angular" },
        { name: "React", slug: "react" }
      ]
    }
  });
}

if (Meteor.isServer) {

}
