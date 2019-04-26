dbWriter = require("./db_writer.js");
class kpiAdder {
  addNewKPI(entry) {
    dbWriter.writeNewKPI(entry);
  }

  updateRKPI(entry) {
    dbWriter.updateRKPI(entry)
  }

  updateCKPI(entry) { 
    dbWriter.updateCKPI(entry)
  }
}

module.exports = kpiAdder;
