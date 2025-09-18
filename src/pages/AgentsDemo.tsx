import React from 'react';
import GlassCard from '@/components/GlassCard';
import CommentsBox from '@/components/CommentsBox';

const AgentsDemo: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Agents Feature Demo
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            This page demonstrates the real-time comments system that allows users to interact 
            with the application and potentially with automated agents.
          </p>
        </div>

        <div className="space-y-8">
          {/* Feature Overview */}
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">How the Agents Feature Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">🔄 Real-time Comments</h3>
                <p className="text-white/70">
                  Users can submit comments that are instantly stored in a PostgreSQL database 
                  and displayed to all visitors in real-time.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">🤖 Agent Integration Ready</h3>
                <p className="text-white/70">
                  The system is designed to support automated agents that can respond to 
                  user comments, provide information, or trigger workflows.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">💾 Persistent Storage</h3>
                <p className="text-white/70">
                  All comments are stored with timestamps and can be retrieved, 
                  making it suitable for customer support and feedback collection.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">🎨 Seamless Design</h3>
                <p className="text-white/70">
                  The glassmorphism design integrates beautifully with the TD Studios 
                  aesthetic while providing excellent user experience.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Technical Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'React', 'TypeScript', 'PostgreSQL', 'Vercel Functions', 
                  'REST API', 'Tailwind CSS', 'Real-time Updates'
                ].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Live Demo */}
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Live Demo
            </h2>
            <p className="text-white/60 text-center mb-8">
              Try the comments system below. Your comment will be visible to all users immediately.
            </p>
            
            <CommentsBox />
          </GlassCard>

          {/* API Information */}
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">API Endpoints</h2>
            
            <div className="space-y-6">
              <div className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm font-mono">
                    POST
                  </span>
                  <code className="text-white font-mono">/api/comments</code>
                </div>
                <p className="text-white/70 mb-3">Submit a new comment</p>
                <pre className="bg-black/40 rounded p-3 text-sm text-white/80 overflow-x-auto">
{`{
  "comment": "Your comment text here"
}`}
                </pre>
              </div>

              <div className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm font-mono">
                    GET
                  </span>
                  <code className="text-white font-mono">/api/comments</code>
                </div>
                <p className="text-white/70 mb-3">Retrieve all comments (latest 100)</p>
                <pre className="bg-black/40 rounded p-3 text-sm text-white/80 overflow-x-auto">
{`{
  "items": [
    {
      "id": 1,
      "comment": "Great feature!",
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </GlassCard>

          {/* Future Enhancements */}
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Future Agent Capabilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "AI Customer Support",
                  description: "Automated responses to common questions using natural language processing"
                },
                {
                  title: "Smart Notifications",
                  description: "Intelligent alerting system for urgent comments or specific keywords"
                },
                {
                  title: "Sentiment Analysis",
                  description: "Automatic categorization of comments by sentiment and priority"
                },
                {
                  title: "Workflow Automation",
                  description: "Trigger business processes based on comment content or patterns"
                },
                {
                  title: "Multi-channel Integration",
                  description: "Connect comments to email, Slack, or other communication platforms"
                },
                {
                  title: "Advanced Moderation",
                  description: "Automated content filtering and spam detection capabilities"
                }
              ].map((feature, index) => (
                <div key={index} className="border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AgentsDemo;