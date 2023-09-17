export type ILoginDTO = {
  email: string;
  password: string;
};

export type ICreateUserDTO = {
  name: string;
  email: string;
  driverLicense: string;
  password: string;
  confirmPassword: string;
};
