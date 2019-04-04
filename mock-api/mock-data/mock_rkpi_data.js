module.exports = [
  {
    name: "Some name",
    created: new Date(),
    lastUpdated: new Date(),
    owner: "Private",
    description: "A set of KPIs for buildings built before 1980 and in a temperated location.",
    values: [
      {name: "Energy need", value: 1500},
      {name: "Energy use", value: 3000},
      {name: "Energy generation", value: 4000},
      {name: "Delivered energy", value: 2000},
      {name: "Exported energy", value: 1000},
      {name: "Self consumption", value: 70},
      {name: "Self generation", value: 50},
    ]
  },
  {
    name: "Another name",
    created: new Date(),
    lastUpdated: new Date(),
    owner: "Shared",
    description: "Another nice and useful set of KPIs.",
    values: [
      {name: "Energy need", value: 1200},
      {name: "Energy use", value: 8000},
      {name: "Energy generation", value: 1000},
      {name: "Delivered energy", value: 9000},
      {name: "Exported energy", value: 3000},
      {name: "Self consumption", value: 10},
      {name: "Self generation", value: 90},
    ]
  }
]
