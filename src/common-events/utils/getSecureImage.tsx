const IMAGE_PROXY_URL = process.env.NEXT_PUBLIC_IMAGE_PROXY_URL;

const getSecureImage = (imageUrl: string): string => {
  if (!IMAGE_PROXY_URL) {
    return imageUrl;
  }
  try {
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      const url = new URL(imageUrl);
      return [IMAGE_PROXY_URL, url.href].join('');
    }
  } catch (e) {
    return '';
  }
};

export default getSecureImage;
