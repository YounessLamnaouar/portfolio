import { useState } from "react";
import { sendContactEmail } from "../services/emailService";
import { validateContactForm } from "../utils/validateContactForm";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const useContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      await sendContactEmail(formData);
      setStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      console.error("Contact form send failed:", err);
      setStatus("error");
    }
  };

  const resetStatus = () => setStatus("idle");

  return {
    formData,
    errors,
    status,
    focusedField,
    setFocusedField,
    handleChange,
    handleSubmit,
    resetStatus,
  };
};