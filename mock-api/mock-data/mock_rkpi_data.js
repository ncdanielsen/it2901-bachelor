module.exports = [
  {
    name: "Some name",
    created: math.ceil(new Date().getTime()/1000),
    lastUpdated: math.ceil(new Date().getTime()/1000),
    owner: "Private",
    description: "A set of KPIs for buildings built before 1980 and in a temperated location.",
    values: [
      {name: "Energy need", value: 1500, weight: 1},
      {name: "Energy use", value: 3000, weight: 1},
      {name: "Energy generation", value: 4000, weight: 1},
      {name: "Delivered energy", value: 2000, weight: 1},
      {name: "Exported energy", value: 1000, weight: 1},
      {name: "Self consumption", value: 70, weight: 1},
      {name: "Self generation", value: 50, weight: 1},
    ]
  },
  {
    name: "Another name",
    created: math.ceil(new Date().getTime()/1000),
    lastUpdated: math.ceil(new Date().getTime()/1000),
    owner: "Shared",
    description: "Another nice and useful set of KPIs.",
    values: [
      {name: "Energy need", value: 1200, weight: 1},
      {name: "Energy use", value: 8000, weight: 1},
      {name: "Energy generation", value: 1000, weight: 1},
      {name: "Delivered energy", value: 9000, weight: 1},
      {name: "Exported energy", value: 3000, weight: 1},
      {name: "Self consumption", value: 10, weight: 1},
      {name: "Self generation", value: 90, weight: 1},
    ]
  }
]
