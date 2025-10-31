import { ExtendedUser } from "../../next-auth";

type Props = {
  user?: ExtendedUser;
  children: React.ReactNode;
};

const UserLayout: React.FC<Props> = ({ user, children }: Props) => {
  return (
    <main className={`transition-all duration-300 gradient-mesh`}>
      {children}
    </main>
  );
};

export default UserLayout;
