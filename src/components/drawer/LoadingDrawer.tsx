import * as React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/Drawer';
import Loading from '@/components/Loading';

const LoadingDrawer = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='text-left'>
            <div className='flex flex-row items-center justify-start'></div>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className='-px-4'>
          <Loading />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LoadingDrawer;
