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

export const transUserLabelToKor = (v: string) => {
  switch (v) {
    case 'id':
      return '아이디';
    case 'name':
      return '이름';
    case 'email':
      return '이메일';
    case 'gender':
      return '성별';
    case 'status':
      return '상태';
  }
};
