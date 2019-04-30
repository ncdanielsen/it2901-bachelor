
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

/*
([
  {time: 0, value: Math.random()*2400},
  {time: 20, value: Math.random()*1398},
  {time: 50, value: Math.random()*9800},
  {time: 100, value: Math.random()*3908},
  {time: 1000, value: Math.random()*4800},
  {time: 1110, value: Math.random()*3800},
  {time: 1120, value: Math.random()*4300}
])
*/
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const data = () => {
  datapoints = []
  for(let year=2016; year < 2020; year++) {
    months.forEach(month => {
      for(let day=1; day < 32; day++) {
        date = new Date(`${month} ${day}, ${year}`)
        if (isValidDate(date)) {
          datapoint = {time: Math.ceil(date.getTime()/1000), value: Math.random()*year}
          datapoints.push(datapoint)
          if (date === 2 && month === "May" && year === 2019) {
            return datapoints
          }
        }
      }
    }) 
  }
  return datapoints
}

module.exports = [
	{
	 name: "My name for the data set",
	 description: "Some description",
	 created: Math.ceil((new Date()).getTime()/1000),
	 lastUpdated: Math.ceil((new Date()).getTime()/1000),
	 values: [
	   {name: "Energy need", data: data()},
	   {name: "Energy use", data: data()},
	   {name: "Energy generation", data: data()},
	   {name: "Delivered energy", data: data()},
	   {name: "Exported energy", data: data()},
	   {name: "Self consumption", data: data()},
     {name: "Self generation", data: data()},
     {name: "Yearly net load profile", data: data()}, 
     {name: "Net load duration curve", data: data()}, 
     {name: "Peak load", data: data()}, 
     {name: "Peak export", data: data()}, 
     {name: "Utilisation factor", data: data()}, 
     {name: "Daily net load profile", data: data()}, 
     {name: "Total gas emissions", data: data()}, 
     {name: "Total gas emissions pr. m^2", data: data()}, 
     {name: "Greenhouse gas emissions", data: data()}, 
     {name: "Life cycle cost", data: data()}, 
     {name: "Life cycle cost pr. m^2", data: data()},
     {name: "Mode of transport", data: data()},
     {name: "Access to public transport", data: data()},
     {name: "Number of services, facilities and amenities", data: data()},
     {name: "Meters from services, facilities and amenities", data: data()},
	 ]
	},
	{
	 name: "And this is the second one",
	 description: "Some description 2",
	 created: Math.ceil((new Date()).getTime()/1000),
	 lastUpdated: Math.ceil((new Date()).getTime()/1000),
	 values: [
	   {name: "Energy need",  data: data()},
	   {name: "Energy use",  data: data()},
	   {name: "Energy generation", data: data()},
	   {name: "Delivered energy", data: data()},
	   {name: "Exported energy", data: data()},
	   {name: "Self consumption", data: data()},
     {name: "Self generation", data: data()},
     {name: "Yearly net load profile", data: data()}, 
     {name: "Net load duration curve", data: data()}, 
     {name: "Peak load", data: data()}, 
     {name: "Peak export", data: data()}, 
     {name: "Utilisation factor", data: data()}, 
     {name: "Daily net load profile", data: data()}, 
     {name: "Total gas emissions", data: data()}, 
     {name: "Total gas emissions pr. m^2", data: data()}, 
     {name: "Greenhouse gas emissions", data: data()}, 
     {name: "Life cycle cost", data: data()}, 
     {name: "Life cycle cost pr. m^2", data: data()},
     {name: "Mode of transport", data: data()},
     {name: "Access to public transport", data: data()},
     {name: "Number of services, facilities and amenities", data: data()},
     {name: "Meters from services, facilities and amenities", data: data()},
	 ]
	}
]
