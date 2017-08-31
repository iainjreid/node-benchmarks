const Benchmark = require('benchmark')
const R = require('ramda')

const list = []

for (let i = 0, n = 100; i < n; i++) {
  list.push({ checked: false })
}

list[90] = true;

(new Benchmark.Suite)
  .add('Array#some + anon', function () {
    list.some(_ => _.checked)
  })
  .add('Ramda#any', function () {
    R.any(_ => _.checked, list)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: false })

