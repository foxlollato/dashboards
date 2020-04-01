'use strict';

import '../styles/main.css';
import { Chart } from 'chart.js';


window.addEventListener('load', run);

function run(){
  console.log('runou');
  chart1();
  chart2();
};
  
  
  async function chart1() {
      const ctx = document.getElementById('chart1').getContext('2d');
      const data = await getData();
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

    async function chart2() {
      const ctx = document.getElementById('chart2').getContext('2d');
      const data = await getData();
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
        options: {}
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