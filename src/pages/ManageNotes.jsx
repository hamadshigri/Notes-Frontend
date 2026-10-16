import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import { handleConfirmation } from "../utils/SwalHelper.js";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../lib/config.js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const ManageNotes = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const addNotify = () => toast("Notes Added!");
  const updateNotify = () => toast("Notes Updated!");
  const deleteNotify = () => toast("Notes Deleted!");

  const token = localStorage.getItem("token");
  if(!token) {
    navigate("/login");
  }

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/note?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = response.data;
      titleRef.current.value = data.title || "";
      messageRef.current.value = data.message || "";
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (!id) return;
    fetchNotes();
  }, [id]);

    useEffect(() => {
    if (!id) {
      setLoading(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    const title = titleRef.current.value;
    const message = messageRef.current.value;
    if (!title || !message) {
      alert("please add missing data");
      return;
    }
    const noteData = {
      title,
      message,
    }
    try {
      const response = await axios.post(`${BASE_URL}/note`, noteData, {
         headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      console.log("Note Added!", response.data);
      titleRef.current.value = "";
      messageRef.current.value = "";
      navigate("/dashboard");
      addNotify();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }

  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    const title = titleRef.current.value;
    const message = messageRef.current.value;

    if (!title || !message) {
      alert("please add missing data");
      return;
    }
    try {
      let data = { title, message };
      const response = await axios.put(`${BASE_URL}/note?id=${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      navigate("/dashboard");
      updateNotify();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleConfirmation(
      "Delete Item?",
      "This action cannot be undone."
    );
    if (result.isConfirmed) {
      const response = await axios.delete(`${BASE_URL}/note?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      console.log(response);
      Swal.fire({
        title: "Deleted!",
        text: "Your item has been successfully removed.",
        icon: "success",
        confirmButtonColor: '#437993'
      });
      deleteNotify();
      navigate("/dashboard");
    } else {
      console.log("User canceled the deletion.");
    }

  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[850px] pt-4">
          {loading && <p className="text-center flex justify-center"><AiOutlineLoading3Quarters className="animate-spin text-4xl" /></p>}
          <input type="text" ref={titleRef} placeholder="Type Your Notes Title" maxLength='50' className="bg-[#F7F7F7] p-4" required disabled={loading} />
          <textarea cols="4" rows="4" ref={messageRef} className="bg-[#F7F7F7] p-4" maxLength="200" placeholder="Type Your Notes Body" required disabled={loading}></textarea>
          {!id ? <button type="submit" className='bg-[#437993] p-4 text-white font-bold rounded w-[120px] hover:opacity-[0.9] cursor-pointer' disabled={isSubmitting}>{isSubmitting ? 'Adding' : 'Add Notes'}</button> :
            (<div className="flex justify-between">
              <button type="button" onClick={handleUpdate} className='bg-[#437993] p-4 text-white font-bold rounded w-[120px] hover:opacity-[0.9] cursor-pointer' disabled={loading && isSubmitting}>{isSubmitting? 'Updating': 'Update'}</button>
              <button type="button" onClick={handleDelete} className='bg-[#437993] p-4 text-white font-bold rounded w-[120px] hover:opacity-[0.9] cursor-pointer' disabled={loading && isSubmitting}>Delete</button>
            </div>)
          }
        </form>


      </div>
    </>
  )
}

export default ManageNotes