import React from 'react';
import styled, { keyframes } from 'styled-components';

interface MergeSortCodeProps {
  currentStepIndex: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CodeContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  animation: ${fadeIn} 0.5s ease;
  overflow: auto;
`;

const CodeTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const CodeBlock = styled.pre`
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  position: relative;
`;

const CodeLine = styled.div<{ active: boolean; secondary?: boolean }>`
  padding: 2px 8px;
  margin: 2px 0;
  border-radius: 4px;
  background-color: ${props => 
    props.active ? '#3498db20' : 
    props.secondary ? '#2ecc7120' : 
    'transparent'
  };
  border-left: 3px solid ${props => 
    props.active ? '#3498db' : 
    props.secondary ? '#2ecc71' : 
    'transparent'
  };
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Comment = styled.span`
  color: #7f8c8d;
`;

const Keyword = styled.span`
  color: #8e44ad;
  font-weight: bold;
`;

const Function = styled.span`
  color: #3498db;
  font-weight: bold;
`;

const Variable = styled.span`
  color: #e74c3c;
`;

const Operator = styled.span`
  color: #2c3e50;
`;

const Value = styled.span`
  color: #27ae60;
`;

const MergeSortCode: React.FC<MergeSortCodeProps> = ({ currentStepIndex }) => {
  // Define which lines should be highlighted based on the current step
  const getHighlightedLines = (stepIndex: number): { active: number[]; secondary: number[] } => {
    // Default: no highlighted lines
    if (stepIndex === -1) return { active: [], secondary: [] };
    
    // Map step index ranges to line numbers
    // These ranges are approximate and should be adjusted based on the actual algorithm steps
    if (stepIndex < 5) return { active: [1, 2, 3, 4, 5], secondary: [] }; // Initial setup
    if (stepIndex < 10) return { active: [8, 9, 10, 11, 12], secondary: [] }; // Divide step
    if (stepIndex < 15) return { active: [15, 16, 17], secondary: [] }; // Recursive left call
    if (stepIndex < 20) return { active: [20, 21, 22], secondary: [] }; // Recursive right call
    if (stepIndex < 25) return { active: [25, 26, 27, 28, 29], secondary: [] }; // Merge setup
    if (stepIndex < 30) return { active: [32, 33, 34, 35, 36], secondary: [37, 38, 39] }; // Merge comparison
    if (stepIndex < 35) return { active: [42, 43, 44, 45], secondary: [] }; // Copy remaining left
    if (stepIndex < 40) return { active: [48, 49, 50, 51], secondary: [] }; // Copy remaining right
    
    return { active: [54, 55, 56], secondary: [] }; // Final steps
  };
  
  const { active, secondary } = getHighlightedLines(currentStepIndex);
  
  return (
    <CodeContainer>
      <CodeTitle>Merge Sort Algorithm</CodeTitle>
      <CodeBlock>
        <CodeLine active={active.includes(1)} secondary={secondary.includes(1)}>
          <Function>mergeSort</Function>(<Variable>array</Variable>, <Variable>start</Variable>, <Variable>end</Variable>):
        </CodeLine>
        <CodeLine active={active.includes(2)} secondary={secondary.includes(2)}>
          <Comment>// Base case: if the subarray has 1 or 0 elements</Comment>
        </CodeLine>
        <CodeLine active={active.includes(3)} secondary={secondary.includes(3)}>
          <Keyword>if</Keyword> <Variable>start</Variable> <Operator>&#62;=</Operator> <Variable>end</Variable>:
        </CodeLine>
        <CodeLine active={active.includes(4)} secondary={secondary.includes(4)}>
          <Keyword>return</Keyword> <Comment>// Already sorted</Comment>
        </CodeLine>
        <CodeLine active={active.includes(5)} secondary={secondary.includes(5)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(6)} secondary={secondary.includes(6)}>
          <Comment>// Find the middle point to divide the array into two halves</Comment>
        </CodeLine>
        <CodeLine active={active.includes(7)} secondary={secondary.includes(7)}>
          <Variable>mid</Variable> <Operator>=</Operator> <Function>Math.floor</Function>((<Variable>start</Variable> <Operator>+</Operator> <Variable>end</Variable>) <Operator>/</Operator> <Value>2</Value>)
        </CodeLine>
        <CodeLine active={active.includes(8)} secondary={secondary.includes(8)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(9)} secondary={secondary.includes(9)}>
          <Comment>// Divide step: Split the array into two halves</Comment>
        </CodeLine>
        <CodeLine active={active.includes(10)} secondary={secondary.includes(10)}>
          <Variable>leftArray</Variable> <Operator>=</Operator> <Variable>array</Variable>[<Variable>start</Variable>...<Variable>mid</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(11)} secondary={secondary.includes(11)}>
          <Variable>rightArray</Variable> <Operator>=</Operator> <Variable>array</Variable>[<Variable>mid</Variable><Operator>+</Operator><Value>1</Value>...<Variable>end</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(12)} secondary={secondary.includes(12)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(13)} secondary={secondary.includes(13)}>
          <Comment>// Conquer step: Recursively sort the two halves</Comment>
        </CodeLine>
        <CodeLine active={active.includes(14)} secondary={secondary.includes(14)}>
          <Comment>// Sort the left half</Comment>
        </CodeLine>
        <CodeLine active={active.includes(15)} secondary={secondary.includes(15)}>
          <Function>mergeSort</Function>(<Variable>array</Variable>, <Variable>start</Variable>, <Variable>mid</Variable>)
        </CodeLine>
        <CodeLine active={active.includes(16)} secondary={secondary.includes(16)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(17)} secondary={secondary.includes(17)}>
          <Comment>// Sort the right half</Comment>
        </CodeLine>
        <CodeLine active={active.includes(18)} secondary={secondary.includes(18)}>
          <Function>mergeSort</Function>(<Variable>array</Variable>, <Variable>mid</Variable> <Operator>+</Operator> <Value>1</Value>, <Variable>end</Variable>)
        </CodeLine>
        <CodeLine active={active.includes(19)} secondary={secondary.includes(19)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(20)} secondary={secondary.includes(20)}>
          <Comment>// Combine step: Merge the sorted halves</Comment>
        </CodeLine>
        <CodeLine active={active.includes(21)} secondary={secondary.includes(21)}>
          <Function>merge</Function>(<Variable>array</Variable>, <Variable>start</Variable>, <Variable>mid</Variable>, <Variable>end</Variable>)
        </CodeLine>
        <CodeLine active={active.includes(22)} secondary={secondary.includes(22)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(23)} secondary={secondary.includes(23)}>
          <Function>merge</Function>(<Variable>array</Variable>, <Variable>start</Variable>, <Variable>mid</Variable>, <Variable>end</Variable>):
        </CodeLine>
        <CodeLine active={active.includes(24)} secondary={secondary.includes(24)}>
          <Comment>// Create temporary arrays</Comment>
        </CodeLine>
        <CodeLine active={active.includes(25)} secondary={secondary.includes(25)}>
          <Variable>leftArray</Variable> <Operator>=</Operator> <Variable>array</Variable>[<Variable>start</Variable>...<Variable>mid</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(26)} secondary={secondary.includes(26)}>
          <Variable>rightArray</Variable> <Operator>=</Operator> <Variable>array</Variable>[<Variable>mid</Variable><Operator>+</Operator><Value>1</Value>...<Variable>end</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(27)} secondary={secondary.includes(27)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(28)} secondary={secondary.includes(28)}>
          <Variable>i</Variable> <Operator>=</Operator> <Value>0</Value> <Comment>// Initial index of left subarray</Comment>
        </CodeLine>
        <CodeLine active={active.includes(29)} secondary={secondary.includes(29)}>
          <Variable>j</Variable> <Operator>=</Operator> <Value>0</Value> <Comment>// Initial index of right subarray</Comment>
        </CodeLine>
        <CodeLine active={active.includes(30)} secondary={secondary.includes(30)}>
          <Variable>k</Variable> <Operator>=</Operator> <Variable>start</Variable> <Comment>// Initial index of merged subarray</Comment>
        </CodeLine>
        <CodeLine active={active.includes(31)} secondary={secondary.includes(31)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(32)} secondary={secondary.includes(32)}>
          <Comment>// Merge the temp arrays back into array[start...end]</Comment>
        </CodeLine>
        <CodeLine active={active.includes(33)} secondary={secondary.includes(33)}>
          <Keyword>while</Keyword> <Variable>i</Variable> <Operator>&lt;</Operator> <Variable>leftArray.length</Variable> <Keyword>and</Keyword> <Variable>j</Variable> <Operator>&lt;</Operator> <Variable>rightArray.length</Variable>:
        </CodeLine>
        <CodeLine active={active.includes(34)} secondary={secondary.includes(34)}>
          <Comment>// Compare elements from both arrays and place the smaller one</Comment>
        </CodeLine>
        <CodeLine active={active.includes(35)} secondary={secondary.includes(35)}>
          <Keyword>if</Keyword> <Variable>leftArray</Variable>[<Variable>i</Variable>] <Operator>&#60;=</Operator> <Variable>rightArray</Variable>[<Variable>j</Variable>]:
        </CodeLine>
        <CodeLine active={active.includes(36)} secondary={secondary.includes(36)}>
          <Variable>array</Variable>[<Variable>k</Variable>] <Operator>=</Operator> <Variable>leftArray</Variable>[<Variable>i</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(37)} secondary={secondary.includes(37)}>
          <Variable>i</Variable> <Operator>=</Operator> <Variable>i</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(38)} secondary={secondary.includes(38)}>
          <Keyword>else</Keyword>:
        </CodeLine>
        <CodeLine active={active.includes(39)} secondary={secondary.includes(39)}>
          <Variable>array</Variable>[<Variable>k</Variable>] <Operator>=</Operator> <Variable>rightArray</Variable>[<Variable>j</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(40)} secondary={secondary.includes(40)}>
          <Variable>j</Variable> <Operator>=</Operator> <Variable>j</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(41)} secondary={secondary.includes(41)}>
          <Variable>k</Variable> <Operator>=</Operator> <Variable>k</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(42)} secondary={secondary.includes(42)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(43)} secondary={secondary.includes(43)}>
          <Comment>// Copy remaining elements of leftArray, if any</Comment>
        </CodeLine>
        <CodeLine active={active.includes(44)} secondary={secondary.includes(44)}>
          <Keyword>while</Keyword> <Variable>i</Variable> <Operator>&lt;</Operator> <Variable>leftArray.length</Variable>:
        </CodeLine>
        <CodeLine active={active.includes(45)} secondary={secondary.includes(45)}>
          <Variable>array</Variable>[<Variable>k</Variable>] <Operator>=</Operator> <Variable>leftArray</Variable>[<Variable>i</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(46)} secondary={secondary.includes(46)}>
          <Variable>i</Variable> <Operator>=</Operator> <Variable>i</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(47)} secondary={secondary.includes(47)}>
          <Variable>k</Variable> <Operator>=</Operator> <Variable>k</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(48)} secondary={secondary.includes(48)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(49)} secondary={secondary.includes(49)}>
          <Comment>// Copy remaining elements of rightArray, if any</Comment>
        </CodeLine>
        <CodeLine active={active.includes(50)} secondary={secondary.includes(50)}>
          <Keyword>while</Keyword> <Variable>j</Variable> <Operator>&lt;</Operator> <Variable>rightArray.length</Variable>:
        </CodeLine>
        <CodeLine active={active.includes(51)} secondary={secondary.includes(51)}>
          <Variable>array</Variable>[<Variable>k</Variable>] <Operator>=</Operator> <Variable>rightArray</Variable>[<Variable>j</Variable>]
        </CodeLine>
        <CodeLine active={active.includes(52)} secondary={secondary.includes(52)}>
          <Variable>j</Variable> <Operator>=</Operator> <Variable>j</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(53)} secondary={secondary.includes(53)}>
          <Variable>k</Variable> <Operator>=</Operator> <Variable>k</Variable> <Operator>+</Operator> <Value>1</Value>
        </CodeLine>
        <CodeLine active={active.includes(54)} secondary={secondary.includes(54)}>
          &nbsp;
        </CodeLine>
        <CodeLine active={active.includes(55)} secondary={secondary.includes(55)}>
          <Comment>// At this point, the subarray array[start...end] is sorted</Comment>
        </CodeLine>
        <CodeLine active={active.includes(56)} secondary={secondary.includes(56)}>
          <Keyword>return</Keyword> <Variable>array</Variable>
        </CodeLine>
      </CodeBlock>
    </CodeContainer>
  );
};

export default MergeSortCode;
