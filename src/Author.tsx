export type Author = {
  id: number
  name: string
  birthday: number
}

type AuthorProps = {
    author: Author
}

function Author({ author }: AuthorProps) {
    return (
        <div>
            <h2>{author.name}</h2>
            <p>Né en {author.birthday}</p>
            {author.birthday < 1925 && <p>Il a plus de 100 ans</p>}
        </div>
    )
}

export default Author
