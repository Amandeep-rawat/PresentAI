"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Users, Crown, Check, Star, Play, Wand2, Brain, Rocket, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import HomeFooter from "@/components/homeComponents/HomeFooter"
import HomeNavbar from "@/components/homeComponents/HomeNavbar"
import { useRouter } from "next/navigation"
import HomeBody from "@/components/homeComponents/HomeBody"

export default function LandingPage() {
  const router=useRouter()
  return (
    <div>
<HomeNavbar/>
<HomeBody/>
        </div>

  )
}
