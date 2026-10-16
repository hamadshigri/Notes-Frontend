import Item from "../components/Item"
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



const Dashboard = () => {
  const navigate = useNavigate()
  const [searchItem, setSearchItem] = useState("");
  const [selectItem, setSelectItem] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const token = localStorage.getItem("token");
  if(!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }});
        const fetchNotes = response.data.data;
        setNotes(fetchNotes);
        setFilteredNotes(fetchNotes);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchNotes();
  }, []);


  useEffect(() => {
    console.log(notes);
    if (searchItem.trim() === "" && selectItem === "sortby") {
          setFilteredNotes(notes);
        }
    setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(searchItem.toLowerCase())));

    if (selectItem == "alphabets") {
      setFilteredNotes(prev => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (selectItem == "recentlycreated") {
      setFilteredNotes(prev => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
    else if (selectItem == "lastedited") {
      setFilteredNotes(prev => [...prev].sort((a, b) => new Date(b.updatedAt ?? b.createdAt) - new Date(a.updatedAt ?? a.createdAt)));
    } else {
      setFilteredNotes(prev => prev);
    }

  }, [selectItem, searchItem])

  return (
    <>
      <Navbar setSearchItem={setSearchItem} setSelectItem={setSelectItem} />
      <div className={`relative ${loading ? 'flex flex-col justify-center items-center': ''} h-[calc(100vh-173px)]`}>
        {loading? <AiOutlineLoading3Quarters className="animate-spin text-center text-4xl"/> : filteredNotes.map((note, index) => (
          <Link key={index} to={`/note?id=${note._id}`}><Item title={note.title} message={note.message} createdAt={note.createdAt} /></Link>
        ))}

        <div className='absolute fixed bottom-7 right-1 p-4'>
          <Link to={"/note"} className='bg-[#437993] p-6 text-white font-bold rounded hover:opacity-[0.9]'>Create New Note</Link>
        </div>
      </div>
    </>

  )
}

export default Dashboard