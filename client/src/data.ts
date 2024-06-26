import { BookInfo } from '../../shared/BookInfo';

export async function fetchBookInfo(query: string): Promise<BookInfo[]> {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch book info');
    }

    const data = await response.json();

    const booksData: BookInfo[] = data.items.map((item: any) => ({
      googleBookId: item.id,
      bookImage: item.volumeInfo.imageLinks?.thumbnail || '',
      bookTitle: item.volumeInfo.title || '',
      bookAuthor: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(', ')
        : 'Unknown',
      numOfPages: item.volumeInfo.pageCount || 0,
      ISBN: item.volumeInfo.industryIdentifiers
        ? item.volumeInfo.industryIdentifiers[0].identifier
        : 'N/A',
    }));

    return booksData;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch book info');
  }
}

export async function addBook(book: BookInfo): Promise<BookInfo> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(book),
  };
  const res = await fetch('/api/savedBooks', req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export default async function getSavedBooks(): Promise<BookInfo[]> {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/savedBooks', req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteBookId(bookId: number) {
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/savedBooks/${bookId}`, req);
  console.log(await res.json());
}
