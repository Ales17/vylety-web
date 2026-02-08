interface Props {
  url: string
}
export default function Image({ url }: Props) {
  return <img src={url} alt="" />
}
