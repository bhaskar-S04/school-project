import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched schools:", data);
        setSchools(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Schools</h1>

      {Array.isArray(schools) && schools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((s) => (
            <div
              key={s.id}
              className="border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-100">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <h2 className="text-lg font-bold text-gray-800">{s.name}</h2>
                <p className="text-gray-600 text-sm">{s.address}</p>
                <p className="text-gray-600 text-sm">{s.city}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No schools found</p>
      )}
    </div>
  );
}
