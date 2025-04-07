const defaultColor = '#3388ff'

export const initialFeatures = [
  {
    id: 1,
    type: 'pin',
    coords: [-25.935, 27.180],
    images: ['https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg'],
    name: 'Mountain Vista Point',
    text: 'A breathtaking viewpoint overlooking the valley, perfect for sunrise photography. The morning mist often creates a mystical atmosphere as it rolls through the mountains.',
    color: defaultColor
  },
  {
    id: 2,
    type: 'pin',
    coords: [-25.940, 27.185],
    images: ['https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg'],
    name: 'Hidden Waterfall',
    text: 'A secluded waterfall tucked away in the forest. The constant sound of rushing water and the cool mist make this spot a refreshing retreat during hot summer days.',
    color: defaultColor
  },
  {
    id: 3,
    type: 'pin',
    coords: [-25.930, 27.175],
    images: ['https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg'],
    name: 'Mirror Lake',
    text: 'A serene alpine lake known for its perfect reflections of the surrounding peaks. Early morning visits offer the best conditions for photography and peaceful contemplation.',
    color: defaultColor
  },
  {
    id: 4,
    type: 'pin',
    coords: [-25.937, 27.190],
    images: ['https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg'],
    name: 'Sunset Ridge',
    text: 'The perfect spot to watch the sun set behind the mountains. The golden hour here creates spectacular lighting conditions that paint the landscape in warm, vibrant colors.',
    color: defaultColor
  },
  {
    id: 5,
    type: 'pin',
    coords: [-25.928, 27.182],
    images: ['https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg'],
    name: 'Forest Lookout',
    text: 'An elevated viewpoint offering a birds-eye view of the ancient forest below. The canopy stretches as far as the eye can see, creating a sea of green.',
    color: "red"
  },
  {
    id: 6,
    type: 'region',
    coords: [
      [-25.942, 27.175],
      [-25.940, 27.185],
      [-25.935, 27.180],
      [-25.938, 27.170]
    ],
    images: ['https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg'],
    name: 'Protected Forest Zone',
    text: 'A designated conservation area protecting old-growth forest and diverse wildlife. This region is home to numerous endangered species and rare plant specimens.',
    color: "green"
  },
  {
    id: 7,
    type: 'region',
    coords: [
      [-25.930, 27.178],
      [-25.928, 27.186],
      [-25.925, 27.182]
    ],
    images: ['https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg'],
    name: 'Coastal Reserve',
    text: 'A protected coastal area featuring diverse marine ecosystems and nesting sites for sea birds. The rugged coastline and pristine beaches make it a popular spot for nature enthusiasts.',
    color: defaultColor
  }
]

export { defaultColor }
