
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { navItems, projects, rotatingTitles, skills } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar items={navItems} />
      
      <main>
        <Hero rotatingTitles={rotatingTitles} />
        
        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About Me</h2>
                <p className="text-gray-600 mb-6">
                  I'm a passionate web designer and developer with over 5 years of experience creating beautiful, 
                  functional websites and applications. My approach combines technical expertise with creative 
                  design principles to deliver exceptional digital experiences.
                </p>
                <p className="text-gray-600 mb-8">
                  My goal is to help businesses and individuals establish a strong online presence through 
                  thoughtfully designed, responsive, and user-friendly websites that not only look great but also 
                  drive results.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-[#FFD700] mr-2" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[#FFD700]/20 to-[#e6c300]/20 blur-xl opacity-70" />
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2976&q=80" 
                    alt="Profile"
                    className="rounded-xl relative z-10 w-full h-auto border-2 border-[#FFD700]/20"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Portfolio projects={projects} />
        
        <Contact />
      </main>
      
      <footer className="bg-gray-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 Portfolio Website. All rights reserved.</p>
          
          <div className="flex justify-center mt-6 space-x-6">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.url}
                className="text-gray-500 hover:text-[#FFD700] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
