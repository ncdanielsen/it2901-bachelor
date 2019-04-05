dbWriter = require("./db_writer.js");
class kpiAdder {
  addNewKPI(entry) {
    dbWriter.writeNewKPI(entry);
  }
}

module.exports = kpiAdder;
