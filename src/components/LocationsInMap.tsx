/* eslint-disable unused-imports/no-unused-vars */
import React, { ReactNode } from 'react';
import { FaMapMarkerAlt as MapMarkerIcon } from 'react-icons/fa';

export interface MapElement {
  latitude: string;
  longitude: string;
  marker?: ReactNode;
}

export const LocationInMap = <T extends MapElement>({
  mapElement,
  onExpandClick,
  // NOTE: LAT and LNG are not used within the component. But google maps library reads
  // the properties to position the elements
  lat,
  lng,
  marker,
}: {
  mapElement: T;
  onExpandClick: () => void;
  lat: number;
  lng: number;
  marker?: ReactNode;
}) => {
  return (
    <div
      className='my-2 cursor-pointer rounded-lg'
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onExpandClick();
      }}
      onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onExpandClick();
      }}
    >
      {marker ?? (
        <MapMarkerIcon
          size={32}
          className='-translate-x-1/2 -translate-y-full transform fill-primary text-2xl'
        />
      )}
    </div>
  );
};
