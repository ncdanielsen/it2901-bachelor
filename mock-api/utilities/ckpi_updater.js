dbWriter = require("./db_writer.js");
class kpiAdder {
  addNewKPI(entry) {
    dbWriter.writeNewCKPI(entry);
  }
}

module.exports = kpiAdder;
