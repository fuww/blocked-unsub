import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.subscribe = new ReactiveVar(true);
  this.ready = new ReactiveVar(false);

  this.autorun(() => {
    if (this.subscribe.get()) {
      this.ready.set(Meteor.subscribe('test').ready());
    } else {
      this.ready.set(false);
    }
  });
});

Template.hello.helpers({
  action() {
    return Template.instance().subscribe.get() ? 'Unsubscribe' : 'Subscribe';
  },
  ready() {
    return Template.instance().ready.get() ? 'true' : 'false';
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // toggle publication
    instance.subscribe.set(!instance.subscribe.get());
  },
});
