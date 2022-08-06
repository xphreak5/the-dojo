import "./Dashboard.css"
import { useCollection } from "../../hooks/useCollection"
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"


const Dashboard = () => {
  const { user } = useAuthContext()

  const { documents, error } = useCollection("projects")
  const [currentFilter, setCurrentFilter] = useState("all")

  let assignedToMe = []

  documents && documents.forEach(doc => doc.assignedUsersList.forEach(u => u.id === user.uid && assignedToMe.push(doc.id)))



  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />}
      {documents && currentFilter === "all" && <ProjectList documents={documents} />}
      {documents && currentFilter === "mine" && <ProjectList documents={documents.filter(doc => assignedToMe.includes(doc.id))} />}
      {documents && currentFilter !== "all" && <ProjectList documents={documents.filter(doc => doc.category === currentFilter)} />}
    </div>
  );
}

export default Dashboard;
