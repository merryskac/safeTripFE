import {  useEffect } from "react";
import { useMap } from "react-leaflet";

const SetMarkerByPosition = ({lat, lng}) => {
  const map = useMap()
  
  map.setView([lat,lng])
  map.dragging.enabled(true)
  useEffect(()=>{
  })

  return null
}
 
export default SetMarkerByPosition;