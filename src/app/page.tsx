import Navigation from "@/components/Navigation";
import VPSTable from "@/components/VPSTable";
import Footer from "@/components/Footer";
import ProviderStats from "@/components/ProviderStats";
import APIStatus from "@/components/APIStatus";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Real-time VPS Pricing Comparison
          </h1>
          <p className="text-gray-600 mb-4">
            Compare VPS plans from top hosting providers with live pricing updates
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <ProviderStats />
            </div>
            <div className="lg:col-span-1">
              <APIStatus />
            </div>
          </div>
        </div>
        <VPSTable />
      </main>
      <Footer />
    </div>
  );
}
