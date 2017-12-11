import Highcharts from 'highcharts';

export function renderMainChart(specificities, yAxisCategories, dataSeries) {
  Highcharts.chart('js-specificity-graph', {
    chart: {
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 4,
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Specificity graph'
    },
    xAxis: {
      title: {
        text: 'Location in stylesheet'
      }
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        }
      }
    },
    tooltip: {
      formatter() {
        return `Selector: <b>${specificities[this.x].selector}</b><br>
        Specificity: <b>${yAxisCategories[this.y]}</b>`;
      }
    },
    yAxis: {
      title: {
        text: 'Specificity'
      },
      categories: yAxisCategories,
      labels: {
        align: 'right'
      },
      tickmarkPlacement: 'on'
    },
    series: [
      {
        name: 'ID selectors',
        color: 'rgba(223, 83, 83, .5)',
        data: dataSeries.idCategory
      },
      {
        name: 'Class, attribute & pseudo-class selectors',
        color: 'rgba(119, 152, 191, .5)',
        data: dataSeries.classCategory
      },
      {
        name: 'Element & pseudo-element selectors',
        color: 'rgba(119, 0, 191, .5)',
        data: dataSeries.elementCategory
      }
    ]
  });
}

export function renderSpecificityGroupsColumnChart(dataSeries) {
  Highcharts.chart('js-specificity-groups-column', {
    chart: {
      type: 'column',
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 4,
      zoomType: 'x'
    },
    title: {
      text: 'Usage of specificities, sorted from most used to least used'
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter() {
        return `Specificity: <b>${this.point.name}</b><br>
        Usage: <b>${this.y} ${this.y > 1 ? 'times' : 'time'}</b>`;
      }
    },
    series: [{
      name: 'Specificities',
      colorByPoint: true,
      data: dataSeries
    }],
    yAxis: {
      title: {
        text: 'Usage'
      }
    },
    xAxis: {
      title: {
        text: 'Specificity'
      },
      type: 'category'
    }
  });
}

export function renderSpecificityGroupsPieChart(dataSeries) {
  Highcharts.chart('js-specificity-groups-pie', {
    chart: {
      type: 'pie',
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 4
    },
    title: {
      text: 'Usage of specificities, as % of total usage'
    },
    tooltip: {
      formatter() {
        return `Specificity: <b>${this.point.name}</b><br>
        Usage: <b>${Math.round(this.percentage * 10) / 10}%</b>`;
      }
    },
    series: [{
      name: 'Specificities',
      colorByPoint: true,
      data: dataSeries
    }],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    }
  });
}
