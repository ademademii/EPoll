import { useRouter } from "next/router";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>403</h1>
      <h2 style={styles.title}>Access Denied</h2>
      <p style={styles.text}>
        You don’t have permission to access this page.
      </p>

      <button style={styles.button} onClick={() => router.push("/")}>
        Go to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "#e5e7eb",
    textAlign: "center",
    padding: "20px",
  },
  code: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "#ef4444",
    margin: "0",
  },
  title: {
    fontSize: "28px",
    margin: "10px 0",
  },
  text: {
    fontSize: "16px",
    opacity: 0.8,
    maxWidth: "400px",
  },
  button: {
    marginTop: "25px",
    padding: "10px 20px",
    fontSize: "16px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
