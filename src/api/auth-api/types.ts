export type AuthVerify = {
  email: string;
  password: string;
  isNewAcc: boolean;
};
export type AuthLogin = {
  email: string;
  password: string;
  emailCode: string;
};
export type AuthSignup = {
  firstName: string;
  email: string;
  password: string;
  emailCode: string;
};
