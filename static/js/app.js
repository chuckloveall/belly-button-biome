// starter code
d3.json('samples.json').then(data => {
    console.log(data);


    //set default data to display on page load
    //TODO: change default to something from the data
    // const defaultData = data;
    // console.log(defaultData);
    let names = data.names;
    console.log(names);

    function init() {
      data2 = [{
        x: names,
        y: data.sample_values
      }];
      let chart = d3.selectAll("#well").node();

      Plotly.newPlot(bar, data2);
    };
    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
      // Prevent the page from refreshing
      d3.event.preventDefault();
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      let dataset = dropdownMenu.node();
      let d3set= d3.event.target.value;
      console.log(d3set);
      console.log(dataset);
      let bar = d3.selectAll("#bar").node();
      let bubble= d3.selectAll("#bubble").node();

      // Initialize x and y arrays
      let x = [];
      let y = [];
    // switch from dataset
    // TODO: change dataset and nest loop index
      switch(dataset) {
        case "dataset1":
            x= dataset1.x;
            y= dataset1.y;
          break;

        case "dataset2":
        x= dataset2.x;
        y= dataset2.y;
          break;

        case "dataset3":
        x= dataset3.x;
        y= dataset3.y;
          break;

        default:
          x = defaultData;
          y = defaultData;
          break;
      }


      // Note the extra brackets around 'x' and 'y'
      Plotly.restyle('plot', "x", [x]);
      Plotly.restyle('plot', "y", [y]);
    };


    d3.select('#selDataset').on("change", updatePlotly)
    init();
});
