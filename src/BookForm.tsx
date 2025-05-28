import { FormEvent, useEffect, useState } from 'react'
import { Book } from './Book'
import Button from './Button'
import clsx from 'clsx'
import { AUTHORS } from './App'

type BookFormProps = {
    book: Book
    onCancel: () => void
    onChange: (book: Book) => void
    onSave: () => void
}

function BookForm({ book, onCancel, onChange, onSave }: BookFormProps) {
    // const [localBook, setLocalBook] = useState(book)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const timer = setInterval(() => console.log('tick'), 1000)

        return () => clearInterval(timer)
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newBook = { ...book, [event.target.name]: event.target.value }
        // setLocalBook(book)
        onChange(newBook)
    }

    const handleCancel = () => {
        onCancel()
    }

    const handleSave = (event: FormEvent) => {
        event.preventDefault()

        setErrors({})

        const errors: Record<string, string> = {}

        if (!book.title) {
            errors.title = 'Le titre est obligatoire'
        }

        if (!book.author || !Array.from(AUTHORS).some(a => a === book.author)) {
            errors.author = 'L\'auteur est obligatoire'
        }

        if (!book.year) {
            errors.year = `L'année est obligatoire`
        }

        if (book.year < 1900 || book.year > 2023) {
            errors.year = `L'année n'est pas correcte`
        }

        if (!book.image || !book.image.startsWith('http')) {
            errors.image = `L'url n'est pas correcte`
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return
        }

        onSave()
    }

    return (
        <form onSubmit={handleSave}>
            <div className="mb-2">
                <label htmlFor="title">Titre</label>
                <input
                    id="title"
                    type="text"
                    className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.title && 'border-red-500')}
                    value={book.title}
                    name="title"
                    onChange={handleChange}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-2">
                <label htmlFor="author">Auteur</label>
                <select
                    id="author"
                    className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.author && 'border-red-500')}
                    value={book.author}
                    name="author"
                    onChange={handleChange}
                >
                    <option value="" disabled>Choisir un auteur</option>
                    <option value="toto">Toto</option>
                    {Array.from(AUTHORS).map(author => (
                        <option key={author} value={author}>{author}</option>
                    ))}
                </select>
                {errors.author && <p className="text-red-500">{errors.author}</p>}
            </div>

            <div className="mb-2">
                <label htmlFor="year">Année</label>
                <input
                    id="year"
                    type="number"
                    className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.year && 'border-red-500')}
                    value={book.year}
                    name="year"
                    onChange={handleChange}
                />
                {errors.year && <p className="text-red-500">{errors.year}</p>}
            </div>

            <div className="mb-2">
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="text"
                    className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.image && 'border-red-500')}
                    value={book.image}
                    name="image"
                    onChange={handleChange}
                />
                {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>

            <div className="flex gap-2 flex-wrap">
                <Button title="Annuler" onClick={handleCancel} className="bg-red-500 hover:bg-red-800" type="button">
                    Annuler
                </Button>
                <Button title="Sauvegarder">
                    Sauvegarder
                </Button>
            </div>
        </form>
    )
}

export default BookForm
