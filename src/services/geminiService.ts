import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiApiKey } from "../config/apiConfig";

// Initialize the API with the key from config
const API_KEY = getGeminiApiKey();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to get algorithm explanation
export async function getAlgorithmExplanation(algorithm: string, complexity: string) {
  const prompt = `Explain the ${algorithm} algorithm in simple terms. Include its time complexity of ${complexity} and why it works that way.`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate an explanation at this time.";
  }
}

// Function to get optimization tips
export async function getOptimizationTips(algorithm: string) {
  const prompt = `What are some optimization techniques for the ${algorithm} algorithm? Provide 3-5 specific tips.`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate optimization tips at this time.";
  }
}

// Function to compare algorithms
export async function compareAlgorithms(algorithm: string) {
  const prompt = `Compare ${algorithm} with other similar algorithms. Include time/space complexity differences and scenarios where each performs best.`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate a comparison at this time.";
  }
}

// Function to answer custom questions about algorithms
export async function answerCustomQuery(algorithm: string, query: string) {
  const prompt = `Regarding the ${algorithm} algorithm: ${query}`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't answer your question at this time.";
  }
}

// Function to generate code in different programming languages
export async function generateCodeInLanguage(algorithm: string, language: string) {
  const prompt = `Write an implementation of the ${algorithm} algorithm in ${language}. Include comments explaining the key steps.`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate code at this time.";
  }
}

// Function to find real-world applications
export async function findRealWorldApplications(algorithm: string) {
  const prompt = `Explain 5 specific real-world applications where the ${algorithm} algorithm is used in production systems or software.`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate applications at this time.";
  }
}
