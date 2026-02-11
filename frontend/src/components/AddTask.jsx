import React, { useState, useRef } from "react";
import axios from "../api/axios";
import "./addTask.css";

const AddTask = () => {

  // component states
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const inputRef = useRef();

  // validate file extension
  const isValidFile = (file) => {
    if (!file) return false;

    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    const fileName = file.name.toLowerCase();

    return allowedExtensions.some(ext =>
      fileName.endsWith(ext)
    );
  };

  // handle selected or dropped file
  const handleFile = (selectedFile) => {
    setMessage("");

    if (!isValidFile(selectedFile)) {
      setMessage("Only CSV, XLSX or XLS files are allowed");
      return;
    }

    setFile(selectedFile);
  };

  // drag events handler
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  // upload file and assign tasks
  const upload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const percent = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percent);
        },
      });

      setMessage("Tasks assigned successfully");
      setFile(null);
      setProgress(100);

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Failed to assign tasks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">

      <h3>Upload File</h3>

      {/* drag and drop upload area */}
      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <p className="file-name">{file.name}</p>
        ) : (
          <p>Drag & drop CSV / XLSX / XLS file here or click to upload</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* upload progress */}
      {loading && (
        <div className="progress-wrapper">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
          <span>{progress}%</span>
        </div>
      )}

      {/* status message */}
      {message && (
        <div className="upload-message">{message}</div>
      )}

      <button
        className="upload-btn"
        onClick={upload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Assign Tasks"}
      </button>

    </div>
  );
};

export default AddTask;
