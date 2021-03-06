const queryTemplate = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [],
      },
    ],
    labels: [],
  },
  options: {
    plugins: {
      datalabels: {
        display: false,
      },
      doughnutlabel:{
        labels:[
          {
            text:'550',
            font: {
              size:20
            }
          },
          {
            text:'total'
          }
        ]
      }
    }
  }
}

// deep clone an object - no reference will be create between the original and the new one
function deepCloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};


// generate chart query string for Quick Chart 
function getChartQueryString(coinPortfolio){
  let names = coinPortfolio.map((coin) => (coin.name));
  let values = coinPortfolio.map((coin) => (coin.value));
  let result = deepCloneObject(queryTemplate);   

  result.data.datasets[0].data = values;
  result.data.labels = names;
  result.options.plugins.doughnutlabel.labels[0].text = values.reduce((sum, value) => (sum + parseFloat(value)), 0).toFixed(2);
  result = 'https://quickchart.io/chart?c=' + convertToString(result);
  result += '&w=500&h=300&v=3.1';
  return result;
}

// convert object, array, function, and other to text of the format: (differ to JSON.stringify)
//  {property:'value'}
function convertToString(obj) {
  // is array
  if (typeof(obj) === "object" && Array.isArray(obj)) {
    let entries = obj.map((item) => (convertToString(item)));
    return '[' + entries.join(',') + ']'
  }
  
  // is object
  if (typeof(obj) === 'object' ){ 
    let entries = Object.entries(obj).map(([key, value]) => (key + ':' + convertToString(value)))
    return '{' + entries.join(',') + '}';
  } 

  // is function
  // ...

  // everything else
  return JSON.stringify(obj).split('"').join("'");
};

// generate coin chart
function generateCoinChart(coinPortfolio){
  console.log('generating chart....');
  let queryStr = getChartQueryString(coinPortfolio);
  displayChart(queryStr);
};


