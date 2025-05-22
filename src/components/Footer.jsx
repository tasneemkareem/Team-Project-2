import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-border/70 bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} SmartTile Analytics. Innovating energy solutions.
          </p>
        
          

        </motion.div>
        <motion.div 
          initial={{ opacity:0 }} 
          animate={{ opacity: 1}} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          className="mt-6 text-center text-xs text-muted-foreground/70"
        >
          <span>Crafted by Ahmed Hassan.</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;