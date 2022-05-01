import {useState, useEffect} from 'react'
import './App.css';
import {} from 'react-router-dom'
import EntryItem from './components/EntryItem/EntryItem.js'
import pinkLines from './assets/PinkLines.svg'
import redLines from './assets/RedLines.svg'
import linePattern from './assets/Line.svg'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home/Home.js'

const artistEntry = {
    id: "dklafjd;asfjfaklj",
    plays: 227,
    title: "Aimer - Topic"
}

const songEntry = {
    "id": "5UZ4V16d8eU",
    "title": "Shelter",
    "titleUrl": "https://www.youtube.com/watch?v=5UZ4V16d8eU",
    "artists": [
        {
            "name": "Porter Robinson - Topic",
            "url": "https://www.youtube.com/channel/UCUt2uP6O_UBJp4aBx5KjQjA"
        }
    ],
    "time": "2021-12-04T00:40:49.600Z",
    "plays": 1
}

function App() {
    const [acceptedFile, setAcceptedFile] = useState();
    const [musicHistory, setMusicHistory] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!acceptedFile) {
            return
        }

        const formData = new FormData()

        formData.append('file', acceptedFile)

        fetch('http://172.28.123.208:3001', {
            method: "POST",
            body: formData
        }).then(res => res.json())
        .then(response => {
            setMusicHistory(response)
            navigate('/stats')

        })

    }, [acceptedFile])
  return (
    <div className="App bg-[#222] relative min-h-screen overflow-hidden px-6">

      <img src={redLines} className="absolute z-0 right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
      <img src={pinkLines} className="absolute z-0 left-0 top-0 translate-x-[-50%] translate-y-[-30%]" />
      <img src={linePattern} className="absolute z-0 left-0 bottom-1/2" />

      <Routes>
        <Route path="/" element={<Home setAcceptedFile={setAcceptedFile} />} />
        <Route path="/stats" element={<h1 className='text-white font-black text-3xl'>stats</h1>} />
      </Routes>


      </div>
  );
}

export default App;
