
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize, Maximize, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { 
      role: 'assistant', 
      content: "Hi there! I'm Utkarsh's AI assistant. Ask me anything about his skills, projects, or experience, and I'll do my best to help you!" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const apiKey = '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';

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Set typing indicator
    setIsTyping(true);
    
    try {
      // Using Nvidia API endpoint with correct URL
      const response = await fetch('https://api.nvcf.nvidia.com/v2/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistralai/mixtral-8x7b-instruct-v0.1',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant for Utkarsh Barad, a Python and Full Stack Developer. 
              Utkarsh is studying BSC-CS/IT at Silver Oak University. 
              He is proficient in Python, web development, and stays updated with emerging technologies.
              His GitHub is https://github.com/utkarshbhai007 and LinkedIn is https://linkedin.com/in/utkarsh-barad.
              Only answer questions related to Utkarsh, his skills, experience, or general programming topics.
              Keep responses concise and helpful.`
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment." 
      }]);
      toast({
        title: "Connection Error",
        description: "Couldn't connect to the AI service. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
      
      {/* Chat container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: minimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${minimized ? 'bottom-6 right-6 w-72' : 'bottom-8 right-8 w-80 sm:w-96'} bg-background border border-border rounded-lg shadow-xl overflow-hidden z-50`}
          >
            {/* Header */}
            <div className="bg-primary p-3 text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/lovable-uploads/57de046a-f571-4b59-b9a2-90a7a9353858.png" alt="Utkarsh" />
                  <AvatarFallback>UB</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">Utkarsh's Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                {minimized ? (
                  <Button variant="ghost" size="icon" onClick={() => setMinimized(false)} className="h-7 w-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80">
                    <Maximize size={14} />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setMinimized(true)} className="h-7 w-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80">
                    <Minimize size={14} />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80">
                  <X size={14} />
                </Button>
              </div>
            </div>

            {/* Minimized Content */}
            {minimized ? (
              <div className="p-3">
                <p className="text-sm">Chat with Utkarsh's AI assistant</p>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="p-4 overflow-y-auto h-[372px] bg-secondary/10">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'} rounded-lg px-3 py-2 shadow-sm`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-secondary rounded-lg px-4 py-2 shadow-sm">
                          <div className="flex space-x-1 items-center">
                            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input */}
                <div className="p-3 border-t border-border bg-background">
                  <div className="flex items-center gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me anything about Utkarsh..."
                      className="flex-1 resize-none bg-secondary/20 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm min-h-[40px] max-h-20"
                      rows={1}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isTyping}
                      className="shrink-0"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
