type ShapeType = 'point' | 'linestring' | 'polygon'

type MatureStatus = 'IMMATURE' | 'PARTIALLY' | 'MATURE' | 'FULLY'

interface Marker {
  lnglat: [number, number]
}

interface Point {
  id: number
  property: PointProperty
}

interface PointProperty {
  matureStatus: MatureStatus
  likes: number
}

interface Linestring {
  id: number
  property: LinestringProperty
}

interface LinestringProperty {
  reason: string
  relatedPolygons: Polygon[]
}

interface Polygon {
  id: number
  property: PolygonProperty
}

interface PolygonProperty {
  recommendedRouteId?: number
}