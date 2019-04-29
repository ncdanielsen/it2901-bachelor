dbWriter = require("./db_writer.js");
class kpiUpdater {
  addNewRKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.writeNewRKPI(entry);
      resolve()
    })
  }

  addNewCKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.writeNewCKPI(entry);
      resolve()
    })
  }

  updateRKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.updateRKPI(entry)
      resolve()
    })
  }

  updateCKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.updateCKPI(entry)
      resolve()
    })
  }
}

module.exports = kpiUpdater;
