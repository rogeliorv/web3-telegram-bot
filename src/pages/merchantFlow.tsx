/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button } from '@nextui-org/react';
import { format as formatDate } from 'date-fns';
import JSConfetti from 'js-confetti';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

// ADDED
import Layout from '@/components/layout/Layout';
import { MapElement } from '@/components/LocationsInMap';
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

const WAITING_STEP = 'WAITING_STEP';
const CONFIRMATION_STEP = 'CONFIRMATION_STEP';
const SUCCESS_STEP = 'SUCCESS_STEP';

const HomePage = () => {
  const [shownPartner, setShownPartner] = useState<MapElement>();
  const [currentStep, setCurrentStep] = useState<string>(WAITING_STEP);
  const router = useRouter();

  return (
    <Layout>
      <Seo templateTitle='Find a partner for money Withdrawal' />
      <div className='flex flex-col items-center justify-center overflow-hidden bg-background'>
        <div className='mx-auto flex h-[99vh] flex-col items-center justify-center gap-x-4 gap-y-4'>
          {currentStep === WAITING_STEP && (
            <div>
              <p className='text-center text-lg'>R-kiosk Vereeni</p>
              <Button
                size='xl'
                className='my-6'
                onClick={() => {
                  setCurrentStep(CONFIRMATION_STEP);
                }}
              >
                Scan code
              </Button>
              <Button
                size='xl'
                className='my-6'
                onClick={() => {
                  setCurrentStep(CONFIRMATION_STEP);
                }}
              >
                Manual code
              </Button>
            </div>
          )}
          {currentStep === CONFIRMATION_STEP && (
            <>
              <h1 className='text-center'>Scanning code</h1>
              <Image
                className='mx-auto'
                width={250}
                height={250}
                alt='qr code'
                src='/assets/images/qrcode.png'
              />
              <p className='text-center text-xl'>
                Deposited on: {formatDate(Date.now(), 'MMM dd, yyyy')}
              </p>
              <Button
                size='xl'
                className='mx-auto'
                auto
                onClick={() => {
                  setTimeout(() => {
                    setCurrentStep(WAITING_STEP);
                  }, 8500);
                  setCurrentStep(SUCCESS_STEP);
                  const jsConfetti = new JSConfetti();
                  jsConfetti.addConfetti({
                    emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                  });
                }}
              >
                Confirm amount
              </Button>
            </>
          )}
          {currentStep === SUCCESS_STEP && (
            <div className='flex flex-col w-full items-center justify-center'>
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
              <Link className={"w-full text-center"} href='https://www.blockchain.com/explorer/addresses/btc/bc1qw9fm787vw8chlc6rqttuhw7yv4d7sne2w5t223mk07ttq9wnr6jqqskzy9'>
                bc1qw9fm787vw8chlc6rqttuhw7yv4d7s...
              </Link>
            </div>
          )}
        </div>
        <Canvas />
      </div>
    </Layout>
  );
};

export default HomePage;
