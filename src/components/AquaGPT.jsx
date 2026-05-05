import { useState } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';

function AquaGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am AquaGPT, your AI water assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock AI Response
    setTimeout(() => {
      let aiResponse = "I'm analyzing your request...";
      if (input.toLowerCase().includes('leak')) {
        aiResponse = "I have scanned the system. There are currently 2 minor leaks detected in Block B. Maintenance ticket TK-840 has been created.";
      } else if (input.toLowerCase().includes('save')) {
        aiResponse = "You can save up to 15% more water by optimizing your dishwasher cycles and reducing garden irrigation by 5 minutes, as rain is predicted tomorrow.";
      } else if (input.toLowerCase().includes('credits')) {
        aiResponse = "You currently have 1,240.50 AquaCredits. You can sell them in the Marketplace or use them to pay your next water bill.";
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      <button
        type="button"
        className="assistant-bubble"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AquaGPT assistant' : 'Open AquaGPT assistant'}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--red-alert)', width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifycenter: 'center', border: '2px solid var(--mid-blue)' }}>
            1
          </div>
        )}
      </button>

      {isOpen && (
        <div className="assistant-panel" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="card-header bg-primary" style={{ margin: 0, padding: '1rem', borderRadius: 0 }}>
            <div className="card-title"><Bot size={20} className="text-primary" /> AquaGPT <Sparkles size={14} className="text-warning" /></div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer' }}
              aria-label="Close AquaGPT panel"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-history">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role === 'ai' ? 'msg-ai' : 'msg-user'}`}>
                <div style={{ fontSize: '0.7rem', marginBottom: '0.2rem', opacity: 0.7 }}>
                  {msg.role === 'ai' ? 'AquaGPT' : 'You'}
                </div>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="tab active" style={{ padding: '0.5rem' }} onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AquaGPT;
