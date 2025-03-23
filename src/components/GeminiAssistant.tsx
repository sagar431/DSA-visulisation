import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  getAlgorithmExplanation, 
  getOptimizationTips, 
  compareAlgorithms,
  answerCustomQuery 
} from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

// This is a placeholder for the actual Gemini API integration
// You'll need to install @google/generative-ai and add your API key
// npm install @google/generative-ai

interface GeminiAssistantProps {
  algorithm: string;
  timeComplexity: string;
  spaceComplexity: string;
}

const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const Title = styled.h3`
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AIIcon = styled.span`
  font-size: 1.5rem;
  color: #3498db;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#3498db' : '#f5f5f5'};
  }
`;

const Content = styled.div`
  line-height: 1.6;
  
  /* Markdown styling */
  h1, h2, h3, h4, h5, h6 {
    color: #2c3e50;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: 1.8rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.3em;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.3rem;
  }
  
  p {
    margin: 1em 0;
  }
  
  ul, ol {
    padding-left: 2em;
    margin: 1em 0;
  }
  
  li {
    margin: 0.5em 0;
  }
  
  code {
    background-color: #f8f9fa;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1em 0;
  }
  
  blockquote {
    border-left: 4px solid #3498db;
    padding-left: 1em;
    margin-left: 0;
    color: #7f8c8d;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  hr {
    border: 0;
    border-top: 1px solid #eee;
    margin: 1.5em 0;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  &:after {
    content: "...";
    animation: dots 1.5s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: "."; }
    40% { content: ".."; }
    60%, 100% { content: "..."; }
  }
`;

const QueryInput = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const AskButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  padding: 0 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

// Function to format the response for better readability
const formatResponse = (text: string): string => {
  // Add markdown formatting if not already present
  if (!text.includes('#') && !text.includes('**')) {
    // Split into paragraphs
    const paragraphs = text.split(/\n\s*\n/);
    
    // Add a title
    let formatted = `# ${paragraphs[0].trim()}\n\n`;
    
    // Process remaining paragraphs
    for (let i = 1; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i].trim();
      
      // Check if it's a list
      if (paragraph.match(/^\d+\.\s/m)) {
        // Numbered list
        formatted += paragraph + '\n\n';
      } else if (paragraph.match(/^[-*]\s/m)) {
        // Bullet list
        formatted += paragraph + '\n\n';
      } else if (paragraph.length < 50 && !paragraph.endsWith('.')) {
        // Likely a subtitle
        formatted += `## ${paragraph}\n\n`;
      } else {
        // Regular paragraph
        formatted += paragraph + '\n\n';
      }
    }
    
    return formatted;
  }
  
  return text;
};

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ 
  algorithm, 
  timeComplexity, 
  spaceComplexity 
}) => {
  const [activeTab, setActiveTab] = useState<string>('explain');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  // Fetch response from Gemini API
  const fetchAIResponse = async (tab: string) => {
    setLoading(true);
    
    try {
      let result = '';
      
      if (tab === 'explain') {
        result = await getAlgorithmExplanation(algorithm, timeComplexity);
      } else if (tab === 'optimize') {
        result = await getOptimizationTips(algorithm);
      } else if (tab === 'compare') {
        result = await compareAlgorithms(algorithm);
      }
      
      // Format the response for better readability
      const formattedResult = formatResponse(result);
      setResponse(formattedResult);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Sorry, I couldn't generate a response at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    fetchAIResponse(tab);
  };

  // Handle custom query
  const handleCustomQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      const result = await answerCustomQuery(algorithm, query);
      const formattedResult = formatResponse(result);
      setResponse(formattedResult);
    } catch (error) {
      console.error("Error with custom query:", error);
      setResponse("Sorry, I couldn't answer your question at this time. Please try again later.");
    } finally {
      setLoading(false);
      setQuery(''); // Clear the input after submission
    }
  };

  // Initialize with explanation on first render or when algorithm changes
  useEffect(() => {
    fetchAIResponse(activeTab);
  }, [algorithm]); // Re-fetch when algorithm changes

  return (
    <Container>
      <Title>
        <AIIcon>🤖</AIIcon>
        Gemini Algorithm Assistant
      </Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'explain'} 
          onClick={() => handleTabChange('explain')}
        >
          Explanation
        </Tab>
        <Tab 
          active={activeTab === 'optimize'} 
          onClick={() => handleTabChange('optimize')}
        >
          Optimization Tips
        </Tab>
        <Tab 
          active={activeTab === 'compare'} 
          onClick={() => handleTabChange('compare')}
        >
          Algorithm Comparison
        </Tab>
      </TabContainer>
      
      <Content>
        {loading ? (
          <LoadingIndicator>Thinking</LoadingIndicator>
        ) : (
          <ReactMarkdown>{response}</ReactMarkdown>
        )}
      </Content>
      
      <QueryInput>
        <Input 
          type="text" 
          placeholder="Ask a question about this algorithm..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCustomQuery()}
        />
        <AskButton onClick={handleCustomQuery}>Ask</AskButton>
      </QueryInput>
    </Container>
  );
};

export default GeminiAssistant;
