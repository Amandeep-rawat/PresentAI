
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Users, Crown, Check, Star, Play, Wand2, Brain, Rocket, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HomeFooter from "@/components/homeComponents/HomeFooter"
import { useRouter } from "next/navigation"
const HomeBody = () => {

    const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">AI-Powered Presentation Magic</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Create{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Stunning
              </span>
              <br />
              Presentations in{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Seconds
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into professional presentations with the power of AI. No design skills needed. Just
              describe your vision and watch magic happen.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button onClick={()=>router.push("/dashboard")}
                size="lg"
                className=" cursor-pointer bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 cursor-pointer text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-400 mb-4">Trusted by 10,000+ creators worldwide</p>
              <div className="flex justify-center items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-300">4.9/5 from 2,000+ reviews</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI Platform?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of presentation creation with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Generation",
                description: "Advanced AI understands your content and creates visually stunning slides automatically",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate complete presentations in under 30 seconds. No more hours of design work",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: Wand2,
                title: "Smart Templates",
                description: "Choose from 1000+ AI-optimized templates that adapt to your content perfectly",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Real-time collaboration with your team. Share, edit, and present together seamlessly",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: Rocket,
                title: "Export Anywhere",
                description: "Export to PowerPoint, PDF, or present directly. Compatible with all major platforms",
                gradient: "from-violet-500 to-purple-500",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with SOC 2 compliance. Your data is always protected",
                gradient: "from-indigo-500 to-blue-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Create Presentations in{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Vision",
                description:
                  "Simply tell our AI what you want to present. Topic, audience, style - just describe it naturally.",
                color: "purple",
              },
              {
                step: "02",
                title: "AI Creates Magic",
                description:
                  "Our advanced AI analyzes your input and generates a complete presentation with stunning visuals.",
                color: "cyan",
              },
              {
                step: "03",
                title: "Customize & Present",
                description: "Fine-tune your presentation with our intuitive editor, then present with confidence.",
                color: "pink",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center text-2xl font-bold text-white shadow-2xl`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-300">Start free, upgrade when you're ready</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free Trial",
                price: "$0",
                period: "7 days",
                description: "Perfect for trying out our AI magic",
                features: [
                  "1 AI-generated presentation",
                  "Basic templates",
                  "Standard export options",
                  "Community support",
                ],
                buttonText: "Start Free Trial",
                popular: false,
              },
              {
                name: "Pro",
                price: "$19",
                period: "per month",
                description: "For professionals and small teams",
                features: [
                  "Unlimited AI presentations",
                  "Premium templates",
                  "Advanced customization",
                  "Priority support",
                  "Team collaboration",
                  "Analytics dashboard",
                ],
                buttonText: "Get Started",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$49",
                period: "per month",
                description: "For large teams and organizations",
                features: [
                  "Everything in Pro",
                  "Custom branding",
                  "SSO integration",
                  "Advanced security",
                  "Dedicated support",
                  "Custom integrations",
                ],
                buttonText: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative ${plan.popular ? "lg:scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <Card
                  className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 h-full ${plan.popular ? "border-purple-500/50" : ""}`}
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400">/{plan.period}</span>
                      </div>
                      <p className="text-gray-300">{plan.description}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-purple-500/25"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Presentations?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of professionals who've revolutionized their presentation workflow with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                Start Your Free Trial
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>


      <HomeFooter/>
       
    </div>
  );
}

export default HomeBody;
