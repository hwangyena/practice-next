const getIconPath = (path: string) => `/public/img/${path}`;

export const ICONS = {
  ARROW_BACK: getIconPath('arrow-back.svg'),
  ARROW_FORWARD: getIconPath('arrow-forward.svg'),
  DOUBLE_ARROW_BACK: getIconPath('double-arrow-back.svg'),
  DOUBLE_ARROW_FORWARD: getIconPath('double-arrow-forward.svg'),
};
