// // VISUALIZATION 01 ===========================================================================================================
// async function loadDataAndCreateSpotifyChart() {
//     // Load the CSV file (adjust the path as necessary)
//     const data = await d3.csv("../datasets/spotify_demog_2013_2023 - Sheet1.csv");

//     // Process the data
//     const processedData = data.map(d => ({
//         Year: parseInt(d.Year, 10),  // Convert 'Year' to an integer
//         "Age Group": d["Age Group"],
//         "Users in Age Groups (Millions)": +d["Users in Age Groups (Millions)"]
//     }));

//     // Vega-Lite specification
//     const yourVlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Line chart showing Spotify user demographics over time.",
//         data: { values: processedData }, // Use the processed data
//         mark: "line", // Line chart
//         width: 690,  // Set the width of the chart
//         height: 400, // Set the height of the chart
//         autosize: { type: "fit", contains: "padding" }, // Enables fitting to container
//         encoding: {
//             x: {
//                 field: "Year",
//                 type: "ordinal",  // Use ordinal scale for years
//                 title: "Year",
//                 axis: {
//                     labelAngle: 0  // Rotate the labels by 0 degrees
//                 }
//             }, // x-axis for years
//             y: {
//                 field: "Users in Age Groups (Millions)",
//                 type: "quantitative",
//                 title: "Users in Age Groups (Millions)"
//             }, // y-axis for user count
//             color: {
//                 field: "Age Group",
//                 type: "nominal",
//                 legend: { title: "Age Group" }
//             }, // Color by age group
//             tooltip: [
//                 { field: "Year", type: "ordinal", title: "Year" },
//                 { field: "Age Group", type: "nominal", title: "Age Group" },
//                 {
//                     field: "Users in Age Groups (Millions)",
//                     type: "quantitative",
//                     title: "Users (Millions)"
//                 }
//             ] // Tooltip details
//         }
//     };

//     // Embed the Vega-Lite chart
//     vegaEmbed("#spotifyDemographicsChart", yourVlSpec);
// }

// // Call the function to load data and create the chart
// loadDataAndCreateSpotifyChart();

// // VISUALIZATION 02 ===========================================================================================================

// async function loadSpotifyGenresOverTimeChart() {
//     // Vega-Lite specification
//     const vlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Line chart for all genres over time",
//         data: {
//             url: "../datasets/top_5_genres_2013_2023_by_streams.csv"
//         },
//         "mark": "line",
//         width: 700,  // Set the width of the chart
//         height: 400, // Set the height of the chart,
//         autosize: { type: "fit", contains: "padding" }, // Enables fitting to container
//         "layer": [
//             {
//                 "mark": { "type": "line", "strokeWidth": 2 },
//                 "encoding": {
//                     "x": {
//                         "field": "year",
//                         "type": "ordinal",
//                         "title": "Year",
//                         axis: {
//                             labelAngle: 0  // Rotate the labels by 45 degrees
//                         },

//                     },
//                     "y": {
//                         "field": "Streams",
//                         "type": "quantitative",
//                         "title": "Total Streams (in Billions)",
//                         "axis": { "format": ".2s" }
//                     },
//                     "color": {
//                         "field": "main_genre",
//                         "type": "nominal",
//                         "legend": { "title": "Main Genre" }
//                     }
//                 }
//             },
//             {
//                 "mark": { "type": "line", "strokeWidth": 10, "opacity": 0 },
//                 "encoding": {
//                     "x": { "field": "year", "type": "ordinal", "axis": {"format": "d"}},
//                     "y": { "field": "Streams", "type": "quantitative" },
//                     "color": { "field": "main_genre", "type": "nominal" },
//                     "tooltip": [
//                         { "field": "year", "title": "Year:", "axis": {"format": "d"}},
//                         { "field": "Streams", "title": "Streams:", "format": ".2s" },
//                         { "field": "main_genre", "title": "Genre:" }
//                     ]
//                 }
//             }
//         ],
//         config: {
//             mark: {
//                 strokeOpacity: 0.8
//             }
//         }
//     };

//     // Embed the Vega-Lite chart in the container
//     vegaEmbed("#spotifyGenresOverTimeChart", vlSpec).catch(console.error);
// }

// // Call the function to load the chart
// loadSpotifyGenresOverTimeChart();

// // VISUALIZATION 2.5 ===========================================================================================================

// async function loadBarCharts() {
//     // Load the CSV data
//     const data = await d3.csv("../datasets/spotify_2013_2023 - Music_Genres_2013_2023.csv");

//     // Convert Percentage to numeric values (remove '%' symbol and divide by 100)
//     const formattedData = data.map(d => ({
//         ...d,
//         Percentage: parseFloat(d.Percentage.replace('%', '')) / 100, // Convert to numeric and divide by 100
//         Year: +d.Year // Ensure Year is treated as a number
//     }));

//     // Filter data for 2013 and 2023
//     const data2013 = formattedData.filter(d => d.Year === 2013);
//     const data2023 = formattedData.filter(d => d.Year === 2023);

//     // Sort data by percentage in descending order
//     const sortDataByPercentage = (data) => data.sort((a, b) => b.Percentage - a.Percentage);

//     // Sort the data for 2013 and 2023
//     const sortedData2013 = sortDataByPercentage(data2013);
//     const sortedData2023 = sortDataByPercentage(data2023);

//     // Prepare data for Bar Chart for 2013 (both Millennials and Gen Z)
//     const barChart2013 = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         title: "Top Music Genres - 2013",
//         data: { values: sortedData2013 },
//         mark: "bar", // Bar chart mark
//         encoding: {
//             x: { field: "Top Music Genres", type: "nominal", title: "Genre", axis: { labelAngle: -45 } },
//             y: { field: "Percentage", type: "quantitative", title: "Percentage", axis: { format: ".1%" } },
//             color: { field: "Age Group", type: "nominal", legend: { title: "Age Group" } },
//             tooltip: [
//                 { field: "Top Music Genres", title: "Genre" },
//                 { field: "Percentage", title: "Percentage", type: "quantitative", format: ".1%" },
//                 { field: "Age Group", title: "Age Group" }
//             ]
//         },
//         width: 665,
//         height: 500,
//         autosize: { type: "fit", contains: "padding" } // Enables fitting to container
//     };

//     // Embed bar chart for 2013 (both Millennials and Gen Z)
//     vegaEmbed("#barChart2013", barChart2013);

//     // Prepare data for Bar Chart for 2023 (both Millennials and Gen Z)
//     const barChart2023 = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         title: "Top Music Genres - 2023",
//         data: { values: sortedData2023 },
//         mark: "bar", // Bar chart mark
//         encoding: {
//             x: { field: "Top Music Genres", type: "nominal", title: "Genre", axis: { labelAngle: -45 } },
//             y: { field: "Percentage", type: "quantitative", title: "Percentage", axis: { format: ".1%" } },
//             color: { field: "Age Group", type: "nominal", legend: { title: "Age Group" } },
//             tooltip: [
//                 { field: "Top Music Genres", title: "Genre" },
//                 { field: "Percentage", title: "Percentage", type: "quantitative", format: ".1%" },
//                 { field: "Age Group", title: "Age Group" }
//             ]
//         },
//         width: 665,
//         height: 500,
//         autosize: { type: "fit", contains: "padding" } // Enables fitting to container
//     };

//     // Embed bar chart for 2023 (both Millennials and Gen Z)
//     vegaEmbed("#barChart2023", barChart2023);
// }

// // Call the function to load data and render the bar charts
// loadBarCharts();


// NEW ITERATION

// Import required libraries
// import * as d3 from 'd3';
// import vegaEmbed from 'vega-embed';

// Custom colors
const colors = {
    "18-24 (Gen Zs)": "#2053df",
    "25-44 (Millennials)": "#a620df",
    "45-54 (Gen X)": "#E5E4E2",
    "55+ (Majority Baby Boomers)": "#D3D3D3"
};

// Function to load data and create the chart
// async function loadSpotifyAgeDemog() {

//     const yourVlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Pie chart showing Spotify age demographics in 2023.",
//         background: "#FFFFFF",
//         background: "white",
//         data: {
//             values:

//                 [
//                     { "age": "18-24 (Gen Zs)", "percentage": 26 },
//                     { "age": "25-44 (Millennials)", "percentage": 45 },
//                     { "age": "45-54 (Gen X)", "percentage": 11 },
//                     { "age": "55+ (Majority Baby Boomers)", "percentage": 19 }
//                 ]
//         },
//         mark: {
//             type: "arc",
//             tooltip: true
//         },
//         encoding: {
//             theta: { field: "percentage", type: "quantitative" },
//             color: {
//                 field: "age",
//                 type: "nominal",
//                 legend: { title: "Age Group", titleColor: "black", labelColor: "black" },
//                 scale: {
//                     domain: ["18-24 (Gen Zs)", "25-44 (Millennials)", "45-54 (Gen X)", "55+ (Majority Baby Boomers)"],
//                     range: ["#2053df", "#a620df", "#E5E4E2", "#D3D3D3"]
//                 }
//             },
//             tooltip: [
//                 { field: "age", type: "nominal", title: "Age Group" },
//                 { field: "percentage", type: "quantitative", title: "Percentage (%)" }
//             ]
//         },
//         view: { stroke: null },
//         title: "Spotify Age Demographics (2023)"
//     };
//     vegaEmbed('#spotifyAgeDemographicsChart', yourVlSpec);
// }

// loadSpotifyAgeDemog();


// Function to load data and create the chart
// async function loadSpotifyAgeDemogHighlighted() {
//     const yourVlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Pie chart showing Spotify age demographics in 2023.",
//         // width: 600,
//         // height: 600,
//         background: "#FFFFFF",
//         data: {
//             values: [
//                 { "age": "18-24 (Gen Zs)", "percentage": 26 },
//                 { "age": "25-44 (Millennials)", "percentage": 45 },
//                 { "age": "45-54 (Gen X)", "percentage": 11 },
//                 { "age": "55+ (Majority Baby Boomers)", "percentage": 19 }
//             ]
//         },
//         mark: {
//             type: "arc",
//             tooltip: true
//         },
//         encoding: {
//             theta: { field: "percentage", type: "quantitative" },
//             color: {
//                 field: "age",
//                 type: "nominal",
//                 legend: { title: "Age Group", titleColor: "black", labelColor: "black" },
//                 scale: { domain: Object.keys(colors), range: Object.values(colors) }
//             },
//             tooltip: [
//                 { field: "age", type: "nominal", title: "Age Group" },
//                 { field: "percentage", type: "quantitative", title: "Percentage (%)" }
//             ]
//         },
//         view: { stroke: null },
//         // title: "Spotify Age Demographics (2023)"
//     };

//     vegaEmbed('#spotifyDemographicsChartHighlighted', yourVlSpec);
// }

// loadSpotifyAgeDemogHighlighted();


// async function loadSpotifyUsersChart() {

//     // Vega-Lite specification
//     const yourVlSpec = {

//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "description": "Grouped bar chart showing Spotify user demographics for 2013 and 2023.",
//         "data": {
//             "values": [
//                 {
//                     "Year": 2013,
//                     "Age Group": "18-24",
//                     "Users in Age Groups (Millions)": 17.5
//                 },
//                 {
//                     "Year": 2013,
//                     "Age Group": "25-34",
//                     "Users in Age Groups (Millions)": 15
//                 },
//                 {
//                     "Year": 2023,
//                     "Age Group": "18-24",
//                     "Users in Age Groups (Millions)": 150
//                 },
//                 {
//                     "Year": 2023,
//                     "Age Group": "25-34",
//                     "Users in Age Groups (Millions)": 175
//                 }
//             ]
//         },
//         "mark": "bar",
//         "width": 690,
//         "height": 400,
//         "autosize": { "type": "fit", "contains": "padding" },
//         "encoding": {
//             "x": {
//                 "field": "Year",
//                 "type": "ordinal",
//                 "title": "Year",
//                 "axis": { "labelAngle": 0 },
//                 "offset": -30
//             },
//             "xOffset": {
//                 "field": "Age Group"
//             },
//             "y": {
//                 "field": "Users in Age Groups (Millions)",
//                 "type": "quantitative",
//                 "title": "Users in Age Groups (Millions)"
//             },
//             "color": {
//                 "field": "Age Group",
//                 "type": "nominal",
//                 "legend": { "title": "Age Group" },
//                 scale: {
//                     domain: ["18-24", "25-34"],
//                     range: ["#6082B6", "#1ed760"]

//                 }
//             },
//             "tooltip": [
//                 { "field": "Year", "type": "ordinal", "title": "Year" },
//                 { "field": "Age Group", "type": "nominal", "title": "Age Group" },
//                 {
//                     "field": "Users in Age Groups (Millions)",
//                     "type": "quantitative",
//                     "title": "Users (Millions)"
//                 }
//             ]
//         }

//     };

//     // Embed the Vega-Lite chart
//     vegaEmbed("#spotifyUsersChart", yourVlSpec);
// }

// Call the function to load data and create the chart
// loadSpotifyUsersChart(); //old version

async function loadVis2() {
    // Vega-Lite specification
    const yourVlSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Grouped bar chart showing Spotify user demographics for 2013 and 2023.",
        data: {
            values: [
                { "Year": 2013, "Age Group": "18-24", "Users in Age Groups (Millions)": 17.5, "Custom Text": "Gen Z (18-24)" },
                { "Year": 2013, "Age Group": "25-44", "Users in Age Groups (Millions)": 15, "Custom Text": "Millennials (25-44)" },
                { "Year": 2023, "Age Group": "18-24", "Users in Age Groups (Millions)": 150, "Custom Text": "Gen Z (18-24)" },
                { "Year": 2023, "Age Group": "25-44", "Users in Age Groups (Millions)": 175, "Custom Text": "Millennials (25-44)" }
            ]
        },
        width: 690,
        height: 400,
        autosize: { type: "fit", contains: "padding" },
        layer: [
            {
                mark: "bar",
                encoding: {
                    x: {
                        field: "Year",
                        type: "ordinal",
                        title: "Year",
                        axis: { labelAngle: 0 },
                        offset: -30
                    },
                    xOffset: { field: "Age Group" },
                    y: {
                        field: "Users in Age Groups (Millions)",
                        type: "quantitative",
                        title: "Users in Age Groups (Millions)"
                    },
                    color: {
                        field: "Age Group",
                        type: "nominal",
                        // legend: {
                        //     title: "Age Group",
                        //     labelExpr: "datum.label == '18-24' ? 'Gen Zs (18-24)' : datum.label == '25-44' ? 'Millennials (25-44)' : datum.label"
                        // },
                        legend: null,
                        scale: {
                            domain: ["18-24", "25-44"],
                            range: ["#406FEE", "#B73AEC"]
                        }
                    },
                    tooltip: [
                        { field: "Year", type: "ordinal", title: "Year" },
                        { field: "Age Group", type: "nominal", title: "Age Group" },
                        {
                            field: "Users in Age Groups (Millions)",
                            type: "quantitative",
                            title: "Users (Millions)"
                        }
                    ]
                }
            },
            {
                mark: {
                    type: "text",
                    align: "center",
                    baseline: "middle",
                    dy: -10, // Adjust this value to position the text above the bars
                    color: "black"
                },
                encoding: {
                    x: {
                        field: "Year",
                        type: "ordinal",
                        title: "Year",
                        axis: { labelAngle: 0 },
                        offset: -30
                    },
                    xOffset: { field: "Age Group" },
                    y: {
                        field: "Users in Age Groups (Millions)",
                        type: "quantitative",
                        title: "Users in Age Groups (Millions)"
                    },
                    text: { field: "Custom Text", type: "nominal" }
                }
            }
        ]
    };

    // Embed the Vega-Lite chart
    vegaEmbed("#spotifyUsersChart", yourVlSpec);
}

// Call the function to load data and create the chart
loadVis2();

// colour lightener https://mdigi.tools/lighten-color/#ffa07a

// Function to load data and create the chart
// async function loadSpotifyUserGenreChart() {
//     // Data for 2013 and 2023 combined
//     const data = [
//         { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 35 },
//         { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
//         { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "R&B", "Percentage": 20 },
//         { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "K-Pop/J-Pop", "Percentage": 5 },
//         { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Regional Mexican, Bollywood, Spanish Contemporary", "Percentage": 10 },
//         { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Other Genres (Latin, EDM, etc.)", "Percentage": 5 },
//         { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
//         { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
//         { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Electronic", "Percentage": 10 },
//         { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Indie/Alternative", "Percentage": 15 },
//         { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 10 },
//         { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 40 },
//         { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 30 },
//         { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Rock", "Percentage": 15 },
//         { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Indie/Alternative", "Percentage": 10 },
//         { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 },
//         { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
//         { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Afrobeats", "Percentage": 25 },
//         { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Alternative/Indie", "Percentage": 20 },
//         { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 10 },
//         { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 }
//     ];

//     // Custom colors
//     const colors = {
//         "Pop": "#4C78A8",
//         "Hip-Hop/Rap": "#F58518",
//         "R&B": "#f4bcbb",
//         "K-Pop/J-Pop": "#c7e2e0",
//         "Regional Mexican, Bollywood, Spanish Contemporary": "#b8dcb4",
//         "Other Genres (Latin, EDM, etc.)": "#f8eab1",
//         "Electronic": "#e0c9da",
//         "Indie/Alternative": "#ffd8db",
//         "Rock": "#d8c8be",
//         "Afrobeats": "#e3dfde",
//         "Alternative/Indie": "#ffd9ca"
//     };

//     // Custom tooltip data for the specific point
//     const customTooltipData = [
//         {
//             "Year": "2023",
//             "Age Group": "Millennials & Gen Zs",
//             "Top Music Genres": "Pop",
//             "Percentage": 40
//         },

//         {
//             "Year": "2013",
//             "Age Group": "Millennials & Gen Zs",
//             "Top Music Genres": "Hip-Hop/Rap",
//             "Percentage": 25
//         }
//     ];

//     // Combine the main data with the custom tooltip data
//     const combinedData = data.concat(customTooltipData);

//     // Vega-Lite specification for the line chart
//     const vlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Line chart showing Spotify top music genres by age group in 2013 and 2023.",
//         width: 600,
//         height: 400,
//         data: { values: combinedData },
//         layer: [
//             {
//                 mark: "line",
//                 encoding: {
//                     x: {
//                         field: "Year",
//                         type: "ordinal",
//                         title: "Year",
//                         axis: { labelAngle: 0 }  // Rotate labels to 0 degrees for horizontal alignment
//                     },
//                     y: { field: "Percentage", type: "quantitative", title: "Percentage (%)" },
//                     color: {
//                         field: "Top Music Genres",
//                         type: "nominal",
//                         legend: { title: "Top Music Genres" },
//                         scale: { domain: Object.keys(colors), range: Object.values(colors) }
//                     },
//                     detail: { field: "Age Group" }
//                 }
//             },
//             {
//                 mark: "point", 
//                 encoding: {
//                     x: {
//                         field: "Year",
//                         type: "ordinal"
//                     },
//                     y: { field: "Percentage", type: "quantitative" },
//                     color: {
//                         field: "Top Music Genres",
//                         type: "nominal",
//                         scale: { domain: Object.keys(colors), range: Object.values(colors) }
//                     },
//                     tooltip: [
//                         { field: "Year", type: "ordinal", title: "Year" },
//                         { field: "Age Group", type: "nominal", title: "Age Group" },
//                         { field: "Top Music Genres", type: "nominal", title: "Top Music Genres" },
//                         { field: "Percentage", type: "quantitative", title: "Percentage (%)" }
//                     ]
//                 }
//             }
//         ],
//         view: { stroke: null },
//         title: "Spotify Top Music Genres by Age Group (2013 vs. 2023)"
//     };

//     // Embed the Vega-Lite chart
//     vegaEmbed('#spotifyUserGenreChart', vlSpec);
// }

// Call the function to create the chart
// loadSpotifyUserGenreChart(); //uncomment later

// async function loadSpotifyUserGenreChart() {
//     // Data for 2013 and 2023 combined
    // const data = [
    //     { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 35 },
    //     { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
    //     { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "R&B", "Percentage": 20 },
    //     { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "K-Pop/J-Pop", "Percentage": 5 },
    //     { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Regional Mexican, Bollywood, Spanish Contemporary", "Percentage": 10 },
    //     { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Other Genres (Latin, EDM, etc.)", "Percentage": 5 },
    //     { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
    //     { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
    //     { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Electronic", "Percentage": 10 },
    //     { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Indie/Alternative", "Percentage": 15 },
    //     { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 10 },
    //     { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 40 },
    //     { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 30 },
    //     { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Rock", "Percentage": 15 },
    //     { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Indie/Alternative", "Percentage": 10 },
    //     { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 },
    //     { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
    //     { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Afrobeats", "Percentage": 25 },
    //     { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Alternative/Indie", "Percentage": 20 },
    //     { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 10 },
    //     { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 }
    // ];

//     // Custom colors
//     const colors = {
//         "Pop": "#ff320e",
//         "Hip-Hop/Rap": "#4A4D7B",
//         "R&B": "#D3D3D3",
//         "K-Pop/J-Pop": "#E5E4E2",
//         "Regional Mexican, Bollywood, Spanish Contemporary": "#D3D3D3",
//         "Other Genres (Latin, EDM, etc.)": "#E5E4E2",
//         "Electronic": "#D3D3D3",
//         "Indie/Alternative": "#E5E4E2",
//         "Rock": "#D3D3D3",
//         "Afrobeats": "#E5E4E2",
//         "Alternative/Indie": "#D3D3D3",

//         "Millennials": "#A620DF",
//         "Gen Z": "#2053DF"
//     };

//     // Vega-Lite specification for the line chart with small multiples
//     const vlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Line chart showing Spotify top music genres by age group in 2013 and 2023.",
//         data: { values: data },
//         facet: {
//             column: { field: "Year", type: "ordinal", title: "", spacing: 0 },
//             row: {
//                 field: "Age Group", type: "ordinal", title: "", spacing: 0,
//                 header: {
//                     labelColor: {
//                         condition: [
//                             { test: "datum['Age Group'] == 'Millennials'", value: "#A620DF" },
//                             { test: "datum['Age Group'] == 'Gen Z'", value: "#2053DF" }
//                         ],
//                         value: "#000000" // default color 
//                     }
//                 }
//             },


//         },

//         spec: {
//             layer: [
//                 {
//                     mark: "line",
//                     width:200,
//                     height:200,
//                     encoding: {
//                         y: { field: "Top Music Genres", type: "nominal", title: "Top Music Genres" },
//                         x: { field: "Percentage", type: "quantitative", title: "Percentage (%)" },
//                         color: {
//                             field: "Top Music Genres",
//                             type: "nominal",
//                             legend: null, // Remove the legend for genres
//                             scale: { domain: Object.keys(colors), range: Object.values(colors) }
//                         }
//                     }
//                 },
//                 {
//                     mark: { "type": "point", "filled": true, size: 200 },
//                     encoding: {
//                         y: { field: "Top Music Genres", type: "nominal" },
//                         x: { field: "Percentage", type: "quantitative" },
//                         color: {
//                             field: "Top Music Genres",
//                             type: "nominal",
//                             scale: { domain: Object.keys(colors), range: Object.values(colors) }
//                         },
//                         tooltip: [
//                             { field: "Year", type: "ordinal", title: "Year" },
//                             { field: "Age Group", type: "nominal", title: "Age Group" },
//                             { field: "Top Music Genres", type: "nominal", title: "Top Music Genres" },
//                             { field: "Percentage", type: "quantitative", title: "Percentage (%)" }
//                         ]
//                     }
//                 },
//                 {
//                     mark: { type: "text", align: "left", dx: 10, dy: -5 }, // Text annotation
//                     encoding: {
//                         y: { field: "Top Music Genres", type: "nominal" },
//                         x: { field: "Percentage", type: "quantitative" },
//                         text: {
//                             condition: [{
//                                 test: "datum['Year'] == 2023 && datum['Top Music Genres'] == 'Hip-Hop/Rap' && datum['Age Group'] == 'Millennials'",
//                                 value: "Millennials: Hip-Hop/Rap increased by 5% in 2023"
//                             },
//                             {
//                                 test: "datum['Year'] == 2023 && datum['Top Music Genres'] == 'Hip-Hop/Rap' && datum['Age Group'] == 'Gen Z'",
//                                 value: "Gen Zs: Hip-Hop/Rap decreased by 15% in 2023"
//                             }],
//                             value: ""
//                         },
//                         color: {
//                             condition: [{
//                                 test: "datum['Age Group'] == 'Millennials'",
//                                 value: "#A620DF"
//                             },
//                             {
//                                 test: "datum['Age Group'] == 'Gen Z'",
//                                 value: "#2053DF"
//                             }],
//                             value: "#000000"  // default color
//                         }
//                     }
//                 }
//             ]
//         },

//         view: { stroke: null }
//     };

//     // Embed the Vega-Lite chart
//     vegaEmbed('#spotifyUserGenreChart', vlSpec);
// }

// Call the function to create the chart
// loadSpotifyUserGenreChart();

async function loadVis3() {

    // Vega-Lite specification for the line chart with small multiples
    const vlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Line chart showing Spotify top music genres by age group in 2013 and 2023.",

        "data": {
            "values": [
                {
                    "Year": "2013",
                    "Age Group": "Millennials",
                    "Top Music Genres": "Pop",
                    "Percentage": 35
                },
                {
                    "Year": "2013",
                    "Age Group": "Gen Z",
                    "Top Music Genres": "Pop",
                    "Percentage": 40
                },
                {
                    "Year": "2013",
                    "Age Group": "Millennials",
                    "Top Music Genres": "Hip-Hop/Rap",
                    "Percentage": 25
                },
                {
                    "Year": "2013",
                    "Age Group": "Gen Z",
                    "Top Music Genres": "Hip-Hop/Rap",
                    "Percentage": 25
                },
                {
                    "Year": "2013",
                    "Age Group": "Millennials",
                    "Top Music Genres": "Other Genres (Latin, EDM, etc.)",
                    "Percentage": 5
                },
                {
                    "Year": "2013",
                    "Age Group": "Gen Z",
                    "Top Music Genres": "Other genres (Latin, EDM, etc.)",
                    "Percentage": 10
                },
                {
                    "Year": "2023",
                    "Age Group": "Millennials",
                    "Top Music Genres": "Pop",
                    "Percentage": 40
                },
                {
                    "Year": "2023",
                    "Age Group": "Gen Z",
                    "Top Music Genres": "Pop",
                    "Percentage": 40
                },
                {
                    "Year": "2023",
                    "Age Group": "Millennials",
                    "Top Music Genres": "Hip-Hop/Rap",
                    "Percentage": 30
                },
                {
                    "Year": "2023",
                    "Age Group": "Gen Z",
                    "Top Music Genres": "Hip-Hop/Rap",
                    "Percentage": 10
                },
                {
                    "Year": "2023",
                    "Age Group": "Millennials",
                    "Top Music Genres": "Other genres (Latin, EDM, etc.)",
                    "Percentage": 5
                },
                {
                    "Year": "2023",
                    "Age Group": "Gen Z",
                    "Top Music Genres": "Other genres (Latin, EDM, etc.)",
                    "Percentage": 5
                }
            ]
        },

        "facet": {
            "column": { "field": "Age Group", "type": "nominal", "title": "Age Group" }
        },
        "spec": {
            "width": 500,
            "height": 400,
            "layer": [
                {
                    "mark": "line",
                    "encoding": {
                        "x": {
                            "field": "Year",
                            "type": "ordinal",
                            "title": "Year",
                            "axis": { "labelAngle": 0 }
                        },
                        "y": {
                            "field": "Percentage",
                            "type": "quantitative",
                            "title": "Percentage (%)"
                        },
                        "color": {
                            "field": "Top Music Genres",
                            "type": "nominal",
                            "title": "Top Music Genres",
                            "scale": {
                                "domain": ["Pop", "Hip-Hop/Rap"],
                                "range": ["#FF320E", "#4A4D7B"]
                            },
                            "legend": null
                        }
                    }
                },
                {
                    "mark": "area",
                    "encoding": {
                        "x": {
                            "field": "Year",
                            "type": "ordinal",
                            "title": "Year"
                        },
                        "y": {
                            "field": "Percentage",
                            "type": "quantitative"
                        },
                        "color": {
                            "field": "Top Music Genres",
                            "type": "nominal",
                            "scale": {
                                "domain": ["Hip-Hop/Rap"],
                                "range": ["#4A4D7B"]
                            },
                            "legend": null
                        },
                        "opacity": {
                            "value": 0.5
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Top Music Genres'] === 'Hip-Hop/Rap' && datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": { "type": "point", "filled": true, "size": 100 },
                    "encoding": {
                        "x": { "field": "Year", "type": "ordinal" },
                        "y": { "field": "Percentage", "type": "quantitative" },
                        "color": { "field": "Top Music Genres", "type": "nominal", "legend": null },
                        "tooltip": [
                            { "field": "Year", "type": "ordinal", "title": "Year" },
                            { "field": "Age Group", "type": "nominal", "title": "Age Group" },
                            { "field": "Top Music Genres", "type": "nominal", "title": "Top Music Genres" },
                            { "field": "Percentage", "type": "quantitative", "title": "Percentage (%)" }
                        ]
                    }
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "center",
                        "baseline": "bottom",
                        "dy": -10,
                        "fontSize": 12,
                        "color": "#4A4D7B",
                        "fontWeight": "bold"
                    },
                    "encoding": {
                        "x": { "field": "Year", "type": "ordinal" },
                        "y": { "field": "Percentage", "type": "quantitative" },
                        "text": { "field": "Year", "type": "ordinal" }
                    },
                    "transform": [
                        {
                            "filter": "datum['Top Music Genres'] === 'Hip-Hop/Rap' && datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": -125,
                        "dy": -275,
                        "fontSize": 16,
                        "color": "#FF320E",
                        "fontWeight": "bold"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "Pop"
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": -58,
                        "dy": -148,
                        "fontSize": 16,
                        "color": "#4A4D7B",
                        "fontWeight": "bold"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "Hip-Hop/Rap"
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": -75,
                        "dy": -125,
                        "fontSize": 12,
                        "color": "#2053DF",
                        "fontWeight": "bold"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "15% decrease"
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": 13,
                        "dy": -125,
                        "fontSize": 12,
                        "color": "#2053DF"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "in listeners over"
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": 15,
                        "dy": -110,
                        "fontSize": 12,
                        "color": "#2053DF"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "the past decade among Gen Zs"
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Gen Z'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": 10,
                        "dy": -125,
                        "fontSize": 12,
                        "color": "#A620DF"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "Steady increase in popularity for both pop"
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Millennials'"
                        }
                    ]
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "right",
                        "baseline": "bottom",
                        "dx": 10,
                        "dy": -110,
                        "fontSize": 12,
                        "color": "#A620DF"
                    },
                    "encoding": {
                        "x": { "datum": "2023", "type": "ordinal" },
                        "y": { "datum": 10, "type": "quantitative" },
                        "text": {
                            "value": "and hip-hop/rap genres within Millennials."
                        }
                    },
                    "transform": [
                        {
                            "filter": "datum['Age Group'] === 'Millennials'"
                        }
                    ]
                }
            ]
        }

    };

    // Embed the Vega-Lite chart
    vegaEmbed('#spotifyUserGenreChart', vlSpec, { renderer: 'svg' });
}

loadVis3();

async function loadVis3AllGenres() {

    // Vega-Lite specification for the line chart with small multiples
    const vlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Line chart showing Spotify top music genres by age group in 2013 and 2023.",
        "data": {
          "values": [
            {
              "Year": "2013",
              "Age Group": "Millennials",
              "Top Music Genres": "Pop",
              "Percentage": 35
            },
            {
              "Year": "2013",
              "Age Group": "Gen Z",
              "Top Music Genres": "Pop",
              "Percentage": 40
            },
            {
              "Year": "2013",
              "Age Group": "Millennials",
              "Top Music Genres": "Hip-Hop/Rap",
              "Percentage": 25
            },
            {
              "Year": "2013",
              "Age Group": "Gen Z",
              "Top Music Genres": "Hip-Hop/Rap",
              "Percentage": 25
            },
            {
              "Year": "2013",
              "Age Group": "Millennials",
              "Top Music Genres": "Other Genres (Latin, EDM, etc.)",
              "Percentage": 5
            },
            {
              "Year": "2013",
              "Age Group": "Gen Z",
              "Top Music Genres": "Other Genres (Latin, EDM, etc.)",
              "Percentage": 10
            },
            {
              "Year": "2023",
              "Age Group": "Millennials",
              "Top Music Genres": "Pop",
              "Percentage": 40
            },
            {
              "Year": "2023",
              "Age Group": "Gen Z",
              "Top Music Genres": "Pop",
              "Percentage": 40
            },
            {
              "Year": "2023",
              "Age Group": "Millennials",
              "Top Music Genres": "Hip-Hop/Rap",
              "Percentage": 30
            },
            {
              "Year": "2023",
              "Age Group": "Gen Z",
              "Top Music Genres": "Hip-Hop/Rap",
              "Percentage": 10
            },
            {
              "Year": "2023",
              "Age Group": "Millennials",
              "Top Music Genres": "Other Genres (Latin, EDM, etc.)",
              "Percentage": 5
            },
            {
              "Year": "2023",
              "Age Group": "Gen Z",
              "Top Music Genres": "Other Genres (Latin, EDM, etc.)",
              "Percentage": 5
            }
          ]
        },
        "facet": {
          "column": {"field": "Age Group", "type": "nominal", "title": "Age Group"}
        },
        "spec": {
          "width": 500,
          "height": 400,
          "layer": [
            {
              "mark": "line",
              "encoding": {
                "x": {
                  "field": "Year",
                  "type": "ordinal",
                  "title": "Year",
                  "axis": {"labelAngle": 0}
                },
                "y": {
                  "field": "Percentage",
                  "type": "quantitative",
                  "title": "Percentage (%)"
                },
                "color": {
                  "field": "Top Music Genres",
                  "type": "nominal",
                  "title": "Top Music Genres",
                  "scale": {
                    "domain": ["Pop", "Hip-Hop/Rap", "Other Genres (Latin, EDM, etc.)"],
                    "range": ["#FF320E", "#4A4D7B", "#32CD32"]
                  },
                  "legend": {"title": "Top Music Genres"}
                }
              }
            },
            {
              "mark": {"type": "point", "filled": true, "size": 100},
              "encoding": {
                "x": {"field": "Year", "type": "ordinal"},
                "y": {"field": "Percentage", "type": "quantitative"},
                "color": {
                  "field": "Top Music Genres",
                  "type": "nominal",
                  "legend": null
                },
                "tooltip": [
                  {"field": "Year", "type": "ordinal", "title": "Year"},
                  {"field": "Age Group", "type": "nominal", "title": "Age Group"},
                  {
                    "field": "Top Music Genres",
                    "type": "nominal",
                    "title": "Top Music Genres"
                  },
                  {
                    "field": "Percentage",
                    "type": "quantitative",
                    "title": "Percentage (%)"
                  }
                ]
              }
            },
            {
              "mark": {
                "type": "text",
                "align": "center",
                "baseline": "bottom",
                "dy": -10,
                "fontSize": 12,
                "color": "#4A4D7B",
                "fontWeight": "bold"
              },
              "encoding": {
                "x": {"field": "Year", "type": "ordinal"},
                "y": {"field": "Percentage", "type": "quantitative"},
                "text": {"field": "Year", "type": "ordinal"}
              }
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -125,
                "dy": -275,
                "fontSize": 16,
                "color": "#FF320E",
                "fontWeight": "bold"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "Pop"}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Gen Z'"}]
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -58,
                "dy": -148,
                "fontSize": 16,
                "color": "#4A4D7B",
                "fontWeight": "bold"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "Hip-Hop/Rap"}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Gen Z'"}]
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -75,
                "dy": -125,
                "fontSize": 12,
                "color": "#2053DF",
                "fontWeight": "bold"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "15% decrease"}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Gen Z'"}]
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": 13,
                "dy": -125,
                "fontSize": 12,
                "color": "#2053DF"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "in listeners over"}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Gen Z'"}]
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": 15,
                "dy": -110,
                "fontSize": 12,
                "color": "#2053DF"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "the past decade among Gen Zs"}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Gen Z'"}]
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": 10,
                "dy": -125,
                "fontSize": 12,
                "color": "#A620DF"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "Steady increase in popularity for both pop"}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Millennials'"}]
            },
            {
              "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": 10,
                "dy": -110,
                "fontSize": 12,
                "color": "#A620DF"
              },
              "encoding": {
                "x": {"datum": "2023", "type": "ordinal"},
                "y": {"datum": 10, "type": "quantitative"},
                "text": {"value": "and hip-hop/rap genres within Millennials."}
              },
              "transform": [{"filter": "datum['Age Group'] === 'Millennials'"}]
            }
          ]
        }
      };
      
    // Embed the Vega-Lite chart
    vegaEmbed('#vis3AllGenres', vlSpec, { renderer: 'svg' });
}

loadVis3AllGenres();

async function loadVis4() {
    // Define custom colors for each genre
    const genreColors = {
        "pop": "#ff320e",
        "world/traditional": "#E5E4E2",
        "hip-hop/rap": "#4a4d7b",
        "electronic/dance": "#D3D3D3",
        "r&b/soul": "#E5E4E2",
        "rock": "#D3D3D3"
    };

    const yourVlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": {
            "values": [
                { "Year": 2023, "Genre": "pop", "Rank": 1 },
                { "Year": 2023, "Genre": "world/traditional", "Rank": 2 },
                { "Year": 2023, "Genre": "hip-hop/rap", "Rank": 3 },
                { "Year": 2023, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2023, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2022, "Genre": "pop", "Rank": 1 },
                { "Year": 2022, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2022, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2022, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2022, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2021, "Genre": "pop", "Rank": 1 },
                { "Year": 2021, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2021, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2021, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2021, "Genre": "rock", "Rank": 5 },
                { "Year": 2020, "Genre": "pop", "Rank": 1 },
                { "Year": 2020, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2020, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2020, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2020, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2019, "Genre": "pop", "Rank": 1 },
                { "Year": 2019, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2019, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2019, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2019, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2018, "Genre": "hip-hop/rap", "Rank": 1 },
                { "Year": 2018, "Genre": "pop", "Rank": 2 },
                { "Year": 2018, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2018, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2018, "Genre": "rock", "Rank": 5 },
                { "Year": 2017, "Genre": "pop", "Rank": 1 },
                { "Year": 2017, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2017, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2017, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2017, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2016, "Genre": "pop", "Rank": 1 },
                { "Year": 2016, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2016, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2016, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2016, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2015, "Genre": "pop", "Rank": 1 },
                { "Year": 2015, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2015, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2015, "Genre": "rock", "Rank": 4 },
                { "Year": 2015, "Genre": "electronic/dance", "Rank": 5 },
                { "Year": 2014, "Genre": "pop", "Rank": 1 },
                { "Year": 2014, "Genre": "world/traditional", "Rank": 2 },
                { "Year": 2014, "Genre": "hip-hop/rap", "Rank": 3 },
                { "Year": 2014, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2014, "Genre": "rock", "Rank": 5 }
            ]
        },
        "transform": [
            { "impute": "Rank", "key": "Year", "groupby": ["Genre"], "value": null },
            {
                "calculate": "datum.Genre === 'r&b/soul' ? 5.5 : (datum.Genre === 'rock' ? 5.25 : datum.Rank)",
                "as": "AdjustedRank"
            }
        ],
        "width": 600,
        "height": 350,
        "view": {
            "stroke": "transparent"
        },
        "layer": [
            {
                "mark": "line",
                "encoding": {
                    "x": { "field": "Year", "type": "ordinal", "title": "Year" },
                    "y": {
                        "field": "AdjustedRank",
                        "type": "quantitative",
                        "title": "Rank",
                        "scale": { "domain": [6, 1] },
                        "axis": { "reverse": true }
                    },
                    "color": {
                        "field": "Genre",
                        "type": "nominal",
                        "scale": {
                            "domain": [
                                "pop",
                                "world/traditional",
                                "hip-hop/rap",
                                "electronic/dance",
                                "r&b/soul",
                                "rock"
                            ],
                            "range": [
                                "#ff320e",
                                "#E5E4E2",
                                "#4a4d7b",
                                "#D3D3D3",
                                "#E5E4E2",
                                "#D3D3D3"
                            ]
                        },
                        "legend": null
                    }
                }
            },
            {
                "mark": { "type": "point", "filled": true, "size": 80 },
                "encoding": {
                    "x": {
                        "field": "Year",
                        "type": "ordinal",
                        "axis": {
                            "labelAngle": 0,
                            "labelFontSize": 12,
                            "ticks": true,
                            "labelPadding": 10,
                            "labelOffset": 13
                        }
                    },
                    "y": {
                        "field": "AdjustedRank",
                        "type": "quantitative",
                        "scale": { "domain": [6, 1] },
                        "axis": { "reverse": true }
                    },
                    "color": {
                        "field": "Genre",
                        "type": "nominal",
                        "scale": {
                            "domain": [
                                "pop",
                                "world/traditional",
                                "hip-hop/rap",
                                "electronic/dance",
                                "r&b/soul",
                                "rock"
                            ],
                            "range": [
                                "#ff320e",
                                "#E5E4E2",
                                "#4a4d7b",
                                "#D3D3D3",
                                "#E5E4E2",
                                "#D3D3D3"
                            ]
                        },
                        "legend": null
                    },
                    "tooltip": [
                        { "field": "Year", "type": "ordinal", "title": "Year" },
                        { "field": "Genre", "type": "nominal", "title": "Genre" },
                        { "field": "Rank", "type": "ordinal", "title": "Rank" }
                    ]
                }
            },
            {
                "mark": { "type": "text", "align": "left", "dx": 35 },
                "transform": [{ "filter": { "field": "Year", "equal": 2023 } }],
                "encoding": {
                    "x": { "field": "Year", "type": "ordinal" },
                    "y": {
                        "field": "AdjustedRank",
                        "type": "quantitative",
                        "scale": { "domain": [6, 1] }
                    },
                    "text": { "field": "Genre" },
                    "color": {
                        "field": "Genre",
                        "type": "nominal",
                        "scale": {
                            "domain": [
                                "pop",
                                "world/traditional",
                                "hip-hop/rap",
                                "electronic/dance",
                                "r&b/soul",
                                "rock"
                            ],
                            "range": [
                                "#ff320e",
                                "#E5E4E2",
                                "#4a4d7b",
                                "#D3D3D3",
                                "#E5E4E2",
                                "#D3D3D3"
                            ]
                        }
                    }
                }
            },
            {
                "mark": { "type": "text", "fontSize": 12, "align": "left", "dx": -370, "dy": -40 },
                "encoding": {
                    "x": { "datum": 2023, "type": "ordinal" },
                    "y": { "datum": 3, "type": "quantitative" },
                    "text": { "value": "Hip-Hop/Rap surpasses Pop as" },
                    "color": { "value": "#4a4d7b" }
                }
            },
            {
                "mark": { "type": "text", "fontSize": 12, "align": "left", "dx": -370, "dy": -25 },
                "encoding": {
                    "x": { "datum": 2023, "type": "ordinal" },
                    "y": { "datum": 3, "type": "quantitative" },
                    "text": { "value": "the most popular genre in 2018" },
                    "color": { "value": "#4a4d7b" }
                }
            }
        ]
    };
    vegaEmbed("#topSpotifyGenresChart", yourVlSpec);
}

loadVis4();


// async function loadBillboard100LineChart() {
//     const vlSpec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         width: 600,
//         height: 400,
//         "data": {
//             "values": [
//                 // 2023 data
//                 { "year": 2023, "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "year": 2023, "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "year": 2023, "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "year": 2023, "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "year": 2023, "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//                 // { "year": 2023, "rank": 6, "song": "Calm Down", "artist": "Rema, Selena Gomez" },
//                 // { "year": 2023, "rank": 7, "song": "Die for You", "artist": "The Weeknd, Ariana Grande" },
//                 // { "year": 2023, "rank": 8, "song": "Fast Car", "artist": "Luke Combs" },
//                 // { "year": 2023, "rank": 9, "song": "Snooze", "artist": "SZA" },
//                 // { "year": 2023, "rank": 10, "song": "I'm Good (Blue)", "artist": "David Guetta, Bebe Rexha" },
//                 // 2022 data
//                 { "year": 2022, "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "year": 2022, "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "year": 2022, "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "year": 2022, "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "year": 2022, "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" },
//                 // { "year": 2022, "rank": 6, "song": "First Class", "artist": "Jack Harlow" },
//                 // { "year": 2022, "rank": 7, "song": "Big Energy", "artist": "Latto" },
//                 // { "year": 2022, "rank": 8, "song": "Ghost", "artist": "Justin Bieber" },
//                 // { "year": 2022, "rank": 9, "song": "Super Gremlin", "artist": "Kodak Black" },
//                 // { "year": 2022, "rank": 10, "song": "Cold Heart (Pnau Remix)", "artist": "Elton John, Dua Lipa" },
//                 // 2021 data
//                 { "year": 2021, "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "year": 2021, "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "year": 2021, "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "year": 2021, "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "year": 2021, "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" },
//                 // { "year": 2021, "rank": 6, "song": "Kiss Me More", "artist": "Doja Cat feat. SZA" },
//                 // { "year": 2021, "rank": 7, "song": "Leave the Door Open", "artist": "Silk Sonic (Bruno Mars, Anderson .Paak)" },
//                 // { "year": 2021, "rank": 8, "song": "Drivers License", "artist": "Olivia Rodrigo" },
//                 // { "year": 2021, "rank": 9, "song": "Montero (Call Me By Your Name)", "artist": "Lil Nas X" },
//                 // { "year": 2021, "rank": 10, "song": "Peaches", "artist": "Justin Bieber feat. Daniel Caesar, Giveon" },
//                 // // 2020 data
//                 { "year": 2020, "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "year": 2020, "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "year": 2020, "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "year": 2020, "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "year": 2020, "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" },
//                 // { "year": 2020, "rank": 6, "song": "Adore You", "artist": "Harry Styles" },
//                 // { "year": 2020, "rank": 7, "song": "Life Is Good", "artist": "Future feat. Drake" },
//                 // { "year": 2020, "rank": 8, "song": "Memories", "artist": "Maroon 5" },
//                 // { "year": 2020, "rank": 9, "song": "The Bones", "artist": "Maren Morris" },
//                 // { "year": 2020, "rank": 10, "song": "Someone You Loved", "artist": "Lewis Capaldi" },
//                 // 2019 data
//                 { "year": 2019, "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "year": 2019, "rank": 2, "song": "Sunflower (Spider-Man: Into the Spider-Verse)", "artist": "Post Malone, Swae Lee" },
//                 { "year": 2019, "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "year": 2019, "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "year": 2019, "rank": 5, "song": "Wow.", "artist": "Post Malone" },
//                 // { "year": 2019, "rank": 6, "song": "Happier", "artist": "Marshmello, Bastille" },
//                 // { "year": 2019, "rank": 7, "song": "7 Rings", "artist": "Ariana Grande" },
//                 // { "year": 2019, "rank": 8, "song": "Talk", "artist": "Khalid" },
//                 // { "year": 2019, "rank": 9, "song": "Sicko Mode", "artist": "Travis Scott" },
//                 // { "year": 2019, "rank": 10, "song": "Sucker", "artist": "Jonas Brothers" },
//                 // 2018 data
//                 { "year": 2018, "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "year": 2018, "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "year": 2018, "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "year": 2018, "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "year": 2018, "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//                 // { "year": 2018, "rank": 6, "song": "Psycho", "artist": "Post Malone feat. Ty Dolla $ign" },
//                 // { "year": 2018, "rank": 7, "song": "I Like It", "artist": "Cardi B, Bad Bunny, J Balvin" },
//                 // { "year": 2018, "rank": 8, "song": "The Middle", "artist": "Zedd, Maren Morris, Grey" },
//                 // { "year": 2018, "rank": 9, "song": "In My Feelings", "artist": "Drake" },
//                 // { "year": 2018, "rank": 10, "song": "Girls Like You", "artist": "Maroon 5 feat. Cardi B" },
//                 // 2017 data
//                 { "year": 2017, "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "year": 2017, "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "year": 2017, "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "year": 2017, "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "year": 2017, "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" },
//                 // { "year": 2017, "rank": 6, "song": "Bad and Boujee", "artist": "Migos feat. Lil Uzi Vert" },
//                 // { "year": 2017, "rank": 7, "song": "Closer", "artist": "The Chainsmokers feat. Halsey" },
//                 // { "year": 2017, "rank": 8, "song": "Body Like a Back Road", "artist": "Sam Hunt" },
//                 // { "year": 2017, "rank": 9, "song": "Believer", "artist": "Imagine Dragons" },
//                 // { "year": 2017, "rank": 10, "song": "Congratulations", "artist": "Post Malone feat. Quavo" },
//                 // 2016 data
//                 { "year": 2016, "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "year": 2016, "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "year": 2016, "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "year": 2016, "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "year": 2016, "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//                 // { "year": 2016, "rank": 6, "song": "Panda", "artist": "Desiigner" },
//                 // { "year": 2016, "rank": 7, "song": "Hello", "artist": "Adele" },
//                 // { "year": 2016, "rank": 8, "song": "Don't Let Me Down", "artist": "The Chainsmokers feat. Daya" },
//                 // { "year": 2016, "rank": 9, "song": "Can't Stop the Feeling!", "artist": "Justin Timberlake" },
//                 // { "year": 2016, "rank": 10, "song": "Closer", "artist": "The Chainsmokers feat. Halsey" },
//                 // 2015 data
//                 { "year": 2015, "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "year": 2015, "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "year": 2015, "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "year": 2015, "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "year": 2015, "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//                 // { "year": 2015, "rank": 6, "song": "Hello", "artist": "Adele" },
//                 // { "year": 2015, "rank": 7, "song": "Take Me to Church", "artist": "Hozier" },
//                 // { "year": 2015, "rank": 8, "song": "Sugar", "artist": "Maroon 5" },
//                 // { "year": 2015, "rank": 9, "song": "Cheerleader", "artist": "OMI" },
//                 // { "year": 2015, "rank": 10, "song": "Lean On", "artist": "Major Lazer & DJ Snake feat. MØ" },
//                 // 2014 data
//                 { "year": 2014, "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "year": 2014, "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "year": 2014, "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "year": 2014, "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "year": 2014, "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" },
//                 // { "year": 2014, "rank": 6, "song": "Rude", "artist": "Magic!" },
//                 // { "year": 2014, "rank": 7, "song": "Fancy", "artist": "Iggy Azalea feat. Charli XCX" },
//                 // { "year": 2014, "rank": 8, "song": "Bang Bang", "artist": "Jessie J, Ariana Grande, Nicki Minaj" },
//                 // { "year": 2014, "rank": 9, "song": "Problem", "artist": "Ariana Grande feat. Iggy Azalea" },
//                 // { "year": 2014, "rank": 10, "song": "Turn Down for What", "artist": "DJ Snake, Lil Jon" }
//             ]
//         },
//         "mark": "bar",
//         "encoding": {
//             "y": {
//                 "field": "song",
//                 "type": "nominal",
//                 "sort": "-x",
//                 "title": "Song"
//             },
//             "x": {
//                 "field": "rank",
//                 "type": "quantitative",
//                 "title": "Rank",
//                 "scale": { "domain": [1, 5], "nice": true },
//                 "axis": { "grid": true }
//             },
//             "color": {
//                 "field": "artist",
//                 "type": "nominal",
//                 "title": "Artist"
//             },
//             "tooltip": [
//                 { "field": "year", "type": "ordinal", "title": "Year" },
//                 { "field": "song", "type": "nominal", "title": "Song" },
//                 { "field": "artist", "type": "nominal", "title": "Artist" },
//                 { "field": "rank", "type": "quantitative", "title": "Rank" }
//             ]
//         },
//         "facet": {
//             "field": "year",
//             "type": "ordinal",
//             "columns": 3, // Adjust number of columns based on your preference
//             "title": "Year"
//         },
//         "title": "Top 5 Billboard Hot 100 Songs (2014-2023)"
//     };

//     vegaEmbed('#billboard100Chart', vlSpec);
// }

// loadBillboard100LineChart();

// async function loadBillboard100FacetedBarChart() {
//     const vlSpec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         width: 200,
//         height: 300,
//         "data": {
//             "values": [
//                 { "year": 2023, "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "year": 2023, "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "year": 2023, "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "year": 2023, "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "year": 2023, "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//                 { "year": 2022, "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "year": 2022, "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "year": 2022, "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "year": 2022, "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "year": 2022, "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" },
//                 { "year": 2021, "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "year": 2021, "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "year": 2021, "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "year": 2021, "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "year": 2021, "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" },
//                 { "year": 2020, "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "year": 2020, "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "year": 2020, "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "year": 2020, "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "year": 2020, "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" },
//                 { "year": 2019, "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "year": 2019, "rank": 2, "song": "Sunflower (Spider-Man: Into the Spider-Verse)", "artist": "Post Malone, Swae Lee" },
//                 { "year": 2019, "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "year": 2019, "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "year": 2019, "rank": 5, "song": "Wow.", "artist": "Post Malone" },
//                 { "year": 2018, "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "year": 2018, "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "year": 2018, "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "year": 2018, "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "year": 2018, "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//                 { "year": 2017, "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "year": 2017, "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "year": 2017, "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "year": 2017, "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "year": 2017, "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" },
//                 { "year": 2016, "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "year": 2016, "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "year": 2016, "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "year": 2016, "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "year": 2016, "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//                 { "year": 2015, "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "year": 2015, "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "year": 2015, "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "year": 2015, "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "year": 2015, "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//                 { "year": 2014, "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "year": 2014, "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "year": 2014, "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "year": 2014, "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "year": 2014, "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" }
//             ]
//         },
//         "mark": "bar",
//         "encoding": {
//             "y": {
//                 "field": "song",
//                 "type": "nominal",
//                 "sort": "-x",
//                 "title": "Song"
//             },
//             "x": {
//                 "field": "rank",
//                 "type": "quantitative",
//                 "title": "Rank",
//                 "scale": { "domain": [1, 5], "nice": true },
//                 "axis": { "grid": true }
//             },
//             "color": {
//                 "field": "artist",
//                 "type": "nominal",
//                 "title": "Artist"
//             },
//             "tooltip": [
//                 { "field": "year", "type": "ordinal", "title": "Year" },
//                 { "field": "song", "type": "nominal", "title": "Song" },
//                 { "field": "artist", "type": "nominal", "title": "Artist" },
//                 { "field": "rank", "type": "quantitative", "title": "Rank" }
//             ]
//         },
//         "facet": {
//             "field": "year",
//             "type": "ordinal",
//             "columns": 3, // Adjust number of columns based on your preference
//             "title": "Year"
//         },
//         "title": "Top 5 Billboard Hot 100 Songs (2014-2023)"
//     };

//     vegaEmbed('#billboard100Chart', vlSpec);
// }

// loadBillboard100FacetedBarChart();

// async function loadBillboard100Charts() {
//     const yearsData = [
//         {
//             year: 2023, data: [
//                 { "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//                 // { "rank": 6, "song": "Calm Down", "artist": "Rema, Selena Gomez" },
//                 // { "rank": 7, "song": "Die for You", "artist": "The Weeknd, Ariana Grande" },
//                 // { "rank": 8, "song": "Fast Car", "artist": "Luke Combs" },
//                 // { "rank": 9, "song": "Snooze", "artist": "SZA" },
//                 // { "rank": 10, "song": "I'm Good (Blue)", "artist": "David Guetta, Bebe Rexha" }
//             ]
//         },
//         {
//             year: 2022, data: [
//                 { "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" },
//                 // { "rank": 6, "song": "First Class", "artist": "Jack Harlow" },
//                 // { "rank": 7, "song": "Big Energy", "artist": "Latto" },
//                 // { "rank": 8, "song": "Ghost", "artist": "Justin Bieber" },
//                 // { "rank": 9, "song": "Super Gremlin", "artist": "Kodak Black" },
//                 // { "rank": 10, "song": "Cold Heart (Pnau Remix)", "artist": "Elton John, Dua Lipa" }
//             ]
//         },
//         {
//             year: 2021, data: [
//                 { "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" },
//                 // { "rank": 6, "song": "Kiss Me More", "artist": "Doja Cat feat. SZA" },
//                 // { "rank": 7, "song": "Leave the Door Open", "artist": "Silk Sonic (Bruno Mars, Anderson .Paak)" },
//                 // { "rank": 8, "song": "Drivers License", "artist": "Olivia Rodrigo" },
//                 // { "rank": 9, "song": "Montero (Call Me By Your Name)", "artist": "Lil Nas X" },
//                 // { "rank": 10, "song": "Peaches", "artist": "Justin Bieber feat. Daniel Caesar, Giveon" }
//             ]
//         },
//         {
//             year: 2020, data: [
//                 { "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" },
//                 // { "rank": 6, "song": "Adore You", "artist": "Harry Styles" },
//                 // { "rank": 7, "song": "Life Is Good", "artist": "Future feat. Drake" },
//                 // { "rank": 8, "song": "Memories", "artist": "Maroon 5" },
//                 // { "rank": 9, "song": "The Bones", "artist": "Maren Morris" },
//                 // { "rank": 10, "song": "Someone You Loved", "artist": "Lewis Capaldi" }
//             ]
//         },
//         {
//             year: 2019, data: [
//                 { "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "rank": 2, "song": "Sunflower (Spider-Man: Into the Spider-Verse)", "artist": "Post Malone, Swae Lee" },
//                 { "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "rank": 5, "song": "Wow.", "artist": "Post Malone" },
//                 // { "rank": 6, "song": "Happier", "artist": "Marshmello, Bastille" },
//                 // { "rank": 7, "song": "7 Rings", "artist": "Ariana Grande" },
//                 // { "rank": 8, "song": "Talk", "artist": "Khalid" },
//                 // { "rank": 9, "song": "Sicko Mode", "artist": "Travis Scott" },
//                 // { "rank": 10, "song": "Sucker", "artist": "Jonas Brothers" }
//             ]
//         },
//         {
//             year: 2018, data: [
//                 { "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//             ]
//         },
//         {
//             year: 2017, data: [
//                 { "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" }
//             ]
//         },
//         {
//             year: 2016, data: [
//                 { "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//             ]
//         },
//         {
//             year: 2015, data: [
//                 { "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//             ]
//         },
//         {
//             year: 2014, data: [
//                 { "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" }
//             ]
//         },
//     ];

//     const layers = yearsData.map(yearData => ({
//         "data": { "values": yearData.data },
//         "title": `Top 5 Most Streamed Songs on Billboard Hot 100 in ${yearData.year}`,
//         "mark": "bar",
//         "encoding": {
//             "y": { "field": "song", "type": "nominal", "sort": "-x", "title": "Song" },
//             "x": {
//                 "field": "rank",
//                 "type": "quantitative",
//                 "title": "Rank",
//                 "scale": { "domain": [0, 10], "nice": true },
//                 "axis": { "grid": true, "format": "d" } // Ensure whole numbers (integers)
//             },
//             "color": { "field": "artist", "type": "nominal", "title": "Artist" },
//             "tooltip": [
//                 { "field": "song", "type": "nominal", "title": "Song" },
//                 { "field": "artist", "type": "nominal", "title": "Artist" },
//                 { "field": "rank", "type": "quantitative", "title": "Rank" }
//             ]
//         }
//     }));

//     const vlSpec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "vconcat": layers,
//         "config": {
//             "view": {
//                 "width": 600,
//                 "height": 400
//             }
//         }
//     };

//     vegaEmbed('#billboard100Chart', vlSpec);
// }

// loadBillboard100Charts();

// async function loadBillboard100Charts() {

//     const popArtists = [
//         'Miley Cyrus', 'Taylor Swift', 'Taylor Swift feat. Kendrick Lamar', 'Dua Lipa', 'Olivia Rodrigo',
//         'Ariana Grande', 'Ed Sheeran', 'Harry Styles', 'Billie Eilish',
//         'The Weeknd', 'Bruno Mars', 'Camila Cabello', 'Justin Bieber',
//         'Post Malone', 'Mark Ronson', 'Sam Smith', 'Meghan Trainor', 'Adele', 'Post Malone, Swae Lee'
//     ];

//     const yearsData = [
//         {
//             year: 2023, data: [
//                 { "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//                 // { "rank": 6, "song": "Calm Down", "artist": "Rema, Selena Gomez" },
//                 // { "rank": 7, "song": "Die for You", "artist": "The Weeknd, Ariana Grande" },
//                 // { "rank": 8, "song": "Fast Car", "artist": "Luke Combs" },
//                 // { "rank": 9, "song": "Snooze", "artist": "SZA" },
//                 // { "rank": 10, "song": "I'm Good (Blue)", "artist": "David Guetta, Bebe Rexha" }
//             ]
//         },
//         {
//             year: 2022, data: [
//                 { "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" },
//                 // { "rank": 6, "song": "First Class", "artist": "Jack Harlow" },
//                 // { "rank": 7, "song": "Big Energy", "artist": "Latto" },
//                 // { "rank": 8, "song": "Ghost", "artist": "Justin Bieber" },
//                 // { "rank": 9, "song": "Super Gremlin", "artist": "Kodak Black" },
//                 // { "rank": 10, "song": "Cold Heart (Pnau Remix)", "artist": "Elton John, Dua Lipa" }
//             ]
//         },
//         {
//             year: 2021, data: [
//                 { "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" },
//                 // { "rank": 6, "song": "Kiss Me More", "artist": "Doja Cat feat. SZA" },
//                 // { "rank": 7, "song": "Leave the Door Open", "artist": "Silk Sonic (Bruno Mars, Anderson .Paak)" },
//                 // { "rank": 8, "song": "Drivers License", "artist": "Olivia Rodrigo" },
//                 // { "rank": 9, "song": "Montero (Call Me By Your Name)", "artist": "Lil Nas X" },
//                 // { "rank": 10, "song": "Peaches", "artist": "Justin Bieber feat. Daniel Caesar, Giveon" }
//             ]
//         },
//         {
//             year: 2020, data: [
//                 { "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" },
//                 // { "rank": 6, "song": "Adore You", "artist": "Harry Styles" },
//                 // { "rank": 7, "song": "Life Is Good", "artist": "Future feat. Drake" },
//                 // { "rank": 8, "song": "Memories", "artist": "Maroon 5" },
//                 // { "rank": 9, "song": "The Bones", "artist": "Maren Morris" },
//                 // { "rank": 10, "song": "Someone You Loved", "artist": "Lewis Capaldi" }
//             ]
//         },
//         {
//             year: 2019, data: [
//                 { "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "rank": 2, "song": "Sunflower (Spider-Man: Into the Spider-Verse)", "artist": "Post Malone, Swae Lee" },
//                 { "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "rank": 5, "song": "Wow.", "artist": "Post Malone" },
//                 // { "rank": 6, "song": "Happier", "artist": "Marshmello, Bastille" },
//                 // { "rank": 7, "song": "7 Rings", "artist": "Ariana Grande" },
//                 // { "rank": 8, "song": "Talk", "artist": "Khalid" },
//                 // { "rank": 9, "song": "Sicko Mode", "artist": "Travis Scott" },
//                 // { "rank": 10, "song": "Sucker", "artist": "Jonas Brothers" }
//             ]
//         },
//         {
//             year: 2018, data: [
//                 { "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//             ]
//         },
//         {
//             year: 2017, data: [
//                 { "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" }
//             ]
//         },
//         {
//             year: 2016, data: [
//                 { "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//             ]
//         },
//         {
//             year: 2015, data: [
//                 { "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//             ]
//         },
//         {
//             year: 2014, data: [
//                 { "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" }
//             ]
//         },
//     ];

//     const layers = yearsData.map(yearData => {
//         yearData.data.forEach(song => {
//             // Add a 'pop' field to classify the song as pop or not
//             song.pop = popArtists.includes(song.artist);
//         });

//         return {
//             "data": { "values": yearData.data },
//             "title": `Top 10 Most Streamed Songs on Billboard Hot 100 in ${yearData.year}`,
//             "mark": "bar",
//             "encoding": {
//                 "y": { "field": "song", "type": "nominal", "sort": "-x", "title": "Song" },
//                 "x": {
//                     "field": "rank",
//                     "type": "quantitative",
//                     "title": "Rank",
//                     "scale": { "domain": [0, 5], "nice": true },
//                     "axis": { "grid": true, "format": "d" } // Ensure whole numbers (integers)
//                 },
//                 "color": {
//                     "field": "pop",
//                     "type": "nominal",
//                     "legend": {
//                         "title": "Song Type",
//                         "values": [true, false],  // This defines the order and presence of values in the legend
//                         "labelExpr": "datum.value ? 'Pop' : 'Other Genres'" // Custom text for true/false
//                     },
//                     "scale": {
//                         "domain": [true, false],  // true = Pop, false = Other Genres
//                         "range": ["#FF6347", "#D3D3D3"] // Pop = bright red, Other Genres = light grayish blue
//                     }
//                 },
//                 "tooltip": [
//                     { "field": "song", "type": "nominal", "title": "Song" },
//                     { "field": "artist", "type": "nominal", "title": "Artist" },
//                     { "field": "rank", "type": "quantitative", "title": "Rank" }
//                 ]
//             }
//         };
//     });

//     const vlSpec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "vconcat": layers,
//         "config": {
//             "view": {
//                 "width": 600,
//                 "height": 400
//             }
//         }
//     };

//     vegaEmbed('#billboard100Chart', vlSpec);
// }

// loadBillboard100Charts();

// WORKING BILLBOARD 100 CHART ===============================================================================================
// async function loadBillboard100Charts() {
//     const popArtists = [
//         'Miley Cyrus', 'Taylor Swift', 'Taylor Swift feat. Kendrick Lamar', 'Dua Lipa', 'Olivia Rodrigo',
//         'Ariana Grande', 'Ed Sheeran', 'Harry Styles', 'Billie Eilish',
//         'The Weeknd', 'Bruno Mars', 'Camila Cabello', 'Justin Bieber',
//         'Post Malone', 'Mark Ronson', 'Sam Smith', 'Meghan Trainor', 'Adele', 'Post Malone, Swae Lee'
//     ];

//     const yearsData = [
//         {
//             year: 2023, data: [
//                 { "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//             ]

//         },
//         {
//             year: 2022, data: [
//                 { "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" },
//                 // { "rank": 6, "song": "First Class", "artist": "Jack Harlow" },
//                 // { "rank": 7, "song": "Big Energy", "artist": "Latto" },
//                 // { "rank": 8, "song": "Ghost", "artist": "Justin Bieber" },
//                 // { "rank": 9, "song": "Super Gremlin", "artist": "Kodak Black" },
//                 // { "rank": 10, "song": "Cold Heart (Pnau Remix)", "artist": "Elton John, Dua Lipa" }
//             ]
//         },
//         {
//             year: 2021, data: [
//                 { "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" },
//                 // { "rank": 6, "song": "Kiss Me More", "artist": "Doja Cat feat. SZA" },
//                 // { "rank": 7, "song": "Leave the Door Open", "artist": "Silk Sonic (Bruno Mars, Anderson .Paak)" },
//                 // { "rank": 8, "song": "Drivers License", "artist": "Olivia Rodrigo" },
//                 // { "rank": 9, "song": "Montero (Call Me By Your Name)", "artist": "Lil Nas X" },
//                 // { "rank": 10, "song": "Peaches", "artist": "Justin Bieber feat. Daniel Caesar, Giveon" }
//             ]
//         },
//         {
//             year: 2020, data: [
//                 { "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" },
//                 // { "rank": 6, "song": "Adore You", "artist": "Harry Styles" },
//                 // { "rank": 7, "song": "Life Is Good", "artist": "Future feat. Drake" },
//                 // { "rank": 8, "song": "Memories", "artist": "Maroon 5" },
//                 // { "rank": 9, "song": "The Bones", "artist": "Maren Morris" },
//                 // { "rank": 10, "song": "Someone You Loved", "artist": "Lewis Capaldi" }
//             ]
//         },
//         {
//             year: 2019, data: [
//                 { "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "rank": 2, "song": "Sunflower (Spider-Man: Into the Spider-Verse)", "artist": "Post Malone, Swae Lee" },
//                 { "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "rank": 5, "song": "Wow.", "artist": "Post Malone" },
//                 // { "rank": 6, "song": "Happier", "artist": "Marshmello, Bastille" },
//                 // { "rank": 7, "song": "7 Rings", "artist": "Ariana Grande" },
//                 // { "rank": 8, "song": "Talk", "artist": "Khalid" },
//                 // { "rank": 9, "song": "Sicko Mode", "artist": "Travis Scott" },
//                 // { "rank": 10, "song": "Sucker", "artist": "Jonas Brothers" }
//             ]
//         },
//         {
//             year: 2018, data: [
//                 { "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//             ]
//         },
//         {
//             year: 2017, data: [
//                 { "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" }
//             ]
//         },
//         {
//             year: 2016, data: [
//                 { "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//             ]
//         },
//         {
//             year: 2015, data: [
//                 { "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//             ]
//         },
//         {
//             year: 2014, data: [
//                 { "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" }
//             ]
//         }
//         // Add other year data similarly...
//     ];

//     // Create a container for the individual charts
//     const slideshowContainer = document.getElementById('slideshowContainer');

//     // Initialize layers and chart divs
//     const layers = [];
//     yearsData.forEach((yearData, index) => {
//         yearData.data.forEach(song => {
//             song.pop = popArtists.includes(song.artist);
//         });

//         const chartDiv = document.createElement('div');
//         chartDiv.classList.add('chart');
//         chartDiv.id = `chart-${yearData.year}`;
//         slideshowContainer.appendChild(chartDiv);

//         const vlSpec = {
//             "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//             "data": { "values": yearData.data },
//             "title": `Top 5 Most Streamed Songs on Billboard Hot 100 in ${yearData.year}`,
//             "mark": "bar",
//             width: 600,
//             height: 400,
//             "encoding": {
//                 "y": { "field": "song", "type": "nominal", "sort": "x", "title": "Song" },
//                 "x": {
//                     "field": "rank",
//                     "type": "quantitative",
//                     "title": "Rank",
//                     "scale": { "domain": [0, 5], "nice": true },
//                     "axis": { "grid": true, "format": "d" }
//                 },
//                 "color": {
//                     "field": "pop",
//                     "type": "nominal",
//                     "legend": {
//                         "title": "Song Type",
//                         "values": [true, false],  // This defines the order and presence of values in the legend
//                         "labelExpr": "datum.value ? 'Pop' : 'Other Genres'" // Custom text for true/false
//                     },
//                     "scale": {
//                         "domain": [true, false],  // true = Pop, false = Other Genres
//                         "range": ["#ff320e", "#D3D3D3"] // Pop = bright red, Other Genres = light grayish blue
//                     }
//                 },
//                 "tooltip": [
//                     { "field": "song", "type": "nominal", "title": "Song" },
//                     { "field": "artist", "type": "nominal", "title": "Artist" },
//                     { "field": "rank", "type": "quantitative", "title": "Rank" }
//                 ]
//             }
//         };

//         vegaEmbed(`#chart-${yearData.year}`, vlSpec).then(() => {
//             // Initially hide all charts except the first one
//             if (index !== 0) {
//                 chartDiv.style.display = 'none';
//             }
//         }).catch(err => console.error(err)); // Handle any errors that occur during embedding
//     });

//     // Handle the slider change event
//     const slider = document.getElementById('yearSlider');
//     const currentYearDisplay = document.getElementById('currentYear');

//     slider.addEventListener('input', function () {
//         const selectedYearIndex = this.value;
//         const selectedYear = yearsData[selectedYearIndex].year;

//         // Display the selected year
//         currentYearDisplay.textContent = `Year: ${selectedYear}`;

//         // Hide all charts and show the selected year’s chart
//         const allCharts = document.querySelectorAll('.chart');
//         allCharts.forEach(chart => chart.style.display = 'none');
//         document.getElementById(`chart-${selectedYear}`).style.display = 'block';
//     });
// }

// loadBillboard100Charts(); //old vis

// async function loadBillboard100Charts() {
//     const popArtists = [
//         'Miley Cyrus', 'Taylor Swift', 'Taylor Swift feat. Kendrick Lamar', 'Dua Lipa', 'Olivia Rodrigo',
//         'Ariana Grande', 'Ed Sheeran', 'Harry Styles', 'Billie Eilish',
//         'The Weeknd', 'Bruno Mars', 'Camila Cabello', 'Justin Bieber',
//         'Post Malone', 'Mark Ronson', 'Sam Smith', 'Meghan Trainor', 'Adele', 'Post Malone, Swae Lee'
//     ];

//     const yearsData = [
//         {
//             year: 2023, data: [
//                 { "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//             ]

//         },
//         {
//             year: 2022, data: [
//                 { "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" }
//             ]
//         },
//         {
//             year: 2021, data: [
//                 { "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" }
//             ]
//         },
//         {
//             year: 2020, data: [
//                 { "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" }
//             ]
//         },
//         {
//             year: 2019, data: [
//                 { "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "rank": 2, "song": "Sunflower", "artist": "Post Malone, Swae Lee" },
//                 { "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "rank": 5, "song": "Wow.", "artist": "Post Malone" }
//             ]
//         },
//         {
//             year: 2018, data: [
//                 { "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//             ]
//         },
//         {
//             year: 2017, data: [
//                 { "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" }
//             ]
//         },
//         {
//             year: 2016, data: [
//                 { "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//             ]
//         },
//         {
//             year: 2015, data: [
//                 { "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//             ]
//         },
//         {
//             year: 2014, data: [
//                 { "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" }
//             ]
//         }
//         // Add other year data similarly...
//     ];

//     const slideshowContainer = document.getElementById('slideshowContainer');

//     yearsData.forEach((yearData, index) => {
//         yearData.data.forEach(song => {
//             song.pop = popArtists.includes(song.artist);
//         });

//         const chartDiv = document.createElement('div');
//         chartDiv.classList.add('chart');
//         chartDiv.id = `chart-${yearData.year}`;
//         slideshowContainer.appendChild(chartDiv);

//         const vlSpec = {
//             "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//             "data": { "values": yearData.data },
//             "title": `Top 5 Most Streamed Songs on Billboard Hot 100 in ${yearData.year}`,
//             "mark": "bar",
//             width: 600,
//             height: 400,
//             "encoding": {
//                 "y": { "field": "song", "type": "nominal", "sort": "x", "title": "Song" },
//                 "x": {
//                     "field": "rank",
//                     "type": "quantitative",
//                     "title": "Rank",
//                     "scale": { "domain": [0, 5], "nice": true },
//                     "axis": { "grid": true, "format": "d" }
//                 },
//                 "color": {
//                     "field": "pop",
//                     "type": "nominal",
//                     "legend": {
//                         "title": "Song Type",
//                         "values": [true, false],  // This defines the order and presence of values in the legend
//                         "labelExpr": "datum.value ? 'Pop' : 'Other Genres'" // Custom text for true/false
//                     },
//                     "scale": {
//                         "domain": [true, false],  // true = Pop, false = Other Genres
//                         "range": ["#ff320e", "#D3D3D3"] // Pop = bright red, Other Genres = light grayish blue
//                     }
//                 },
//                 "tooltip": [
//                     { "field": "song", "type": "nominal", "title": "Song" },
//                     { "field": "artist", "type": "nominal", "title": "Artist" },
//                     { "field": "rank", "type": "quantitative", "title": "Rank" }
//                 ]
//             }
//         };

//         vegaEmbed(`#chart-${yearData.year}`, vlSpec).then(() => {
//             if (index !== 0) {
//                 chartDiv.style.display = 'none';
//             }
//         }).catch(err => console.error(err));
//     });

//     const slider = document.getElementById('yearSlider');
//     const currentYearDisplay = document.getElementById('currentYear');

//     let currentYearIndex = 0;
//     const targetYearIndex = yearsData.findIndex(y => y.year === 2018);
//     let intervalId = null;

//     function showChartForYear(yearIndex) {
//         currentYearDisplay.textContent = `Year: ${yearsData[yearIndex].year}`;
//         const allCharts = document.querySelectorAll('.chart');
//         allCharts.forEach(chart => chart.style.display = 'none');
//         document.getElementById(`chart-${yearsData[yearIndex].year}`).style.display = 'block';
//     }

//     function startAnimation() {
//         intervalId = setInterval(() => {
//             showChartForYear(currentYearIndex);
//             slider.value = currentYearIndex;
//             if (currentYearIndex >= targetYearIndex) {
//                 clearInterval(intervalId);
//             } else {
//                 currentYearIndex++;
//             }
//         }, 300); // Change the duration as needed
//     }

//     slider.addEventListener('input', function () {
//         clearInterval(intervalId); // Stop the animation if the slider is used manually
//         currentYearIndex = parseInt(this.value);
//         showChartForYear(currentYearIndex);
//     });

//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 startAnimation();
//                 observer.unobserve(slideshowContainer);
//             }
//         });
//     });

//     observer.observe(slideshowContainer);
// }

// loadBillboard100Charts();

// async function loadVis5() {
//     const popArtists = [
//         'Miley Cyrus', 'Taylor Swift', 'Taylor Swift feat. Kendrick Lamar', 'Dua Lipa', 'Olivia Rodrigo',
//         'Ariana Grande', 'Ed Sheeran', 'Harry Styles', 'Billie Eilish',
//         'The Weeknd', 'Bruno Mars', 'Camila Cabello', 'Justin Bieber',
//         'Post Malone', 'Mark Ronson', 'Sam Smith', 'Meghan Trainor', 'Adele', 'Post Malone, Swae Lee'
//     ];

//     const yearsData = [
//         {
//             year: 2023, data: [
//                 { "rank": 1, "song": "Last Night", "artist": "Morgan Wallen" },
//                 { "rank": 2, "song": "Flowers", "artist": "Miley Cyrus" },
//                 { "rank": 3, "song": "Kill Bill", "artist": "SZA" },
//                 { "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift" },
//                 { "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage" },
//             ]

//         },
//         {
//             year: 2022, data: [
//                 { "rank": 1, "song": "Heat Waves", "artist": "Glass Animals" },
//                 { "rank": 2, "song": "As It Was", "artist": "Harry Styles" },
//                 { "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber" },
//                 { "rank": 4, "song": "Easy on Me", "artist": "Adele" },
//                 { "rank": 5, "song": "Shivers", "artist": "Ed Sheeran" }
//             ]
//         },
//         {
//             year: 2021, data: [
//                 { "rank": 1, "song": "Levitating", "artist": "Dua Lipa" },
//                 { "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande" },
//                 { "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior" },
//                 { "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo" }
//             ]
//         },
//         {
//             year: 2020, data: [
//                 { "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd" },
//                 { "rank": 2, "song": "Circles", "artist": "Post Malone" },
//                 { "rank": 3, "song": "The Box", "artist": "Roddy Ricch" },
//                 { "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa" },
//                 { "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch" }
//             ]
//         },
//         {
//             year: 2019, data: [
//                 { "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus" },
//                 { "rank": 2, "song": "Sunflower", "artist": "Post Malone, Swae Lee" },
//                 { "rank": 3, "song": "Without Me", "artist": "Halsey" },
//                 { "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish" },
//                 { "rank": 5, "song": "Wow.", "artist": "Post Malone" }
//             ]
//         },
//         {
//             year: 2018, data: [
//                 { "rank": 1, "song": "God's Plan", "artist": "Drake" },
//                 { "rank": 2, "song": "Perfect", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line" },
//                 { "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug" },
//                 { "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage" },
//             ]
//         },
//         {
//             year: 2017, data: [
//                 { "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran" },
//                 { "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber" },
//                 { "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars" },
//                 { "rank": 4, "song": "Humble", "artist": "Kendrick Lamar" },
//                 { "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay" }
//             ]
//         },
//         {
//             year: 2016, data: [
//                 { "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber" },
//                 { "rank": 2, "song": "Sorry", "artist": "Justin Bieber" },
//                 { "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla" },
//                 { "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake" },
//                 { "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots" },
//             ]
//         },
//         {
//             year: 2015, data: [
//                 { "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars" },
//                 { "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran" },
//                 { "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth" },
//                 { "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd" },
//                 { "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar" },
//             ]
//         },
//         {
//             year: 2014, data: [
//                 { "rank": 1, "song": "Happy", "artist": "Pharrell Williams" },
//                 { "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor" },
//                 { "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift" },
//                 { "rank": 4, "song": "All of Me", "artist": "John Legend" },
//                 { "rank": 5, "song": "Stay with Me", "artist": "Sam Smith" }
//             ]
//         }
//         // Add other year data similarly...
//     ];

//     const slideshowContainer = document.getElementById('slideshowContainer');

//     yearsData.forEach((yearData, index) => {
//         yearData.data.forEach(song => {
//             song.pop = popArtists.includes(song.artist);
//         });

//         const chartDiv = document.createElement('div');
//         chartDiv.classList.add('chart');
//         chartDiv.id = `chart-${yearData.year}`;
//         slideshowContainer.appendChild(chartDiv);

//         const vlSpec = {
//             "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//             "data": { "values": yearData.data },
//             "title": `Top 5 Most Streamed Songs on Billboard Hot 100 in ${yearData.year}`,
//             "mark": "bar",
//             width: 600,
//             height: 400,
//             "encoding": {
//                 "y": { "field": "song", "type": "nominal", "sort": "x", "title": "Song" },
//                 "x": {
//                     "field": "rank",
//                     "type": "quantitative",
//                     "title": "Rank",
//                     "scale": { "domain": [0, 5], "nice": true },
//                     "axis": { "grid": true, "format": "d" }
//                 },
//                 "color": {
//                     "field": "pop",
//                     "type": "nominal",
//                     "legend": {
//                         "title": "Song Type",
//                         "values": [true, false],
//                         "labelExpr": "datum.value ? 'Pop' : 'Other Genres'"
//                     },
//                     "scale": {
//                         "domain": [true, false],
//                         "range": ["#ff320e", "#D3D3D3"]
//                     }
//                 },
//                 "tooltip": [
//                     { "field": "song", "type": "nominal", "title": "Song" },
//                     { "field": "artist", "type": "nominal", "title": "Artist" },
//                     { "field": "rank", "type": "quantitative", "title": "Rank" }
//                 ]
//             }
//         };

//         vegaEmbed(`#chart-${yearData.year}`, vlSpec, { renderer: 'svg' }).then(() => {
//             if (index !== 0) {
//                 chartDiv.style.display = 'none';
//             }
//         }).catch(err => console.error(err));

//     });

//     const slider = document.getElementById('yearSlider');
//     const currentYearDisplay = document.getElementById('currentYear');

//     let currentYearIndex = 0;
//     const targetYearIndex = yearsData.findIndex(y => y.year === 2018);
//     let intervalId = null;

//     function showChartForYear(yearIndex) {
//         currentYearDisplay.textContent = `Year: ${yearsData[yearIndex].year}`;
//         const allCharts = document.querySelectorAll('.chart');
//         allCharts.forEach(chart => chart.style.display = 'none');
//         document.getElementById(`chart-${yearsData[yearIndex].year}`).style.display = 'block';
//     }

//     function startAnimation() {
//         intervalId = setInterval(() => {
//             showChartForYear(currentYearIndex);
//             slider.value = currentYearIndex;
//             if (currentYearIndex >= targetYearIndex) {
//                 clearInterval(intervalId);
//             } else {
//                 currentYearIndex++;
//             }
//         }, 300);
//     }

//     slider.addEventListener('input', function () {
//         clearInterval(intervalId);
//         currentYearIndex = parseInt(this.value);
//         showChartForYear(currentYearIndex);
//     });

//     slider.setAttribute('min', 0);
//     slider.setAttribute('max', yearsData.length - 1);
//     slider.setAttribute('step', 1);

//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 startAnimation();
//                 observer.unobserve(slideshowContainer);
//             }
//         });
//     });

//     observer.observe(slideshowContainer);

//     // Add year ticks to slider
//     const ticksContainer = document.querySelector('.slider-ticks');
//     yearsData.forEach((yearData, index) => {
//         const tick = document.createElement('div');
//         tick.classList.add('slider-tick');
//         tick.style.left = `${(index / (yearsData.length - 1)) * 100}%`;
//         tick.textContent = yearData.year;
//         ticksContainer.appendChild(tick);
//     });
// }

// loadVis5();





// Update your loadVis5 function to use the streams data
async function loadVis5() {
    const popArtists = [
        'Miley Cyrus', 'Taylor Swift', 'Taylor Swift feat. Kendrick Lamar', 'Dua Lipa', 'Olivia Rodrigo',
        'Ariana Grande', 'Ed Sheeran', 'Harry Styles', 'Billie Eilish',
        'The Weeknd', 'Bruno Mars', 'Camila Cabello', 'Justin Bieber',
        'Post Malone', 'Mark Ronson', 'Sam Smith', 'Meghan Trainor', 'Adele', 'Post Malone, Swae Lee'
    ];

    const yearsData = [
        {
            year: 2023, data: [
                { "rank": 1, "song": "Last Night", "artist": "Morgan Wallen", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Flowers", "artist": "Miley Cyrus", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "Kill Bill", "artist": "SZA", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Anti-Hero", "artist": "Taylor Swift", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Creepin'", "artist": "Metro Boomin, The Weeknd, 21 Savage", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2022, data: [
                { "rank": 1, "song": "Heat Waves", "artist": "Glass Animals", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "As It Was", "artist": "Harry Styles", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "Stay", "artist": "The Kid Laroi, Justin Bieber", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Easy on Me", "artist": "Adele", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Shivers", "artist": "Ed Sheeran", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2021, data: [
                { "rank": 1, "song": "Levitating", "artist": "Dua Lipa", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Save Your Tears", "artist": "The Weeknd, Ariana Grande", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "Blinding Lights", "artist": "The Weeknd", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Mood", "artist": "24kGoldn feat. Iann Dior", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Good 4 U", "artist": "Olivia Rodrigo", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2020, data: [
                { "rank": 1, "song": "Blinding Lights", "artist": "The Weeknd", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Circles", "artist": "Post Malone", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "The Box", "artist": "Roddy Ricch", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Don't Start Now", "artist": "Dua Lipa", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Rockstar", "artist": "DaBaby feat. Roddy Ricch", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2019, data: [
                { "rank": 1, "song": "Old Town Road", "artist": "Lil Nas X feat. Billy Ray Cyrus", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Sunflower", "artist": "Post Malone, Swae Lee", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "Without Me", "artist": "Halsey", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Bad Guy", "artist": "Billie Eilish", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Wow.", "artist": "Post Malone", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2018, data: [
                { "rank": 1, "song": "God's Plan", "artist": "Drake", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Perfect", "artist": "Ed Sheeran", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "Meant to Be", "artist": "Bebe Rexha, Florida Georgia Line", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Havana", "artist": "Camila Cabello feat. Young Thug", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Rockstar", "artist": "Post Malone feat. 21 Savage", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2017, data: [
                { "rank": 1, "song": "Shape of You", "artist": "Ed Sheeran", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee feat. Justin Bieber", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "That's What I Like", "artist": "Bruno Mars", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Humble", "artist": "Kendrick Lamar", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Something Just Like This", "artist": "The Chainsmokers, Coldplay", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        },
        {
            year: 2016, data: [
                { "rank": 1, "song": "Love Yourself", "artist": "Justin Bieber", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Sorry", "artist": "Justin Bieber", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "One Dance", "artist": "Drake feat. Wizkid, Kyla", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Work", "artist": "Rihanna feat. Drake", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Stressed Out", "artist": "Twenty One Pilots", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 },
            ]
        },
        {
            year: 2015, data: [
                { "rank": 1, "song": "Uptown Funk", "artist": "Mark Ronson feat. Bruno Mars", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "Thinking Out Loud", "artist": "Ed Sheeran", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "See You Again", "artist": "Wiz Khalifa feat. Charlie Puth", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "Can't Feel My Face", "artist": "The Weeknd", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Bad Blood", "artist": "Taylor Swift feat. Kendrick Lamar", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 },
            ]
        },
        {
            year: 2014, data: [
                { "rank": 1, "song": "Happy", "artist": "Pharrell Williams", "streams": Math.floor(Math.random() * (800000000 - 750000000 + 1)) + 750000000 },
                { "rank": 2, "song": "All About That Bass", "artist": "Meghan Trainor", "streams": Math.floor(Math.random() * (749999999 - 700000000 + 1)) + 700000000 },
                { "rank": 3, "song": "Shake It Off", "artist": "Taylor Swift", "streams": Math.floor(Math.random() * (699999999 - 650000000 + 1)) + 650000000 },
                { "rank": 4, "song": "All of Me", "artist": "John Legend", "streams": Math.floor(Math.random() * (649999999 - 600000000 + 1)) + 600000000 },
                { "rank": 5, "song": "Stay with Me", "artist": "Sam Smith", "streams": Math.floor(Math.random() * (599999999 - 550000000 + 1)) + 550000000 }
            ]
        }

        // Add other year data similarly...
    ];

    const slideshowContainer = document.getElementById('slideshowContainer');

    yearsData.forEach((yearData, index) => {
        yearData.data.forEach(song => {
            song.pop = popArtists.includes(song.artist);
        });

        const chartDiv = document.createElement('div');
        chartDiv.classList.add('chart');
        chartDiv.id = `chart-${yearData.year}`;
        slideshowContainer.appendChild(chartDiv);

        const vlSpec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": { "values": yearData.data },
            "title": `Top 5 Most Streamed Songs on Billboard Hot 100 in ${yearData.year}`,
            "mark": "bar",
            width: 600,
            height: 400,
            "encoding": {
                "y": { "field": "song", "type": "nominal", "sort": { "field": "rank", "order": "ascending" }, "title": "Song" },
                "x": {
                    "field": "streams",
                    "type": "quantitative",
                    "title": "Number of Streams (in Billions)",
                    "scale": { "domain": [0, 1000000000], "nice": true },
                    "axis": { "grid": true, "format": "s" }
                },
                "color": {
                    "field": "pop",
                    "type": "nominal",
                    "legend": {
                        "title": "Song Type",
                        "values": [true, false],
                        "labelExpr": "datum.value ? 'Pop' : 'Other Genres'"
                    },
                    "scale": {
                        "domain": [true, false],
                        "range": ["#ff320e", "#D3D3D3"]
                    }
                },
                "tooltip": [
                    { "field": "song", "type": "nominal", "title": "Song" },
                    { "field": "artist", "type": "nominal", "title": "Artist" },
                    { "field": "streams", "type": "quantitative", "title": "Streams" }
                ]
            }
        };

        vegaEmbed(`#chart-${yearData.year}`, vlSpec, { renderer: 'svg' }).then(() => {
            if (index !== 0) {
                chartDiv.style.display = 'none';
            }
        }).catch(err => console.error(err));

    });

    const slider = document.getElementById('yearSlider');
    const currentYearDisplay = document.getElementById('currentYear');

    let currentYearIndex = 0;
    const targetYearIndex = yearsData.findIndex(y => y.year === 2018);
    let intervalId = null;

    function showChartForYear(yearIndex) {
        currentYearDisplay.textContent = `Year: ${yearsData[yearIndex].year}`;
        const allCharts = document.querySelectorAll('.chart');
        allCharts.forEach(chart => chart.style.display = 'none');
        document.getElementById(`chart-${yearsData[yearIndex].year}`).style.display = 'block';
    }

    function startAnimation() {
        intervalId = setInterval(() => {
            showChartForYear(currentYearIndex);
            slider.value = currentYearIndex;
            if (currentYearIndex >= targetYearIndex) {
                clearInterval(intervalId);
            } else {
                currentYearIndex++;
            }
        }, 300);
    }

    slider.addEventListener('input', function () {
        clearInterval(intervalId);
        currentYearIndex = parseInt(this.value);
        showChartForYear(currentYearIndex);
    });

    slider.setAttribute('min', 0);
    slider.setAttribute('max', yearsData.length - 1);
    slider.setAttribute('step', 1);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(slideshowContainer);
            }
        });
    });

    observer.observe(slideshowContainer);

    // Add year ticks to slider
    const ticksContainer = document.querySelector('.slider-ticks');
    yearsData.forEach((yearData, index) => {
        const tick = document.createElement('div');
        tick.classList.add('slider-tick');
        tick.style.left = `${(index / (yearsData.length - 1)) * 100}%`;
        tick.textContent = yearData.year;
        ticksContainer.appendChild(tick);
    });
}

loadVis5();



// CLARK PUT UR CODE HERE ==================================================================================================

// Function to load data and create the chart
// async function loadTaylorSwiftViz() {
//     // Vega-Lite specification for the pie chart
//     const vlSpec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "description": "Taylor Swift album popularity trends based on opening week sales.",
//         "title": "Taylor Swift' First Week Sales for Each Album",
//         // "width": 650,
//         // "height": 400,
//         "data": {
//             "values": [
//                 { "release_date": "2006-10-24", "album_name": "Taylor Swift", "genre": "Country", "sales": 40000 },
//                 { "release_date": "2008-11-11", "album_name": "Fearless", "genre": "Country Pop", "sales": 592000 },
//                 { "release_date": "2010-10-25", "album_name": "Speak Now", "genre": "Country Pop", "sales": 1047000 },
//                 { "release_date": "2012-10-22", "album_name": "Red", "genre": "Country Pop", "sales": 1208000 },
//                 { "release_date": "2014-10-27", "album_name": "1989", "genre": "Synth-Pop", "sales": 1285000 },
//                 { "release_date": "2017-11-10", "album_name": "Reputation", "genre": "Pop", "sales": 1216000 },
//                 { "release_date": "2019-08-23", "album_name": "Lover", "genre": "Pop", "sales": 867000 },
//                 { "release_date": "2020-07-24", "album_name": "Folklore", "genre": "Indie Folk", "sales": 846000 },
//                 { "release_date": "2020-12-11", "album_name": "Evermore", "genre": "Indie Folk", "sales": 329000 },
//                 { "release_date": "2021-04-09", "album_name": "Fearless (Taylor's Version)", "genre": "Country Pop", "sales": 291000 },
//                 { "release_date": "2021-11-12", "album_name": "Red (Taylor's Version)", "genre": "Country Pop", "sales": 605000 },
//                 { "release_date": "2022-10-21", "album_name": "Midnights", "genre": "Synth-Pop", "sales": 1220000 },
//                 { "release_date": "2023-07-07", "album_name": "Speak Now (Taylor's Version)", "genre": "Country Pop", "sales": 716000 },
//                 { "release_date": "2023-10-27", "album_name": "1989 (Taylor's Version)", "genre": "Synth-Pop", "sales": 1653000 },
//                 { "release_date": "2024-04-19", "album_name": "The Tortured Poets Department", "genre": "Pop", "sales": 2610000 }
//             ]
//         },
//         "layer": [
//             {
//                 "mark": {
//                     "type": "line",
//                     "color": "#1DB954"
//                 },
//                 "encoding": {
//                     "x": {
//                         "field": "release_date",
//                         "type": "temporal",
//                         "title": "Release Date"
//                     },
//                     "y": {
//                         "field": "sales",
//                         "type": "quantitative",
//                         "title": "Opening Week Sales"
//                     }
//                 }
//             },
//             {
//                 "transform": [
//                     { "filter": "datum.album_name === 'Taylor Swift'" }
//                 ],
//                 "mark": {
//                     "type": "point",
//                     "filled": true,
//                     "tooltip": true,
//                     "size": 100,
//                     "color": "red"
//                 },
//                 "encoding": {
//                     "x": {
//                         "field": "release_date",
//                         "type": "temporal"
//                     },
//                     "y": {
//                         "field": "sales",
//                         "type": "quantitative"
//                     },
//                     "tooltip": [
//                         { "field": "album_name", "type": "nominal", "title": "Album Name" },
//                         { "field": "release_date", "type": "temporal", "title": "Release Date" },
//                         { "field": "genre", "type": "nominal", "title": "Genre" },
//                         { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
//                     ]
//                 }
//             },
//             {
//                 "transform": [
//                     { "filter": "datum.album_name === 'Fearless'" }
//                 ],
//                 "mark": {
//                     "type": "point",
//                     "filled": true,
//                     "tooltip": true,
//                     "color": "yellow",
//                     "size": 100
//                 },
//                 "encoding": {
//                     "x": {
//                         "field": "release_date",
//                         "type": "temporal"
//                     },
//                     "y": {
//                         "field": "sales",
//                         "type": "quantitative"
//                     },
//                     "tooltip": [
//                         { "field": "album_name", "type": "nominal", "title": "Album Name" },
//                         { "field": "release_date", "type": "temporal", "title": "Release Date" },
//                         { "field": "genre", "type": "nominal", "title": "Genre" },
//                         { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
//                     ]
//                 }
//             },
//             {
//                 "transform": [
//                     { "filter": "datum.album_name === '1989'" }
//                 ],
//                 "mark": {
//                     "type": "point",
//                     "filled": true,
//                     "tooltip": true,
//                     "color": "#1DB954",
//                     "size": 100
//                 },
//                 "encoding": {
//                     "x": {
//                         "field": "release_date",
//                         "type": "temporal"
//                     },
//                     "y": {
//                         "field": "sales",
//                         "type": "quantitative"
//                     },
//                     "tooltip": [
//                         { "field": "album_name", "type": "nominal", "title": "Album Name" },
//                         { "field": "release_date", "type": "temporal", "title": "Release Date" },
//                         { "field": "genre", "type": "nominal", "title": "Genre" },
//                         { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
//                     ]
//                 }
//             },
//             {
//                 "transform": [
//                     { "filter": "datum.album_name !== 'Taylor Swift' && datum.album_name !== 'Fearless' && datum.album_name !== '1989'" }
//                 ],
//                 "mark": {
//                     "type": "point",
//                     "filled": true,
//                     "tooltip": true,
//                     "color": "#1DB954"
//                 },
//                 "encoding": {
//                     "x": {
//                         "field": "release_date",
//                         "type": "temporal"
//                     },
//                     "y": {
//                         "field": "sales",
//                         "type": "quantitative"
//                     },
//                     "tooltip": [
//                         { "field": "album_name", "type": "nominal", "title": "Album Name" },
//                         { "field": "release_date", "type": "temporal", "title": "Release Date" },
//                         { "field": "genre", "type": "nominal", "title": "Genre" },
//                         { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
//                     ]
//                 }
//             }
//         ]
//     }
//     // Embed the Vega-Lite chart
//     vegaEmbed('#taylorSwiftViz', vlSpec);
// };

// loadTaylorSwiftViz();

// async function loadRegionalAppearancesInTop10() {
//     // Vega-Lite specification for the pie chart
//     const vlSpec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "description": "Accumulated appearances of songs from specific regions in Spotify's top 10 rankings over the past decade.",
//         "title": {
//             "text": "Spotify's Top 10 Song Rankings by Region (2014-2023)",
//             "fontsize": 18,
//             "color": "black",
//             "color": "black",
//             "align": "right",
//         },
//         "width": 800,
//         "height": 400,
//         "background": "#FFFFFF",
//         "background": "white",
//         "config": {
//             "view": {
//                 "padding": 50
//             },
//             "title": {
//                 "offset": 30
//             }
//         },
//         "data": {
//             "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
//             "format": {
//                 "type": "topojson",
//                 "feature": "countries"
//             }
//         },
//         "transform": [
//             {
//                 "lookup": "id",
//                 "from": {
//                     "data": {
//                         "values": [
//                             { "id": 434, "region": "Africa", "total_appearances": 0, "country": "Libya" },
//                             { "id": 768, "region": "Africa", "total_appearances": 0, "country": "Togo" },
//                             { "id": 562, "region": "Africa", "total_appearances": 0, "country": "Niger" },
//                             { "id": 854, "region": "Africa", "total_appearances": 0, "country": "Burkina Faso" },
//                             { "id": 12, "region": "Africa", "total_appearances": 0, "country": "Algeria" },
//                             { "id": 24, "region": "Africa", "total_appearances": 0, "country": "Angola" },
//                             { "id": 12, "region": "Africa", "total_appearances": 0, "country": "Algeria" },
//                             { "id": 24, "region": "Africa", "total_appearances": 0, "country": "Angola" },
//                             { "id": 72, "region": "Africa", "total_appearances": 0, "country": "Botswana" },
//                             { "id": 108, "region": "Africa", "total_appearances": 0, "country": "Burundi" },
//                             { "id": 120, "region": "Africa", "total_appearances": 0, "country": "Cameroon" },
//                             { "id": 140, "region": "Africa", "total_appearances": 0, "country": "Central African Republic" },
//                             { "id": 148, "region": "Africa", "total_appearances": 0, "country": "Chad" },
//                             { "id": 178, "region": "Africa", "total_appearances": 0, "country": "Republic of the Congo" },
//                             { "id": 180, "region": "Africa", "total_appearances": 0, "country": "Democratic Republic of the Congo" },
//                             { "id": 204, "region": "Africa", "total_appearances": 0, "country": "Benin" },
//                             { "id": 231, "region": "Africa", "total_appearances": 0, "country": "Ethiopia" },
//                             { "id": 232, "region": "Africa", "total_appearances": 0, "country": "Eritrea" },
//                             { "id": 262, "region": "Africa", "total_appearances": 0, "country": "Djibouti" },
//                             { "id": 266, "region": "Africa", "total_appearances": 0, "country": "Gabon" },
//                             { "id": 270, "region": "Africa", "total_appearances": 0, "country": "Gambia" },
//                             { "id": 288, "region": "Africa", "total_appearances": 0, "country": "Ghana" },
//                             { "id": 324, "region": "Africa", "total_appearances": 0, "country": "Guinea" },
//                             { "id": 384, "region": "Africa", "total_appearances": 0, "country": "Ivory Coast" },
//                             { "id": 404, "region": "Africa", "total_appearances": 0, "country": "Kenya" },
//                             { "id": 426, "region": "Africa", "total_appearances": 0, "country": "Lesotho" },
//                             { "id": 430, "region": "Africa", "total_appearances": 0, "country": "Liberia" },
//                             { "id": 450, "region": "Africa", "total_appearances": 0, "country": "Madagascar" },
//                             { "id": 454, "region": "Africa", "total_appearances": 0, "country": "Malawi" },
//                             { "id": 466, "region": "Africa", "total_appearances": 0, "country": "Mali" },
//                             { "id": 478, "region": "Africa", "total_appearances": 0, "country": "Mauritania" },
//                             { "id": 508, "region": "Africa", "total_appearances": 0, "country": "Mozambique" },
//                             { "id": 516, "region": "Africa", "total_appearances": 0, "country": "Namibia" },
//                             { "id": 566, "region": "Africa", "total_appearances": 0, "country": "Nigeria" },
//                             { "id": 646, "region": "Africa", "total_appearances": 0, "country": "Rwanda" },
//                             { "id": 686, "region": "Africa", "total_appearances": 0, "country": "Senegal" },
//                             { "id": 694, "region": "Africa", "total_appearances": 0, "country": "Sierra Leone" },
//                             { "id": 706, "region": "Africa", "total_appearances": 0, "country": "Somalia" },
//                             { "id": 710, "region": "Africa", "total_appearances": 0, "country": "South Africa" },
//                             { "id": 716, "region": "Africa", "total_appearances": 0, "country": "Zimbabwe" },
//                             { "id": 728, "region": "Africa", "total_appearances": 0, "country": "South Sudan" },
//                             { "id": 729, "region": "Africa", "total_appearances": 0, "country": "Sudan" },
//                             { "id": 732, "region": "Africa", "total_appearances": 0, "country": "Western Sahara" },
//                             { "id": 800, "region": "Africa", "total_appearances": 0, "country": "Uganda" },
//                             { "id": 834, "region": "Africa", "total_appearances": 0, "country": "Tanzania" },
//                             { "id": 818, "region": "Africa", "total_appearances": 0, "country": "Egypt" },
//                             { "id": 894, "region": "Africa", "total_appearances": 0, "country": "Zambia" },
//                             { "id": 204, "region": "Africa", "total_appearances": 0, "country": "Benin" },
//                             { "id": 840, "region": "North America", "total_appearances": 65, "country": "United States of America" },
//                             { "id": 250, "region": "Europe", "total_appearances": 22, "country": "Europe" },
//                             { "id": 156, "region": "Asia", "total_appearances": 2, "country": "Asia" },
//                             { "id": 36, "region": "Australia", "total_appearances": 3, "country": "Australia" },
//                             { "id": 124, "region": "North America", "total_appearances": 65, "country": "Canada" },
//                             { "id": 32, "region": "South America", "total_appearances": 8, "country": "Argentina" },
//                             { "id": 68, "region": "South America", "total_appearances": 8, "country": "Bolivia" },
//                             { "id": 76, "region": "South America", "total_appearances": 8, "country": "Brazil" },
//                             { "id": 152, "region": "South America", "total_appearances": 8, "country": "Chile" },
//                             { "id": 170, "region": "South America", "total_appearances": 8, "country": "Colombia" },
//                             { "id": 218, "region": "South America", "total_appearances": 8, "country": "Ecuador" },
//                             { "id": 328, "region": "South America", "total_appearances": 8, "country": "Guyana" },
//                             { "id": 600, "region": "South America", "total_appearances": 8, "country": "Paraguay" },
//                             { "id": 604, "region": "South America", "total_appearances": 8, "country": "Peru" },
//                             { "id": 740, "region": "South America", "total_appearances": 8, "country": "Suriname" },
//                             { "id": 858, "region": "South America", "total_appearances": 8, "country": "Uruguay" },
//                             { "id": 862, "region": "South America", "total_appearances": 8, "country": "Venezuela" },
//                             { "id": 8, "region": "Europe", "total_appearances": 22, "country": "Albania" },
//                             { "id": 20, "region": "Europe", "total_appearances": 22, "country": "Andorra" },
//                             { "id": 51, "region": "Europe", "total_appearances": 22, "country": "Armenia" },
//                             { "id": 40, "region": "Europe", "total_appearances": 22, "country": "Austria" },
//                             { "id": 31, "region": "Europe", "total_appearances": 22, "country": "Azerbaijan" },
//                             { "id": 112, "region": "Europe", "total_appearances": 22, "country": "Belarus" },
//                             { "id": 56, "region": "Europe", "total_appearances": 22, "country": "Belgium" },
//                             { "id": 70, "region": "Europe", "total_appearances": 22, "country": "Bosnia and Herzegovina" },
//                             { "id": 100, "region": "Europe", "total_appearances": 22, "country": "Bulgaria" },
//                             { "id": 191, "region": "Europe", "total_appearances": 22, "country": "Croatia" },
//                             { "id": 196, "region": "Europe", "total_appearances": 22, "country": "Cyprus" },
//                             { "id": 203, "region": "Europe", "total_appearances": 22, "country": "Czech Republic" },
//                             { "id": 208, "region": "Europe", "total_appearances": 22, "country": "Denmark" },
//                             { "id": 233, "region": "Europe", "total_appearances": 22, "country": "Estonia" },
//                             { "id": 246, "region": "Europe", "total_appearances": 22, "country": "Finland" },
//                             { "id": 250, "region": "Europe", "total_appearances": 22, "country": "France" },
//                             { "id": 268, "region": "Europe", "total_appearances": 22, "country": "Georgia" },
//                             { "id": 276, "region": "Europe", "total_appearances": 22, "country": "Germany" },
//                             { "id": 300, "region": "Europe", "total_appearances": 22, "country": "Greece" },
//                             { "id": 348, "region": "Europe", "total_appearances": 22, "country": "Hungary" },
//                             { "id": 352, "region": "Europe", "total_appearances": 22, "country": "Iceland" },
//                             { "id": 372, "region": "Europe", "total_appearances": 22, "country": "Ireland" },
//                             { "id": 380, "region": "Europe", "total_appearances": 22, "country": "Italy" },
//                             { "id": 398, "region": "Europe", "total_appearances": 22, "country": "Kazakhstan" },
//                             { "id": 383, "region": "Europe", "total_appearances": 22, "country": "Kosovo" },
//                             { "id": 428, "region": "Europe", "total_appearances": 22, "country": "Latvia" },
//                             { "id": 440, "region": "Europe", "total_appearances": 22, "country": "Lithuania" },
//                             { "id": 442, "region": "Europe", "total_appearances": 22, "country": "Luxembourg" },
//                             { "id": 470, "region": "Europe", "total_appearances": 22, "country": "Malta" },
//                             { "id": 498, "region": "Europe", "total_appearances": 22, "country": "Moldova" },
//                             { "id": 492, "region": "Europe", "total_appearances": 22, "country": "Monaco" },
//                             { "id": 499, "region": "Europe", "total_appearances": 22, "country": "Montenegro" },
//                             { "id": 528, "region": "Europe", "total_appearances": 22, "country": "Netherlands" },
//                             { "id": 807, "region": "Europe", "total_appearances": 22, "country": "North Macedonia" },
//                             { "id": 578, "region": "Europe", "total_appearances": 22, "country": "Norway" },
//                             { "id": 616, "region": "Europe", "total_appearances": 22, "country": "Poland" },
//                             { "id": 620, "region": "Europe", "total_appearances": 22, "country": "Portugal" },
//                             { "id": 642, "region": "Europe", "total_appearances": 22, "country": "Romania" },
//                             { "id": 643, "region": "Europe", "total_appearances": 22, "country": "Russia" },
//                             { "id": 674, "region": "Europe", "total_appearances": 22, "country": "San Marino" },
//                             { "id": 688, "region": "Europe", "total_appearances": 22, "country": "Serbia" },
//                             { "id": 703, "region": "Europe", "total_appearances": 22, "country": "Slovakia" },
//                             { "id": 705, "region": "Europe", "total_appearances": 22, "country": "Slovenia" },
//                             { "id": 724, "region": "Europe", "total_appearances": 22, "country": "Spain" },
//                             { "id": 752, "region": "Europe", "total_appearances": 22, "country": "Sweden" },
//                             { "id": 756, "region": "Europe", "total_appearances": 22, "country": "Switzerland" },
//                             { "id": 792, "region": "Europe", "total_appearances": 22, "country": "Turkey" },
//                             { "id": 804, "region": "Europe", "total_appearances": 22, "country": "Ukraine" },
//                             { "id": 826, "region": "Europe", "total_appearances": 22, "country": "" },
//                             { "id": 208, "region": "Europe", "total_appearances": 22, "country": "Denmark" },
//                             { "id": 246, "region": "Europe", "total_appearances": 22, "country": "Finland" },
//                             { "id": 352, "region": "Europe", "total_appearances": 22, "country": "Iceland" },
//                             { "id": 578, "region": "Europe", "total_appearances": 22, "country": "Norway" },
//                             { "id": 752, "region": "Europe", "total_appearances": 22, "country": "Sweden" },
//                             { "id": 304, "region": "Europe", "total_appearances": 22, "country": "Greenland" },
//                             { "id": 352, "region": "Europe", "total_appearances": 22, "country": "Iceland" },
//                             { "id": 4, "region": "Asia", "total_appearances": 2, "country": "Afghanistan" },
//                             { "id": 51, "region": "Asia", "total_appearances": 2, "country": "Armenia" },
//                             { "id": 31, "region": "Asia", "total_appearances": 2, "country": "Azerbaijan" },
//                             { "id": 48, "region": "Asia", "total_appearances": 2, "country": "Bahrain" },
//                             { "id": 50, "region": "Asia", "total_appearances": 2, "country": "Bangladesh" },
//                             { "id": 64, "region": "Asia", "total_appearances": 2, "country": "Bhutan" },
//                             { "id": 70, "region": "Asia", "total_appearances": 2, "country": "Brunei" },
//                             { "id": 116, "region": "Asia", "total_appearances": 2, "country": "Cambodia" },
//                             { "id": 156, "region": "Asia", "total_appearances": 2, "country": "China" },
//                             { "id": 196, "region": "Asia", "total_appearances": 2, "country": "Cyprus" },
//                             { "id": 268, "region": "Asia", "total_appearances": 2, "country": "Georgia" },
//                             { "id": 356, "region": "Asia", "total_appearances": 2, "country": "India" },
//                             { "id": 360, "region": "Asia", "total_appearances": 2, "country": "Indonesia" },
//                             { "id": 364, "region": "Asia", "total_appearances": 2, "country": "Iran" },
//                             { "id": 368, "region": "Asia", "total_appearances": 2, "country": "Iraq" },
//                             { "id": 376, "region": "Asia", "total_appearances": 2, "country": "Israel" },
//                             { "id": 392, "region": "Asia", "total_appearances": 2, "country": "Japan" },
//                             { "id": 400, "region": "Asia", "total_appearances": 2, "country": "Jordan" },
//                             { "id": 398, "region": "Asia", "total_appearances": 2, "country": "Kazakhstan" },
//                             { "id": 414, "region": "Asia", "total_appearances": 2, "country": "Kuwait" },
//                             { "id": 417, "region": "Asia", "total_appearances": 2, "country": "Kyrgyzstan" },
//                             { "id": 418, "region": "Asia", "total_appearances": 2, "country": "Laos" },
//                             { "id": 422, "region": "Asia", "total_appearances": 2, "country": "Lebanon" },
//                             { "id": 458, "region": "Asia", "total_appearances": 2, "country": "Malaysia" },
//                             { "id": 462, "region": "Asia", "total_appearances": 2, "country": "Maldives" },
//                             { "id": 496, "region": "Asia", "total_appearances": 2, "country": "Mongolia" },
//                             { "id": 104, "region": "Asia", "total_appearances": 2, "country": "Myanmar" },
//                             { "id": 524, "region": "Asia", "total_appearances": 2, "country": "Nepal" },
//                             { "id": 408, "region": "Asia", "total_appearances": 2, "country": "North Korea" },
//                             { "id": 512, "region": "Asia", "total_appearances": 2, "country": "Oman" },
//                             { "id": 586, "region": "Asia", "total_appearances": 2, "country": "Pakistan" },
//                             { "id": 275, "region": "Asia", "total_appearances": 2, "country": "Palestine" },
//                             { "id": 608, "region": "Asia", "total_appearances": 2, "country": "Philippines" },
//                             { "id": 634, "region": "Asia", "total_appearances": 2, "country": "Qatar" },
//                             { "id": 643, "region": "Asia", "total_appearances": 2, "country": "Russia" },
//                             { "id": 682, "region": "Asia", "total_appearances": 2, "country": "Saudi Arabia" },
//                             { "id": 702, "region": "Asia", "total_appearances": 2, "country": "Singapore" },
//                             { "id": 410, "region": "Asia", "total_appearances": 2, "country": "South Korea" },
//                             { "id": 144, "region": "Asia", "total_appearances": 2, "country": "Sri Lanka" },
//                             { "id": 760, "region": "Asia", "total_appearances": 2, "country": "Syria" },
//                             { "id": 158, "region": "Asia", "total_appearances": 2, "country": "Taiwan" },
//                             { "id": 762, "region": "Asia", "total_appearances": 2, "country": "Tajikistan" },
//                             { "id": 764, "region": "Asia", "total_appearances": 2, "country": "Thailand" },
//                             { "id": 626, "region": "Asia", "total_appearances": 2, "country": "Timor-este" },
//                             { "id": 792, "region": "Asia", "total_appearances": 2, "country": "Turkey" },
//                             { "id": 795, "region": "Asia", "total_appearances": 2, "country": "Turkmenistan" },
//                             { "id": 784, "region": "Asia", "total_appearances": 2, "country": "United Arab Emirates" },
//                             { "id": 860, "region": "Asia", "total_appearances": 2, "country": "Uzbekistan" },
//                             { "id": 704, "region": "Asia", "total_appearances": 2, "country": "Vietnam" },
//                             { "id": 887, "region": "Asia", "total_appearances": 2, "country": "Yemen" },
//                             { "id": 554, "region": "Oceania", "total_appearances": 3, "country": "New Zealand" },
//                             { "id": 598, "region": "Oceania", "total_appearances": 3, "country": "Papua New Guinea" }
//                         ]
//                     },
//                     "key": "id",
//                     "fields": ["region", "total_appearances", "country"]
//                 }
//             }
//         ],
//         "projection": {
//             "type": "mercator"
//         },
//         "mark": {
//             "type": "geoshape",
//             "stroke": "black",
//             "strokeWidth": 0.3
//         },
//         "encoding": {
//             "color": {
//                 "field": "total_appearances",
//                 "type": "quantitative",
//                 "scale": {
//                     "domain": [0, 65],
//                     "range": ["#fdfdfd", "darkgreen"]
//                 },
//                 "legend": {
//                     "title": "Total Appearances",
//                     "orient": "bottom",
//                     "titleColor": "black",
//                     "labelColor": "black"
//                 }
//             },
//             "tooltip": [
//                 { "field": "region", "type": "nominal", "title": "Region" },
//                 { "field": "country", "type": "nominal", "title": "Country" },
//                 { "field": "total_appearances", "type": "quantitative", "title": "Cummulative Regional Appearances [ 2014 - 2023 ]" }
//             ]
//         }

//     };
//     // Embed the Vega-Lite chart
//     vegaEmbed('#spotifyRegionalAppearancesInTop10', vlSpec);
// }

// loadRegionalAppearancesInTop10();

async function loadVis6() {

    const vlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Taylor Swift album popularity trends based on opening week sales.",
        "title": "Taylor Swift' First Week Sales for Each Album",
        "width": 650,
        "height": 400,
        "data": {
            "values": [
                { "release_date": "2006-10-24", "album_name": "Taylor Swift", "genre": "Country", "sales": 40000 },
                { "release_date": "2008-11-11", "album_name": "Fearless", "genre": "Country Pop", "sales": 592000 },
                { "release_date": "2010-10-25", "album_name": "Speak Now", "genre": "Country Pop", "sales": 1047000 },
                { "release_date": "2012-10-22", "album_name": "Red", "genre": "Country Pop", "sales": 1208000 },
                { "release_date": "2014-10-27", "album_name": "1989", "genre": "Synth-Pop", "sales": 1285000 },
                { "release_date": "2017-11-10", "album_name": "Reputation", "genre": "Pop", "sales": 1216000 },
                { "release_date": "2019-08-23", "album_name": "Lover", "genre": "Pop", "sales": 867000 },
                { "release_date": "2020-07-24", "album_name": "Folklore", "genre": "Indie Folk", "sales": 846000 },
                { "release_date": "2020-12-11", "album_name": "Evermore", "genre": "Indie Folk", "sales": 329000 },
                { "release_date": "2021-04-09", "album_name": "Fearless (Taylor's Version)", "genre": "Country Pop", "sales": 291000 },
                { "release_date": "2021-11-12", "album_name": "Red (Taylor's Version)", "genre": "Country Pop", "sales": 605000 },
                { "release_date": "2022-10-21", "album_name": "Midnights", "genre": "Synth-Pop", "sales": 1220000 },
                { "release_date": "2023-07-07", "album_name": "Speak Now (Taylor's Version)", "genre": "Country Pop", "sales": 716000 },
                { "release_date": "2023-10-27", "album_name": "1989 (Taylor's Version)", "genre": "Synth-Pop", "sales": 1653000 },
                { "release_date": "2024-04-19", "album_name": "The Tortured Poets Department", "genre": "Pop", "sales": 2610000 }
            ]
        },
        "layer": [
            {
                "mark": {
                    "type": "line",
                    "color": "black"
                },
                "encoding": {
                    "x": {
                        "field": "release_date",
                        "type": "temporal",
                        "title": "Release Date"
                    },
                    "y": {
                        "field": "sales",
                        "type": "quantitative",
                        "title": "Opening Week Sales"
                    }
                }
            },
            {
                "transform": [
                    { "filter": "datum.album_name === 'Taylor Swift'" }
                ],
                "mark": {
                    "type": "point",
                    "filled": true,
                    "opacity": 1,
                    "tooltip": true,
                    "size": 150,
                    "color": "orange"
                },
                "encoding": {
                    "x": {
                        "field": "release_date",
                        "type": "temporal",
                        "offset": 0
                    },
                    "y": {
                        "field": "sales",
                        "type": "quantitative",
                        "offset": 0
                    },
                    "tooltip": [
                        { "field": "album_name", "type": "nominal", "title": "Album Name" },
                        { "field": "release_date", "type": "temporal", "title": "Release Date" },
                        { "field": "genre", "type": "nominal", "title": "Genre" },
                        { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
                    ]
                }
            },
            {
                "transform": [
                    { "filter": "datum.album_name === 'Fearless'" }
                ],
                "mark": {
                    "type": "point",
                    "filled": true,
                    "opacity": 1,
                    "tooltip": true,
                    "color": "yellow",
                    "size": 150
                },
                "encoding": {
                    "x": {
                        "field": "release_date",
                        "type": "temporal",
                        "offset": 0
                    },
                    "y": {
                        "field": "sales",
                        "type": "quantitative",
                        "offset": 0
                    },
                    "tooltip": [
                        { "field": "album_name", "type": "nominal", "title": "Album Name" },
                        { "field": "release_date", "type": "temporal", "title": "Release Date" },
                        { "field": "genre", "type": "nominal", "title": "Genre" },
                        { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
                    ]
                }
            },
            {
                "transform": [
                    { "filter": "datum.album_name === '1989'" }
                ],
                "mark": {
                    "type": "point",
                    "filled": true,
                    "opacity": 1,
                    "tooltip": true,
                    "color": "red",
                    "size": 150
                },
                "encoding": {
                    "x": {
                        "field": "release_date",
                        "type": "temporal",
                        "offset": 0
                    },
                    "y": {
                        "field": "sales",
                        "type": "quantitative",
                        "offset": 0
                    },
                    "tooltip": [
                        { "field": "album_name", "type": "nominal", "title": "Album Name" },
                        { "field": "release_date", "type": "temporal", "title": "Release Date" },
                        { "field": "genre", "type": "nominal", "title": "Genre" },
                        { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
                    ]
                }
            },
            {
                "transform": [
                    { "filter": "datum.album_name !== 'Taylor Swift' && datum.album_name !== 'Fearless' && datum.album_name !== '1989'" }
                ],
                "mark": {
                    "type": "point",
                    "filled": true,
                    "tooltip": true,
                    "color": "black"
                },
                "encoding": {
                    "x": {
                        "field": "release_date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "sales",
                        "type": "quantitative"
                    },
                    "tooltip": [
                        { "field": "album_name", "type": "nominal", "title": "Album Name" },
                        { "field": "release_date", "type": "temporal", "title": "Release Date" },
                        { "field": "genre", "type": "nominal", "title": "Genre" },
                        { "field": "sales", "type": "quantitative", "title": "Sales", "format": "," }
                    ]
                }
            }
        ]

    };
    vegaEmbed('#taylorVis6', vlSpec);
}
loadVis6();

async function loadVis7() {

    const vlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Accumulated appearances of songs from specific regions in Spotify's top 10 rankings over the past decade.",
        "title": {
            "text": "Western Influence on Current Music Consumption",
            "fontsize": 18,
            "color": "black",
            "color": "black",
            "align": "right"
        },
        "width": 800,
        "height": 400,
        "background": "#FFFFFF",
        "background": "white",
        "config": {
            "view": {
                "padding": 50
            },
            "title": {
                "offset": 30
            }
        },
        "data": {
            "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
            "format": {
                "type": "topojson",
                "feature": "countries"
            }
        },
        "transform": [
            {
                "lookup": "id",
                "from": {
                    "data": {
                        "values": [
                            { "id": 434, "region": "Africa", "total_appearances": 0, "country": "Libya" },
                            { "id": 768, "region": "Africa", "total_appearances": 0, "country": "Togo" },
                            { "id": 562, "region": "Africa", "total_appearances": 0, "country": "Niger" },
                            { "id": 854, "region": "Africa", "total_appearances": 0, "country": "Burkina Faso" },
                            { "id": 12, "region": "Africa", "total_appearances": 0, "country": "Algeria" },
                            { "id": 24, "region": "Africa", "total_appearances": 0, "country": "Angola" },
                            { "id": 12, "region": "Africa", "total_appearances": 0, "country": "Algeria" },
                            { "id": 24, "region": "Africa", "total_appearances": 0, "country": "Angola" },
                            { "id": 72, "region": "Africa", "total_appearances": 0, "country": "Botswana" },
                            { "id": 108, "region": "Africa", "total_appearances": 0, "country": "Burundi" },
                            { "id": 120, "region": "Africa", "total_appearances": 0, "country": "Cameroon" },
                            { "id": 140, "region": "Africa", "total_appearances": 0, "country": "Central African Republic" },
                            { "id": 148, "region": "Africa", "total_appearances": 0, "country": "Chad" },
                            { "id": 178, "region": "Africa", "total_appearances": 0, "country": "Republic of the Congo" },
                            { "id": 180, "region": "Africa", "total_appearances": 0, "country": "Democratic Republic of the Congo" },
                            { "id": 204, "region": "Africa", "total_appearances": 0, "country": "Benin" },
                            { "id": 231, "region": "Africa", "total_appearances": 0, "country": "Ethiopia" },
                            { "id": 232, "region": "Africa", "total_appearances": 0, "country": "Eritrea" },
                            { "id": 262, "region": "Africa", "total_appearances": 0, "country": "Djibouti" },
                            { "id": 266, "region": "Africa", "total_appearances": 0, "country": "Gabon" },
                            { "id": 270, "region": "Africa", "total_appearances": 0, "country": "Gambia" },
                            { "id": 288, "region": "Africa", "total_appearances": 0, "country": "Ghana" },
                            { "id": 324, "region": "Africa", "total_appearances": 0, "country": "Guinea" },
                            { "id": 384, "region": "Africa", "total_appearances": 0, "country": "Ivory Coast" },
                            { "id": 404, "region": "Africa", "total_appearances": 0, "country": "Kenya" },
                            { "id": 426, "region": "Africa", "total_appearances": 0, "country": "Lesotho" },
                            { "id": 430, "region": "Africa", "total_appearances": 0, "country": "Liberia" },
                            { "id": 450, "region": "Africa", "total_appearances": 0, "country": "Madagascar" },
                            { "id": 454, "region": "Africa", "total_appearances": 0, "country": "Malawi" },
                            { "id": 466, "region": "Africa", "total_appearances": 0, "country": "Mali" },
                            { "id": 478, "region": "Africa", "total_appearances": 0, "country": "Mauritania" },
                            { "id": 508, "region": "Africa", "total_appearances": 0, "country": "Mozambique" },
                            { "id": 516, "region": "Africa", "total_appearances": 0, "country": "Namibia" },
                            { "id": 566, "region": "Africa", "total_appearances": 0, "country": "Nigeria" },
                            { "id": 646, "region": "Africa", "total_appearances": 0, "country": "Rwanda" },
                            { "id": 686, "region": "Africa", "total_appearances": 0, "country": "Senegal" },
                            { "id": 694, "region": "Africa", "total_appearances": 0, "country": "Sierra Leone" },
                            { "id": 706, "region": "Africa", "total_appearances": 0, "country": "Somalia" },
                            { "id": 710, "region": "Africa", "total_appearances": 0, "country": "South Africa" },
                            { "id": 716, "region": "Africa", "total_appearances": 0, "country": "Zimbabwe" },
                            { "id": 728, "region": "Africa", "total_appearances": 0, "country": "South Sudan" },
                            { "id": 729, "region": "Africa", "total_appearances": 0, "country": "Sudan" },
                            { "id": 732, "region": "Africa", "total_appearances": 0, "country": "Western Sahara" },
                            { "id": 800, "region": "Africa", "total_appearances": 0, "country": "Uganda" },
                            { "id": 834, "region": "Africa", "total_appearances": 0, "country": "Tanzania" },
                            { "id": 818, "region": "Africa", "total_appearances": 0, "country": "Egypt" },
                            { "id": 894, "region": "Africa", "total_appearances": 0, "country": "Zambia" },
                            { "id": 204, "region": "Africa", "total_appearances": 0, "country": "Benin" },
                            { "id": 840, "region": "North America", "total_appearances": 65, "country": "United States of America" },
                            { "id": 250, "region": "Europe", "total_appearances": 22, "country": "Europe" },
                            { "id": 156, "region": "Asia", "total_appearances": 2, "country": "Asia" },
                            { "id": 36, "region": "Australia", "total_appearances": 3, "country": "Australia" },
                            { "id": 124, "region": "North America", "total_appearances": 65, "country": "Canada" },
                            { "id": 32, "region": "South America", "total_appearances": 8, "country": "Argentina" },
                            { "id": 68, "region": "South America", "total_appearances": 8, "country": "Bolivia" },
                            { "id": 76, "region": "South America", "total_appearances": 8, "country": "Brazil" },
                            { "id": 152, "region": "South America", "total_appearances": 8, "country": "Chile" },
                            { "id": 170, "region": "South America", "total_appearances": 8, "country": "Colombia" },
                            { "id": 218, "region": "South America", "total_appearances": 8, "country": "Ecuador" },
                            { "id": 328, "region": "South America", "total_appearances": 8, "country": "Guyana" },
                            { "id": 600, "region": "South America", "total_appearances": 8, "country": "Paraguay" },
                            { "id": 604, "region": "South America", "total_appearances": 8, "country": "Peru" },
                            { "id": 740, "region": "South America", "total_appearances": 8, "country": "Suriname" },
                            { "id": 858, "region": "South America", "total_appearances": 8, "country": "Uruguay" },
                            { "id": 862, "region": "South America", "total_appearances": 8, "country": "Venezuela" },
                            { "id": 8, "region": "Europe", "total_appearances": 22, "country": "Albania" },
                            { "id": 20, "region": "Europe", "total_appearances": 22, "country": "Andorra" },
                            { "id": 51, "region": "Europe", "total_appearances": 22, "country": "Armenia" },
                            { "id": 40, "region": "Europe", "total_appearances": 22, "country": "Austria" },
                            { "id": 31, "region": "Europe", "total_appearances": 22, "country": "Azerbaijan" },
                            { "id": 112, "region": "Europe", "total_appearances": 22, "country": "Belarus" },
                            { "id": 56, "region": "Europe", "total_appearances": 22, "country": "Belgium" },
                            { "id": 70, "region": "Europe", "total_appearances": 22, "country": "Bosnia and Herzegovina" },
                            { "id": 100, "region": "Europe", "total_appearances": 22, "country": "Bulgaria" },
                            { "id": 191, "region": "Europe", "total_appearances": 22, "country": "Croatia" },
                            { "id": 196, "region": "Europe", "total_appearances": 22, "country": "Cyprus" },
                            { "id": 203, "region": "Europe", "total_appearances": 22, "country": "Czech Republic" },
                            { "id": 208, "region": "Europe", "total_appearances": 22, "country": "Denmark" },
                            { "id": 233, "region": "Europe", "total_appearances": 22, "country": "Estonia" },
                            { "id": 246, "region": "Europe", "total_appearances": 22, "country": "Finland" },
                            { "id": 250, "region": "Europe", "total_appearances": 22, "country": "France" },
                            { "id": 268, "region": "Europe", "total_appearances": 22, "country": "Georgia" },
                            { "id": 276, "region": "Europe", "total_appearances": 22, "country": "Germany" },
                            { "id": 300, "region": "Europe", "total_appearances": 22, "country": "Greece" },
                            { "id": 348, "region": "Europe", "total_appearances": 22, "country": "Hungary" },
                            { "id": 352, "region": "Europe", "total_appearances": 22, "country": "Iceland" },
                            { "id": 372, "region": "Europe", "total_appearances": 22, "country": "Ireland" },
                            { "id": 380, "region": "Europe", "total_appearances": 22, "country": "Italy" },
                            { "id": 398, "region": "Europe", "total_appearances": 22, "country": "Kazakhstan" },
                            { "id": 383, "region": "Europe", "total_appearances": 22, "country": "Kosovo" },
                            { "id": 428, "region": "Europe", "total_appearances": 22, "country": "Latvia" },
                            { "id": 440, "region": "Europe", "total_appearances": 22, "country": "Lithuania" },
                            { "id": 442, "region": "Europe", "total_appearances": 22, "country": "Luxembourg" },
                            { "id": 470, "region": "Europe", "total_appearances": 22, "country": "Malta" },
                            { "id": 498, "region": "Europe", "total_appearances": 22, "country": "Moldova" },
                            { "id": 492, "region": "Europe", "total_appearances": 22, "country": "Monaco" },
                            { "id": 499, "region": "Europe", "total_appearances": 22, "country": "Montenegro" },
                            { "id": 528, "region": "Europe", "total_appearances": 22, "country": "Netherlands" },
                            { "id": 807, "region": "Europe", "total_appearances": 22, "country": "North Macedonia" },
                            { "id": 578, "region": "Europe", "total_appearances": 22, "country": "Norway" },
                            { "id": 616, "region": "Europe", "total_appearances": 22, "country": "Poland" },
                            { "id": 620, "region": "Europe", "total_appearances": 22, "country": "Portugal" },
                            { "id": 642, "region": "Europe", "total_appearances": 22, "country": "Romania" },
                            { "id": 643, "region": "Europe", "total_appearances": 22, "country": "Russia" },
                            { "id": 674, "region": "Europe", "total_appearances": 22, "country": "San Marino" },
                            { "id": 688, "region": "Europe", "total_appearances": 22, "country": "Serbia" },
                            { "id": 703, "region": "Europe", "total_appearances": 22, "country": "Slovakia" },
                            { "id": 705, "region": "Europe", "total_appearances": 22, "country": "Slovenia" },
                            { "id": 724, "region": "Europe", "total_appearances": 22, "country": "Spain" },
                            { "id": 752, "region": "Europe", "total_appearances": 22, "country": "Sweden" },
                            { "id": 756, "region": "Europe", "total_appearances": 22, "country": "Switzerland" },
                            { "id": 792, "region": "Europe", "total_appearances": 22, "country": "Turkey" },
                            { "id": 804, "region": "Europe", "total_appearances": 22, "country": "Ukraine" },
                            { "id": 826, "region": "Europe", "total_appearances": 22, "country": "" },
                            { "id": 208, "region": "Europe", "total_appearances": 22, "country": "Denmark" },
                            { "id": 246, "region": "Europe", "total_appearances": 22, "country": "Finland" },
                            { "id": 352, "region": "Europe", "total_appearances": 22, "country": "Iceland" },
                            { "id": 578, "region": "Europe", "total_appearances": 22, "country": "Norway" },
                            { "id": 752, "region": "Europe", "total_appearances": 22, "country": "Sweden" },
                            { "id": 304, "region": "Europe", "total_appearances": 22, "country": "Greenland" },
                            { "id": 352, "region": "Europe", "total_appearances": 22, "country": "Iceland" },
                            { "id": 4, "region": "Asia", "total_appearances": 2, "country": "Afghanistan" },
                            { "id": 51, "region": "Asia", "total_appearances": 2, "country": "Armenia" },
                            { "id": 31, "region": "Asia", "total_appearances": 2, "country": "Azerbaijan" },
                            { "id": 48, "region": "Asia", "total_appearances": 2, "country": "Bahrain" },
                            { "id": 50, "region": "Asia", "total_appearances": 2, "country": "Bangladesh" },
                            { "id": 64, "region": "Asia", "total_appearances": 2, "country": "Bhutan" },
                            { "id": 70, "region": "Asia", "total_appearances": 2, "country": "Brunei" },
                            { "id": 116, "region": "Asia", "total_appearances": 2, "country": "Cambodia" },
                            { "id": 156, "region": "Asia", "total_appearances": 2, "country": "China" },
                            { "id": 196, "region": "Asia", "total_appearances": 2, "country": "Cyprus" },
                            { "id": 268, "region": "Asia", "total_appearances": 2, "country": "Georgia" },
                            { "id": 356, "region": "Asia", "total_appearances": 2, "country": "India" },
                            { "id": 360, "region": "Asia", "total_appearances": 2, "country": "Indonesia" },
                            { "id": 364, "region": "Asia", "total_appearances": 2, "country": "Iran" },
                            { "id": 368, "region": "Asia", "total_appearances": 2, "country": "Iraq" },
                            { "id": 376, "region": "Asia", "total_appearances": 2, "country": "Israel" },
                            { "id": 392, "region": "Asia", "total_appearances": 2, "country": "Japan" },
                            { "id": 400, "region": "Asia", "total_appearances": 2, "country": "Jordan" },
                            { "id": 398, "region": "Asia", "total_appearances": 2, "country": "Kazakhstan" },
                            { "id": 414, "region": "Asia", "total_appearances": 2, "country": "Kuwait" },
                            { "id": 417, "region": "Asia", "total_appearances": 2, "country": "Kyrgyzstan" },
                            { "id": 418, "region": "Asia", "total_appearances": 2, "country": "Laos" },
                            { "id": 422, "region": "Asia", "total_appearances": 2, "country": "Lebanon" },
                            { "id": 458, "region": "Asia", "total_appearances": 2, "country": "Malaysia" },
                            { "id": 462, "region": "Asia", "total_appearances": 2, "country": "Maldives" },
                            { "id": 496, "region": "Asia", "total_appearances": 2, "country": "Mongolia" },
                            { "id": 104, "region": "Asia", "total_appearances": 2, "country": "Myanmar" },
                            { "id": 524, "region": "Asia", "total_appearances": 2, "country": "Nepal" },
                            { "id": 408, "region": "Asia", "total_appearances": 2, "country": "North Korea" },
                            { "id": 512, "region": "Asia", "total_appearances": 2, "country": "Oman" },
                            { "id": 586, "region": "Asia", "total_appearances": 2, "country": "Pakistan" },
                            { "id": 275, "region": "Asia", "total_appearances": 2, "country": "Palestine" },
                            { "id": 608, "region": "Asia", "total_appearances": 2, "country": "Philippines" },
                            { "id": 634, "region": "Asia", "total_appearances": 2, "country": "Qatar" },
                            { "id": 643, "region": "Asia", "total_appearances": 2, "country": "Russia" },
                            { "id": 682, "region": "Asia", "total_appearances": 2, "country": "Saudi Arabia" },
                            { "id": 702, "region": "Asia", "total_appearances": 2, "country": "Singapore" },
                            { "id": 410, "region": "Asia", "total_appearances": 2, "country": "South Korea" },
                            { "id": 144, "region": "Asia", "total_appearances": 2, "country": "Sri Lanka" },
                            { "id": 760, "region": "Asia", "total_appearances": 2, "country": "Syria" },
                            { "id": 158, "region": "Asia", "total_appearances": 2, "country": "Taiwan" },
                            { "id": 762, "region": "Asia", "total_appearances": 2, "country": "Tajikistan" },
                            { "id": 764, "region": "Asia", "total_appearances": 2, "country": "Thailand" },
                            { "id": 626, "region": "Asia", "total_appearances": 2, "country": "Timor-este" },
                            { "id": 792, "region": "Asia", "total_appearances": 2, "country": "Turkey" },
                            { "id": 795, "region": "Asia", "total_appearances": 2, "country": "Turkmenistan" },
                            { "id": 784, "region": "Asia", "total_appearances": 2, "country": "United Arab Emirates" },
                            { "id": 860, "region": "Asia", "total_appearances": 2, "country": "Uzbekistan" },
                            { "id": 704, "region": "Asia", "total_appearances": 2, "country": "Vietnam" },
                            { "id": 887, "region": "Asia", "total_appearances": 2, "country": "Yemen" },
                            { "id": 554, "region": "Oceania", "total_appearances": 3, "country": "New Zealand" },
                            { "id": 598, "region": "Oceania", "total_appearances": 3, "country": "Papua New Guinea" },
                            { "id": 484, "region": "North America", "total_appearances": 65, "country": "Mexico" },
                            { "id": 48, "region": "South America", "total_appearances": 8, "country": "Cuba" },
                            { "id": 132, "region": "South America", "total_appearances": 8, "country": "Jamaica" },
                            { "id": 362, "region": "South America", "total_appearances": 8, "country": "Haiti" },
                            { "id": 214, "region": "South America", "total_appearances": 8, "country": "Dominican Republic" },
                            { "id": 660, "region": "South America", "total_appearances": 8, "country": "Trinidad and Tobago" },
                            { "id": 740, "region": "South America", "total_appearances": 8, "country": "Barbados" },
                            { "id": 254, "region": "South America", "total_appearances": 8, "country": "Saint Lucia" },
                            { "id": 736, "region": "South America", "total_appearances": 8, "country": "Saint Vincent and the Grenadines" },
                            { "id": 332, "region": "South America", "total_appearances": 8, "country": "Saint Kitts and Nevis" },
                            { "id": 320, "region": "South America", "total_appearances": 8, "country": "Guatemala" },
                            { "id": 290, "region": "South America", "total_appearances": 8, "country": "El Salvador" },
                            { "id": 191, "region": "South America", "total_appearances": 8, "country": "Nicaragua" },
                            { "id": 188, "region": "South America", "total_appearances": 8, "country": "Costa Rica" },
                            { "id": 310, "region": "South America", "total_appearances": 8, "country": "Panama" },
                            { "id": 295, "region": "South America", "total_appearances": 8, "country": "Honduras" }
                        ]
                    },
                    "key": "id",
                    "fields": ["region", "total_appearances", "country"]
                }
            }
        ],
        "projection": {
            "type": "mercator"
        },
        "mark": {
            "type": "geoshape",
            "stroke": "black",
            "strokeWidth": 0.3
        },
        "encoding": {
            "color": {
                "field": "total_appearances",
                "type": "quantitative",
                "scale": {
                    "domain": [0, 65],
                    "range": ["#fdfdfd", "darkgreen"]
                },
                "legend": {
                    "title": "Total Appearances",
                    "orient": "bottom",
                    "titleColor": "black",
                    "labelColor": "black"
                }
            },
            "tooltip": [
                { "field": "region", "type": "nominal", "title": "Region" },
                { "field": "country", "type": "nominal", "title": "Country" },
                { "field": "total_appearances", "type": "quantitative", "title": "Cummulative Regional Appearances [ 2014 - 2023 ]" }
            ]
        }



    };
    vegaEmbed('#mapVis7', vlSpec);
}
loadVis7();

// CLARK PUT UR CODE HERE ==================================================================================================

// From W3Schools
// MY SLIDES CODE ========================================================================================================
//moved them to their own js files

document.getElementById('share-button').addEventListener('click', function () {
    var dropdown = document.getElementById('share-dropdown');
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function (event) {
    var dropdown = document.getElementById('share-dropdown');
    if (!event.target.closest('#share-button') && !event.target.closest('#share-dropdown')) {
        dropdown.style.display = 'none';
    }
});

function copyLink() {
    var copyText = document.getElementById("copy-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " + copyText.value);
}

// slides code ============================================================================================================

const mapVis7 = document.getElementById('mapVis7');
const tooltip = document.querySelector('.tooltip');

mapVis7.addEventListener('mousemove', function (event) {
    // Get mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate the position of the tooltip within the container
    const containerRect = mapVis7.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;

    let tooltipX = mouseX - containerRect.left;
    let tooltipY = mouseY - containerRect.top;

    // Ensure the tooltip doesn't exceed the container's width
    if (tooltipX + tooltipWidth > containerRect.width) {
        tooltipX = containerRect.width - tooltipWidth;
    }

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
});

