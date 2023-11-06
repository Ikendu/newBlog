import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((resp) => {
      resp.json().then((userDoc) => {
        setPostInfo(userDoc)
      })
    })
  }, [])

  if (!postInfo) return ``

  return (
    <div className='post-page'>
      <div className='img'>
        <img src={`http://localhost:4000/${postInfo.cover}`} />
      </div>
      <h1>{postInfo.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  )
}
export default PostPage
