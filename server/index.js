const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer();

const incrementObjCount = (key, obj) => {
    obj[key] ? obj[key]++ : obj[key] = 1;
};

app.post('/', upload.single("file"), async (req, res) => {
    if (req.file) {
        const content = JSON.parse(req.file.buffer.toString());
        const mediaUrlBase = "https://www.youtube.com/watch?v=";
        const artistUrlBase = "https://www.youtube.com/channel/";

        const mediaCount = {};
        const artistCount = {};
        const artistIdToTitle = {};

        const parsedContent = {};
        parsedContent['mediaPlays'] = content
            .filter(vid => vid.header === "YouTube Music" && vid.subtitles)
            .map(song => {
                const songId = song.titleUrl.slice(mediaUrlBase.length);
                const artistIdName = song.subtitles.map(artist => ({id: artist.url.slice(artistUrlBase.length), name: artist.name}));

                incrementObjCount(songId, mediaCount);

                artistIdName.forEach(artist => {
                    incrementObjCount(artist.id, artistCount);
                    artistIdToTitle[artist.id] = artist.name;
                });

                return {
                    id: songId,
                    title: song.title.slice("Watched ".length),
                    titleUrl: song.titleUrl,
                    artists: [...song.subtitles.map(artist => (
                        {
                            name: artist.name,
                            url: artist.url
                        }
                    ))],
                    time: song.time
                };
            });

            parsedContent['mediaPlays'] = parsedContent['mediaPlays'].map(song => {
                return {
                    ...song,
                    plays: mediaCount[song.id]
                }
            });

            let artistCountArr = [];
            Object.keys(artistCount).map(key => {
                artistCountArr.push({ id: key, plays: artistCount[key], title: artistIdToTitle[key] })
            });

            artistCountArr.sort((a, b) => b.plays - a.plays);

            parsedContent['artistPlays'] = artistCountArr;

        res.status(200).json(parsedContent);
    } else {
        res.status(400).send("Must receive a file");
    }
});

app.listen(3001, () => console.log('Listening...'));


