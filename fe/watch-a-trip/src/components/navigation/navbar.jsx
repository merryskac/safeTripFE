const Navbar = () => {
  return ( 
  <div className="flex font-['poppins'] bg-slate-50 shadow-md p-3 px-14 position-relative justify-between z-50">
      <h1 className="font-bold text-[25px] text-sky-500">Safetrip</h1>
      <div className="">
        <ul className="flex inline place-content-center items-center h-full">
          <li className="mx-4">Home</li>
          <li>About us</li>
        </ul>
      </div>
  </div> );
}
 
export default Navbar;