const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const getGuestSessionId = () => {
  const guestSession = JSON.parse(localStorage.getItem('guestSession'));
  return guestSession?.guest_session_id;
};

const fetchWithErrorHandling = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const rateHandle = async (id, title, name, rating) => {
  const guestSessionId = getGuestSessionId();
  if (!guestSessionId) {
    console.error('No guest session ID found');
    return;
  }

  const url = `${BASE_URL}/movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`;

  if (!rating) {
    const userRate = prompt(`Rate ${title || name} from 0.5 to 10`);

    if (userRate > 0.5 && userRate <= 10) {
      await fetchWithErrorHandling(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: userRate }),
      });
    }
  } else {
    await fetchWithErrorHandling(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
  }
};

export const turnNextPage = (setPage, arrange, page, discovers) => {
  setPage((prev) => ({
    ...prev,
    [arrange.filter || 'all']: Math.min(
      prev[arrange.filter || 'all'] + 1,
      discovers.total_pages
    ),
  }));
};

export const turnPrevPage = (setPage, arrange, page) => {
  setPage((prev) => ({
    ...prev,
    [arrange.filter || 'all']: Math.max(prev[arrange.filter || 'all'] - 1, 1),
  }));
};
