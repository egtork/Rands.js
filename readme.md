# Rands.js

Rands.js provides methods to generate pseudorandom numbers from various distributions (e.g., uniform, Gaussian, Poisson, binomial, etc.). Rands.js can be used in conjunction with a seeded random number generator (RNG) to produce repeatable sequences of random values.

## Installation

### With NPM

    npm install rands

In your code:

    var Rands = require('rands');
    var r = new Rands();

### Directly in the browser

While a tool like Webpack or Browserify is recommended for use in the browser, the `rands.min.js` script is also provided, which exposes the window.Rands global variable:

    <script src="path/to/rands.min.js"></script>
    <script>
      var r = new Rands();
      ...
    </script>

## Random distributions

The library provides methods to generate values from the following distributions.

In each case, the final argument `length`  is optional. When included, the function returns an array of random variables of length `length`. When omitted, the function returns a single numeric value.

#### Bernoulli

Generate Bernoulli random variable(s) with parameter `p`:

    r.bernoulli(p, [length])

#### Binomial

Generate binomial random variable(s) given `n` trials and `p` probability of success in each trial:

    r.binomial(n, p, [length])

#### Exponential

Generate exponential random variable(s) with rate parameter `lambda`:

    r.exponential(lambda, [length])

#### Integer

Generate uniformly distributed integer(s) in range [min, max):

    r.integer(min, max, [length])

#### Normal / Gaussian

Generate normally distributed random variable(s) with mean `mean` and standard deviation `stdev`,
where `mean`=0 and `stdev`=1 by default:

    r.normal([mean], [stdev], [length])

#### Poisson

Generate Poisson random variable(s) with parameter `lambda`:

    r.poisson(lambda, [length])

#### Rayleigh

Generate Rayleigh random variable(s) with scale parameter `sigma`:

    r.rayleigh(sigma, [length])

#### Uniform

Generate uniform random variable(s) in range [`min`, `max`), where `min`=0 and
`max`=1 by default:

    r.uniform([min], [max], [length])

## Utility functions

A few static methods are provided:

#### Mean

Compute the mean of the numbers contained in in array `a`:

    Rands.mean(a)

#### Variance

Compute the variance of the numbers contained in array `a`:

    Rands.variance(a)

## Generating a repeatable sequence of random variables using a seeded random number generator function

The Rands([rngFunc]) constructor accepts a uniform random number generator function as an optional argument. By providing
a seeded RNG function, your code can generate the same sequence of pseudorandom numbers every time it runs.

This is demonstrated in following example using David Bau's seedrandom.js package. The script will print the same number to the console every time it runs:

    var Rands = require('rands');
    var seedrandom = require('seedrandom');

    var rngFunc = seedrandom('charlotte');
    var r = new Rands(rngFunc);

    console.log(r.uniform());

When an RNG function is not passed to the Rands constructor, the library will fall back to the built-in Math.random() function.
