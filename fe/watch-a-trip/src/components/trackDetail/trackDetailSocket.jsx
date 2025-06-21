import { useParams } from 'react-router-dom';
import { SocketProvider } from '../socket/socketProvider';

import TrackDetail from './trackDetail';

const TrackDetailSocket = () => {
	const { id } = useParams();
	return (<SocketProvider id={id}>
    <TrackDetail></TrackDetail>
  </SocketProvider>);
};

export default TrackDetailSocket;
