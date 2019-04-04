
/*const data = [
  {
    kpiName: "Energy need",
    data: [
      [0, 2400],
      [20, 1398],
      [50, 9800],
      [100, 3908],
      [1000, 4800],
      [1110, 3800],
      [1120, 4300]
    ]
  },
  {
    kpiName: "Energy use",
    data: [
      [0, 2400],
      [20, 1398],
      [50, 9800],
      [100, 3908],
      [1000, 4800],
      [1110, 3800],
      [1120, 4300]
    ]
  }
]
*/

const data = () => ([
  {time: 0, value: Math.random()*2400},
  {time: 20, value: Math.random()*1398},
  {time: 50, value: Math.random()*9800},
  {time: 100, value: Math.random()*3908},
  {time: 1000, value: Math.random()*4800},
  {time: 1110, value: Math.random()*3800},
  {time: 1120, value: Math.random()*4300}
])


export const mock_ckpi_data = [
  {
    name: "My name for the data set",
    building: {
      name: "Awesome building 1",
      description: "Some description"
    },
    created: new Date(),
    lastUpdated: new Date(),
    values: [
      {name: "Energy need", score: 120, full: 150, data: data()},
      {name: "Energy use", score: 98, full: 150, data: data()},
      /*{name: "Energy generation", score: 86, full: 150, data: data()},*/
      {name: "Delivered energy", score: 99, full: 150, data: data()},
      {name: "Exported energy", score: 85, full: 150, data: data()},
      {name: "Self consumption", score: 65, full: 150, data: data()},
      {name: "Self generation", score: 25, full: 150, data: data()},
    ]
  },
  {
    name: "And this is the second one",
    building: {
      name: "Cool building 2",
      description: "Some description 2"
    },
    created: new Date(),
    lastUpdated: new Date(),
    values: [
      {name: "Energy need", score: 120, full: 150, data: data()},
      {name: "Energy use", score: 98, full: 150, data: data()},
      /*{name: "Energy generation", score: 86, full: 150, data: data()},*/
      {name: "Delivered energy", score: 99, full: 150, data: data()},
      {name: "Exported energy", score: 85, full: 150, data: data()},
      {name: "Self consumption", score: 65, full: 150, data: data()},
      {name: "Self generation", score: 25, full: 150, data: data()},
    ]
  }
]
