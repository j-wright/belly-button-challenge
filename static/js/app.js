// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("buildMetadata called with: ", sample)
    // get the metadata field
    // console.log("data: ", data.metadata)
    let metadata = data.metadata
    // console.log("metadata", metadata)
    // Filter the metadata for the object with the desired sample number
    let filteredData = metadata.filter(d => d.id.toString() === sample)[0]
    console.log("filteredData: ", filteredData)
    // Use d3 to select the panel with id of `#sample-metadata`
    let textBox = d3.select('#sample-metadata')

    // Use `.html("") to clear any existing metadata
    textBox.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    textBox.append('p').html(`ID: ${filteredData.id}`)
    textBox.append('p').html(`Ethnicity: ${filteredData.ethnicity}`)
    textBox.append('p').html(`GENDER: ${filteredData.gender}`)
    textBox.append('p').html(`AGE: ${filteredData.age}`)
    textBox.append('p').html(`LOCATION: ${filteredData.location}`)
    textBox.append('p').html(`BBTYPE: ${filteredData.bbtype}`)
    textBox.append('p').html(`WFREQ: ${filteredData.wfreq}`)
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("buildCharts called with: ", sample)
    // console.log("data: ", data)
    // Get the samples field
    let samples = data.samples
    // console.log(samples)

    // Filter the samples for the object with the desired sample number
    let filteredData = samples.filter(d => d.id === sample)[0]

    console.log("filteredData: ", filteredData)

    // Get the otu_ids, otu_labels, and sample_values
    otu_ids = filteredData.otu_ids
    otu_labels = filteredData.otu_labels
    sample_values = filteredData.sample_values

    // console.log(otu_ids)
    // console.log(otu_labels)
    // console.log(sample_values)

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        text: otu_labels
      },
      type: 'scatter'
    };

    let dataBubble = [trace1];

    let layoutBubble = {
     title: 'Bacteria Cultures Per Sample',
     xaxis: { title: 'OTU ID' },
     yaxis: { title: 'Number of Bacteria' },
     autosize: true
    };

    
    // Render the Bubble Chart
    Plotly.newPlot('bubble', dataBubble, layoutBubble);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let dataBar = [{
      x: otu_ids.slice(0,10),
      y: sample_values.slice(0,10),
      type: 'bar',
      orientation: 'h',
      hoverinfo: otu_labels.slice(0,10)
    }];

  let layout = {
    title: 'Top 10 Bacteria Cultures Found',
    xaxis: { title: 'Number of Bacteria', categoryorder: 'total descending'},
    autosize: true
  };

    // Render the Bar Chart
    Plotly.newPlot('bar', dataBar, layout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // adding for debug and just getting something to work
    // console.log("Data: ", data)
    // Get the names field
    let names = data.names
    // console.log("Names: ", names)

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset")
    // console.log("dropdownmenu: ", dropdown)

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    dropdown.selectAll("option").data(names).enter().append("option").attr("value", function(d) {return d; }).text(function(d) {return d; });

    // Get the first sample from the list
    let firstName =  names[0]

    // Build charts and metadata panel with the first sample
    buildCharts(firstName)
    buildMetadata(firstName)

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  // console.log("Event listener was activated.")
  // console.log("newSample: ", newSample)
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
