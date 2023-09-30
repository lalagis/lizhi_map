import { defineStore } from "pinia"
import { FullyPNG, MaturePNG, PartiallyPNG, ImmaturePNG } from "~/assets"

export const useGlobalStore = defineStore('global', () => {
  const map = $(useMapboxInstance('base'))

  const currentLayer = $ref<ShapeType | 'nearest'>('point')

  const cursor = $ref<'default' | 'cell' | 'grab'>('grab')

  const insertType = $ref<ShapeType>()

  const markers = $ref<Marker[]>([])

  // load image
  watchEffect(() => {
    if (map) {
      // add images to map
      // fully
      map.loadImage(FullyPNG, (error, image) => {
        if (error) throw error
        if (!map.hasImage('fully') && image) {
          map.addImage('fully', image)
        }
      })

      // mature
      map.loadImage(MaturePNG, (error, image) => {
        if (error) throw error
        if (!map.hasImage('mature') && image) {
          map.addImage('mature', image)
        }
      })

      // partially
      map.loadImage(PartiallyPNG, (error, image) => {
        if (error) throw error
        if (!map.hasImage('partially') && image) {
          map.addImage('partially', image)
        }
      })

      // immature
      map.loadImage(ImmaturePNG, (error, image) => {
        if (error) throw error
        if (!map.hasImage('immature') && image) {
          map.addImage('immature', image)
        }
      })
    }
  })
  
  // cursor change
  watchEffect(() => {
    if (map) {
      map.getCanvas().style.cursor = cursor
    }
  })

  return $$({
    map,

    currentLayer,

    cursor,

    insertType,

    markers
  })
})