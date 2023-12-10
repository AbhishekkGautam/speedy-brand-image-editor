export const getFilterStyle = effect => {
  switch (effect) {
    case 'grayscale':
      return 'grayscale(100%)';
    case 'sepia':
      return 'sepia(100%)';
    case 'blur':
      return 'blur(5px)';
    case 'brightness':
      return 'brightness(150%)';
    case 'contrast':
      return 'contrast(200%)';
    case 'invert':
      return 'invert(100%)';
    case 'opacity':
      return 'opacity(30%)';
    default:
      return 'none';
  }
};
