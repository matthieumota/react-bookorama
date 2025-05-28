import { useEffect, useState } from 'react'
import Author from './Author'
import Book, { type Book as BookType } from './Book'
import Button from './Button'
import BookForm from './BookForm'
import Clock from './Clock'
import axios from 'axios'

let nextId = 11

function Home() {
  const authors = [
    {
      id: 1,
      name: 'John Doe',
      birthday: 1924,
    },
    {
      id: 2,
      name: 'Martin',
      birthday: 2000,
    }
  ]

  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const [showForm, setShowForm] = useState(false)
  const [newBook, setNewBook] = useState<BookType>({
    id: 0,
    title: '',
    author: '',
    year: 0,
    image: '',
  })

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)

      await new Promise(resolve => setTimeout(resolve, 200))

      try {
        const response = await axios.get<BookType[]>('http://localhost:3000/books')
        setBooks(response.data)
      } catch (error: any) {
        setError(error.message)
      }

      setLoading(false)
    }

    fetchBooks()
  }, [selectedBook])

  useEffect(() => {
    document.title = `Accueil`
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleAddBook = () => {
    setBooks([
      ...books,
      { ...newBook, id: nextId++ }
    ])
    setNewBook({ id: 0, title: '', author: '', year: 0, image: '' })
    toggleForm()
  }

  const handleRemoveBook = (book: BookType) => {
    setBooks(books.filter(b => b.id !== book.id))
  }

  const handleUpdateBook = (book: BookType) => {
    setBooks(books.map(b => b.id === book.id ? book : b))
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama</h1>

        {selectedBook && <div className="flex justify-center mb-4">
          <div className="w-1/3">
            <Clock />
            <Book
              book={selectedBook}
              onSelect={() => setSelectedBook(undefined)}
              onRemove={() => {
                handleRemoveBook(selectedBook)
                setSelectedBook(undefined)
              }}
              onSave={handleUpdateBook}
            />
          </div>
        </div>}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
            <span className="ml-4 text-blue-500 font-medium">Chargement des livres...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto mb-4">
            <strong className="font-bold">Erreur :</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {books.map(book =>
            <Book
              key={book.id}
              book={book}
              onSelect={() => setSelectedBook(selectedBook && selectedBook.id === book.id ? undefined : book)}
              active={!selectedBook || selectedBook.id !== book.id}
              onRemove={() => handleRemoveBook(book)}
              onSave={handleUpdateBook}
            />
          )}
        </div>

        {!showForm && <div className="text-center py-10">
          <Button onClick={toggleForm}>
            Ajouter un livre
          </Button>
        </div>}

        {showForm && <div className="mt-4">
          <pre>{JSON.stringify(newBook, null, 2)}</pre>
          <BookForm
            book={newBook}
            onCancel={toggleForm}
            onChange={(book: BookType) => setNewBook(book)}
            onSave={handleAddBook}
          />
        </div>}

        {/* <Author author={authors[0]} /> */}
        {authors.map(author => <Author author={author} key={author.id} />)}
      </div>
    </div>
  )
}

export default Home
