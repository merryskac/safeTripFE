import Leaflet from 'leaflet'
import iconUrl from '../../../public/marker-icon-2x.png'

export const defaultIcon = new Leaflet.Icon({
  iconUrl,
  iconSize: [20,30],
  iconAnchor: [10,30]
}) 