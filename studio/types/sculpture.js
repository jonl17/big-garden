const Sculpture = {
  name: 'sculpture',
  title: 'Sculpture',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mapIcon',
      title: 'Map Icon',
      type: 'image',
      description: '100 x 100 is an optimal size',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
    },
    {
      name: 'threeDeeModel',
      title: '3D Model',
      type: 'string',
      description: '3D Model ID goes here',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'proximity',
      title: 'Proximity',
      type: 'number',
    },
  ],
}

export default Sculpture
