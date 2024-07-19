class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];
      for (let i = 0; i < message.commands.length; i++) {
         results[i] = { completed: true};
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            results[i].roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
         } else
         if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
         } else
         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               results[i].completed = false;
            } else {
               this.position = message.commands[i].value;
            }
         }
      }
      return {message: message.name, results: results};
   }
}

module.exports = Rover;