"use client"

import React from 'react'

import { motion } from 'framer-motion'
import { Check, Crown, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const PricingCard = () => {
  return (
     <section id="pricing" className="py-20 ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold dark:text-white text-black/70 mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl dark:text-gray-300 text-gray-500">Start free, upgrade when you are ready</p>
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
                  "No export options",
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
                className={`relative  ${plan.popular ? "lg:scale-105" : ""}`}
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
                  className={`dark:bg-slate-800/50 bg-slate-700 border-slate-700 hover:border-slate-600 transition-all duration-300 h-full ${plan.popular ? "border-purple-500/50" : ""}`}
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
                          {
                            plan.name==='Free Trial' && featureIndex===2 ? (
                              <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                            ):                           <Check className="w-5 h-5 text-green-400 flex-shrink-0" />

                          }
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button onClick={()=> alert("PAYMENT ARE CURRENTLY DISABLED")}
                      className={`w-full py-3 text-lg font-semibold cursor-pointer rounded-xl transition-all duration-300 ${
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
  );
}

export default PricingCard;
