let data = d3.json('samples.json').then(data => {
    console.log(data);
});
const defaultData = [1,2,3,4,5];
function init() {
  data2 = [{
    x: defaultData,
    y: defaultData
  }];
  let chart = d3.selectAll("#well").node();

  Plotly.newPlot(bar, data2);
};
// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.node().value;

  let chart = d3.selectAll("#plot").node();

  // Initialize x and y arrays
  let x = [];
  let y = [];

  switch(dataset) {
    case "dataset1":
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
      break;

    case "dataset2":
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
      break;

    case "dataset3":
      x = [100, 200, 300, 400, 500];
      y = [10, 100, 50, 10, 0];
      break;

    default:
      x = defaultData;
      y = defaultData;
      break;
  }


  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle(chart, "x", [x]);
  Plotly.restyle(chart, "y", [y]);
};

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
});
init();
