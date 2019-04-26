dbWriter = require("./db_writer.js");
class kpiAdder {
  addNewKPI(entry) {
    dbWriter.writeNewRKPI(entry);
  }

  updateRKPI(entry) {
    dbWriter.updateRKPI(entry)
  }

  updateCKPI(entry) { 
    dbWriter.updateCKPI(entry)
  }
}

module.exports = kpiAdder;
