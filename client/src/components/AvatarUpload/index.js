import { Text, useToasts } from '@geist-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from '@geist-ui/react-icons';
import { avatarUpdate } from '../../actions/user';
import { UserContext } from '../..';

const AvatarUpload = () => {
  const user = useContext(UserContext);
  const [, setToast] = useToasts();
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    maxSize: 512000,
  });

  const firstRender = useRef(true);

  useEffect(() => {
    const uploadAvatar = async () => {
      const r = await avatarUpdate({
        id: user._id,
        avatar: acceptedFiles[0],
      });
      if (r) {
        setToast({
          text: r.data.message,
          type: r.status !== 200 ? 'error' : 'success',
          delay: 5000,
        });
        if (r.status === 200) {
          user.setAvatar(r.data.user.avatar);
        }
      }
    };

    if (!firstRender.current) {
      if (fileRejections.length) {
        return setToast({
          text: `${fileRejections[0].errors[0].message} (500kb)`,
          type: 'error',
          delay: 2500,
        });
      }
      if (acceptedFiles.length) {
        uploadAvatar();
      }
    } else {
      firstRender.current = false;
    }
  }, [acceptedFiles, fileRejections]);

  return (
    <div className='avatar-upload'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ margin: '0 5px' }}>
            <Image size='15' />
          </div>
          <Text font='10px'>Drag'n'drop file here, or click to select</Text>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
