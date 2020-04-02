'use strict';

import '../styles/main.css';
import { Chart } from 'chart.js';


window.addEventListener('load', run);
window.addEventListener('resize', doResize);

async function  run(){
  const data = await getData();
  chart1(data);
  chart2(data);
  doResize();
};
  
  
function chart1(data) {
  const ctx = document.getElementById('chart1').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.name,
      datasets: [
        {
          label: 'Lines of Code',
          data: data.loc,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {}
  });
};

function chart2(data) {
  const ctx = document.getElementById('chart2').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.name,
      datasets: [
        {
          label: 'Commits',
          data: data.commit,
          fill: false,
          borderColor: 'rgba(0, 99, 132, 1)',
          backgroundColor: 'rgba(0, 99, 132, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
};

async function getData() {
  const response = await fetch('commits.csv');
  const data = await response.text();
  const loc = [];
  const commit = [];
  const name = [];
  const rows = data.split('\n').slice(1);
  
  rows.forEach(row => {
    const cols = row.split(',');
    name.push(cols[0]);
    loc.push(cols[1]);
    commit.push(cols[2]);    
  });
  return { loc, commit, name };
};

function doResize() {
  document.getElementById('container').style.height = (window.innerHeight - 10) + "px";
}