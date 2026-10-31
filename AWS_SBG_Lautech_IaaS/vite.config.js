/**
 * Vite configuration for the Cloud Lab React application.
 * Fixes the "use client" module-level directive warning from lucide-react.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        // Preserve module directives where possible
        preserveModules: true,
        // Helps with the use client directive issue
        manualChunks: undefined,
      },
    },
    // Suppress specific warnings if needed
    // target: 'esnext', // Can help with module directives
  },
  // OptimizeDeps can help with external dependencies
  optimizeDeps: {
    include: ["lucide-react"],
  },
});
