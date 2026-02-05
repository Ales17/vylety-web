interface Props extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
}

let colors: Record<string, string> = {
  primary: 'text-white bg-blue-500',
  secondary: 'text-white bg-amber-400',
}
export default function Button({ onClick, type, label, variant = 'primary' }: Props) {
  const activeVariantClass = colors[variant]
  const baseDesignClasses = 'p-2 rounded'

  return (
    <>
      <button
        className={`${activeVariantClass} ${baseDesignClasses}`}
        onClick={onClick ? onClick : undefined}
        type={type ? type : undefined}
      >
        {label}
      </button>
    </>
  )
}
