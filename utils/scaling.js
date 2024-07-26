import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = size => (SCREEN_WIDTH / baseWidth) * size;

const scaleHeight = size => (SCREEN_HEIGHT / baseHeight) * size;

const scaleFont = size => Math.round(PixelRatio.roundToNearestPixel(scaleWidth(size)));

export { scaleWidth, scaleHeight, scaleFont };