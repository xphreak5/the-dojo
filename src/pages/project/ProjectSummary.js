import { Link, useHistory } from "react-router-dom";
import ArrowBack from "../../assets/arrow_back.svg"

import Avatar from "../../components/Avatar"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

const ProjectSummary = ({ document }) => {

  const { deleteDocument } = useFirestore("projects")
  const { user } = useAuthContext()
  const history = useHistory()

  console.log(user);
  console.log(document)

  const handleClick = e => {
    deleteDocument(document.id)
    history.push("/")
  }


  return (
    <div>
      <Link to="/">
          <img src={ArrowBack} alt="back Arrow" className="arrow-back"/>
      </Link>
        <div className="project-summary">
          <h2 className="page-title">{document.name}</h2>
          <p className="due-date">
            Project due by {document.dueDate.toDate().toDateString()}
          </p>
          <div className="created-by">
            <p>Created by {document.createdBy.displayName}</p>
            <Avatar src={document.createdBy.photoURL} />
          </div>
          <p className="details">
            {document.details}
          </p>
          <h4>Project is assigned to:</h4>
          <div className="user-project-list">
            {document.assignedUsersList.map(user => (
              <div key={user.id} className="user-project-single">
                <h3>{user.displayName}</h3>
                <Avatar src={user.photoURL} />
              </div>
            ))}
          </div>
          {document.createdBy.id === user.uid && <button className="btn btn-delete" onClick={handleClick}>Mark as Complete</button>}
        </div>
    </div>
  );
}

export default ProjectSummary;
