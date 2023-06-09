import { FeatureCollection } from 'geojson'

export const points2Geojson = (
  type: 'point' | 'linestring' | 'polygon', 
  data: { lnglat: [number, number] }[]
): FeatureCollection => {
  const result: FeatureCollection = {
    type: 'FeatureCollection',
    features: []    
  }
  if (!type) return result
  switch (type) {
    case 'point':
      result.features = data.map(item => ({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: item.lnglat
        },
      }))
      break

    case 'linestring':
      result.features = [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: data.map(item => item.lnglat)
        },
      }]
      break

    case 'polygon':
      result.features = [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [data.map(item => item.lnglat)]
        },
      }]
      break
  }


  return result
}