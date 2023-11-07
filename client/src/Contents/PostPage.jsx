import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { UserContext } from '../userContext'
import { EditIcon } from '../assets/Icon'

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null)
  const { userInfo } = useContext(UserContext)

  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((resp) => {
      resp.json().then((userDoc) => {
        setPostInfo(userDoc)
      })
    })
  }, [])

  if (!postInfo) return ``
  const authorName = postInfo.author.name.toUpperCase()

  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className='author'>{authorName}</div>
      {userInfo.id === postInfo.author._id && (
        <div className='edit-row'>
          <Link className='edit-post' to={`/edit/${postInfo._id}`}>
            <EditIcon />
            Edit Post
          </Link>
        </div>
      )}
      <div className='img'>
        <img src={`http://localhost:4000/${postInfo.cover}`} />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className='content' />
    </div>
  )
}
export default PostPage
