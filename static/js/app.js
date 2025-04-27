// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("buildMetadata called with: ", sample)
    // get the metadata field


    // Filter the metadata for the object with the desired sample number


    // Use d3 to select the panel with id of `#sample-metadata`


    // Use `.html("") to clear any existing metadata


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("buildCharts called with: ", sample)
    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // adding for debug and just getting something to work
    console.log("Data: ", data)
    // Get the names field
    let names = data.names
    console.log("Names: ", names)

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset")
    console.log("dropdownmenu: ", dropdown)

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
  console.log("Event listener was activated.")
  console.log("newSample: ", newSample)
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
