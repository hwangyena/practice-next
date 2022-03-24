export const transGender = (v: GenderType) => {
  switch (v) {
    case 'male':
      return '남자';
    case 'female':
      return '여자';
    default:
      return '-';
  }
};
