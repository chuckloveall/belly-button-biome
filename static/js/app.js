// starter code
d3.json('samples.json').then(data => {
    // console.log(data);


    //set default data to display on page load
    //TODO: change default to something from the data
    // const defaultData = data;
    // console.log(defaultData);
    let names = data.names;
    // console.log(names);
    // populate dropdown Menu
    var select = document.getElementById("selDataset");

    for(var i = 0; i < names.length; i++) {
        var opt = names[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el)};
    // add default graph on page load
    function init() {
        let x = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b);
      data2 = [{
        type: 'bar',
        y: x,
        x: data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b),
        orientation: 'h',
        text: data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b)
      }];
        // console.log(x);
      let chart = d3.selectAll("#bar").node();

      Plotly.newPlot(chart, data2);
      var trace1 = [{
      x: x,
      y: data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b),
      text: data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b),
      mode: 'markers',
      marker: {
        color: [data.samples[0].otu_ids.slice(0,10).sort((a,b) => a-b)],
        size: [40, 60, 80, 100]
    }
    }];

    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot('bubble', trace1, layout);
    };

    // This function is called when a dropdown menu item is selected
    function optionChanged() {
      // Prevent the page from refreshing
      d3.event.preventDefault();
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      let dataset = dropdownMenu.node();
      let d3set= d3.event.target.value;
      console.log(d3set);
      console.log(dataset);
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

      // function optionChanged (this.value)
      // Note the extra brackets around 'x' and 'y'
      Plotly.restyle('plot', "x", [x]);
      Plotly.restyle('plot', "y", [y]);
    };



    init();
});
