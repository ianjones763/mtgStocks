
const LINE_COLOR = "blue";
const MARKER_COLOR = "steelblue";
const MARKER_DATE_COLOR = "grey";
const MARKER_PRICE_COLOR = "steelblue";
const MARKER_LINE_COLOR = "#cccccc";


var cardData = {
	"card1": {"2017-12-31":5.74,"2018-01-01":6.00,"2018-01-02":7.56,"2018-01-03":7.00,"2018-01-04":10.30,"2018-01-05":10.2,"2018-01-06":10.1,"2018-01-07":9.8,"2018-01-08":7.42,"2018-01-09":7.3,"2018-01-10":7.5,"2018-01-11":7.3,"2018-01-12":7.3,"2018-01-13":7.3,"2018-01-14":7.3,"2018-01-15":4.5,"2018-01-16":4.5,"2018-01-17":4.5,"2018-01-18":4.5,"2018-01-19":4.5,"2018-01-20":3.2,"2018-01-21":3.2,"2018-01-22":3.2},
	"card2": {"2017-12-31":4.5,"2018-01-01":6.00,"2018-01-02":2.4,"2018-01-03":2.4,"2018-01-04":2.4,"2018-01-05":7.4,"2018-01-06":7.4,"2018-01-07":9.8,"2018-01-08":5.5,"2018-01-09":5.5,"2018-01-10":5.7,"2018-01-11":5.5,"2018-01-12":7.3,"2018-01-13":5.5,"2018-01-14":5.4,"2018-01-15":5.3,"2018-01-16":5.2,"2018-01-17":4.5,"2018-01-18":4.2,"2018-01-19":4.0,"2018-01-20":3.9,"2018-01-21":3.8,"2018-01-22":3.7},
 	"card3": {"2017-12-31":13860.1363,"2018-01-01":13412.44,"2018-01-02":14740.7563,"2018-01-03":15134.6513,"2018-01-04":15155.2263,"2018-01-05":16937.1738,"2018-01-06":17135.8363,"2018-01-07":16178.495,"2018-01-08":14970.3575,"2018-01-09":14439.4738,"2018-01-10":14890.7225,"2018-01-11":13287.26,"2018-01-12":13812.715,"2018-01-13":14188.785,"2018-01-14":13619.0288,"2018-01-15":13585.9013,"2018-01-16":11348.02,"2018-01-17":11141.2488,"2018-01-18":11250.6475,"2018-01-19":11514.925,"2018-01-20":12759.6413,"2018-01-21":11522.8588,"2018-01-22":10772.15,"2018-01-23":10839.8263,"2018-01-24":11399.52,"2018-01-25":11137.2375,"2018-01-26":11090.0638,"2018-01-27":11407.1538,"2018-01-28":11694.4675,"2018-01-29":11158.3938,"2018-01-30":10034.9975,"2018-01-31":10166.5063,"2018-02-01":9052.5763,"2018-02-02":8827.63,"2018-02-03":9224.3913,"2018-02-04":8186.6488,"2018-02-05":6914.26,"2018-02-06":7700.3863,"2018-02-07":7581.8038,"2018-02-08":8237.2363,"2018-02-09":8689.8388,"2018-02-10":8556.6125,"2018-02-11":8070.7963,"2018-02-12":8891.2125,"2018-02-13":8516.2438,"2018-02-14":9477.84,"2018-02-15":10016.4888,"2018-02-16":10178.7125,"2018-02-17":11092.1475,"2018-02-18":10396.63,"2018-02-19":11159.7238,"2018-02-20":11228.2413,"2018-02-21":10456.1725,"2018-02-22":9830.4263,"2018-02-23":10149.4625,"2018-02-24":9682.3825,"2018-02-25":9586.46,"2018-02-26":10313.0825,"2018-02-27":10564.4188,"2018-02-28":10309.6413,"2018-03-01":10907.59,"2018-03-02":11019.5213,"2018-03-03":11438.6513,"2018-03-04":11479.7313,"2018-03-05":11432.9825,"2018-03-06":10709.5275,"2018-03-07":9906.8,"2018-03-08":9299.2838,"2018-03-09":9237.05,"2018-03-10":8787.1638,"2018-03-11":9532.7413,"2018-03-12":9118.2713,"2018-03-13":9144.1475,"2018-03-14":8196.8975,"2018-03-15":8256.9938,"2018-03-16":8269.3275,"2018-03-17":7862.1088,"2018-03-18":8196.0225,"2018-03-19":8594.1913,"2018-03-20":8915.9038,"2018-03-21":8895.4,"2018-03-22":8712.8913,"2018-03-23":8918.7438,"2018-03-24":8535.8938,"2018-03-25":8449.835,"2018-03-26":8138.3363,"2018-03-27":7790.1575,"2018-03-28":7937.205,"2018-03-29":7086.4875,"2018-03-30":6844.3213,"2018-03-31":6926.0175,"2018-04-01":6816.74}
}


/*
 * Convert data to a dictionary of {cardname: {date:value info}} 
 */
function parseData(data) {
	var output = {};
	for (var card in data) {
		var arr = [];
		for (var i in data[card]) {
	    	arr.push(
	        	{
	            date: new Date(i),  	 //date
	            value: +data[card][i], 	 //convert string to number
	        });
		}
		output[card] = arr;
   	}
   	return output;
}

/*
 * Sets up initial display
 * Draws legend and graph with a random card
 */
function display() {

	// Parse the data
	cardData = parseData(cardData);
	var rand = Math.floor(Math.random() * Object.keys(cardData).length);			// Initialize page to dispaly random card

	// Vis area dimensions
	var visWidth  = d3.select("#vis").node().offsetWidth,
	    visHeight = d3.select("#vis").node().offsetHeight;

	// Set up vis svg
	var svg = d3.select('#vis').append('svg')
		.attr('width', visWidth)
        .attr('height', visHeight)


    /* Update vis header */
    updateHeader(Object.keys(cardData)[rand], cardData[Object.keys(cardData)[rand]]);

    /* Draw legend */
    var legendMargin = {
    	left: 10,
    	right: 20,
    	top: 20,
    	bottom: 20
    };
    var graphHeight = 4/5 * visHeight;
    var legendWidth = (2/10) * visWidth;
    var legendHeight = (1/2) * graphHeight;
    drawLegend(cardData[Object.keys(cardData)[rand]], svg, legendWidth, legendHeight, legendMargin);			// Display legend of random card


    /* Draw graph */
    var graphMargin = {
    	left: 40,
    	right: 40,
    	top: 20,
    	bottom: 20
    };
    var graphWidth = visWidth - legendWidth - graphMargin.left - graphMargin.right - legendMargin.left - legendMargin.right;
    var graphX = legendWidth + graphMargin.left;
    drawGraph(cardData[Object.keys(cardData)[rand]], svg, graphX, graphWidth, graphHeight, graphMargin);		// Display graph of random card


    /* User card list functionality */
    var cardList = document.getElementById('cardList');
    cardList.innerHTML = "<p> new paragraph </p>" + cardList.innerHTML;


    /* Search functionality */
   	var search = document.querySelector("#search");
	var timeout = null;
	search.onsearch = function() {	
		clearTimeout(timeout);				// Restart delay if search is pressed
		timeout = setTimeout(function() {	// Delay function call
			updateVis(svg, legendWidth, legendHeight, graphX, graphWidth, graphHeight, legendMargin, graphMargin);
		}, 150);			
	}

	/* Back/forward simulator functionality */
	var backButton = document.querySelector(".button.back");
	backButton.onclick = function(d) {
		 backSimulate();
	}
	var forwardButton = document.querySelector(".button.forward");
	forwardButton.onclick = function(d) {
		 forwardSimulate();
	}
}


/*
 * Simulates moving the market back in time
 */
function backSimulate() {
	console.log("simulate back");
}

/*
 * Simulates moving the market forward in time
 */
function forwardSimulate() {
	console.log("simulate forward");
}


/*
 * Updates the vis header to show the card name and current price info
 */
function updateHeader(card, data) {
	var avg = data[data.length-1].value;
	document.getElementById("cardname").innerHTML = card;
	document.getElementById("avgprice").innerHTML = "$" + avg;
	document.getElementById("marketprice").innerHTML = "$" + avg;
}


/*
 * Returns the max, min, and avg price over time for the given card data
 */
function calculatePricesOverTime(data) {
	var max = 0.0,
	    min = 1000000.0,
		avg = 0.0;

	for (i = 0; i < data.length; i++) {
		var elem = data[i];
		if (elem.value > max) max = elem.value;
		if (elem.value < min) min = elem.value;
		avg += elem.value;
	}
	avg /= data.length;
	return [max.toFixed(2), min.toFixed(2), avg.toFixed(2)];
}



/*
 * Renders the legend to display price data over time
 */
function drawLegend(data, svg, width, height, margin) {

	// Calculate prices over time
	var prices = calculatePricesOverTime(data);
	var maxPrice = prices[0],
		minPrice = prices[1],
		avgPrice = prices[2];

	var g = svg.append("g")
		.attr("class", "graph");
	// filters go in defs element
	var defs = g.append("defs")
		.attr("class", "graph");

	// // create filter with id #drop-shadow
	// // height=130% so that the shadow is not clipped
	// var filter = defs.append("filter")
	//     .attr("id", "drop-shadow")
	//     .attr("height", "130%");

	// // SourceAlpha refers to opacity of graphic that this filter will be applied to
	// // convolve that with a Gaussian with standard deviation 3 and store result
	// // in blur
	// filter.append("feGaussianBlur")
	//     .attr("in", "SourceAlpha")
	//     .attr("stdDeviation", 6)
	//     .attr("result", "blur");

	// // translate output of Gaussian blur to the right and downwards with 2px
	// // store result in offsetBlur
	// filter.append("feOffset")
	//     .attr("in", "blur")
	//     .attr("dx", 3)
	//     .attr("dy", 3)
	//     .attr("result", "offsetBlur");

	// // overlay original SourceGraphic over translated blurred opacity by using
	// // feMerge filter. Order of specifying inputs is important!
	// var feMerge = filter.append("feMerge");

	// feMerge.append("feMergeNode")
	//     .attr("in", "offsetBlur");
	// feMerge.append("feMergeNode")
	//     .attr("in", "SourceGraphic");

	// // for each rendered node, apply #drop-shadow filter
	// var item = g.append("rect")
	// 	.attr("x", margin.left)
	// 	.attr("y", margin.top)
	//     .attr("width", width)
	//     .attr("height", height)
	//     .attr("fill", "#f2f2f2")
	//     .attr("stroke-width", 2)
	    // .style("filter", "url(#drop-shadow)")
	var item = g.append("rect")
		.attr("x", margin.left)
		.attr("y", margin.top)
		.attr("rx", 5)
		.attr("ry", 5)
	    .attr("width", width)
	    .attr("height", height)
	    .attr("fill", "#f2f2f2")
	    .attr("stroke-width", 2)


	var v_spacing = 60;
	var h_spacing = 10;
	// Legend title
	g.append("text")
		.attr("x", width / 2 + 10)
		.attr("y", margin.top + 40)
		.attr("font-size", 24)
		.attr("text-anchor", "middle")
		.text("Record Over Time")

	// First row
	var max = g.append("text")
		.attr("x", margin.left + h_spacing)
		.attr("y", height * (1/4) + v_spacing)
		.attr("font-size", 18)
		.text("Max Price")
	g.append("text")
		.attr("x", margin.left + (2 * h_spacing) + max.node().getComputedTextLength())
		.attr("y", height * (1/4) + v_spacing)
		.attr("font-size", 24)
		.attr("font-weight", "bold")
		.text("$" + maxPrice)

	// Second row
	var min = g.append("text")
		.attr("x", margin.left + h_spacing)
		.attr("y", height * (1/2) + v_spacing)
		.attr("font-size", 18)
		.text("Min Price")
	g.append("text")
		.attr("x", margin.left + (2 * h_spacing) + min.node().getComputedTextLength())
		.attr("y", height * (1/2) + v_spacing)
		.attr("font-size", 24)
		.attr("font-weight", "bold")
		.text("$" + minPrice)

	// Third row
	var avg = g.append("text")
		.attr("x", margin.left + h_spacing)
		.attr("y", height * (3/4) + v_spacing)
		.attr("font-size", 18)
		.text("Avg Price")
	g.append("text")
		.attr("x", margin.left + (2 * h_spacing) + min.node().getComputedTextLength())
		.attr("y", height * (3/4) + v_spacing)
		.attr("font-size", 24)
		.attr("font-weight", "bold")
		.text("$" + avgPrice)
}


/*
 * Renders the graph with the given card data
 */
function drawGraph(data, svg, x, width, height, margin) {

	// x and y scales
	var xVal = d3.scaleTime().rangeRound([0, width]);
	var yVal = d3.scaleLinear().rangeRound([height, 0]);

	// line equation
	var line = d3.line()
	   .x(function(d) { return xVal(d.date)})
	   .y(function(d) { return yVal(d.value)})
	   xVal.domain(d3.extent(data, function(d) { return d.date }));
	   yVal.domain(d3.extent(data, function(d) { return d.value }));

	var xShift = x + margin.left;
	var g = svg.append("g")
		.attr("class", "graph")
	    .attr("transform", "translate(" + xShift + "," + margin.top + ")");

	// render x axis
	g.append("g")
	   .attr("transform", "translate(0," + height + ")")
	   .call(d3.axisBottom(xVal))
	   .select(".domain");

	// render y axis
	g.append("g")
	    .call(d3.axisLeft(yVal))
	    .append("text")
	    .attr("fill", "#000")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", "0.71em")
	    .attr("text-anchor", "end")
	    .text("Price ($)");

	// plot line graph
	g.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line);

	// Mouse event renderer --> line, circle, and text to display hovered data
	var focus = g.append("g")
      .attr("fill", "none")
      .style("stroke", MARKER_COLOR)
      .style("display", "none");

  	focus.append("circle")
    	.attr("r", 4.5);

    var lineFocus = g.append("rect")
    	.attr("width", .00001)
    	.attr("height", height)
    	.attr("fill", MARKER_LINE_COLOR)
    	.attr("stroke", MARKER_LINE_COLOR);

  	focus.append("text")
  		.attr("id", "date")
    	.attr("x", 9)
    	.attr("font-size", 12)
        .attr("fill", MARKER_DATE_COLOR)
        .attr("stroke", MARKER_DATE_COLOR)
        .style("opacity", .7);

    focus.append("text")
    	.attr("id", "price")
    	.attr("x", 9)
    	.attr("y", 20)
    	.attr("font-size", 16)
        .attr("fill", MARKER_PRICE_COLOR)
        .attr("stroke", MARKER_PRICE_COLOR);

    // detect where mouse is anywhere on the graph with overlayed rectangle
  	g.append("rect")
	    .style("opacity", 0)
	    .attr("width", width)
	    .attr("height", height)
	    .on("mouseover", function() { focus.style("display", null); lineFocus.style("display", null); })
	    .on("mouseout", function() { focus.style("display", "none"); lineFocus.style("display", "none"); })
	    .on("mousemove", mousemove);

	// on mouseover handler
  	function mousemove() {
  		var bisectDate = d3.bisector(function(d) { return d.date; }).left;
    	var x0 = xVal.invert(d3.mouse(this)[0]),
	        i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i],
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	    focus.attr("transform", "translate(" + xVal(d.date) + "," + yVal(d.value) + ")");
	    lineFocus.attr("transform", "translate(" + xVal(d.date) + ", 0)");
    	focus.select("#date").text(formatDate(d.date));
    	focus.select("#price").text("$" + d.value.toFixed(2));
  	}

  	// format date to be day, month, year
  	function formatDate(date) {
  		const days = [
  			"Monday",
  			"Tuesday",
  			"Wednesday",
  			"Thursday",
  			"Friday",
  			"Saturday",
  			"Sunday"
  		];
  		const months = [
  			"January",
  			"February",
  			"March",
  			"April",
  			"May",
  			"June",
  			"July",
  			"August",
  			"September",
  			"October",
  			"November",
  			"December"
  		];
  		return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  	}
}



/*
 * Allows searching functionality of the dataset
 * If word is found, updates the vis to display new card info
 */
function updateVis(svg, legendWidth, legendHeight, graphX, graphWidth, graphHeight, legendMargin, graphMargin) {
	var search = document.querySelector("#search");

	// If a word is found
	if (search.value in cardData) {

		d3.selectAll(".graph").remove();
		drawLegend(cardData[search.value], svg, legendWidth, legendHeight, legendMargin);
		drawGraph(cardData[search.value], svg, graphX, graphWidth, graphHeight, graphMargin);
		updateHeader(search.value, cardData[search.value]);

	}
}

display();































