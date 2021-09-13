import { useToasts } from '@geist-ui/react';
import { useEffect } from 'react';

const Toaster = ({ text, type }) => {
  const [, setToast] = useToasts();

  useEffect(() => {
    setToast({
      text,
      type,
      delay: 5000,
    });
  }, [text, type]);
};

export default Toaster;
