dbWriter = require("./db_writer.js");
class kpiUpdater {
  addNewRKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.writeNewRKPI(entry);
      setTimeout(() => {
        resolve()
      }, 1500)
    })
  }

  addNewCKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.writeNewCKPI(entry);
      setTimeout(() => {
        resolve()
      }, 1500)
    })
  }

  updateRKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.updateRKPI(entry)
      setTimeout(() => {
        resolve()
      }, 1500)
    })
  }

  updateCKPI(entry) {
    return new Promise((resolve, reject) => {
      dbWriter.updateCKPI(entry)
      setTimeout(() => {
        resolve()
      }, 1500)
    })
  }
}

module.exports = kpiUpdater;
