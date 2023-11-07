import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState(``)
  const [summary, setSummary] = useState(``)
  const [content, setContent] = useState(``)
  const [files, setFiles] = useState(``)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:4000/post/` + id).then((resp) => {
      resp.json().then((userPost) => {
        setTitle(userPost.title)
        setSummary(userPost.summary)
        setContent(userPost.content)
      })
    })
  }, [])

  const editPost = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.set(`title`, title)
    data.set(`summary`, summary)
    data.set(`content`, content)
    data.set(`id`, id)
    if (files?.[0]) {
      data.set(`file`, files?.[0])
    }

    //console.log(files)
    const resp = await fetch(`http://localhost:4000/post`, {
      method: `PUT`,
      body: data,
      credentials: `include`,
    })

    if (resp.ok) {
      setRedirect(true)
    }
  }
  if (redirect) return <Navigate to={'/post/' + id} />

  return (
    <form onSubmit={editPost}>
      Edit Post
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Summary'
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type='file' onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button>Edit this Post</button>
    </form>
  )
}
export default EditPost
