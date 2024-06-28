"use client";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex items-center justify-center">
      {children}
    </main>
  )
}

export default DashboardLayout
