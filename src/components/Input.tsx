interface Props {
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  type: 'text' | 'email' | 'password'
  required?: boolean
  name: string
  label?: string
}
export default function Input(props: Props) {
  const { type, onChange, placeholder, name, label } = props
  return (
    <div>
      {!label ? '' : <label htmlFor={name}>{label}</label>}
      <input
        className="border rounded border-gray-400 focus:border-2 focus:border-blue-500 p-2 w-full mb-2"
        type={type}
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder ? placeholder : undefined}
        name={name}
      />
    </div>
  )
}
