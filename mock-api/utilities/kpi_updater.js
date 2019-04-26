dbWriter = require("./db_writer.js");
class kpiUpdater {
  addNewRKPI(entry) {
    dbWriter.writeNewRKPI(entry);
  }

  addNewCKPI(entry) {
    dbWriter.writeNewCKPI(entry);
  }

  updateRKPI(entry) {
    dbWriter.updateRKPI(entry)
  }

  updateCKPI(entry) { 
    dbWriter.updateCKPI(entry)
  }
}

module.exports = kpiUpdater;
