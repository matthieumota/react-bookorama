import { useEffect, useRef, useState } from 'react'

function Clock() {
  const [date, setDate] = useState(new Date())
  const prevDate = useRef<Date>(undefined)

  useEffect(() => {
    const timer = setInterval(() => {
      // On met à jour l'état local du composant
      setDate(new Date())
    }, 1000)

    // Cette fonction est appelée si le composant est détruit du DOM (caché par exemple)
    // Elle est aussi appelée si le composant est mis à jour.
    return () => clearInterval(timer)
  }, [])

  // Cette fonction est appelée si le composant est mis à jour (date qui change)
  useEffect(() => {
    console.log('NOUVELLE DATE', date) // Retourne la nouvelle date
    console.log('PREVIOUS DATE', prevDate.current)

    return () => {
      prevDate.current = date
      console.log('ANCIENNE DATE', date) // Retourne l'ancienne date
    }
  }, [date])

  return (
    <div>
      <h1>Il est {date.toLocaleTimeString()}.</h1>
    </div>
  )
}

export default Clock
