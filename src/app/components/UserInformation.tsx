import { User } from '@auth/core/types';

type UserInformationProps = {
  user: User;
};

export default function UserInformation({ user }: UserInformationProps) {
  return (
    <p>Welcome {user.name}</p>
  )
}