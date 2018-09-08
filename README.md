# Sam Messina's Portfolio

<img width="400px" src="https://smessina.com/images/sm_fav.png" align="right" />

_*New and improved!*_

My new portfolio is a general-purpose Node server. Static assets can be rendered off of dynamic routes, making it perfect for hosting different apps and projects I'm working on.

[See it live here!](https://www.smessina.com/)

## Table of Contents

1. [Getting Started](#getting-started)
3. [Deployment](#deployment)
2. [Built With](#built-with)
3. [Contributing](#contributing)
3. [Authors](#authors)
3. [License](#license)


## Introduction

I got tired of using default Nginx routing on my Digital Ocean server, so I set up a custom Node+Express solution. My solution allows for routes to be explicitly declared, along with dynamic static asset routing along with it. This is perfect for a dev/test environment, and equally ideal for serving smaller projects without a dedicated domain name.

## Getting Started

The server itself is fairly straight forward Node and Express stuff, detailed below.

### Prerequisites


Make sure you have Node and NPM installed. [You can download Node here](https://nodejs.org/en/download/). This will install NPM as well.

You are welcome to use [Yarn](https://yarnpkg.com/en/) instead of NPM if you prefer.

### Installing

First, clone the project to a local directory.

```
   git clone https://github.com/regexpressyourself/portfolio.git && cd portfolio
```

Next, install the dependencies using NPM or Yarn.

#### Using NPM

```
   npm install
```

#### Using Yarn

```
   yarn install
```

**[Back to top](#table-of-contents)**

## Deployment

While the portfolio homepage will build, but the subpages will not. They serve files from git submodules. You can read how to update them on git's documentation [here](https://git-scm.com/docs/git-submodule).


#### Using NPM

```
   npm run start
```

#### Using Yarn

```
   yarn run start
```

   That's it! Your development server is running at [http://localhost:8080](http://localhost:8080)
   

**[Back to top](#table-of-contents)**


## Built With

* [Node](https://nodejs.org/en/) - Can't express how excited I am to have Node on this server finally
* [Express](https://expressjs.com/) - I have an unabashed exclusive relationship with Express routing
* [Steam Shovel](https://www.facebook.com/SteamShovelCoffee/) - Couldn't have done it without it

**[Back to top](#table-of-contents)**

## Contributing

I'm always happy to receive pull requests, questions/issues regarding code, and feature requests on all my projects, even my portfolio! Please feel free to open an issue or submit a pull request.

**[Back to top](#table-of-contents)**

## Authors

* **[Sam Messina](https://www.github.com/regexpressyourself)** - *Sole Developer and Subject* 

**[Back to top](#table-of-contents)**

## License

My portfolio is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


**[Back to top](#table-of-contents)**


