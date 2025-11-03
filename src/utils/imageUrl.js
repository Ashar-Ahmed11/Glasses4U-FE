export const getImageSrc = (url) => {
  if (!url) return url;
  try {
    const clean = url.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}`;
  } catch {
    return url;
  }
};
