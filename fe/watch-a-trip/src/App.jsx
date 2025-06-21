import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './components/homepage/homepage'
import Track from './components/track/track'
import TrackDetail from './components/trackDetail/trackDetail'
import TrackDetailSocket from './components/trackDetail/trackDetailSocket'
import WatchTrack from './components/watchTrack/watchTrack'
import WatchTrackSocket from './components/watchTrack/watchTrackSocket'
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/track' element={<Track/>}/>
        <Route path='/track/detail/:id' element={<TrackDetailSocket/>}/>
        <Route path='/track/watch/:id' element = {<WatchTrackSocket/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
