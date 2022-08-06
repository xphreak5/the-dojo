import { Link } from "react-router-dom";
import "./ProjectList.css"

import Avatar from "../components/Avatar"


const ProjectList = ({ documents }) => {
  

  return (
    <div className="project-list">
      {documents && documents.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <p>Created by {project.createdBy.displayName}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL} className="single-row">
                  <p>{user.displayName}</p>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;
