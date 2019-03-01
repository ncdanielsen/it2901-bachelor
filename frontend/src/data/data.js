const data0 = {
  data: [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
  ],
  type: "line"
}

const data1 = {
  data: [
    {name: 'Page A', uv: 2400, pv: 4000, amt: 2400},
    {name: 'Page B', uv: 1398, pv: 3000, amt: 2210},
    {name: 'Page C', uv: 9800, pv: 2000, amt: 2290},
    {name: 'Page D', uv: 3908, pv: 2780, amt: 2000},
    {name: 'Page E', uv: 4800, pv: 1890, amt: 2181},
    {name: 'Page F', uv: 3800, pv: 2390, amt: 2500},
    {name: 'Page G', uv: 4300, pv: 3490, amt: 2100}
  ],
  type: "line"
}

const data2 = {
  data: [
    {subject: 'Math', A: 120, B: 110, fullMark: 150},
    {subject: 'Chinese', A: 98, B: 130, fullMark: 150},
    {subject: 'English', A: 86, B: 130, fullMark: 150},
    {subject: 'Geography', A: 99, B: 100, fullMark: 150},
    {subject: 'Physics', A: 85, B: 90, fullMark: 150},
    {subject: 'History', A: 65, B: 85, fullMark: 150}
  ],
  type: "radar"
}

const data3 = {
  data: [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: -3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: -2000, pv: -9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: -1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: -3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
  ],
  type: "posNegBarChart"
}
const data = [data0, data1, data2, data3]

export default data


export const kpiCategories = [
  {
    "categoryName": "Energy",
    "kpis": [
      {
        "name": "Energy Need",
        "unit": "kWh/m2/year"
      },
      {
        "name": "Energy Use",
        "unit": "kWh/year"
      },
      {
        "name": "Energy Generation",
        "unit": "kWh/year"
      },
      {
        "name": "Delivered Energy",
        "unit": "kWh/year"
      },
      {
        "name": "Exported Energy",
        "unit": "kWh/year"
      },
      {
        "name": "Self Consumption",
        "unit": "%"
      },
      {
        "name": "Self Generation",
        "unit": "%"
      }
    ]
  },
  {
    "categoryName": "Power",
    "kpis": [
      {
        "name": "Yearly Net Load Profile",
        "unit": "kW"
      },
      {
        "name": "Net Load Duration Curve",
        "unit": "kW"
      },
      {
        "name": "Peak Load",
        "unit": "kW"
      },
      {
        "name": "Peak Export",
        "unit": "kW"
      },
      {
        "name": "Utilisation Factor",
        "unit": "%"
      },
      {
        "name": "Daily Net Load Profile",
        "unit": "kW"
      }
    ]
  },
  {
    "categoryName": "Emissions",
    "kpis": [
      {
        "name": "Total Greenhouse Gas Emissions",
        "unit": "tCO2eq"
      },
      {
        "name": "Total Greenhouse Gas Emissions Per m2 Per Year",
        "unit": "tCO2eq/m2/year"
      },
      {
        "name": "Greenhouse Gas Emissions Reduction",
        "unit": "% reduction compared to base case"
      }
    ]
  },
  {
    "categoryName": "Economy",
    "kpis": [
      {
        "name": "Life Cycle Cost",
        "unit": "NOK"
      },
      {
        "name": "Life Cycle Cost Per heated m2 Per Year",
        "unit": "NOK/m2 heated floor area/year"
      }
    ]
  },
  {
    "categoryName": "Mobility",
    "kpis": [
      {
        "name": "Mode of Transport",
        "unit": "% share"
      },
      {
        "name": "Access to Public Transport",
        "unit": "meters"
      }
    ]
  },
  {
    "categoryName": "Spatial Qualities",
    "kpis": [
      {
        "name": "Demographic Needs",
        "unit": "Qualitative"
      },
      {
        "name": "Delivery of services, facilities and amenties",
        "unit": "Number of amenties"
      },
      {
        "name": "Delivery of services, facilities and amenties",
        "unit": "meters (distance from buildings)"
      },
      {
        "name": "Public Space",
        "unit": "Qualitative"
      }
    ]
  }
]
