

// create frame constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 



// new frame for bar plot
const FRAME= d3.select("#barchart") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 



// read in bar data
d3.csv("data/data.csv").then((data) => { 

		// create y axis scale based on amount column
		const MAX_AMT = d3.max(data, (d) => { return parseInt(d.Value); });
	         
	  const AMT_SCALE = d3.scaleLinear() 
	                    .domain([MAX_AMT + 10, 0]) 
	                    .range([0, VIS_HEIGHT]); 

	 // create x axis scale based on category names
   const CATEGORY_SCALE = d3.scaleBand() 
                    .domain(data.map((d) => { return d.Category; })) 
                    .range([0, VIS_WIDTH])
                    .padding(.2); 


    // plot bar based on data with rectangle svgs 
		FRAME.selectAll("bar")  
	        .data(data) 
	        .enter()       
	        .append("rect")  
	          .attr("y", (d) => { return AMT_SCALE(d.Value) + MARGINS.bottom; }) 
	          .attr("x", (d) => { return CATEGORY_SCALE(d.Category) + MARGINS.left;}) 
	          .attr("height", (d) => { return VIS_HEIGHT - AMT_SCALE(d.Value); })
	          .attr("width", CATEGORY_SCALE.bandwidth())
	          .attr("class", "bar");



	 // append x axis 
	 FRAME.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(CATEGORY_SCALE))
          .attr("font-size", '20px'); 


  // append y axis
	FRAME.append("g") 
	      .attr("transform", "translate(" + (MARGINS.left) + 
	            "," + (MARGINS.top) + ")") 
	      .call(d3.axisLeft(AMT_SCALE).ticks(10)) 
	        .attr("font-size", '20px'); 
});