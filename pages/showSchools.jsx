import {useEffect, useState} from "react";

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);

    useEffect(()=> {
        fetch("/api/getSchools")
        .then(res=> res.json())
        .then(data=> setSchools(data))
        .catch(err=>console.error(err));
    }, []);

    return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {schools.map(s => (
        <div key={s.id} className="border rounded overflow-hidden shadow">
          <div className="h-44 bg-gray-100">
            <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-3">
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-sm">{s.address}</p>
            <p className="text-xs text-gray-500 mt-1">{s.city}</p>
          </div>
        </div>
      ))}
      {schools.length === 0 && <p>No schools found.</p>}
    </div>
  );
}