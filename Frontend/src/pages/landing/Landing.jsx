
import React from "react";
import LandingImage from "../../assets/landing.png";

const LandingPage = () => {
    return (
        <>
            <div className="min-h-screen bg-white text-gray-800">
                {/* Navbar */}
                <header className="flex justify-between items-center px-8 py-4 shadow-sm">
                    <h1 className="text-2xl font-bold">MyBrand</h1>
                    <nav className="space-x-6 hidden md:flex">
                        <a href="#features" className="hover:text-blue-600">Features</a>
                        <a href="#contact" className="hover:text-blue-600">Contact</a>
                    </nav>
                </header>


                {/* Hero Section */}
                <section className="text-center py-20">
                    <h2 className="text-5xl font-extrabold mb-6">Welcome to MyBrand</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        A simple landing page built with React and TailwindCSS.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Get Started
                    </button>
                </section>


                {/* Features Section */}
                <section id="features" className="py-16 px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <h3 className="font-semibold text-xl mb-2">Fast</h3>
                        <p className="text-gray-600">Quick and responsive performance.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-xl mb-2">Easy</h3>
                        <p className="text-gray-600">Simple and intuitive design.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-xl mb-2">Secure</h3>
                        <p className="text-gray-600">Your data is always safe.</p>
                    </div>
                </section>


                {/* Footer */}
                <footer id="contact" className="py-8 text-center bg-gray-100">
                    <p className="text-gray-600">© {new Date().getFullYear()} MyBrand. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
