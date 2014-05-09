var tap = require('tap'),
test = tap.test,
btria = require('../lib')

test('test beacon triangulation', function (t) {
  var testp = new btria.Point(206, 92)
  var testbeacons = [ 
    new btria.Beacon(100,100,105),
    new btria.Beacon(250,200,115),
    new btria.Beacon(300,90,95)
  ]
  // will have to frame it for > 3
  var distPoints = btria.distancePoints(testbeacons)
  t.deepEqual(distPoints[0], testp)
  t.end()
})
