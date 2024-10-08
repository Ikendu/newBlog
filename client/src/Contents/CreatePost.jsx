import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState(``);
  const [summary, setSummary] = useState(``);
  const [content, setContent] = useState(``);
  const [files, setFiles] = useState(``);
  const [redirect, setRedirect] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set(`title`, title);
    data.set(`summary`, summary);
    data.set(`content`, content);
    data.set(`file`, files[0]);
    console.log(files);
    const resp = await fetch(`http://localhost:4000/create`, {
      method: `POST`,
      credentials: `include`,
      body: data,
    });

    if (resp.ok) {
      setRedirect(true);
    }
  };
  if (redirect) return <Navigate to={"/"} />;

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button>Create new Post</button>
    </form>
  );
};
export default CreatePost;
