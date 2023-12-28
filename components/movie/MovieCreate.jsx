import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "./movie.css";
import btmImage from "../../public/file_download.svg";
import Dropzone, { useDropzone } from "react-dropzone";
import axiosInstance from '../../axiosInstance'

const MovieCreate = ({ id }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setImage(e[0]);
    setFile(e[0].name);
  };
  const onDrop = useCallback((acceptedFiles) => {
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (id) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("publishingYear", publishingYear);
        formData.append("image", image);
        const response = await axiosInstance.put(`/movies/${id}`, formData);
        router.push("/movies");
        setTitle("");
        setPublishingYear("");
        setImage(null);
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("publishingYear", publishingYear);
        formData.append("image", image);

        const response = await axiosInstance.post("/movies", formData);
        router.push("/movies");
        setTitle("");
        setPublishingYear("");
        setImage(null);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    const getOneMovie = async () => {
      try {
        const response = await axiosInstance.get(`/movies/${id}`);
        setPublishingYear(response.data.result.publishingYear);
        setTitle(response.data.result.title);
      } catch (error) {
        console.error("Error creating User:", error.message);
      }
    };
    getOneMovie();
  }, [id]);

  return (
    <div className="container">
      <h2 className="moviecreatetitle">{id ? "Edit" : "Create a new movie"}</h2>
      <div className="row">
        <div className="movieform">
          <div className="col-6">
            <Dropzone onDrop={handleFileChange}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} className="file_uploading_block">
                    <input {...getInputProps()} />
                    <div className="text-center">
                      <img src={btmImage.src} />
                      <p>{file ? file : "Drop an image here"}</p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div>
            <div>
              <input
                type="text"
                value={title}
                placeholder="Title"
                className="inputtitle"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={publishingYear}
                placeholder="Publishing year"
                className="publishingyear"
                onChange={(e) => setPublishingYear(e.target.value)}
              />
            </div>
            <div className="buttonsection">
              <button className="cancelbutton">Cancel</button>
              <button onClick={handleSubmit} className="submitButton">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCreate;
