var views = {
  "views": [
  {
    "path" : "/instruments", 
    "type" : "twelveZeroZero", 
    "widgets" : {
      "north" : ["search", "instrumentList"]          
    }
  },
  {
    "path" : "/instrument/:symbol/details",
    "type" : "twelveSixSix",
    "widgets" : {
      "north" : ["search"],
      "east" : ["stockInfo"],
      "west" : ["graph"]
    }
  }
  ]
}