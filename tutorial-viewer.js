if (Meteor.isClient) {
  Template.body.helpers({
    reactTutorial: function () {
      return REACT_TUT;
    }
  });
}

if (Meteor.isServer) {

}
