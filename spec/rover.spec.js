const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //test 7
  it('constructor sets positiona and default values for mode and generatorWatts', function() {
    let newRover = new Rover(1234);
    expect(newRover.position).toBe(1234);
    expect(newRover.mode).toBe('NORMAL');
    expect(newRover.generatorWatts).toBe(110);
  });

  //test 8
  it('response returned by receiveMessage contains the name of the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe('Test message with two commands');
  });

  //test 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);
  });

  //test 10
  it('responds correctly to the status check command', function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one status check', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);

  });

  //test 11
  it('responds correctly to the mode change command', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with one mode change', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);

    commands = [new Command('STATUS_CHECK')];
    message = new Message('Test message with status check', commands);
    response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe('LOW_POWER');

  });

  //test 12
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with mode change to low power', commands);
    let rover = new Rover(98382);
    rover.receiveMessage(message);
    
    commands = [new Command('MOVE', 1234)];
    message = new Message('Test message with move during low power', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);

  });

  //test 13
  it('responds with the position for the move command', function() {
    let commands = [new Command('MOVE', 1234)];
    let message = new Message('Test message with move command', commands);
    let rover = new Rover(98382);
    rover.receiveMessage(message);

    commands = [new Command('STATUS_CHECK')];
    message = new Message('Test message with status check', commands);
    response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.position).toBe(1234);

  });

});
