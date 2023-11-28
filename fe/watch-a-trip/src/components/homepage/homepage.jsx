import Footer from '../navigation/footer';
import Navbar from '../navigation/navbar';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
	return (
		<div className="font-['poppins']">
			<Navbar />
			<div className="py-16">
				<p className="text-sky-500 text-[50px] font-bold text-center ">
					Have a safe trip!
				</p>
				<p className="text-center">Let someone you love assure your safety</p>
				<div className="">
					<div className="relative">
						<div className="absolute bg-gradient-to-b from-white from-25% to-transparent h-[75vh] w-full z-10 " />
						<img
							src="googlemaps.jpg"
							className="absolute w-full object-cover object-right opacity-1 h-[80vh] mx-auto"
							alt="maps"
						/>
						<div className="absolute z-20 top-[150px] w-full text-center">
							<button className="bg-sky-500 p-3 px-7 rounded-full text-white font-bold shadow-md border-2 border-white"
              onClick={()=>{
                navigate('/track')
              }}>
								Start now
							</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Homepage;
