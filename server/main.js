import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';
import blocked from 'blocked-at';

const NUMBER_OF_DOCUMENTS = 2000;
const Test = new Meteor.Collection('test');

// report when something is blocking the event loop for more than 100 ms
blocked(
  (time, stack) => {
    console.log(
      `[BLOCKED] Blocked for ${time}ms, operation started here:\n${stack}`
    );
  },
  {threshold: 100}
);

setInterval(() => {
  console.log((new Date()).getTime());
}, 100);

Meteor.publish('test', function() {
  return Test.find();
});

// Add some dummy data
if (Test.find().count() < NUMBER_OF_DOCUMENTS) {
  _.times(NUMBER_OF_DOCUMENTS, () => Test.insert({foo: Random.id()}));
}
