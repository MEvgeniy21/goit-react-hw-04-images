import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImage({ q, page, per_page }) {
  const searchParams = new URLSearchParams({
    key: '28350723-a2da361fc29768379678747a9',
    q,
    page,
    per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const response = await axios.get(`?${searchParams}`);

  return response.data;
}
