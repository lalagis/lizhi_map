type ShapeType = 'point' | 'linestring' | 'polygon'

type MatureStatus = 'IMMATURE' | 'PARTIALLY' | 'MATURE' | 'FULLY'

interface Marker {
  lnglat: [number, number]
}
