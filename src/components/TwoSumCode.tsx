import React from 'react';
import styled from 'styled-components';

interface TwoSumCodeProps {
  currentStepIndex: number;
  steps: any[];
}

const CodeContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CodeHeader = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CodeTitle = styled.div`
  font-size: 18px;
`;

const LanguageTag = styled.div`
  background-color: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const CodeContent = styled.pre`
  margin: 0;
  padding: 20px;
  overflow: auto;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f8f8f8;
  border: none;
  height: 100%;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CodeLine = styled.div<{ highlight: boolean }>`
  padding: 2px 0;
  counter-increment: line;
  display: flex;
  
  &::before {
    content: counter(line);
    display: inline-block;
    width: 2em;
    padding-right: 1em;
    margin-right: 1em;
    text-align: right;
    color: #999;
    border-right: 1px solid #ddd;
  }
  
  background-color: ${props => props.highlight ? 'rgba(52, 152, 219, 0.2)' : 'transparent'};
`;

const TwoSumCode: React.FC<TwoSumCodeProps> = ({ currentStepIndex, steps }) => {
  // Determine which lines to highlight based on the current step
  const getHighlightedLines = (): Record<number, boolean> => {
    if (steps.length === 0 || currentStepIndex === -1) {
      return {};
    }

    const step = steps[currentStepIndex];
    
    if (step.currentIndex !== undefined) {
      if (step.foundPair) {
        return { 17: true, 18: true, 19: true };
      } else if (step.checking) {
        return { 14: true, 15: true, 16: true };
      } else if (step.complementIndex !== undefined) {
        return { 14: true, 15: true, 16: true };
      } else {
        return { 11: true, 12: true, 13: true };
      }
    } else if (step.checkedIndices && step.checkedIndices.length > 0) {
      return { 21: true, 22: true };
    } else {
      return { 5: true, 6: true, 7: true, 8: true };
    }
  };

  // Split code into lines for rendering with line numbers
  const twoSumCode = `def two_sum(nums, target):
    """
    Find two numbers in the array that add up to the target.
    
    Args:
        nums: List of integers
        target: Integer target sum
        
    Returns:
        Tuple of indices of the two numbers that add up to target, or None if no solution
    """
    # Create a dictionary to store value -> index
    num_map = {}
    
    # Iterate through each number in the array
    for i, num in enumerate(nums):
        # Calculate the complement needed to reach target
        complement = target - num
        
        # Check if complement exists in map
        if complement in num_map:
            # Found a pair that sums to target
            return (num_map[complement], i)
        
        # Add current number to map
        num_map[num] = i
    
    # If no solution found
    return None`;

  const codeLines = twoSumCode.split('\n');
  const highlightedLines = getHighlightedLines();

  return (
    <CodeContainer>
      <CodeHeader>
        <CodeTitle>Two Sum Algorithm</CodeTitle>
        <LanguageTag>Python</LanguageTag>
      </CodeHeader>
      <CodeContent>
        {codeLines.map((line, index) => (
          <CodeLine 
            key={index} 
            highlight={Boolean(highlightedLines[index + 1])}
          >
            {line}
          </CodeLine>
        ))}
      </CodeContent>
    </CodeContainer>
  );
};

export default TwoSumCode;
