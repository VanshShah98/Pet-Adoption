import type { ReactNode } from "react"
import { Header } from "./header"
import { Footer } from "./footer"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

