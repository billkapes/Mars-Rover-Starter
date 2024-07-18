class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];
      for (let i = 0; i < message.commands.length; i++) {
         results[i] = { response: "default response"};
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            results[i].roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
         }
      }
      return {message: message.name, results: results};
   }
}

module.exports = Rover;