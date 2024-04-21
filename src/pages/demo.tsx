/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

// ADDED
import { HeaderPopover } from '@/components/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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

const HomePage = () => {
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
        <div className='mx-auto text-center'>
          <div className='mx-auto' id='locationsMap'>
            <Link
              className='text-3xl '
              href='https://youtube.com/shorts/4J-mYox_5ig?feature=share'
            >
              Demo video
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
