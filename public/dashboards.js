var graphite_url = "http://localhost:8080";  // enter your graphite url, e.g. http://your.graphite.com

var dashboards = 
[
  { "name": "OCP APP Status From Graphite",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    "description": "OCP APP Status From Graphite"
                ,
    "metrics":  // metrics is an array of charts on the dashboard
    [
      {
        "alias": "FPS response",  // display name for this metric
        "target": "intuit.FPS.check-c001.response)",  // enter your graphite barebone target expression here
        "description": "FPS response time",  // enter your metric description here
        // "summary": "sum",  // available options: [sum|min|max|avg|last|<function>]
        "summary_formatter": d3.format(",f") // customize your summary format function. see d3 formatting docs for more options
        // also supported are tick_formatter to customize y axis ticks, and totals_formatter to format the values in the legend
      },
      {
        "alias": "FPS status",  // display name for this metric
        "target": "intuit.FPS.check-c001.status)",  // enter your graphite barebone target expression here
        "description": "FPS status",  // enter your metric description here
        // "summary": "sum",  // available options: [sum|min|max|avg|last|<function>]
        "summary_formatter": d3.format(",f") // customize your summary format function. see d3 formatting docs for more options
        // also supported are tick_formatter to customize y axis ticks, and totals_formatter to format the values in the legend
      },
      
    ]
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
