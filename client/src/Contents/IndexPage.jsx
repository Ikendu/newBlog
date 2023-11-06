import { useEffect, useState } from 'react'
import Post from './Post'

const IndexPage = () => {
  const [allPost, setPost] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/post`).then((resp) => {
      resp.json().then((posts) => {
        setPost(posts)
      })
    })
  }, [])
  return <div>{allPost.length > 0 && allPost.map((post) => <Post key={post._id} {...post} />)}</div>
}
export default IndexPage
