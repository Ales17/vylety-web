import { Post } from '@/payload-types'
import Link from 'next/link'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'

import {
  RichText,
  JSXConverters,
  LinkJSXConverter,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

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

export default function RichTextDefault(props: Props) {
  const { data, ...rest } = props
  return (
    <div className="prose">
      <RichText converters={jsxConverters} data={data} />
    </div>
  )
}
