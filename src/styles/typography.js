import { scaleFont } from './mixins';

// FONT FAMILY
export const DEFAULT_FONT_FAMILY = 'MyriadProRegular';
export const SECONDARY_FONT_FAMILY = 'RobotoLight';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLES
export const DEFAULT_FONT_REGULAR = {
	fontFamily: DEFAULT_FONT_FAMILY,
	fontWeight: FONT_WEIGHT_REGULAR,
};

export const DEFAULT_FONT_BOLD = {
	fontFamily: DEFAULT_FONT_FAMILY,
	fontWeight: FONT_WEIGHT_BOLD,
};

export const SECONDARY_FONT_REGULAR = {
	fontFamily: SECONDARY_FONT_FAMILY,
	fontWeight: FONT_WEIGHT_REGULAR,
};

export const SECONDARY_FONT_BOLD = {
	fontFamily: SECONDARY_FONT_FAMILY,
	fontWeight: FONT_WEIGHT_BOLD,
};
