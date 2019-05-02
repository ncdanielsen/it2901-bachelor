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

  deleteCKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.deleteCKPI(entry)
      resolve()
    })
  }

  deleteRKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.deleteRKPI(entry)
      resolve()
    })
  }
}

module.exports = kpiUpdater;
