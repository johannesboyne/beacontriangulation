function Point (x, y) {
  this.x = x;
  this.y = y;
}
function Beacon (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}
function Midpoint (p1, p2) { 
  return new Point(Math.round((p1.x+p2.x)/2), Math.round((p1.y+p2.y)/2)) 
}
function distance (p1, p2) {
  return Math.round(Math.sqrt( (Math.pow(p1.x - p2.x,2)) + (Math.pow(p1.y - p2.y,2)) ))
}

function distancePoints (beacons) {
  var points = [], vertices = new Array(beacons.length)
  beacons.forEach(function (beacon, n) {
    vertices[n] = []
    var _steps = 100, _div = _steps / 2;
    for (var i = 0; i <= _steps; i++) {
      var p = new Point(
        Math.round(beacon.x+beacon.r*Math.cos((i/_div)*Math.PI)),
        Math.round(beacon.y+beacon.r*Math.sin((i/_div)*Math.PI)))
      vertices[n].push(p)
    }
  })
  
  // find first two minimal points
  var min = Math.min(); var dist_i = []
  vertices[0].forEach(function (p1) {
    vertices[1].forEach(function (p2) {
      var dist = distance(p1, p2)
      dist_i.push({midpoint: new Midpoint(p1, p2), dist: dist})
    })
  })
  dist_i = dist_i.sort(function (a,b) { return a.dist - b.dist })
  var twoPoints = dist_i.slice(0,2)
  
  // check two points against the circle
  var dist_t = []
  vertices[2].forEach(function (p1) {
    twoPoints.forEach(function (p2) {
      var dist = distance(p1, p2.midpoint)
      dist_t.push({midpoint: new Midpoint(p1, p2.midpoint), dist: dist})
    })
  })
  var p = dist_t
  .sort(function (a,b) { return a.dist - b.dist })
  .map(function (p) { return p.midpoint })
  return p
}

module.exports.Point = Point
module.exports.Beacon = Beacon
module.exports.Midpoint = Midpoint
module.exports.distance = distance
module.exports.distancePoints = distancePoints
