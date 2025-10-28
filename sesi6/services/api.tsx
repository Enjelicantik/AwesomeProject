const GHIBLI_API = 'https://ghibliapi.vercel.app/films';

export const fetchMovies = async () => {
    try {
        const response = await fetch(GHIBLI_API);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

