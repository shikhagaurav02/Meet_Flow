// Automatically detects production vs local environment,
// with optional override via VITE_BACKEND_URL in Render or .env
const server =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.PROD
        ? "https://meetflow-backend-issc.onrender.com"
        : "http://localhost:8000");

export default server;