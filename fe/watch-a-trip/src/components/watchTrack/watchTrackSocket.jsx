import { useParams } from "react-router-dom";
import { SocketProvider } from "../socket/socketProvider";
import WatchTrack from "./watchTrack";

const WatchTrackSocket = () => {
  const {id} = useParams()
  return ( 
    <SocketProvider id={id}>
      <WatchTrack></WatchTrack>
    </SocketProvider>
   );
}
 
export default WatchTrackSocket;