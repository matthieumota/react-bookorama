import { useEffect, useState } from 'react'
import Author from './Author'
import Book, { type Book as BookType } from './Book'
import Button from './Button'
import BookForm from './BookForm'
import Clock from './Clock'

let nextId = 11
export const BOOKS = [
  {
    id: 1,
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    year: 1954,
    image: '/assets/le-seigneur-des-anneaux.jpg',
  },
  {
    id: 2,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    image: '/assets/le-petit-prince.jpg',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    image: '/assets/1984.jpeg',
  },
  {
    id: 4,
    title: 'L\'Étranger',
    author: 'Albert Camus',
    year: 1942,
    image: '/assets/l-etranger.jpg',
  },
  {
    id: 5,
    title: 'Harry Potter à l\'école des sorciers',
    author: 'J.K. Rowling',
    year: 1997,
    image: '/assets/harry-potter-a-l-ecole-des-sorciers.jpg',
  },
  {
    id: 6,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    image: '/assets/fahrenheit-451.jpg',
  },
  {
    id: 7,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: 1862,
    image: '/assets/les-miserables.jpg',
  },
  {
    id: 8,
    title: 'Orgueil et Préjugés',
    author: 'Jane Austen',
    year: 1813,
    image: '/assets/orgueil-et-prejuges.jpg',
  },
  {
    id: 9,
    title: 'Le Comte de Monte-Cristo',
    author: 'Alexandre Dumas',
    year: 1844,
    image: '/assets/le-comte-de-monte-cristo.jpeg',
  },
  {
    id: 10,
    title: 'La Peste',
    author: 'Albert Camus',
    year: 1947,
    image: '/assets/la-peste.jpg',
  }
]
export const AUTHORS = new Set(BOOKS.map(b => b.author))

function App() {
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

  const [books, setBooks] = useState<BookType[]>(BOOKS)
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
    console.log('Le composant est monté ou le state a changé')
  })

  useEffect(() => {
    console.log('Le composant est monté')
  }, [])

  useEffect(() => {
    console.log(`Le livre choisi a changé`, selectedBook)
  }, [selectedBook])

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
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
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

export default App
