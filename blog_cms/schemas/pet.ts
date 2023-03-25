export default {
  name: 'pet',
  type: 'document',
	title: 'Pet',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
    },
    {
      name: "species",
      type: "string",
      title: "Species"
    },
    {
      name: "profile_pic",
      type: "image",
      title: "Species",
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption"
        },
      ]
    },
    {
      name: "age",
      type: "number",
      title: "Age"
    },
    {
      name: "manifesto",
      title: "Manifesto",
      type: "array",
      of: [ { type: "block" } ]
    },
    {
      name: "still_alive",
      title: "Still Alive?",
      type: "boolean",
    },
    {
      name: "birthday",
      title: "Birthday",
      type: "date",
    }
  ],
};