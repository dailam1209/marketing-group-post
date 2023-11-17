import { ChangeEvent, createContext, useState } from "react";

export const useFormData = createContext<any>(false);

export const FormDataContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<any>({ recall: false });
  const handleRecall = () => {
    setFormData({
      ...formData,
      ...(typeof formData.recall !== "undefined"
        ? { recall: !formData.recall }
        : { recall: true }),
    });
  };
  const handleChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeAndRecall = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(typeof formData.recall !== "undefined"
        ? { recall: !formData.recall }
        : { recall: true }),
    });
  };
  return (
    <useFormData.Provider
      value={
        {
          formData,
          setFormData,
          handleChangeData,
          handleRecall,
          handleChangeAndRecall,
        } as any
      }
    >
      {children}
    </useFormData.Provider>
  );
};
