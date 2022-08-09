import "./Create.css"

import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection"
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore"


const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" }
]



const Create = () => {
  const { documents } = useCollection("users")
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()
  const { addDocument } = useFirestore("projects")

  // form field values
  const [name, setName] = useState("")
  const [details, setDetails] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [timer, setTimer] = useState(3)

  const navigate = useNavigate()

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = e => {
    e.preventDefault()
    setTimer(3)
    setSuccess(false)
    setFormError(null)
    
    if (!category) {
      setFormError("Please select a category")
      return
    }

    if (assignedUsers.length === 0) {
      setFormError("Please assign the project at least one user")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    addDocument(project)
      .then(() => setSuccess(true))
      .then(() => {
        const interval = setInterval(() => {
          let i = 0
          setTimer(timer => timer - 1)
          i++
          i === 3 && clearInterval(interval)
        }, 1000)
      })
      .then(() => setTimeout(() => navigate("/"), 3000))
      .catch(err => setFormError(err))
  }


  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text" 
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text" 
            required
            onChange={e => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type="date" 
            required
            onChange={e => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            onChange={option => setCategory(option)}
            options={categories}
            
          />
        </label>
        {formError === "Please select a category" && <p className="error">{formError}</p>}
        <label>
          <span>Assign to:</span>
          <Select
            onChange={option => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        {formError === "Please assign the project at least one user" && <p className="error">{formError}</p>}
        {success && <p className="success">Successfully added the document! You ll be redirecting in {timer}</p>}
        <button className="btn">Create</button>
      </form>
    </div>
  );
}

export default Create;
