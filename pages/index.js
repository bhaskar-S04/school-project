import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to School Project</h1>
      <p>
        <Link href="/addSchool">Add a School</Link>
      </p>
      <p>
        <Link href="/showSchools">Show Schools</Link>
      </p>
    </div>
  );
}
