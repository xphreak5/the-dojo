import { useState } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow"


import DeleteIcon from "../../assets/delete_icon.svg"


const ProjectComments = ({ document }) => {
  const [newComment, setNewComment] = useState("")
  const { user } = useAuthContext()

  const { updateDocument, response } = useFirestore("projects")
  
  const handleSubmit = async e => {
    e.preventDefault()
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(document.id, {
      comments: [...document.comments, commentToAdd]
    })
    if (!response.error) {
      setNewComment("")
    }
  }


  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {document.comments.length > 0 && document.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL}/>
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              {/* My way: */}

              {/* <p>{comment.createdAt.toDate().toDateString()}, {comment.createdAt.toDate().getHours() }:{comment.createdAt.toDate().getMinutes()}</p> */}
              
              {/* date fns way: */}
              <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
            {user.photoURL === comment.photoURL && 
            <img 
              src={DeleteIcon} 
              alt="delete-icon" 
              className="delete-img" 
              onClick={async () => {
                await updateDocument(document.id, { 
                comments: document.comments.filter(com => com.id !== comment.id)
                })
              }}
            />}
          </li>
        ))}
        {document.comments.length === 0 && <i>No comments to show!</i>}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={e => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        {response.isPending && <button className="btn">Loading...</button>}
        {!response.isPending && <button className="btn">Add comment</button>}
      </form> 
    </div>
  );
}

export default ProjectComments;
