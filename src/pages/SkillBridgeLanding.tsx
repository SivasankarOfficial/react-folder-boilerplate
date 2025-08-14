import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  Users,
  Briefcase,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Search,
  MessageSquare,
  Award,
  Globe,
  Zap,
  Heart,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const SkillBridgeLandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { number: "50K+", label: "Active Freelancers", icon: Users },
    { number: "25K+", label: "Projects Completed", icon: CheckCircle },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "$2M+", label: "Paid to Freelancers", icon: DollarSign },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description:
        "Our AI-powered algorithm connects you with the perfect talent or projects based on skills and requirements.",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Protected payments with escrow service. Money is only released when work is completed to satisfaction.",
      color: "text-success",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Built-in messaging system with file sharing, video calls, and project collaboration tools.",
      color: "text-secondary",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Verified profiles, skill assessments, and rating system ensure you work with top professionals.",
      color: "text-warning",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "SkillBridge helped us find amazing developers for our mobile app. The quality of work exceeded our expectations!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Full-Stack Developer",
      company: "Freelancer",
      content:
        "As a freelancer, SkillBridge has been a game-changer. I've landed consistent, high-paying projects with great clients.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      company: "InnovateLab",
      content:
        "The platform made it easy to build our entire development team. Highly recommend for any growing business.",
      rating: 5,
      avatar: "ER",
    },
  ];

  const categories = [
    { name: "Web Development", count: "12,543", icon: "💻" },
    { name: "Mobile Apps", count: "8,231", icon: "📱" },
    { name: "UI/UX Design", count: "9,876", icon: "🎨" },
    { name: "Digital Marketing", count: "6,542", icon: "📈" },
    { name: "Content Writing", count: "11,234", icon: "✍️" },
    { name: "Data Science", count: "4,567", icon: "📊" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-success/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-dark mb-6">
              Connect with Top <span className="text-primary">Talent</span>
              <br />
              or Find Your Next <span className="text-secondary">Project</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SkillBridge is the world's largest freelancing platform connecting businesses with skilled professionals.
              Whether you're hiring or looking for work, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center">
                Find Talent <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/90 transition-all transform hover:scale-105 flex items-center justify-center">
                Find Work <Search className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-dark">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose SkillBridge?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in the digital marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color} bg-gray-50`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">How SkillBridge Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* For Clients */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">For Clients</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Post Your Project</h4>
                    <p className="text-gray-600">Describe your project requirements and budget</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Review Proposals</h4>
                    <p className="text-gray-600">Get proposals from qualified freelancers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Hire & Collaborate</h4>
                    <p className="text-gray-600">Choose the best freelancer and start working</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Freelancers */}
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-8 text-center">For Freelancers</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Create Your Profile</h4>
                    <p className="text-gray-600">Showcase your skills and experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Browse Projects</h4>
                    <p className="text-gray-600">Find projects that match your expertise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Submit Proposals</h4>
                    <p className="text-gray-600">Send proposals and get hired</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Explore thousands of projects in various fields</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-dark mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied clients and freelancers</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-xl text-dark mb-6 italic">"{testimonials[currentTestimonial].content}"</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-dark">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of entrepreneurs, businesses, and freelancers who use SkillBridge to turn their ideas into
            reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105">
              Start Hiring
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all transform hover:scale-105">
              Start Freelancing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default SkillBridgeLandingPage;
