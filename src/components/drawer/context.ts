import React from 'react';

interface DrawerContextValue {
  drawerRef: React.RefObject<HTMLDivElement>;
  overlayRef: React.RefObject<HTMLDivElement>;
  scaleBackground: (open: boolean) => void;
  onPress: (event: React.PointerEvent<HTMLDivElement>) => void;
  onRelease: (event: React.PointerEvent<HTMLDivElement>) => void;
  onDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
  onNestedDrag: (
    event: React.PointerEvent<HTMLDivElement>,
    percentageDragged: number
  ) => void;
  onNestedOpenChange: (o: boolean) => void;
  onNestedRelease: (
    event: React.PointerEvent<HTMLDivElement>,
    open: boolean
  ) => void;
  dismissible: boolean;
  isOpen: boolean;
  keyboardIsOpen: React.MutableRefObject<boolean>;
  snapPointsOffset: number[] | null;
  snapPoints?: (number | string)[] | null;
  modal: boolean;
  shouldFade: boolean;
  activeSnapPoint?: number | string | null;
  setActiveSnapPoint: (o: number | string | null) => void;
  visible: boolean;
  closeDrawer: () => void;
  setVisible: (o: boolean) => void;
  openProp?: boolean;
  onOpenChange?: (o: boolean) => void;
}

export const DrawerContext = React.createContext<DrawerContextValue>({
  drawerRef: { current: null },
  overlayRef: { current: null },
  scaleBackground: () => {
    // Do nothing
  },
  onPress: () => {
    // Do nothing
  },
  onRelease: () => {
    // Do nothing
  },
  onDrag: () => {
    // Do nothing
  },
  onNestedDrag: () => {
    // Do nothing
  },
  onNestedOpenChange: () => {
    // Do nothing
  },
  onNestedRelease: () => {
    // Do nothing
  },
  openProp: undefined,
  dismissible: false,
  isOpen: false,
  keyboardIsOpen: { current: false },
  snapPointsOffset: null,
  snapPoints: null,
  modal: false,
  shouldFade: false,
  activeSnapPoint: null,
  onOpenChange: () => {
    // Do nothing
  },
  setActiveSnapPoint: () => {
    // Do nothing
  },
  visible: false,
  closeDrawer: () => {
    // Do nothing
  },
  setVisible: () => {
    // Do nothing
  },
});

export const useDrawerContext = () => React.useContext(DrawerContext);
