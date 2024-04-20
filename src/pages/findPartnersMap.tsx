/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button, Input } from '@nextui-org/react';
import GoogleMapReact from 'google-map-react';
import JSConfetti from 'js-confetti';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/Drawer';
// ADDED
import { HeaderPopover } from '@/components/Header';
import Layout from '@/components/layout/Layout';
import { LocationInMap, MapElement } from '@/components/LocationsInMap';
import Seo from '@/components/Seo';

import Canvas from '../components/Canvas';

export const color = {
  'google-blue 100': `#4285F4`,
  'white 100': `rgb(255,255,255)`,
};

// const blueDot = {
//   fillColor: color['google-blue 100'],
//   fillOpacity: 1,
//   path: google.maps.SymbolPath.CIRCLE,
//   scale: 8,
//   strokeColor: color['white 100'],
//   strokeWeight: 2,
// };

const MoneyExchangeIcon = (
  <div className='flex h-8 w-8 flex-row items-center justify-center rounded-full bg-blue-500'>
    <img
      alt='Exchange Icon'
      className='rounded-full'
      src='/assets/images/moneyExchangeIcon3.webp'
      width='24'
      height='24'
    />
  </div>
);

const mapElementsList = [
  {
    name: 'R-Kiosk Vereeni',
    latitude: '59.4332938',
    longitude: '24.75131621',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Vanalinn',
    latitude: '59.4306331',
    longitude: '24.7590682',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Baltijaam',
    latitude: '59.4274467',
    longitude: '24.7740125',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Kesklinn',
    latitude: '59.4350179',
    longitude: '24.7553705',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Keskturg',
    latitude: '59.4383326',
    longitude: '24.7590282',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Farland',
    latitude: '59.4324466',
    longitude: '24.7427446',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Tonismagi',
    latitude: '59.4394744',
    longitude: '24.7397645',
    marker: MoneyExchangeIcon,
  },
  {
    name: 'R-Kiosk Solaris',
    latitude: '59.4402411',
    longitude: '24.737643',
    marker: MoneyExchangeIcon,
  },
];

const ARE_YOU_HERE_STEP = 'ARE_YOU_HERE';
const AMOUNT_STEP = 'AMOUNT_STEP';
const SUCCESS_STEP = 'SUCCESS_STEP';
const CONFIRMATION_STEP = 'CONFIRMATION_STEP';

const HomePage = () => {
  const [shownPartner, setShownPartner] = useState<MapElement>();
  const [currentStep, setCurrentStep] = useState<string>(ARE_YOU_HERE_STEP);
  const router = useRouter();

  return (
    <Layout>
      <Seo templateTitle='Find a partner for money Withdrawal' />
      <div className='overflow-hidden bg-background'>
        <div className='relative z-20 mx-auto  w-full bg-background bg-transparent'>
          <div className='absolute right-0 px-3 pt-3' id='header'>
            <HeaderPopover />
          </div>
        </div>
        <div className='mx-auto'>
          <div className='mx-auto h-[99.9vh] w-[100%]' id='locationsMap'>
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
                lng: 24.75131621,
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
                      setShownPartner(mapElement);
                    }}
                    marker={mapElement.marker}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        </div>
        <Drawer
          open={!!shownPartner}
          onClose={() => {
            setCurrentStep(ARE_YOU_HERE_STEP);
            setShownPartner(undefined);
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className='text-left'>
                {currentStep === ARE_YOU_HERE_STEP && shownPartner && (
                  <>
                    <h1 className='text-center text-xl'>Are you here?</h1>
                    <p className='text-center'>{shownPartner.name}</p>
                    <div className='my-8 flex flex-row items-center justify-start'>
                      <div className='mx-auto flex flex-row justify-center gap-x-4 align-middle'>
                        <Button
                          size='xl'
                          auto
                          onClick={() => {
                            setCurrentStep(AMOUNT_STEP);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          size='xl'
                          auto
                          onClick={() => {
                            setCurrentStep(AMOUNT_STEP);
                          }}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {currentStep === AMOUNT_STEP && (
                  <>
                    <h1 className='mb-8 text-center text-xl'>
                      How much do you want to withdraw?
                    </h1>
                    <div className='mx-auto flex flex-row items-center justify-center'>
                      <Input size='xl' bordered initialValue='$0.00' />
                    </div>
                    <div className='mx-auto flex flex-row items-center justify-center'>
                      <Button
                        className='my-3'
                        size='xl'
                        auto
                        onClick={() => {
                          setCurrentStep(CONFIRMATION_STEP);
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </>
                )}
                {currentStep === CONFIRMATION_STEP && (
                  <>
                    <h1 className='text-center'>Show code to merchant</h1>
                    <Image
                      className='mx-auto'
                      width={250}
                      height={250}
                      alt='qr code'
                      src='/assets/images/qrcode.png'
                    />
                    <p className='text-center text-xl'>
                      Confirmation Code: 4 5 8 9 0
                    </p>
                    <Button
                      size='xl'
                      className='mx-auto'
                      auto
                      onClick={() => {
                        setCurrentStep(SUCCESS_STEP);
                        const jsConfetti = new JSConfetti();
                        jsConfetti.addConfetti({
                          emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                        });
                      }}
                    >
                      Confirm Withdrawal
                    </Button>
                  </>
                )}
                {currentStep === SUCCESS_STEP && (
                  <div className='flex flex-col items-center justify-center'>
                    <Image
                      width={250}
                      height={250}
                      alt='withdrawal successful'
                      src='/assets/images/greentick.png'
                    />
                    <h1 className='text-center'>Withdrawal succesful</h1>
                    <p className='text-center text-lg'>$ 1500.00</p>
                    <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
                      View on blockchain explorer:
                    </p>
                    <Link href='https://www.blockchain.com/explorer/addresses/btc/bc1qw9fm787vw8chlc6rqttuhw7yv4d7sne2w5t223mk07ttq9wnr6jqqskzy9'>
                      bc1qw9fm787vw8chlc6rqttuhw7yv4d7s...
                    </Link>
                  </div>
                )}
              </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter className='-px-4'></DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Canvas />
      </div>
    </Layout>
  );
};

export default HomePage;
