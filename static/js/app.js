//define functions outside of .then
//init() {}
//optionChanged(value) {}
// updatecharts(data, value){}
function init(data) {
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

    updateCharts(data,0)
    let demo = data.metadata[0];
    console.log(demo);
    let demoinfo = document.getElementById("sample-metadata")
    console.log(demoinfo);
    let demo2= d3.select("#sample-metadata").property("value")
    console.log(demo2);
//     for(var j = 0; j < data.metadata.length; j++) {
//         var me = data.metadata[j];
//         var el = document.createElement("tb");
//         el.textContent = me;
//         el.value = me;
//         demoinfo.appendChild(el)};
};
function updateCharts(data, newValue) {
    //bar chart
    // let attempt = data.samples.map(v => v === value);
    // console.log(attempt);
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
//use d3.json.then
// init(data)
// updatecharts(data,value)
//allows you access to data outside of scope
// This function is called when a dropdown menu item is selected
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function optionChanged(newValue) {
    d3.json('samples.json').then(data => {
    console.log(newValue);
    let ans = [data.samples];
    console.log(ans);
    console.log(ans[0])
    for (var j=0; j < ans.length; j =+1){
    let newIndex= findWithAttr(ans[j], 'id', newValue)
    if (newIndex !== -1)
    {return newIndex
    break}};
    console.log(newIndex);
    updateCharts(data, newValue)
  });

  // Prevent the page from refreshing
  // d3.event.preventDefault();
  // Use D3 to select the dropdown menu
  // let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let opt2 = document.getElementById("selDataset").value;
  console.log(opt2);
  // let dataset = dropdownMenu.node();
  // let d3set= d3.event.target.value;
  // console.log(d3set);
  // console.log(dataset);
  // let bubble= d3.selectAll("#bubble").node();
  // console.log(bubble);
  // console.log(data)
  // console.log(data.samples)
  //loop through samples

  //check if sample.id === opt 2
  // return sample
//   for(var n=0; n< data.samples.length;n++){
//       let selection= data.samples[n];
//       if (selection.id === opt2) {
//         var s = selection;}
//       return s;
//       console.log(s);
// }
// console.log(s);
  // console.log(value);
// switch from dataset
// TODO: change dataset and nest loop index
  // switch(opt) {
  //   case "940":
  //       updateCharts(data, )
  //     break;
  //
  //
  //
  //   default:
  //     t = defaultData;
  //     y = defaultData;
  //     break;
  // }

  // function optionChanged (this.value)
  // Note the extra brackets around 'x' and 'y'
  // Plotly.restyle('plot', "x", [x]);
  // Plotly.restyle('plot', "y", [y]);
};
// starter code

d3.json('samples.json').then(data => {
    // console.log(data);
    init(data)
    updateCharts(data)

});
