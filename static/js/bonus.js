// Gage section
// TODO: translate from weather example to this dataset
// populate the empty select element with dropdown options for forecast days
let select = d3.select("#")
data.daily.forEach(day => {
select.append("option")
  // use the unix timestamp for the value of the option
  .attr("value", day.dt)
  // convert the unix timestamp to a human readable string for the text inside the option
  .text(DateTime.fromSeconds(day.dt).toLocaleString(DateTime.DATE_FULL))
})
// calculate the minimum minimum temperature and maximum maximum temperature for the forecast days
const minTemp = d3.min(data.daily.map(day => day.temp.min))
const maxTemp = d3.max(data.daily.map(day => day.temp.max))
// build plot in initialization function using a given date's data
function init(dateData) {
let plotData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: data.current.temp,
    title: { text: "Temperature" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: dateData.temp.max },
    gauge: {
      axis: { range: [minTemp, maxTemp] },
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: dateData.temp.max
      }
    }
  }
];
var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
Plotly.newPlot('plot', plotData, layout);
}
// add an event listener to the select element
d3.select("#day").on("change", buildPlot)
// the event handler function takes the select value and rebuilds the plot with that info
function buildPlot() {
let date = d3.event.target.value
let dateData = data.daily.find(d => date == d.dt)
init(dateData);
}
// initialize the plot with the first entry in the daily forecast data
init(data.daily[0]);
