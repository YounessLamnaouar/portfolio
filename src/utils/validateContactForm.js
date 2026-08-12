export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) errors.name = "Name is required";

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.subject.trim()) errors.subject = "Subject is required";

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};