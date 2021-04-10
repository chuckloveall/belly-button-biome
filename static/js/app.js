//define functions outside of .then
//init() {}
//optionChanged(value) {}
// updatecharts(data, value){}

//use d3.json.then
// init(data)
// updatecharts(data,value)
//allows you access to data outside of scope

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
        //bar chart
        let x = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b);
        let sample_val = data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b);
        let otu = data.samples[0].otu_ids.slice(0,10).sort((a,b) => a-b);
        let otu_text = data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b);
      data2 = [{
        type: 'bar',
        y: x,
        x: sample_val,
        orientation: 'h',
        text: otu_text
      }];
        // console.log(x);
      let chart = d3.selectAll("#bar").node();

      Plotly.newPlot(chart, data2);
      // bubble chart begin section
      var trace1 = [{
      x: x,
      y: sample_val,
      text: otu_text,
      mode: 'markers',
      marker: {
        color: otu,
        size: sample_val
    }
    }];
    // console.log(x);
    // console.log(sample_val);
    // console.log(otu);
    Plotly.newPlot('bubble', trace1);
    };

    // This function is called when a dropdown menu item is selected
    function optionChanged(somedata) {
        console.log(somedata)
      // Prevent the page from refreshing
      d3.event.preventDefault();
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      let opt = document.getElementById("selDataset").value;
      console.log(opt);
      let dataset = dropdownMenu.node();
      let d3set= d3.event.target.value;
      console.log(d3set);
      console.log(dataset);
      let bubble= d3.selectAll("#bubble").node();
      console.log(bubble);
    //   // Initialize x and y arrays
    //   let t = [];
    //   let y = [];
    // // switch from dataset
    // // TODO: change dataset and nest loop index
    //   switch(dataset) {
    //     case "dataset1":
    //         t= dataset1.x;
    //         y= dataset1.y;
    //       break;
    //
    //     case "dataset2":
    //     t= dataset2.x;
    //     y= dataset2.y;
    //       break;
    //
    //     case "dataset3":
    //     t= dataset3.x;
    //     y= dataset3.y;
    //       break;
    //
    //     default:
    //       t = defaultData;
    //       y = defaultData;
    //       break;
      // }

      // function optionChanged (this.value)
      // Note the extra brackets around 'x' and 'y'
      // Plotly.restyle('plot', "x", [x]);
      // Plotly.restyle('plot', "y", [y]);
    };



    init();
});
