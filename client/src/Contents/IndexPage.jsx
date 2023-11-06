import { useEffect } from 'react'
import Post from './Post'

const IndexPage = () => {
  useEffect(() => {
    fetch(`/post`).then((resp) => {
      resp.json().then((posts) => {
        console.log(posts)
      })
    })
  }, [])
  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  )
}
export default IndexPage
