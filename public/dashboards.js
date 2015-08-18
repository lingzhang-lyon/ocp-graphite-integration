var graphite_url = "http://localhost:8080";  // enter your graphite url, e.g. http://your.graphite.com

var check_metrics_for_app = gon.check_metrics_for_app
console.log(check_metrics_for_app)

// each check will have a graph
var metrics =[]
for(i=0; i<check_metrics_for_app['checks'].length; i++){
  var graphite_metric="intuit."+check_metrics_for_app['app_name']+".check-"+check_metrics_for_app['checks']
  metrics.push({
        "alias": graphite_metric,  // display name for this metric
        "renderer": 'multi',
        "targets": [
            {'target': graphite_metric+'.response',
             'color': '#A99', 
             'renderer': 'bar',
             'alias': 'response time'},
            {'target': graphite_metric+'.status',
             'color': '#F00',
             'alias': 'app status',
             'renderer': 'line'}
        ],
        "description": "metrics for "+graphite_metric, 
  })
}
// console.log(metrics)

var dashboards = 
[
  { "name": "OCP APP Status Dashboard From Graphite",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    "description": "Status Dashboard For "+ check_metrics_for_app['app_name'],
    "metrics":  metrics // metrics is an array of charts on the dashboard
  },
  
];

var scheme = [
              '#423d4f',
              '#4a6860',
              '#848f39',
              '#a2b73c',
              '#ddcb53',
              '#c5a32f',
              '#7d5836',
              '#963b20',
              '#7c2626',
              ].reverse();

function relative_period() { return (typeof period == 'undefined') ? 1 : parseInt(period / 7) + 1; }
function entire_period() { return (typeof period == 'undefined') ? 1 : period; }
function at_least_a_day() { return entire_period() >= 1440 ? entire_period() : 1440; }

function stroke(color) { return color.brighter().brighter() }
function format_pct(n) { return d3.format(",f")(n) + "%" }
