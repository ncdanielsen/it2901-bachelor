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
