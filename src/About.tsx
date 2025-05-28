import { useEffect } from 'react'

function About() {
    useEffect(() => {
        document.title = `A propos`
    }, [])

    return (
        <h1>A propos</h1>
    )
}

export default About
