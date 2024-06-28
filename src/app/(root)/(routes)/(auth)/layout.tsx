const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex items-center justify-center h-[100vh]">{children}</main>
  )
}

export default AuthLayout
