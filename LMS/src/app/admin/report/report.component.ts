import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';  

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = 'googlechart';  
  type = 'PieChart';  
  data = [  
     ['One Star', 5.0],  
     ['Two Star', 36.8],  
     ['Three Star', 42.8],  
     ['Four Star', 18.5],  
     ['Five Star', 16.2]  
  ];  
  columnNames = ['Star Ratings', 'Percentage'];  
  options = {   
    pieHole:0.4,
    //legend: 'none',
    slices: {
      0: { color: '#1de099' },
      1: { color: '#1dc8cd' },
      2: { color: '#e55954' },
      3: { color: '#990099' },
      4: { color: '#636299' }
    },
    chartArea: {
      width: 800,
      height: 500
    },
    legend: {
      position: 'bottom'
    }
  };
  width = 500;  
  height = 300;

  expData = {
    type: 'PieChart',
    title: 'Browser market shares from 2012 to 2016',
    data: [
      ['One Star', 25.0],  
      ['Two Star', 16.8],  
      ['Three Star', 12.8],  
      ['Four Star', 18.5],  
      ['Five Star', 26.9]  
    ],
    columnNames: ['Star Ratings', 'Percentage'],
    options: {   
      pieHole:0.4,
      //legend: 'none',
      slices: {
        0: { color: '#1de099' },
        1: { color: '#1dc8cd' },
        2: { color: '#e55954' },
        3: { color: '#990099' },
        4: { color: '#636299' }
      },
      chartArea: {
        width: 800,
        height: 500
      },
      legend: {
        position: 'bottom'
      }	  
    },
  };

  chartData = {
    type: 'BarChart',
    data: [
      ["Jan", 100, 990],
      ["Feb", 10, 200],
      ["Mar", 70, 440],
      ["Apr", 5, 180],
      ["May", 130, 1540],
      ["Jun", 70, 390],
      ["Jul", 80, 400],
      ["Aug", 2, 40],
      ["Sep", 5, 80],
      ["Oct", 10, 140]
    ],
    options: {   
      hAxis: {
        title: 'Count'
      },
      vAxis:{
        title: 'Month',
        minValue:0
      },
      series: {
        0:{color:'#1de099'},
        1:{color:'#e55954'}
      },
      isStacked:true	  
    },
    chartColumns: ['Month', 'Classes','Students'],
    width: 1000,
    height: 800
  };

  constructor(){}  
  ngOnInit() {}  
}
