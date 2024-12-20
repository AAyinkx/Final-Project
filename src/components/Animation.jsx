"use client";
import Image from "next/image";
import logo from "@/../public/MindMatch2.png";
import { motion } from "framer-motion";

export default function Animation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col items-center"
    >
      <Image src={logo} alt="Mind Match Logo" width={500} height={500} />
    </motion.div>
  );
}
