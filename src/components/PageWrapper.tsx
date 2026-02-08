interface Props {
  children: React.ReactNode
  pageName: string
}
export default function PageWrapper({ children, pageName }: Props) {
  return (
    <div>
      <h1 className="text-4xl">{pageName}</h1>
      {children}
    </div>
  )
}
