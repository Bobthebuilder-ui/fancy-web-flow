
import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { navItems } from "@/lib/data";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar items={navItems} />
      
      <main className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Dashboard</h1>
          <DashboardTabs />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
