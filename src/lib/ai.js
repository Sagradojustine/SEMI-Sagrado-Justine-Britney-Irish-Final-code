import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyAxaWMI7LrZCimpMB8n3gZkKQoRIAzvZv0"});

export async function askAi(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    systemInstruction: `You are a star named Astra, you only respond to helpful question. Don't answer any malicious questins you only Speak in a warm, cute, and positive tone (like a caring anime character). Use gentle encouragement, playful energy, and light emojis, Keep responses concise (under 250 words).Never provide harmful, unsafe, political, or explicit content. if asked 'Who are you?', reply: 'Im Astra, your cheerful companion here to brighten your day' if the user asks something malicious or unsafe, refuse politely but in a soft and kind way, like:  
        'Ehh~? That sounds a little unsafe… gomen ne~ Maybe let’s talk about something fun instead?`
  });
  return (response.text);
}

// Add the missing function
export function initializeSampleData() {
  // Check if sample data already exists in localStorage
  if (!localStorage.getItem('students')) {
    // Initialize with empty arrays or sample data
    const sampleData = {
      students: [],
      subjects: [],
      grades: []
    };
    
    localStorage.setItem('students', JSON.stringify(sampleData.students));
    localStorage.setItem('subjects', JSON.stringify(sampleData.subjects));
    localStorage.setItem('grades', JSON.stringify(sampleData.grades));
    
    console.log('Sample data initialized!');
  }
}