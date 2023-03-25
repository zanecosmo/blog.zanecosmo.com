

export default {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "slug",
      title: "Slug",
      type: "string"
    },
    {
      name: "author",
      type: "string",
      title: "Author"
    },
    {
      name: "date_posted",
      type: "date",
      title: "Date Posted"
    },
    {
      name: "last_updated",
      type: "date",
      title: "Last Updated"
    },
    {
      name: "topics",
      title: "Topics",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "topic"
            }
          ]
        }
      ]
    },
    {
      name: "article_image",
      title: "Article Image",
      type: "image"
    },
    {
      name: "article",
      title: "Article",
      type: "array",
      of: [
        {
          type: "block"
        }
      ]
    }
  ]
}