import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface QuickSortCodeProps {
  currentLineNumber: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const highlight = keyframes`
  0% {
    background-color: rgba(97, 175, 239, 0.1);
  }
  50% {
    background-color: rgba(97, 175, 239, 0.3);
  }
  100% {
    background-color: rgba(97, 175, 239, 0.2);
  }
`;

const CodeContainer = styled.div`
  background-color: #282c34;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  overflow-x: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: ${fadeIn} 0.5s ease;
  
  &::before {
    content: 'QuickSort Algorithm';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 25px;
    background-color: #21252b;
    color: #abb2bf;
    font-weight: bold;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid #181a1f;
  }
  
  padding-top: 50px;
`;

const CodeBlock = styled.pre`
  margin: 0;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 15px;
  line-height: 1.6;
  color: #abb2bf;
  tab-size: 4;
`;

const CodeLine = styled.div<{ isActive: boolean }>`
  padding: 2px 10px;
  margin: 2px 0;
  border-radius: 6px;
  background-color: ${props => props.isActive ? 'rgba(97, 175, 239, 0.2)' : 'transparent'};
  border-left: ${props => props.isActive ? '3px solid #61afef' : '3px solid transparent'};
  padding-left: ${props => props.isActive ? '7px' : '10px'};
  transition: all 0.3s ease;
  
  ${props => props.isActive && css`animation: ${highlight} 2s infinite;`}
  
  &:hover {
    background-color: rgba(97, 175, 239, 0.1);
  }
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 30px;
  color: #636d83;
  user-select: none;
  text-align: right;
  margin-right: 12px;
  opacity: 0.6;
`;

const Keyword = styled.span`
  color: #c678dd;
  font-weight: bold;
`;

const Function = styled.span`
  color: #61afef;
`;

const Comment = styled.span`
  color: #98c379;
  font-style: italic;
`;

const String = styled.span`
  color: #e5c07b;
`;

const Operator = styled.span`
  color: #56b6c2;
`;

const Variable = styled.span`
  color: #e06c75;
`;

const Bracket = styled.span`
  color: #d19a66;
`;

const AlgorithmExplanation = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
`;

const ExplanationTitle = styled.h3`
  color: #3498db;
  margin-top: 0;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

const ExplanationText = styled.p`
  line-height: 1.6;
  color: #34495e;
`;

const TimeComplexityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background-color: #3498db;
  color: white;
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f7fa;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-top: 1px solid #ecf0f1;
`;

const QuickSortCode: React.FC<QuickSortCodeProps> = ({ currentLineNumber }) => {
  // Define the code lines with syntax highlighting
  const codeLines = [
    <><LineNumber>1</LineNumber><Keyword>function</Keyword> <Function>quickSort</Function>(<Variable>array</Variable>) <Bracket>{'{'}</Bracket></>,
    <><LineNumber>2</LineNumber>  <Keyword>if</Keyword> (<Variable>array</Variable>.length &lt;= <String>1</String>) <Keyword>return</Keyword> <Variable>array</Variable>;</>,
    <><LineNumber>3</LineNumber>  <Keyword>return</Keyword> <Function>quickSortHelper</Function>(<Variable>array</Variable>, <String>0</String>, <Variable>array</Variable>.length - <String>1</String>);</>,
    <><LineNumber>4</LineNumber><Bracket>{'}'}</Bracket></>,
    <><LineNumber>5</LineNumber></>,
    <><LineNumber>6</LineNumber><Keyword>function</Keyword> <Function>quickSortHelper</Function>(<Variable>array</Variable>, <Variable>low</Variable>, <Variable>high</Variable>) <Bracket>{'{'}</Bracket></>,
    <><LineNumber>7</LineNumber>  <Keyword>if</Keyword> (<Variable>low</Variable> &lt; <Variable>high</Variable>) <Bracket>{'{'}</Bracket></>,
    <><LineNumber>8</LineNumber>    <Keyword>const</Keyword> <Variable>pivotIndex</Variable> = <Function>partition</Function>(<Variable>array</Variable>, <Variable>low</Variable>, <Variable>high</Variable>);</>,
    <><LineNumber>9</LineNumber>    <Function>quickSortHelper</Function>(<Variable>array</Variable>, <Variable>low</Variable>, <Variable>pivotIndex</Variable> - <String>1</String>); <Comment>// Sort left part</Comment></>,
    <><LineNumber>10</LineNumber>    <Function>quickSortHelper</Function>(<Variable>array</Variable>, <Variable>pivotIndex</Variable> + <String>1</String>, <Variable>high</Variable>); <Comment>// Sort right part</Comment></>,
    <><LineNumber>11</LineNumber>  <Bracket>{'}'}</Bracket></>,
    <><LineNumber>12</LineNumber>  <Keyword>return</Keyword> <Variable>array</Variable>;</>,
    <><LineNumber>13</LineNumber><Bracket>{'}'}</Bracket></>,
    <><LineNumber>14</LineNumber></>,
    <><LineNumber>15</LineNumber><Keyword>function</Keyword> <Function>partition</Function>(<Variable>array</Variable>, <Variable>low</Variable>, <Variable>high</Variable>) <Bracket>{'{'}</Bracket></>,
    <><LineNumber>16</LineNumber>  <Keyword>const</Keyword> <Variable>pivot</Variable> = <Variable>array</Variable>[<Variable>high</Variable>]; <Comment>// Choose the rightmost element as pivot</Comment></>,
    <><LineNumber>17</LineNumber>  <Keyword>let</Keyword> <Variable>i</Variable> = <Variable>low</Variable> - <String>1</String>; <Comment>// Index of smaller element</Comment></>,
    <><LineNumber>18</LineNumber></>,
    <><LineNumber>19</LineNumber>  <Keyword>for</Keyword> (<Keyword>let</Keyword> <Variable>j</Variable> = <Variable>low</Variable>; <Variable>j</Variable> &lt; <Variable>high</Variable>; <Variable>j</Variable>++) <Bracket>{'{'}</Bracket></>,
    <><LineNumber>20</LineNumber>    <Comment>// If current element is smaller than the pivot</Comment></>,
    <><LineNumber>21</LineNumber>    <Keyword>if</Keyword> (<Variable>array</Variable>[<Variable>j</Variable>] &lt; <Variable>pivot</Variable>) <Bracket>{'{'}</Bracket></>,
    <><LineNumber>22</LineNumber>      <Variable>i</Variable>++; <Comment>// Increment index of smaller element</Comment></>,
    <><LineNumber>23</LineNumber>      [<Variable>array</Variable>[<Variable>i</Variable>], <Variable>array</Variable>[<Variable>j</Variable>]] = [<Variable>array</Variable>[<Variable>j</Variable>], <Variable>array</Variable>[<Variable>i</Variable>]]; <Comment>// Swap elements</Comment></>,
    <><LineNumber>24</LineNumber>    <Bracket>{'}'}</Bracket></>,
    <><LineNumber>25</LineNumber>  <Bracket>{'}'}</Bracket></>,
    <><LineNumber>26</LineNumber></>,
    <><LineNumber>27</LineNumber>  [<Variable>array</Variable>[<Variable>i</Variable> + <String>1</String>], <Variable>array</Variable>[<Variable>high</Variable>]] = [<Variable>array</Variable>[<Variable>high</Variable>], <Variable>array</Variable>[<Variable>i</Variable> + <String>1</String>]]; <Comment>// Swap pivot to its final position</Comment></>,
    <><LineNumber>28</LineNumber>  <Keyword>return</Keyword> <Variable>i</Variable> + <String>1</String>; <Comment>// Return the pivot index</Comment></>,
    <><LineNumber>29</LineNumber><Bracket>{'}'}</Bracket></>,
  ];

  return (
    <>
      <CodeContainer>
        <CodeBlock>
          {codeLines.map((line, index) => (
            <CodeLine key={index} isActive={index + 1 === currentLineNumber}>
              {line}
            </CodeLine>
          ))}
        </CodeBlock>
      </CodeContainer>
      
      <AlgorithmExplanation>
        <ExplanationTitle>How QuickSort Works</ExplanationTitle>
        <ExplanationText>
          QuickSort is a divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around the pivot.
        </ExplanationText>
        <ExplanationText>
          <strong>The key steps are:</strong>
          <ol>
            <li>Choose a pivot element from the array (usually the last element)</li>
            <li>Partition the array so that elements smaller than the pivot are on the left, and elements greater than the pivot are on the right</li>
            <li>Recursively apply the above steps to the sub-arrays on the left and right of the pivot</li>
          </ol>
        </ExplanationText>
        
        <ExplanationTitle>Time and Space Complexity</ExplanationTitle>
        <TimeComplexityTable>
          <thead>
            <tr>
              <TableHeader>Case</TableHeader>
              <TableHeader>Time Complexity</TableHeader>
              <TableHeader>When it occurs</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell><strong>Best Case</strong></TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>When the pivot divides the array into roughly equal halves</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Average Case</strong></TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>Expected performance on random data</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Worst Case</strong></TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>When the array is already sorted or reverse sorted</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Space Complexity</strong></TableCell>
              <TableCell>O(log n)</TableCell>
              <TableCell>Due to the recursive call stack</TableCell>
            </TableRow>
          </tbody>
        </TimeComplexityTable>
      </AlgorithmExplanation>
    </>
  );
};

export default QuickSortCode;