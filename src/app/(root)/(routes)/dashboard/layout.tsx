import Navbar from "@/components/ui/DashBoard/Sidebar";
import Top_Bar from "@/components/ui/DashBoard/Top-Bar";
import { CreditProvider } from "@/components/credit-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-[100vh] w-full  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <CreditProvider>
        <Navbar />
        <div className="flex flex-col z-90">
          <Top_Bar />
          <main className="flex  flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            {children}
          </main>
        </div>
      </CreditProvider>
    </div>
  );
};

export default DashboardLayout;
