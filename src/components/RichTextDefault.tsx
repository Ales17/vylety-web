import { DefaultNodeTypes, type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { RichText, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

type NodeTypes = DefaultNodeTypes

import { headingConverter } from './converters/headingConverter'

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...headingConverter,
})

export default function RichTextDefault({ data, className }: Props) {
  return <RichText className={className} converters={jsxConverters} data={data} />
}
