import { Text } from '@geist-ui/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const AvatarUpload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  acceptedFiles.map((file) => console.log(file))

  return (
    <div className="avatar-upload">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Text font='10px'>Drag 'n' drop some files here, or click to select files</Text>
      </div>
    </div>
  );
};

export default AvatarUpload;
