import React, { useState } from 'react';
import styled from 'styled-components';
import { generateCodeInLanguage } from '../services/geminiService';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface GeminiCodeGeneratorProps {
  algorithm: string;
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

const CodeIcon = styled.span`
  font-size: 1.5rem;
  color: #3498db;
`;

const LanguageSelector = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#3498db' : '#ddd'};
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#3498db' : '#f5f5f5'};
    border-color: #3498db;
  }
`;

const CodeContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
`;

const ExplanationContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const ExplanationTitle = styled.h4`
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 10px;
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

const GenerateButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Map of programming languages to their syntax highlighter identifiers
const languageMap: Record<string, string> = {
  'python': 'python',
  'javascript': 'javascript',
  'typescript': 'typescript',
  'java': 'java',
  'c++': 'cpp',
  'go': 'go',
  'rust': 'rust',
  'c#': 'csharp'
};

// Function to extract code blocks from Gemini API response
const extractCodeAndExplanation = (response: string): { code: string; explanation: string } => {
  // Default return values
  let code = response;
  let explanation = '';
  
  // Check if response has markdown code blocks
  const codeBlockRegex = /```(?:\w+)?\s*\n([\s\S]*?)```/;
  const match = response.match(codeBlockRegex);
  
  if (match && match[1]) {
    // Extract the first code block
    code = match[1].trim();
    
    // Extract explanation (text before and after code blocks)
    const parts = response.split('```');
    // Parts at even indices (0, 2, 4, etc.) are explanation text
    explanation = [parts[0], ...(parts.length > 2 ? [parts[parts.length - 1]] : [])]
      .filter(part => part.trim())
      .join('\n')
      .trim();
  } else {
    // If no code blocks are found, try to identify code by indentation or patterns
    const lines = response.split('\n');
    const codeLines: string[] = [];
    const explanationLines: string[] = [];
    
    let inCodeBlock = false;
    
    for (const line of lines) {
      // Heuristic: lines that look like code (indented, have special characters, etc.)
      const isCodeLine = line.startsWith('    ') || 
                         line.includes(';') || 
                         line.includes('=') || 
                         /\bfunction\b|\bclass\b|\bdef\b|\bif\b|\bfor\b|\bwhile\b/.test(line);
      
      if (isCodeLine) {
        inCodeBlock = true;
        codeLines.push(line);
      } else {
        if (inCodeBlock && line.trim() === '') {
          // Empty line within code block
          codeLines.push(line);
        } else {
          inCodeBlock = false;
          explanationLines.push(line);
        }
      }
    }
    
    if (codeLines.length > 0) {
      code = codeLines.join('\n');
      explanation = explanationLines.join('\n');
    }
  }
  
  return { code, explanation };
};

const GeminiCodeGenerator: React.FC<GeminiCodeGeneratorProps> = ({ algorithm }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Generate code using Gemini API
  const handleGenerateCode = async () => {
    setLoading(true);
    
    try {
      const response = await generateCodeInLanguage(algorithm, selectedLanguage);
      const { code, explanation } = extractCodeAndExplanation(response);
      
      setGeneratedCode(code);
      setExplanation(explanation);
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode("Sorry, I couldn't generate code at this time. Please try again later.");
      setExplanation("");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Title>
        <CodeIcon>💻</CodeIcon>
        Algorithm Implementation Generator
      </Title>
      
      <p>Generate {algorithm} implementation in different programming languages using Gemini AI</p>
      
      <LanguageSelector>
        {Object.keys(languageMap).map(lang => (
          <LanguageButton 
            key={lang}
            active={selectedLanguage === lang}
            onClick={() => setSelectedLanguage(lang)}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </LanguageButton>
        ))}
      </LanguageSelector>
      
      <GenerateButton 
        onClick={handleGenerateCode}
        disabled={loading}
      >
        {loading ? 'Generating...' : `Generate ${algorithm} in ${selectedLanguage}`}
      </GenerateButton>
      
      {loading ? (
        <LoadingIndicator>Generating code</LoadingIndicator>
      ) : generatedCode ? (
        <>
          <CodeContainer>
            <SyntaxHighlighter 
              language={languageMap[selectedLanguage]}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{ fontSize: '14px', borderRadius: '8px' }}
            >
              {generatedCode}
            </SyntaxHighlighter>
          </CodeContainer>
          
          {explanation && (
            <ExplanationContainer>
              <ExplanationTitle>Code Explanation</ExplanationTitle>
              <div>{explanation.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}</div>
            </ExplanationContainer>
          )}
        </>
      ) : null}
    </Container>
  );
};

export default GeminiCodeGenerator;
