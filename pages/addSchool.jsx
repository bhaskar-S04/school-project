import { useState } from "react";

export default function AddSchoolForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("contact", formData.contact);
    data.append("email_id", formData.email_id);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log("Server response:", result);
      alert("School added successfully!");
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="state" placeholder="State" onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
      <input type="email" name="email_id" placeholder="Email" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleChange} />

      <button type="submit">Add School</button>
    </form>
  );
}
