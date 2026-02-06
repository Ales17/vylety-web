import type { CollectionConfig } from 'payload'
import { slugify } from 'lib/string-methods'
export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'mapsLink',
      type: 'text',
    },
    {
      name: 'eventDate',
      type: 'date',
    },
    {
      name: 'tripLength',
      type: 'number',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      (args) => {
        // console.log(args)
        const title = args.data.title
        const newSlug = slugify(title)
        args.data.slug = newSlug
      },
    ],
  },
}
