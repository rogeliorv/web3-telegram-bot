/* eslint-disable @next/next/no-img-element */
import GoogleMapReact from 'google-map-react';
import * as React from 'react';

// ADDED
import { HeaderPopover } from '@/components/Header';
import Layout from '@/components/layout/Layout';
import { LocationInMap } from '@/components/LocationsInMap';
import Seo from '@/components/Seo';

import Canvas from '../components/Canvas';

export const color = {
  'google-blue 100': `#4285F4`,
  'white 100': `rgb(255,255,255)`,
}

// const blueDot = {
//   fillColor: color['google-blue 100'],
//   fillOpacity: 1,
//   path: google.maps.SymbolPath.CIRCLE,
//   scale: 8,
//   strokeColor: color['white 100'],
//   strokeWeight: 2,
// };


const USDT_SVG = (
  <div className='h-4 w-4 bg-blue-500'>
    <img alt='USDT Logo' src='/assets/images/USDT.png' width='24' height='24'/>
  </div>
);


const HomePage = () => {
  const mapElementsList = [
    {
      latitude: '59.4332938',
      longitude: '24.75131621',
      marker: USDT_SVG,
    },
    {
      latitude: '59.4332938',
      longitude: '24.75131621',
      marker: USDT_SVG,
    },
    {
      latitude: '59.4332938',
      longitude: '24.75131621',
      marker: USDT_SVG,
    },
  ];

  return (
    <Layout>
      <Seo templateTitle='Travel lists and travel recommended spots' />
      <div className='overflow-hidden bg-background'>
        <div className='relative z-20 mx-auto  w-full bg-background bg-transparent'>
          <div className='absolute right-0 px-3 pt-3' id='header'>
            <HeaderPopover />
          </div>
        </div>
        <div className='mx-auto'>
          <div className='mx-auto w-[100%] h-[90.9vh]' id='locationsMap'>
            <GoogleMapReact
              yesIWantToUseGoogleMapApiInternals
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUB_KEY || '',
                libraries: ['places'],
              }}
              options={{
                fullscreenControl: false,
                gestureHandling: 'greedy',
                styles: [
                  {
                    // featureType: 'all',
                    // elementType: 'labels',
                    stylers: [
                      {
                        visibility: '#on',
                      },
                    ],
                  },
                ],
              }}
              center={{
                lat: 59.4332938,
                lng: 24.75131621
              }}
              defaultZoom={14}
              onGoogleApiLoaded={({ map }) => {
                // Add click event listener to the map
                map.addListener(
                  'click',
                  (event: MouseEvent & { placeId: string }) => {
                    // Do nothing
                  },
                  { passive: true }
                );
              }}
            >
              {mapElementsList.map((mapElement, index) => {
                return (
                  <LocationInMap
                    key={index}
                    mapElement={mapElement}
                    lat={parseFloat(mapElement.latitude)}
                    lng={parseFloat(mapElement.longitude)}
                    onExpandClick={() => {
                      // Something here
                    }}
                    marker={mapElement.marker}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        </div>
        <Canvas />
      </div>
    </Layout>
  );
}

export default HomePage;