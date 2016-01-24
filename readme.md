# Rands.js

Rands.js produces random variables from a variety of

## Installation

### With NPM

    npm install rands

And in your code:

    var Rands = require('rands');
    var r = new Rands();

### Directly in the browser

The `rands.min.js` script exposes the window.Rands global variable:

    <script src="path/to/rands.min.js"></script>
    <script>
      var r = new Rands();
      ...
    </script>

## Random distributions

The library provides the following functions to generate a variety of random variables.

In each case, the last argument `length`  is optional. When included, the function returns an array of random variables of length `length`. When omitted, the function returns a single non-array value.

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

#### Mean

Compute the mean of the numbers contained in in array `a`:

    Rands.mean(a)

#### Variance

Compute the variance of the numbers contained in array `a`:

    Rands.variance(a)

## Generating a repeatable sequence of random variables using a seeded random number generator function

The Rands constructor accepts a uniform random number generator function as an optional argument. By providing
a seeded RNG function, your code can generate the same sequence of pseudorandom numbers every time it runs.

This is demonstrated in following example using David Bau's seedrandom.js package. The script will print the same number to the console every time it runs:

    var Randlib = require('randlib');
    var seedrandom = require('seedrandom');

    var rng = seedrandom('charlotte');
    var r = new Randlib(rng);

    console.log(r.uniform());

When an RNG function is not passed to the Rands constructor, the library will fall back to the built-in Math.random() function.
