"use strict";

const isAllowedByWynntils = ({r,g,b}) => (0.2126 * r + 0.7152 * g + 0.0722 * b) >= 30;