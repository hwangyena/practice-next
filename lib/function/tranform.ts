export const transGender = (v: GenderType | undefined | null) => {
  switch (v) {
    case 'male':
      return '남자';
    case 'female':
      return '여자';
    default:
      return '-';
  }
};

export const transPassengerLabelToKor = (v: string) => {
  switch (v) {
    case 'country':
      return '도착지';
    case 'established':
      return '출시일';
    case 'head_quaters':
      return '편명';
    case 'name':
      return '비행기명';
    case 'slogan':
      return '슬로건';
    case 'website':
      return '웹사이트';
    default:
      '-';
  }
};
