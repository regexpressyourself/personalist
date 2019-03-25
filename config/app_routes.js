const path = require('path');
const express = require('express');
const request = require("request");
const FileSync = require('lowdb/adapters/FileSync')
var SpotifyWebApi = require('spotify-web-api-node');
const adapter = new FileSync('db.json')
const mongo = require('mongodb').MongoClient
const mongoUrl = 'mongodb://localhost:27017'
require('dotenv').config()

let spotifyApi;
let getCreds = () => {
  spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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
let errCount = 0;

module.exports = (app) => {
  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('personalist')
    const collection = db.collection('songs')

    app.get('/api/playlists', (req, res) => {

      spotifyApi.getUserPlaylists(req.query.user, {}, (err, data) => {
        if (data !== undefined) {
          res.send(JSON.stringify(data.body));
          errCount = 0;
          return;
        }
        else if (err) {
          errCount++;
          if (errCount < 5 ) {
            getCreds();
            res.send(err);
          }
          else {return;}
        }
      });
    });

    app.get('/api/playlist', (req, res) => {

      spotifyApi.getPlaylistTracks(req.query.user, req.query.list, {}, (err, data) => {
        if (data == undefined) {return;}
        let i = 0;
        promiseArray = [];
        for (let song of data.body.items) {

          song = song.track;
          let id = req.query.list + song.id;

          let promise = new Promise((resolve, reject) => {
            collection.findOne({id: id})
            .then(item => {
              if (item === null) {
                song['description'] = '';
                collection.insertOne({id: song['id'], description: song['description']}, (err, result) => {
                  if (err) {console.log(err);}
                })
              }
              else {
                song['description'] = item.description;
              }
              song['messinaId'] = id;
              resolve(song);
            })
            .catch(err => {
              console.error(err)
            });
          });
          promiseArray.push(promise);

        }
        Promise.all(promiseArray)
          .then(values => {
            res.send(JSON.stringify(values));
          });

      });
    });


    app.post('/api/playlist', (req, res) => {

      let songs = req.body;
      for (let song of songs) {
        collection.updateOne({id: song['id']}, {$set: {'description':song['description']}}, {upsert: true});
      }
      res.send();
    });

    if (process.env.ENVIRONMENT !== 'dev') {
      app.use(express.static(path.join(__dirname, '/../client/build')));

      app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/../client/build/index.html'));
      });
      app.get('/playlists', (req,res) =>{
        res.sendFile(path.join(__dirname+'/../client/build/index.html'));
      });
      app.get('/songs', (req,res) =>{
        res.sendFile(path.join(__dirname+'/../client/build/index.html'));
      });
    }

    app.use('/images', express.static('client/src/static/images'));
    app.use('/css', express.static('client/src/static/css'));
    app.use('/js', express.static('client/src/static/js'));

  });
};

