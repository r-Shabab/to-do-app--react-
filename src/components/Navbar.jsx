function Navbar() {
  return (
    <nav className=" flex justify-between items-center bg-slate-900 text-white py-3">
      <div className="logo mx-8">
        <span className="cursor-pointer font-bold text-xl text-stone-200 ">
          TaskFlow
        </span>
      </div>
      <ul className=" flex gap-8 mx-8">
        <li className=" cursor-pointer hover:font-bold transition-all">Home</li>
        <li className=" cursor-pointer hover:font-bold transition-all">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
