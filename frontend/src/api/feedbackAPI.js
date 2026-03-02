export const sendFeedback = async (formData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/feedback/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );
  return response.json();
};
