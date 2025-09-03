import {useForm} from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
    const {register, handleSubmit, formState: {errors}, reset}=useForm();
    const [status, setStatus]=useState(null);

    const onSubmit = async(data)=> {
        setStatus("Uploading...");
        try {
            const formData = new FromData();
            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("city", data.city);
            formData.append("state", data.state);
            formData.append("contact", data.contact);
            formData.append("email_id", data.email_id);
            formData.append("image", data.image[0]);
            
            const res = await fetch("/api/addSchool", {
                method:"POST",
                body:formData
            });

            const result = await res.json();
            if(res.ok) {
                setStatus("School added successfully");
                reset();
            } else {
                setStatus("Error: "+(result.error || "unknown"));
            }
        } catch (err) {
            setStatus("Upload failed");
            console.error(err);
        }
    };

    return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: "Name required" })} placeholder="School Name" />
        {errors.name && <p>{errors.name.message}</p>}

        <textarea {...register("address", { required: "Address required" })} placeholder="Address" />
        {errors.address && <p>{errors.address.message}</p>}

        <input {...register("city", { required: "City required" })} placeholder="City" />
        <input {...register("state", { required: "State required" })} placeholder="State" />

        <input {...register("contact", { required: "Contact required", pattern: { value: /^\d{10}$/, message: "Enter 10 digit number" } })} placeholder="Contact (10 digits)" />
        {errors.contact && <p>{errors.contact.message}</p>}

        <input {...register("email_id", { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" } })} placeholder="Email" />
        {errors.email_id && <p>{errors.email_id.message}</p>}

        <input type="file" accept="image/*" {...register("image", { required: "Image required" })} />
        {errors.image && <p>{errors.image.message}</p>}

        <button type="submit">Submit</button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}