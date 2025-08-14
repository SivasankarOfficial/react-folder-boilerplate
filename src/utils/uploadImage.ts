async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await fetch("http://localhost:5000/api/upload-profile-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.imageUrl; // the uploaded image URL
}
