'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, ChefHat, Wine } from 'lucide-react'
import clsx from 'clsx'

export default function AIAssistant({ item }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hello. I am the Circle Sommelier & Chef Assistant. How may I guide you regarding the ${item.name}?` }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (text) => {
    if (!text.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let reply = ''
      const lowerText = text.toLowerCase()
      
      if (lowerText.includes('wine') || lowerText.includes('pair')) {
        reply = item.pairing 
          ? `For the ${item.name}, we highly recommend: ${item.pairing}. This pairing beautifully complements the dish's profile.`
          : 'Our head sommelier would be delighted to recommend a bespoke pairing for this at your table.'
      } else if (lowerText.includes('spice') || lowerText.includes('spicy')) {
        reply = item.spice 
          ? `This dish has a ${item.spice} spice level. We can adjust the heat slightly upon request.`
          : 'This dish is not notably spicy, focusing instead on deep, rich, and balanced flavours.'
      } else if (lowerText.includes('allergy') || lowerText.includes('allergies') || lowerText.includes('contain')) {
        reply = item.allergens?.length 
          ? `Please note this dish contains: ${item.allergens.join(', ')}. If you have severe allergies, please inform your server.`
          : 'This dish does not contain our primary listed allergens, but please inform us of any strict dietary requirements.'
      } else {
        reply = `The ${item.name} is one of our most exquisite offerings. As Chef Adaeze notes: ${item.chefNote || "It's a symphony of flavour."}`
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
      setIsTyping(false)
    }, 1500)
  }

  const suggestions = [
    { icon: <Wine size={14} />, text: 'Suggest a wine pairing' },
    { icon: <ChefHat size={14} />, text: "What is the Chef's note?" },
    { icon: <Sparkles size={14} />, text: 'How spicy is this?' }
  ]

  return (
    <div className="flex flex-col h-full bg-sexy-cream border border-charcoal/10 rounded-2xl overflow-hidden shadow-luxury-soft relative">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-charcoal/10 bg-white">
        <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center border border-crimson/20">
          <Sparkles size={16} className="text-crimson" />
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-charcoal tracking-wide">Circle Concierge AI</h4>
          <p className="text-[10px] text-charcoal/40 tracking-wider uppercase">Always at your service</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={clsx(
                "max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm",
                msg.role === 'assistant' 
                  ? "bg-white text-charcoal-light rounded-tl-sm border border-charcoal/5" 
                  : "bg-crimson text-white ml-auto rounded-tr-sm"
              )}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white text-charcoal-light rounded-2xl rounded-tl-sm border border-charcoal/5 p-3 w-16 flex justify-center gap-1 shadow-sm"
            >
              <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s.text)}
              className="text-xs flex items-center gap-1.5 bg-white hover:bg-charcoal/5 border border-charcoal/10 text-charcoal-light px-3 py-1.5 rounded-full transition-colors shadow-sm"
            >
              <span className="text-crimson">{s.icon}</span>
              {s.text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-charcoal/10 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask about the dish..."
            className="w-full bg-sexy-cream border border-charcoal/10 rounded-full py-3 pl-4 pr-12 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-crimson/50 transition-colors"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center text-crimson hover:bg-crimson hover:text-white disabled:opacity-50 disabled:hover:bg-crimson/10 disabled:hover:text-crimson transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
