import { EUserRole, EUserStatus } from '../enums';

export class SignInPresentation {
  token: string;
  status: EUserStatus;
  role: EUserRole;
}

export class SignUpPresentation {
  status: EUserStatus;
}
