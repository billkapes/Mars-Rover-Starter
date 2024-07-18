class Message {
   constructor(name, commands) {
      if (name === undefined || typeof name !== "string") {
         throw Error("Name not passed.");
      }
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;