dbWriter = require("./db_writer.js");
class kpiAdder {
  addNewKPI(entry) {
    dbWriter.writeNewRKPI(entry);
  }
}

module.exports = kpiAdder;
