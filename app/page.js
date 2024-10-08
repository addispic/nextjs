"use client"
import {useState, useEffect} from 'react'
import axios from 'axios';
import {formatDistanceToNow} from 'date-fns'

// icons
import { GrSend } from "react-icons/gr";
import { CiClock2 } from "react-icons/ci";

export default function Home() {
  // states
  // local states
  const [isBorderOn,setIsBorderOn] = useState('')

  // text
  const [text,setText] = useState("")
  // notes
  const [notes,setNotes] = useState([])

  // methods
  const adjustTextAreaHeight = e => {
    let element = document.getElementById("note-text-area");
    element.style.height = '20px'
    let scHeight = e.target.scrollHeight
    element.style.height = `${scHeight}px`
  }

  // get all notes
  const  getAllNotes = async () => {
    try{
      const response = await axios.get("http://localhost:3000/api/notes",);
      if (response?.data?.notes){
        setNotes(response.data.notes);
      } 
    }catch(err){
      console.log(err)
    }
  }

  // add new note handler
  const addNewNoteHandler = async () => {
    let element = document.getElementById("note-text-area");
    if(text.trim()){
      try{
        const response = await axios.post("http://localhost:3000/api/notes", {
          text,
        });
        if(response?.data?.note){
          setNotes([response?.data.note, ...notes]);
        }
      }catch(err){
        console.log(err)
      }
    }
    setText("")
    element.style.height = "20px";
  }

  // delete delete
  const deleteNote = async _id => {
    try{
      const response = await axios.delete(
        `http://localhost:3000/api/notes?_id=${_id}`,
        { _id }
      );
      console.log(response.data)
      if(response?.data._id){
        setNotes(notes.filter(noteItem => noteItem._id !== response?.data._id))
      }
    }catch(err){
      console.log(err)
    }
  }

  // effects
  // get all notes
  useEffect( ()=>{
     getAllNotes()
  },[])


  return (
    <div className="h-[93vh] bg-neutral-100 pt-1.5 px-3 relative">
      <div className="max-h-[86vh] overflow-y-auto">
        {
          notes.map((noteItem,index)=>{
            return (
              <div key={noteItem._id} className="mb-3">
                <div className="bg-white p-3 rounded-sm shadow-sm">
                  <p className="text-sm">
                    {noteItem.text}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-3">
                  <div className="flex items-center gap-x-1 text-xs text-green-600">
                    <CiClock2 />
                    <span>{formatDistanceToNow(new Date(noteItem.createdAt),{addSuffix: true})}</span>
                  </div>
                  <button onClick={()=>{
                    deleteNote(noteItem._id)
                  }} className="text-sm text-red-400 hover:underline">
                    delete
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-3 bg-neutral-100">
        {/* form */}
        <div className="flex items-end gap-x-3">
          {/* file */}
          <div>file</div>
          {/* text */}
          <div
            className={`flex-grow bg-neutral-100 border ${
              isBorderOn === "note" ? "border-green-600" : "border-neutral-300"
            } rounded-sm p-1 pb-0`}
          >
            <textarea
              onBlur={() => {
                setIsBorderOn("");
              }}
              onFocus={() => {
                setIsBorderOn("note");
              }}
              value={text}
              onChange={e=>setText(e.target.value)}
              placeholder="note..."
              className="w-full h-[20px] focus:ring-0 focus:outline-none bg-transparent resize-none p-0 text-sm"
              id="note-text-area"
              onKeyUp={adjustTextAreaHeight}
            ></textarea>
          </div>
          {/* button */}
          <button onClick={addNewNoteHandler} className="text-2xl text-green-500">
            <GrSend />
          </button>
        </div>
      </div>
    </div>
  );
}
