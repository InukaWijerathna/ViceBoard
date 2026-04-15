/**
 * Robust asset path resolution for GitHub Pages/sub-path deployments.
 * This utility ensures that paths are correctly prefixed with the BASE_URL.
 */
export const getAssetUrl = (path) => {
  // Use Vite's BASE_URL, which defaults to '/' if not set in vite.config.js
  const base = import.meta.env.BASE_URL || '/Vice-Board/';
  
  // Clean up paths: ensure base ends with / and path doesn't start with /
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${cleanBase}${cleanPath}`;
};
