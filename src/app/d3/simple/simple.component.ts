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
}
