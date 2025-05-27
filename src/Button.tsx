import { cn } from './utils'

type ButtonProps = {
} & React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button className={cn(
            'bg-blue-500 hover:bg-blue-800 text-white py-1.5 px-4 rounded-md duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
            className
        )} {...props}>
            {children}
        </button>
    )
}

export default Button
