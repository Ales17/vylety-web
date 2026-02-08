interface Props {
  children: React.ReactNode
  pageName: string
}
export default function PageWrapper({ children, pageName }: Props) {
  return (
    <div className="p-2">
      <h1 className="text-4xl mb-2">{pageName}</h1>
      {children}
    </div>
  )
}
