// API Configuration File
// This file manages API keys and configuration settings

// In production, this would be loaded from environment variables
// For development, we're using the provided key
// IMPORTANT: Never commit API keys to version control

// Gemini API configuration
export const geminiConfig = {
  apiKey: process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyDrCahAkuxz_453I4Aue3F-KKO776MPxEk',
  model: 'gemini-2.0-flash',
  maxTokens: 1024,
  temperature: 0.7,
};

// Function to get the Gemini API key
export const getGeminiApiKey = (): string => {
  return geminiConfig.apiKey;
};

// Function to get the Gemini model name
export const getGeminiModel = (): string => {
  return geminiConfig.model;
};
