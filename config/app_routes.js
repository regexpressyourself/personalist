const path = require('path');
const express = require('express');
const request = require("request");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
var SpotifyWebApi = require('spotify-web-api-node');
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ playlistsongs: {} }).write()


let spotifyApi;
let getCreds = () => { 
  spotifyApi = new SpotifyWebApi({
    clientId: '9e86013c99c74130935c09f827ab9cf4',
    clientSecret: 'c4e6904f57964fb3a9c52fe83d2fac65',
    redirectUri: '/'
  });
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log(err);
    }
  );
}

getCreds();

module.exports = (app) => {

  app.get('/playlists', (req, res) => {
    spotifyApi.getUserPlaylists(req.query.user, {}, (err, data) => {
      if (data !== undefined) {
        res.send(JSON.stringify(data.body));
      }
      else if (err) {
        getCreds();
        console.log(err);
      }
    });
  });

  app.get('/playlist', (req, res) => {
    let songList = {items: []};

    spotifyApi.getPlaylistTracks(req.query.user, req.query.list, {}, (err, data) => {
      if (data == undefined) {return;}
      let i = 0;
      for (let song of data.body.items) {

        song = song.track;
        let id = req.query.list + song.id;
        let dbValue = db.get(id).value();

        if (typeof dbValue === 'undefined') {
          song['description'] = '';
          db.set(id, song['description']).write();
        }
        else {
          song['description'] = dbValue;
        }

        song['messinaId'] = id;
        songList.items.push(song);
      }

      res.send(JSON.stringify(songList));

    });
  });


  app.post('/playlist', (req, res) => {
    let songs = req.body.payload;
    for (let song of songs) {
      db.set(song['id'], song['description']).write();
    }
  });

  app.get('/', (req, res) => {
    app.use('/', express.static('public'));
    app.use('/images', express.static('public/static/images'));
    app.use('/css', express.static('public/static/css'));
    app.use('/js', express.static('public/static/js'));
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  app.get('/lists', (req, res) => {
    app.use('/', express.static('public'));
    app.use('/images', express.static('public/static/images'));
    app.use('/css', express.static('public/static/css'));
    app.use('/js', express.static('public/static/js'));
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  app.get('/songs', (req, res) => {
    app.use('/', express.static('public'));
    app.use('/images', express.static('public/static/images'));
    app.use('/css', express.static('public/static/css'));
    app.use('/js', express.static('public/static/js'));
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

};

