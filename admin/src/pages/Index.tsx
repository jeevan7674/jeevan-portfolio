import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Portfolio Admin</h1>
      <p>Use the admin panel to manage your content.</p>
      <Link to="/admin/login">Go to Admin Login</Link>
    </div>
  );
}
