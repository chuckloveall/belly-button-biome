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
}

init();
