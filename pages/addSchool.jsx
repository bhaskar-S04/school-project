import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("School added successfully");
        reset();
      } else {
        setStatus("Error: " + (result.error || "unknown"));
      }
    } catch (err) {
      setStatus("Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4">

        <h1 className="text-2xl text-center font-bold mb-6 text-blue-600">Add School</h1>

        <input
          {...register("name", { required: "Name required" })}
          placeholder="School Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}

        <textarea
          {...register("address", { required: "Address required" })}
          placeholder="Address"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}

        <input
          {...register("city", { required: "City required" })}
          placeholder="City"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register("state", { required: "State required" })}
          placeholder="State"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          {...register("contact", {
            required: "Contact required",
            pattern: { value: /^\d{10}$/, message: "Enter 10 digit number" },
          })}
          placeholder="Contact (10 digits)"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
        )}

        <input
          {...register("email_id", {
            required: "Email required",
            pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" },
          })}
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email_id && (
          <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>
        )}

        <h2 className="text-grey-200 font-bold mb-0 mt-5">Upload Image</h2>

        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Image required" })}
          className="w-full p-2 border rounded hover:cursor-pointer transition"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}

        <button
          type="submit"
          className="w-50 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer transition"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-2 text-center text-gray-700">{status}</p>}
    </div>
  );
}
