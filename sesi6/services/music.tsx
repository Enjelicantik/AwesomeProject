// service/music.tsx

/**
 * Interface untuk objek Musik yang diterima dari Openwhyd API.
 */
export type Music = {
  _id: string; // ID unik lagu (digunakan untuk detail)
  name: string; // Judul lagu
  artist?: string; // Nama artis
  uId?: string;
  uNm?: string; // Username jika lagu diposting oleh user
  eId?: string; // ID eksternal video, misal: 'youtube#dQw4w9WgXcQ'
  pl?: { // Playlist
    id: number;
    name: string;
  } | null;
  img?: string; // URL gambar thumbnail
  trackUrl?: string;
  score?: number; // Skor/rating lagu
  text?: string;
  nbP?: number;
  nbR?: number;
  lov?: string[];
  comments?: any[];
  reposts?: any[];
};

/**
 * Interface untuk respons dari endpoint daftar lagu.
 */
type MusicResponse = {
  hasMore?: {
    skip: number;
  };
  tracks: Music[];
};

/**
 * Mengambil daftar musik panas dari endpoint 'hot/electro'.
 * @returns Promise yang resolve dengan array objek Music.
 * @throws Error jika gagal melakukan fetch.
 */
export async function getMusicList(): Promise<Music[]> {
  const res = await fetch(`https://openwhyd.org/hot/electro?format=json`);
  if (!res.ok) throw new Error('Failed to fetch music list');
  
  const data: MusicResponse = await res.json();
  return data.tracks || [];
}

/**
 * Mengambil detail musik berdasarkan _id.
 * @param _id ID unik lagu.
 * @returns Promise yang resolve dengan objek Music lengkap.
 * @throws Error jika gagal melakukan fetch.
 */
export async function getMusicById(_id: string): Promise<Music> {
  // Catatan: endpoint detail terkadang mengembalikan { data: { ...musicData } }
  const res = await fetch(`https://openwhyd.org/c/${_id}?format=json`);
  if (!res.ok) throw new Error('Failed to fetch music detail');
  
  const response = await res.json();
  return response.data || response;
}

/**
 * Helper untuk mendapatkan ID YouTube murni dari properti eId (misal: 'youtube#dQw4w9WgXcQ').
 * @param eId Properti eId dari objek Music.
 * @returns ID YouTube (string) atau null jika tidak ditemukan/bukan YouTube.
 */
export function getYoutubeId(eId: string | undefined): string | null {
  if (!eId) return null;
  
  // Mencari pola 'youtube#' diikuti oleh ID video
  const match = eId.match(/youtube#(.+)/);
  
  // Mengembalikan ID video (grup tangkap pertama) jika ditemukan
  return match ? match[1] : null;
}