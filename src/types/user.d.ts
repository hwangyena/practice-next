type UserInfo = {
  id: number;
  loginId: string;
  name: string;
  phone: string;
  role: string;
  svcId: string;
  jobInfoIds: { domainNo: string; channelId: string; svcId: string }[];
};
