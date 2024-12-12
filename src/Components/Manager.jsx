import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const [visibility, setVisibility] = useState(true);
  const [inp, setInp] = useState({ site: "", username: "", password: "" });
  const [PassArray, setPassArray] = useState([]);
  const pass = useRef();

  useEffect(() => {
    getPasswords();
  }, []);

  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let pass = await req.json();
      setPassArray(pass);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
    }
  };

  const handleChange = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const newPassword = { ...inp, id: uuidv4() };
    setPassArray([...PassArray, newPassword]);

    try {
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword)
      });

      toast('Saved!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

      setInp({ site: "", username: "", password: "" });
    } catch (error) {
      console.error("Failed to save password:", error);
    }
  };

  const handleShowPassword = () => {
    setVisibility(!visibility);
    if (visibility) {
      pass.current.type = "password";
    } else {
      pass.current.type = "text";
    }
  };

  const copyText = (text) => {
    toast('Copied!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

    navigator.clipboard.writeText(text);
  };

  const deletePassword = async (id) => {
    const confirmDelete = confirm("Delete this data?");
    if (confirmDelete) {
      try {
        setPassArray(PassArray.filter(item => item.id !== id));
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
        });
      } catch (error) {
        console.error("Failed to delete password:", error);
      }
    } else {
      alert("Deletion canceled");
    }
  };

  const editPassword = async (id) => {
    const passwordToEdit = PassArray.find(item => item.id === id);
    setInp(passwordToEdit);
    setPassArray(PassArray.filter(item => item.id !== id));

    try {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
    } catch (error) {
      console.error("Failed to delete password for editing:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Logo />
      <div className="md:container md:w-2/4 mx-auto rounded-md p-5 bg-violet-900">
        <div className="inp flex flex-col justify-center items-center gap-4">
          <input type='text' value={inp.site} name='site' onChange={handleChange} placeholder='Paste the Website URL' className='w-full rounded-2xl p-2 border-green-500 border-2' />
          <div className="inp1 w-full flex md:flex-row flex-col gap-2 md:justify-between">
            <input type='text' value={inp.username} name='username' onChange={handleChange} placeholder='Enter username ' className='md:w-2/3 rounded-2xl p-2 border-green-500 border-2' />
            <div className='md:w-1/3 w-full flex gap-1 items-center justify-center pt-2 md:pt-0'>
              <input type={visibility ? "password" : "text"} ref={pass} value={inp.password} name='password' onChange={handleChange} placeholder='Enter password ' className='w-5/6 rounded-2xl p-2 border-green-500 border-2 placeholder-teal-300 ' />
              <span className="material-symbols-outlined pt-1 cursor-pointer" onClick={handleShowPassword}>
                {visibility ? "visibility" : "visibility_off"}
              </span>
            </div>
          </div>
          <button className='flex justify-center items-center bg-green-600 hover:bg-yellow-400 border-black border-1 hover:border-2 rounded-2xl px-2 w-fit py-1 font-semibold' onClick={handleSubmit}>
            <lord-icon
              src="https://cdn.lordicon.com/lomfljuq.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        {PassArray.length === 0 && <div>No Passwords yet to display</div>}
        {PassArray.length !== 0 &&
          <div className="passwords my-6 p-1">
            <div className='bg-white w-full flex flex-col '>
              <div className="headers flex bg-green-500">
                <div className="w-2/5 text-center">Website URL</div>
                <div className="w-1/5 text-center">Username</div>
                <div className="w-1/5 text-center">Password</div>
                <div className="w-1/5 text-center">Actions</div>
              </div>
              {PassArray.map((item, index) => (
                <div className="content flex border bg-emerald-200 p-1 " key={index}>
                  <div className="w-2/5 flex px-1">
                    <div className='w-[85%] text-center pt-1 break-all flex justify-center items-center'>
                      <a href={item.site}>{item.site}</a>
                    </div>
                    <div className='cursor-pointer w-[15%] flex justify-center items-center pl-1' onClick={() => { copyText(item.site) }}>
                      <lord-icon
                        style={{ "width": "25px", "height": "25px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" >
                      </lord-icon>
                    </div>
                  </div>
                  <div className="w-1/5 flex px-1">
                    <div className='w-[83%] flex justify-center items-center pt-1 break-all'>{item.username}</div>
                    <div className='cursor-pointer flex justify-center items-center pl-1' onClick={() => { copyText(item.username) }}>
                      <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" >
                      </lord-icon>
                    </div>
                  </div>
                  <div className="w-1/5 flex px-1">
                    <div className='w-[83%] text-center flex justify-center items-center break-all pt-1 '>
                      {"*".repeat(item.password.length)}
                    </div>
                    <div className='cursor-pointer flex justify-center items-center pl-1' onClick={() => { copyText(item.password) }}>
                      <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" >
                      </lord-icon>
                    </div>
                  </div>
                  <div className="w-1/5 flex justify-center items-center gap-2 ">
                    <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      style={{ "width": "25px", "height": "25px" }} onClick={() => { editPassword(item.id) }}>
                    </lord-icon>
                    <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      style={{ "width": "25px", "height": "25px" }} onClick={() => { deletePassword(item.id) }}>
                    </lord-icon>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Manager;
