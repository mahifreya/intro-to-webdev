//add express
import express from 'express';

//initialize express
const app = express();

//add firebase
var admin = require("firebase-admin");

//my own database, commented out in the submission
var serviceAccount = require("./service-account.json");

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
*/

//initialize databse 
const db = admin.firestore();

const port = 8080;

//add bodyParser
const bodyParser = require('body-parser');

//use bodyParser in the requests
app.use(bodyParser.json());

// create a song type and song with id
type Song = {
    arist: string;
    name: string;
    rating: number;
  };
  
  type SongWithID = Song & {
    id: string;
  };

//songs collection from firestore db
const songs = db.collection('Songs');

//STEP 1: Make the POST request
app.post('/createSong', async function(req: { body: Song; }, res: { send: (arg0: any) => void; }){
    const song: Song = req.body;
    const songDoc = songs.doc();
    await songDoc.set(song);
    res.send(songDoc.id);

});

//STEP 2: Make the GET request

app.get('/getSongs', async function(_: any, res: { send: (arg0: SongWithID[]) => void; }) {
    const songsSnapshot = await songs.orderBy('name', 'asc').get();
    const allSongsDoc = songsSnapshot.docs;
    const songs1: SongWithID[] = [];
    for (let doc of allSongsDoc) {
        const song: SongWithID = doc.data() as SongWithID;
        song.id = doc.id;
        songs1.push(song);
    }
    res.send(songs1);
})

app.listen(port, () => console.log('App started!'));

//STEP 3: Update a Songs rating (POST)

app.post('/updateRating', async function(req: { body: { id: any; rating: number; }; }, res: { send: (arg0: any) => void; }) {
    const id = req.body.id;
    const rating = req.body.rating;
    await songs.doc(id).update({"rating": rating});
    res.send("updated song's rating!");
});

//STEP 4: DELETE a song 

app.delete('/deleteSong', async function (req, res) {
  const id2 = req.query.id;
  await songs.doc(id2).delete();
  res.send('deleted song..');
});