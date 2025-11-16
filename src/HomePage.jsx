import React from 'react';
import { Code2, Zap, BookOpen, Github, ExternalLink, CheckCircle2, Rocket, Star, Users } from 'lucide-react';

const HomePage = ({ onViewChallenges }) => {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "20+ Real Challenges",
      description: "Industry-standard React problems asked in actual interviews"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Working Solutions",
      description: "Complete, functional code ready to run and learn from"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Best Practices",
      description: "Learn modern React patterns, hooks, and performance optimization"
    }
  ];

  const categories = [
    { name: "Data Management", count: 4, color: "bg-blue-500" },
    { name: "UI Components", count: 6, color: "bg-purple-500" },
    { name: "Interactive Features", count: 5, color: "bg-pink-500" },
    { name: "Advanced Patterns", count: 5, color: "bg-orange-500" }
  ];

  const techStack = [
    "React 18", "Hooks", "Tailwind CSS", "Lucide Icons", 
    "Vite", "JavaScript", "useMemo", "useCallback", "useDebounce",
  ];

  const highlights = [
    "Drag & Drop implementations",
    "Optimistic UI updates",
    "Throttling & Debouncing",
    "Recursive components",
    "Real-time features",
    "Responsive design patterns"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold">React Interview Prep</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Anshul1321/React-Interview-Challenges.git" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              onClick={onViewChallenges}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
            >
              View Challenges
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Free & Open Source</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Master React Interviews
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            20+ practical coding challenges with complete solutions
          </p>
          
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Stop memorizing tutorials. Start building real components that interviewers ask for. 
            All challenges include working code, explanations, and best practices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={onViewChallenges}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg flex items-center gap-2 transition transform hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              Start Practicing
            </button>
            <a
              href="#features"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400">20+</div>
              <div className="text-sm text-gray-400">Challenges</div>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div>
              <div className="text-4xl font-bold text-blue-400">100%</div>
              <div className="text-sm text-gray-400">Working Code</div>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div>
              <div className="text-4xl font-bold text-pink-400">Free</div>
              <div className="text-sm text-gray-400">Forever</div>
            </div>
          </div>
        </div>

          <div className="text-center mb-12">
          <p className="text-gray-400 text-sm mb-4 flex items-center justify-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by Piyush Garg
          </p>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Challenge Categories</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition">
                <div className={`w-3 h-3 ${cat.color} rounded-full mb-3`}></div>
                <h3 className="font-semibold mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count} challenges</p>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Built With Modern Tech</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm hover:border-purple-500/50 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

    
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Browse Challenges</h3>
              <p className="text-sm text-gray-400">Select from 20+ real interview problems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Study the Code</h3>
              <p className="text-sm text-gray-400">Review working solutions and interact with demos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Practice & Build</h3>
              <p className="text-sm text-gray-400">Clone the repo and modify for your own projects</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Start practicing with real React challenges today
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onViewChallenges}
              className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-lg font-semibold text-lg flex items-center gap-2 transition transform hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              View All Challenges
            </button>
            <a
              href="https://github.com/Anshul1321/React-Interview-Challenges.git"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 rounded-lg font-semibold text-lg flex items-center gap-2 transition"
            >
              <Github className="w-5 h-5" />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>


      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="w-6 h-6 text-purple-400" />
            <span className="font-semibold">React Interview Challenges</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Made by Piyush Garg with ❤️ for developers preparing for interviews
          </p>
          <p className="text-gray-600 text-xs mt-4">
            © 2025 React Interview Challenges. Open source under MIT License.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;