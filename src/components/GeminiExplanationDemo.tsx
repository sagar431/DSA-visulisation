import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
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

const Content = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
`;

const Highlight = styled.span`
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: #e74c3c;
`;

const Step = styled.div`
  margin-bottom: 16px;
  padding-left: 20px;
  border-left: 3px solid #3498db;
`;

const StepNumber = styled.span`
  display: inline-block;
  background-color: #3498db;
  color: white;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 50%;
  margin-right: 8px;
  font-weight: bold;
`;

const Visualization = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const SubSectionTitle = styled.h3`
  color: #3498db;
  margin-top: 20px;
  margin-bottom: 12px;
`;

const CodeBlock = styled.pre`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
`;

const GeminiExplanationDemo: React.FC = () => {
  return (
    <Container>
      <Title>
        <AIIcon>🤖</AIIcon>
        Gemini-Powered Algorithm Explanation
      </Title>
      
      <Content>
        <SectionTitle>Binary Search: Divide and Conquer to Find Your Target</SectionTitle>

        <SubSectionTitle>The Intuitive Explanation</SubSectionTitle>
        <p>
          Imagine you're looking for a name in a phone book (remember those?). You wouldn't start at page 1 and check every single name in order. Instead, you'd:
        </p>
        <ol>
          <li>Open to the middle of the book</li>
          <li>Check if the name you want comes before or after that page</li>
          <li>Eliminate half the book and repeat with the remaining half</li>
        </ol>
        <p>
          That's exactly how binary search works! It's all about <strong>eliminating half the possibilities with each step</strong>.
        </p>

        <SubSectionTitle>How Binary Search Works</SubSectionTitle>
        <p>
          Binary search is an efficient algorithm that finds a target value within a <strong>sorted array</strong> by repeatedly dividing the search space in half.
        </p>

        <p><strong>Key Steps:</strong></p>
        <Step>
          <StepNumber>1</StepNumber> <strong>Find the middle element</strong> of the current search range.
        </Step>
        <Step>
          <StepNumber>2</StepNumber> <strong>Compare the middle element with your target value</strong>:
          <ul>
            <li>If they match {'->'} You found it! Return the index.</li>
            <li>If the target is smaller {'->'} Look in the left half.</li>
            <li>If the target is larger {'->'} Look in the right half.</li>
          </ul>
        </Step>
        <Step>
          <StepNumber>3</StepNumber> <strong>Repeat with the new half-sized search space</strong> until you either:
          <ul>
            <li>Find the target, or</li>
            <li>The search space becomes empty (target doesn't exist)</li>
          </ul>
        </Step>

        <SubSectionTitle>Visual Example</SubSectionTitle>
        <p>
          Let's search for the value <Highlight>12</Highlight> in this sorted array:
        </p>
        <CodeBlock>[2, 5, 7, 8, 11, 12]</CodeBlock>

        <p><strong>Iteration 1:</strong></p>
        <ul>
          <li>Middle element is <Highlight>7</Highlight> (index 2)</li>
          <li><Highlight>12 {'>'} 7</Highlight>, so we search the right half: <Highlight>[8, 11, 12]</Highlight></li>
        </ul>

        <p><strong>Iteration 2:</strong></p>
        <ul>
          <li>Middle element is <Highlight>11</Highlight> (index 4 in original array)</li>
          <li><Highlight>12 {'>'} 11</Highlight>, so we search the right half: <Highlight>[12]</Highlight></li>
        </ul>

        <p><strong>Iteration 3:</strong></p>
        <ul>
          <li>Middle element is <Highlight>12</Highlight> (index 5 in original array)</li>
          <li><Highlight>12 {'=='} 12</Highlight> {'->'} Target found at index 5!</li>
        </ul>

        <SubSectionTitle>Why Binary Search is Efficient</SubSectionTitle>
        <p>
          With each comparison, binary search <strong>eliminates half of the remaining elements</strong>. This gives it a time complexity of O(log n), making it incredibly efficient for large datasets.
        </p>
        <p>
          For example, to find a value in an array of 1 million elements:
        </p>
        <ul>
          <li>Linear search: up to 1,000,000 comparisons</li>
          <li>Binary search: at most 20 comparisons!</li>
        </ul>

        <SubSectionTitle>Requirements</SubSectionTitle>
        <p>
          The array <strong>must be sorted</strong> for binary search to work correctly. If the array is unsorted, you'll need to sort it first or use a different search algorithm.
        </p>
      </Content>
    </Container>
  );
};

export default GeminiExplanationDemo;
