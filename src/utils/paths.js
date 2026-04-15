/**
 * Asset path resolution for GitHub Pages/sub-path deployments.
 * Uses import.meta.env.BASE_URL which Vite sets to the configured `base`
 * (e.g. "/Vice-Board/") so paths are always absolute and correct in production.
 */
export const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL; // "/Vice-Board/" in prod, "/" in dev
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
