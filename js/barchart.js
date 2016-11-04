function barchart(id,data) {

    var colors=['#fff','#ffdfdf','#ffbfbf','#ff9f9f','#ff8080','#ff6060','#ff4040','#ff2020','#ff0000'];

    var id=id;
    var me=this;
    var svg, windowWidth, pageWidth, barWidth,margin,width,height;

    var scaleY;


    me.init= function(){
        svg = d3.select(id)
            .append("svg");

        var barGroup=svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        var bar = barGroup
            .append("rect")
                .attr("class", "bar");  

        var text=barGroup.
            append("text")
                .text(function(d){ return d.parameter;})
                .attr("fill","#fff");

        me.render();
    };

    me.update= function(data){
    
        var bar = svg.selectAll("g")
            .data(data)
            .enter(); 

        me.render();
    };


    me.render = function() {
        me.updateDimensions(window.innerWidth);

        scaleY = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.total; })])
        .range([height, 0]);   

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        svg.selectAll("g")
             .attr('transform',function(d, i) { return "translate("+i * barWidth+",0)"});

        svg.selectAll(".bar")
            .attr("fill",function(d,i) { return colors[i]; })
            .attr("width", barWidth)
            .transition().duration(300)
                .attr("y", function(d) { return scaleY(d.total); })
                .attr("height", function(d) { return height - scaleY(d.total); });

        svg.selectAll("text")
            .attr("class", "parameters")
            .attr("y", height-2)
            .attr("x",barWidth/2)
            .attr("text-anchor","middle");
    };


    me.updateDimensions = function(winWidth) {

        windowWidth= winWidth;
        
        margin = {top: 0, right: 0, bottom: 0, left: 0};
        pageWidth=(parseInt(windowWidth/data.length))*data.length;
        barWidth=parseInt(windowWidth/data.length);

        width = pageWidth - margin.left - margin.right;
        height = $(id).height() - margin.top - margin.bottom;
    };

    me.init();

    window.addEventListener('resize', me.render);

}




