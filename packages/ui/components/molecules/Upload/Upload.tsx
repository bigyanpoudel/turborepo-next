import React, { useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

export const Upload = ({
  title = "Upload File",
  className = "",
  accept = { "image/*": [".jpeg", ".png", ".jpg"] },
  onFileUpload = () => {},
}: {
  title?: string | React.ReactNode;
  className?: string;
  accept?: any;
  onFileUpload?: (file: any) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const onDrop = async (acceptedFiles: any[]) => {
    setLoading(true);
    let files: File[] = Object.values(acceptedFiles);

    onFileUpload(files[0]);
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: accept,
    onDrop,
  });

  return (
    <div
      className={`btn !border-color-300 !text-color-300 font-normal btn-dashed hover:bg-base-200 hover:border-primary ${
        loading ? "btn-disabled loading" : ""
      } ${className}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {/* {isDragActive && !loading ? (
        <span className="">Drop here</span>
      ) : (
        <>{(!loading && title) || null}</>
      )} */}
      {title || "Upload Image"}
    </div>
  );
};
