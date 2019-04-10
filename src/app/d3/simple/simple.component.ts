import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.sass']
})
export class SimpleComponent implements OnInit {

  private myData = [ 5, 10, 15, 20, 25 ];

  constructor() { }

  ngOnInit() {}

  addElement() {
    d3.select('#first-d3').append('p').text('New paragraph!');
  }

  // !!! (function(d, i, n) { return d; })  is not equal the ((d, i, n) => return d; )
  // to use => : n[i] is the 'this' of regular function


  connectData() {
    d3.select("body").selectAll("p")
      .data(this.myData)
      .enter()
      .append("p")
      .text(function(d) { return d; })
      .style("color", function(d) {
        if (d > 15) {
          return "red";
        } else {
          return "black";
        }
      });
  }

  drawFirstChart() {
    d3.select("#d3-chart").selectAll("div")
      .data(this.myData)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", function(d) {
        return d + "px";
      });
  }

  drawFirstSvg() {
    let w = 500;
    let h = 50;
    let svg = d3.select('#d3-svg')
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    console.log('lets create circles');

    let circles = svg.selectAll("circle")
      .data(this.myData)
      .enter()
      .append("circle");

    circles.attr("cx", function(d, i) {
      return (i * 50) + 25;
    })
      .attr("cy", h/2)
      .attr("r", function(d) {
        return d;
      })
      .attr("fill", "yellow")
      .attr("stroke", "orange");
  }
  
  drawDiagram1() {
    let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    d3.select("#diagram1").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .style("display", "inline-block")
      .style("width", "20px")
      .style("margin-right", "2px")
      .style("background-color", "teal")
      .style("height", function(d) {
        let barHeight = d * 5;
        return barHeight + "px";
      });
  }

  drawRect1() {
    let myData = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    let w = 500;
    let h = 100;
    let barPadding = 1;
    let svg = d3.select('#rect1')
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("rect")
      .data(myData)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (w / myData.length) + (w / myData.length - barPadding) / 2;
      })
      .attr("y", function(d) {
        return h - (d * 4) + 14;
      })
      .attr("width", w / myData.length - barPadding)
      .attr("height", function(d) {
        return d * 4;
      })
      .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 10) + ")";
      });

    svg.selectAll("text")
      .data(myData)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return i * (w / myData.length) + (w / myData.length - barPadding) / 2;
      })
      .attr("y", function(d) {
        return h - (d * 4) + 14;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
  }

  drawPoint() {
    let dataset = [
      [ 5,     20 ],
      [ 480,   90 ],
      [ 250,   50 ],
      [ 100,   33 ],
      [ 330,   95 ],
      [ 410,   12 ],
      [ 475,   44 ],
      [ 25,    67 ],
      [ 85,    21 ],
      [ 220,   88 ]
    ];
    let w = 500;
    let h = 100;

    let scale = d3.scaleLinear()
      .domain([100, 500])
      .range([10, 350]);

    let xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return d[0]; })])
      .range([0, w]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return d[1]; })])
      .range([0, h]);

    let svg = d3.select('#point1')
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[0]);
      })
      .attr("cy", function(d) {
        return yScale(d[1]);
      })
      .attr("r", function(d) {
        return Math.sqrt(h - d[1]);
      });
  }

  scale() {
    let dataset = this.myData.map(this.myData.range(15), function (i) {
      return Math.random() * 500;
    });
    let w = 400, h = 300;

    let svg = d3.select('#point2')
      .append('svg')
      .attr("width", w)
      .attr("height", h);

    let xScale = d3.scaleOrdinal()
      .domain(dataset)
      .rangeBands([0, w], 0.1, 0.3);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset) * 1.1])
      .range([0, h]);

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr("x", function(d, i) {
        return xScale(d);
      })
      .attr("y", function(d) {
        return h - yScale(d);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
        return yScale(d);
      })
  }
}
