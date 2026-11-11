import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminRedirect,
});

function AdminRedirect() {
  useEffect(() => {
    window.location.replace("/admin.html");
  }, []);
  return (
    <main aria-live="polite" style={{ padding: 32, fontFamily: "sans-serif" }}>
      Opening administration… <a href="/admin.html">Open dashboard</a>
    </main>
  );
}
