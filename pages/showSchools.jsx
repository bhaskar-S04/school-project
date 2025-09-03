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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.isArray(schools) && schools.length > 0 ? (
        schools.map((s) => (
          <div key={s.id} className="border rounded overflow-hidden shadow">
            <div className="h-44 bg-gray-100">
              <img src={s.image} alt={s.name} className="w-full h-44 object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold">{s.name}</h2>
              <p className="text-gray-600">{s.address}</p>
              <p className="text-gray-600">{s.city}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No schools found</p>
      )}
    </div>
  );
}
