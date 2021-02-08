import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import FileViewer from "react-file-viewer";
import axios from "axios";

const ContentView = (props) => {
  const content = props.location.state.content;

  var contentType = content.contentType;

  if (content.contentType === "video/mp4") {
    contentType = "mp4";
  }
  if (content.contentType === "application/pdf") {
    contentType = "pdf";
  }
  if (content.contentType === "image/png") {
    contentType = "png";
  }
  if (content.contentType === "image/jpeg") {
    contentType = "jpg";
  }

  return (
    <div className="container">
      <h1>{content.aliases}</h1>

      <div className="mb-30 mt-10">
        <FileViewer
          fileType={contentType}
          filePath={
            "http://localhost:3000/course/content/read/?contentID=" +
            content.filename
          }
          //onError={onError}
        />
      </div>
    </div>
  );
};

export default ContentView;
