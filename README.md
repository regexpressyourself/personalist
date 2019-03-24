<img alt="personaList" align="right" src="https://smessina.com/static/images/sss/pl-1.png" width="400px"/>

# personaList

Add comments to your Spotify playlists

[See it live here!](https://personalist.smessina.com/)

## Table of Contents

  1. [Getting Started](#getting-started)
  2. [Tech](#tech)
  3. [Contributing](#contributing)
  4. [Authors](#authors)
  5. [License](#license)


## Introduction

  With personaList, you can comment up every song in your Spotify playlist to create a custom playlist experience. Add notes, reminders, or ideas to your Spotify playlists. 

## Getting Started

  ```
  git clone https://github.com/regexpressyourself/personalist.git 
  cd personalist
  yarn install
  cd client
  yarn install
  ```

  You'll also need a `.env` file in the root directory with the following information:

  ```
  CLIENT_ID={Spotify Id}
  CLIENT_SECRET={Spotify Secret} 
  ENVIRONMENT='dev' 
  ```

  The environment can be ommited if running a production build (detailed below).

### Development 

  ```
  # from root of repo
  node app.js &
  gulp &
  cd client
  npm run start
  ```      
  
  Your React dev server will be running off of [http://localhost:3001](http://localhost:3001). The Node server is on [http://localhost:3000](http://localhost:3000).

### Production
  First, make sure to remove the `ENVIRONMENT` line from your `.env` file. Next:

  ```
  # from root of repo
  node app.js &
  cd client
  npm run build
  ```      

  Node will serve the compiled React assets and host them on port `3000`.


## Tech

Node and Express handle the back end. I'm currently using [lowdb](https://github.com/typicode/lowdb) for a database, which is essentially just a json file.

The front end started in plain HTML/CSS/JS, which you can see at [this commit](https://github.com/regexpressyourself/personalist/tree/7abedc411dad50878ec06b2a440a9dd66a01607d). 

I ported the front end over to React, and subsquently to [React Hooks](https://reactjs.org/docs/hooks-intro.html). The current version is entirely based on the Hooks model.


## Contributing

  I'm always happy to receive pull requests, questions/issues regarding code, and feature requests on all my projects. Please feel free to open an issue or submit a pull request.

  **[Back to top](#table-of-contents)**

## Authors

  * **[Sam Messina](https://smessina.com)** - *Sole Developer* 

  **[Back to top](#table-of-contents)**

## License

  personaList is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


  **[Back to top](#table-of-contents)**
