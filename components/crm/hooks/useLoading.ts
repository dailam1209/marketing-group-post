import { useState } from 'react';

const useLoading = () => {
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const handleLoading = async (fetchAPI) => {
    startLoading();
    await fetchAPI()
    stopLoading()
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    handleLoading
  };
};

export default useLoading;
