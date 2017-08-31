const Benchmark = require('benchmark')
const R = require('ramda')

const list = []

for (let i = 0, n = 100; i < n; i++) {
  list.push({ checked: false })
}

(new Benchmark.Suite)
  .add('Array#filter + anon', function () {
    list.filter(_ => _.checked)
  })
  .add('Ramda#filter', function () {
    R.filter(_ => _.checked, list)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: false })

