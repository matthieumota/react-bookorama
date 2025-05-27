import { useState } from 'react'
import Button from './Button'

export type Book = {
  id: number
  title: string
  author: string
  year: number
  image?: string
}

type BookProps = {
    book: Book
    active?: boolean
    onSelect: () => void
    onRemove: () => void
}

function Book({ book, active = true, onSelect, onRemove }: BookProps) {
    const [like, setLike] = useState(0)

    if (!active) return

    const handleSee = () => {
        onSelect()
    }

    const handleRemove = () => {
        onRemove()
    }

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
            {book.image ? (
                <img
                    src={book.image}
                    alt={`Couverture de ${book.title}`}
                    className="w-full h-64 object-cover"
                />
            ) : (
                <p>Pas d'image</p>
            )}
            <div className="p-4">
                <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
                <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
                <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>

                <Button onClick={handleSee}>Voir</Button>
                <Button id={`setLike(${like} + 1)`} onClick={() => {
                    setLike(like + 1)
                    // attention asynchrone
                    // setLike(like => like + 1)
                    // setLike(like => like + 1)
                    // setLike(like => {
                    //     console.log(like + 1, 'cb')
                    //     return like + 1
                    // })
                    // console.log(like, 'end')

                    // const newValue = like + 3
                    // setLike(newValue)
                    // console.log(newValue)
                }}>
                    ❤️‍🔥
                    {like > 0 && <>({like})</>}
                </Button>
                <Button title="Supprimer" onClick={handleRemove} className="bg-red-500 hover:bg-red-800">
                    🗑️
                </Button>
            </div>
        </div>
    )
}

export default Book
