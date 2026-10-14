import { Link, useLocation } from 'react-router-dom';

function Navbar({setSearchItem, setSelectItem}) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="bg-[#F7F7F7] flex justify-center items-center gap-10 p-4">

        {pathname === '/' ? (
          <div className='flex gap-4'>
            <input type="text" onChange={(e) => setSearchItem(e.target.value)} placeholder="Filter by" className="bg-white p-2" />
            <select name="filter" id="filter" onChange={(e) => setSelectItem(e.target.value)} className="bg-white p-2">
              <option value="sortby">Sort By</option>
              <option value="alphabets">Alphabets</option>
              <option value="lastedited">Last Edited</option>
              <option value="recentlycreated">Recently Created</option>
            </select>
          </div>
        ) : (
          <div className="flex justify-start items-center w-full max-w-[55%]">
            <div className="gap-10 p-4">
              <Link to="/"><h2 className="text-lg text-center">Home</h2></Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar