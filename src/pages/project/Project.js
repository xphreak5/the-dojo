import "./Project.css"


import { useDocument } from "../../hooks/useDocument"
import { useParams } from "react-router-dom";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

const Project = () => {
  const { id } = useParams()
  const { error, document } = useDocument("projects", id)

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary document={document}/>
      <ProjectComments document={document}/>
    </div>
  );
}

export default Project;
