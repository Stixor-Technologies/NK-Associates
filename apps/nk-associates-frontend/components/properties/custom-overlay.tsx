import { useRef, useEffect } from 'react';
import { OverlayView } from '@react-google-maps/api';

function CustomOverlay({ selectedProperty, onCloseClick, map }) {
  const { latitude, longitude } = selectedProperty.attributes;
  const divRef = useRef<HTMLElement>(null);
  const overlayRef = useRef(null);

  const mapRef = useRef();

  useEffect(() => {
    if (!map || !divRef.current) return;
  
    const mapBounds = map.getBounds();
    const mapNE = mapBounds.getNorthEast();
    const mapSW = mapBounds.getSouthWest();
  
    const projection = map.getProjection();
    const markerPoint = projection.fromLatLngToPoint({
      lat: latitude,
      lng: longitude,
    });
  
    const mapNEPoint = projection.fromLatLngToPoint(mapNE);
    const mapSWPoint = projection.fromLatLngToPoint(mapSW);
  
    const overlayWidth = divRef.current.offsetWidth;
    const overlayHeight = divRef.current.offsetHeight;
  
    let x = 0;
    let y = 0;
  
    // Adjust x position
    if (markerPoint.x - overlayWidth / 2 < mapSWPoint.x) {
      x = mapSWPoint.x + overlayWidth / 2 - markerPoint.x;
    } else if (markerPoint.x + overlayWidth / 2 > mapNEPoint.x) {
      x = mapNEPoint.x - overlayWidth / 2 - markerPoint.x;
    }
  
    // Adjust y position
    if (markerPoint.y - overlayHeight < mapNEPoint.y) {
      y = mapNEPoint.y + overlayHeight - markerPoint.y;
    } else if (markerPoint.y + overlayHeight > mapSWPoint.y) {
      y = mapSWPoint.y - overlayHeight - markerPoint.y;
    }
  
    divRef.current.style.transform = `translate(${200}px, ${400}px)`;
  }, [latitude, longitude]);
  

  return (
    <OverlayView
      position={{ lat: latitude, lng: longitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      ref={overlayRef}
    >
      <div className="info-window">
        <button onClick={onCloseClick}>X</button>
        <h2>Property Information</h2>
        <p>{selectedProperty.name}</p>
      </div>
    </OverlayView>
  );
}

export default CustomOverlay;
