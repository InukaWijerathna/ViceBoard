/**
 * Ultra-robust asset path resolution for GitHub Pages/sub-path deployments.
 * This version uses relative paths to avoid base URL resolution issues.
 */
export const getAssetUrl = (path) => {
  // Moving to relative paths: "personnel/crockett.png" instead of "/personnel/crockett.png"
  // This works because the app is hosted at /Vice-Board/index.html
  return path.startsWith('/') ? path.slice(1) : path;
};
