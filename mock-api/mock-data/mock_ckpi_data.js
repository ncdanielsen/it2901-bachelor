
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
	 name: "Building2",
	 description: "A building in Stavanger",
	 created: Math.ceil((new Date()).getTime()/1000),
	 lastUpdated: Math.ceil((new Date()).getTime()/1000),
   owner: "Shared",
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
	 name: "Building1",
	 description: "A building in Bergen",
	 created: Math.ceil((new Date()).getTime()/1000),
	 lastUpdated: Math.ceil((new Date()).getTime()/1000),
   owner: "Shared",
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
