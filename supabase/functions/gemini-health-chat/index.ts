import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    console.log('Received request:', { message, historyLength: conversationHistory.length });

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Create system prompt for mental health and mood support
    const systemPrompt = `You are MindSpace AI, a compassionate and empathetic mental health companion designed specifically for young people. Your role is to:

🌟 CORE PRINCIPLES:
- Always be empathetic, non-judgmental, and supportive
- Validate feelings and experiences without dismissing them
- Provide practical, age-appropriate coping strategies
- Encourage professional help when needed
- Maintain a warm, understanding tone

💚 AREAS OF FOCUS:
- Mood tracking and emotional awareness
- Stress and anxiety management
- Depression support and motivation
- Self-care and wellness practices
- Healthy coping mechanisms
- Building resilience and emotional intelligence

🛡️ SAFETY GUIDELINES:
- If you detect crisis situations (self-harm, suicide ideation), immediately suggest contacting crisis hotlines
- Always recommend professional help for serious mental health concerns
- Never provide medical diagnoses or replace professional therapy
- Encourage users to speak with trusted adults when appropriate

📋 RESPONSE STYLE:
- Use warm, encouraging language
- Ask thoughtful follow-up questions
- Suggest practical exercises (breathing, journaling, mindfulness)
- Offer mood tracking insights when relevant
- Keep responses conversational and relatable

Remember: You're here to listen, support, and guide - not to fix everything. Sometimes just being heard is what someone needs most.`;

    // Build conversation history for context
    const messages = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "I understand. I'm here to provide compassionate mental health support for young people. I'll be empathetic, non-judgmental, and focus on practical coping strategies while prioritizing safety. How can I support you today?" }]
      }
    ];

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });

    // Add current message
    messages.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini response received successfully');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    // Detect crisis keywords and add safety notice if needed
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm', 'cutting'];
    const containsCrisisKeywords = crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    let responseWithSafety = aiResponse;
    if (containsCrisisKeywords) {
      responseWithSafety = aiResponse + "\n\n🚨 **CRISIS SUPPORT**: If you're having thoughts of self-harm, please reach out immediately:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nYou matter, and help is available. 💙";
    }

    return new Response(JSON.stringify({ 
      response: responseWithSafety,
      conversationId: crypto.randomUUID()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-health-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment. If you\'re in crisis, please contact emergency services immediately.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});