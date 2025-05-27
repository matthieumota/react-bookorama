import { useState } from 'react'
import Button from './Button'

type CounterProps = {
    initialValue?: number
    maxValue?: number
}

function Counter({
    initialValue = 0,
    maxValue,
}: CounterProps) {
    const [value, setValue] = useState(initialValue)

    const handleIncrement = (step: number = 1) => {
        setValue(value + step)
    }

    return (
        <div>
            <Button onClick={() => handleIncrement(-1)} disabled={value === 0}>
                -
            </Button>
            {value}
            {(!maxValue || value < maxValue) && <Button onClick={() => handleIncrement(1)}>
                +
            </Button>}
        </div>
    )
}

export default Counter
