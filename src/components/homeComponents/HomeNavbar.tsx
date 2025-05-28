"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

export default function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
const router=useRouter()
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">PresentAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">
              Demo
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex  items-center gap-4">
            {
              !user && <Button onClick={()=>router.push('/sign-in')} variant="ghost" className="text-gray-300 hover:text-white cursor-pointer">
              Sign In
            </Button>
            }
            
            <Button onClick={()=> router.push('/dashboard')} className="bg-gradient-to-r from-purple-600 to-cyan-600 cursor-pointer hover:from-purple-700 hover:to-cyan-700 text-white">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 py-4"
          >
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors py-2">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2">
                Pricing
              </a>
              <a href="#demo" className="text-gray-300 hover:text-white transition-colors py-2">
                Demo
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors py-2">
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
                <Button variant="ghost" className="text-gray-300 hover:text-white justify-start">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
