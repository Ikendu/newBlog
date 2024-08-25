import { useState } from "react";

export default function TempUpload() {
  const [imageFileInput, setImageFileInput] = useState("");
  const [selectedFile, setSelecedFile] = useState("");

  const handleFileInput = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    previewImageFile(file);
  };

  const previewImageFile = (file) => {
    const preview = new FileReader();
  };

  return (
    <div>
      <form>
        <input
          type="file"
          name="image"
          value={imageFileInput}
          onChange={handleFileInput}
        />
      </form>
    </div>
  );
}
