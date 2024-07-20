import Link from 'next/link';
import { redirect } from 'next/navigation';

import { FiBarChart, FiLayers, FiUserCheck } from 'react-icons/fi';

import { ROUTES } from '@/constants';
import { auth } from '@/auth';
import FeatureCard from '@/components/feature-card';

export default async function HomePage() {
  
  const session = await auth();
  const isAuthenticated = !!session;

  async function handleGetStarted() {
    'use server';
    if (isAuthenticated) {
      redirect(ROUTES.DASHBOARD);
    } else {
      redirect(ROUTES.AUTH);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to Our Analytics Platform
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Unlock the power of your data with our cutting-edge analytics solution.
              Make informed decisions and drive your business forward.
            </p>
            <form action={handleGetStarted}>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiBarChart className="w-12 h-12 text-blue-600" />}
              title="Advanced Analytics"
              description="Gain deep insights with our powerful analytics tools."
            />
            <FeatureCard 
              icon={<FiLayers className="w-12 h-12 text-blue-600" />}
              title="Data Integration"
              description="Seamlessly integrate data from multiple sources."
            />
            <FeatureCard 
              icon={<FiUserCheck className="w-12 h-12 text-blue-600" />}
              title="User-Friendly Interface"
              description="Intuitive design for easy navigation and analysis."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {!isAuthenticated && (
        <section className="bg-blue-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of businesses already leveraging our platform.
            </p>
            <Link 
              href={`${ROUTES.AUTH}?mode=signup`}
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
