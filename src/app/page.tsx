import Navigation from "@/components/Navigation";
import VPSTable from "@/components/VPSTable";
import Footer from "@/components/Footer";
import ProviderStats from "@/components/ProviderStats";
import APIStatus from "@/components/APIStatus";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Real-time VPS Pricing Comparison
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
            Compare VPS plans from top hosting providers with live pricing updates
          </p>
          <ProviderStats />
        </div>
        <Suspense fallback={<div>Loading table...</div>}>
          <VPSTable 
            showDataSourceToggle={false}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
