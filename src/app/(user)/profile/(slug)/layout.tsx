import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: "%s | GCWiki",
    default: "GCWiki",
  },
};

const MainLayout = async ({ children }: Props) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
