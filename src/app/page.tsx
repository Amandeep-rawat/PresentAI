"use client"

// import HomeFooter from "@/components/homeComponents/HomeFooter"
import HomeNavbar from "@/components/homeComponents/HomeNavbar"
import { useRouter } from "next/navigation"
import HomeBody from "@/components/homeComponents/HomeBody"

export default function LandingPage() {
  return (
    <div>
<HomeNavbar/>
<HomeBody/>
        </div>

  )
}
