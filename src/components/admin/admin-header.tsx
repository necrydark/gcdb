import AdminMobileSidebar  from "./admin-mobile-sidebar";
export const MobileHeader = () => {
    
  return (
    <nav className="lg:hidden flex justify-between px-6 h-[50px] items-center border-b fixed top-0 w-full z-50">
      <AdminMobileSidebar />

    </nav>
  );
};