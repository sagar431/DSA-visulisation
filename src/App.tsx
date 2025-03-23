import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import QuickSortVisualizer from './components/QuickSortVisualizer';
import SelectionSortVisualizer from './components/SelectionSortVisualizer';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import TwoSumVisualizer from './components/TwoSumVisualizer';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import LongestConsecutiveSequenceVisualizer from './components/LongestConsecutiveSequenceVisualizer';
import RecursionVisualizer from './components/RecursionVisualizer';
import BinarySearchVisualizer from './components/BinarySearchVisualizer';
import GeminiAssistant from './components/GeminiAssistant';
import GeminiCodeGenerator from './components/GeminiCodeGenerator';
import GeminiExplanationDemo from './components/GeminiExplanationDemo';

// Define theme for consistent styling
const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    dark: '#2c3e50',
    light: '#ecf0f1',
    lightGray: '#f5f7fa',
    text: '#34495e',
  },
  shadows: {
    small: '0 2px 5px rgba(0, 0, 0, 0.1)',
    medium: '0 5px 15px rgba(0, 0, 0, 0.1)',
    large: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: '8px',
  transitions: {
    default: '0.3s ease',
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.dark};
  }
`;

const AppContainer = styled.div`
  max-width: 1920px; /* Optimized for 24-inch monitor */
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: ${props => props.theme.colors.dark};
  color: white;
  padding: 20px 30px;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  margin: 10px 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const AlgorithmSelector = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const AlgorithmButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  box-shadow: ${props => props.theme.shadows.small};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightGray};
  }

  &:active {
    transform: translateY(0);
  }
`;

const InfoCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.small};
  margin-bottom: 20px;
`;

const InfoTitle = styled.h3`
  margin-top: 0;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const InfoText = styled.p`
  line-height: 1.6;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: ${props => props.theme.colors.text};
  opacity: 0.7;
  font-size: 0.9rem;
`;

// Define algorithm info type
interface AlgorithmInfo {
  title: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  inventor: string;
  useCases: string;
}

// Define algorithms type
interface Algorithms {
  [key: string]: AlgorithmInfo;
}

const App: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<string>('binarysearch');

  const algorithmInfo: Algorithms = {
    binarysearch: {
      title: "Binary Search Algorithm",
      description: "Binary Search is a searching algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search space in half.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      inventor: "Unknown",
      useCases: "Finding elements in sorted arrays, dictionary lookups"
    },
    quicksort: {
      title: "Quick Sort Algorithm",
      description: "Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around the pivot. It has an average time complexity of O(n log n) and is often faster in practice than other O(n log n) algorithms like Merge Sort.",
      timeComplexity: "Best: O(n log n), Average: O(n log n), Worst: O(n²)",
      spaceComplexity: "O(log n)",
      inventor: "Tony Hoare in 1959",
      useCases: "Quick Sort is widely used in programming languages' built-in sorting functions, like Arrays.sort() in Java and sort() in C++."
    },
    selectionsort: {
      title: "Selection Sort Algorithm",
      description: "Selection Sort is a simple comparison-based sorting algorithm. It divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and moves it to the end of the sorted sublist.",
      timeComplexity: "Best: O(n²), Average: O(n²), Worst: O(n²)",
      spaceComplexity: "O(1)",
      inventor: "Unknown, but has been in use since at least the 1950s",
      useCases: "Selection Sort is useful for small data sets or when memory writes are expensive, as it makes the minimum number of swaps."
    },
    bubblesort: {
      title: "Bubble Sort Algorithm",
      description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
      timeComplexity: "Best: O(n), Average: O(n²), Worst: O(n²)",
      spaceComplexity: "O(1)",
      inventor: "Unknown, but has been in use since at least the 1950s",
      useCases: "Bubble Sort is primarily used as an educational tool to introduce sorting algorithms. It's simple to understand but inefficient for large datasets."
    },
    insertionsort: {
      title: "Insertion Sort Algorithm",
      description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.",
      timeComplexity: "Best: O(n), Average: O(n²), Worst: O(n²)",
      spaceComplexity: "O(1)",
      inventor: "Unknown, but has been in use since at least the 1950s",
      useCases: "Insertion Sort is used when the data set is nearly sorted or when the input array is small. It's also used in hybrid sorting algorithms like Timsort."
    },
    mergesort: {
      title: "Merge Sort Algorithm",
      description: "Merge Sort is an efficient, stable, comparison-based, divide and conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
      timeComplexity: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
      spaceComplexity: "O(n)",
      inventor: "John von Neumann in 1945",
      useCases: "Merge Sort is widely used in external sorting, where data doesn't fit into memory and needs to be sorted in chunks. It's also used in various programming language standard libraries."
    },
    twosum: {
      title: "Two Sum Algorithm",
      description: "Two Sum is a common algorithmic problem where you need to find two numbers in an array that add up to a specific target value. This visualization demonstrates both the brute force approach (O(n²)) and the optimized hash map approach (O(n)).",
      timeComplexity: "Brute Force: O(n²), Optimized: O(n)",
      spaceComplexity: "Brute Force: O(1), Optimized: O(n)",
      inventor: "Common interview problem, no specific inventor",
      useCases: "Two Sum is a fundamental algorithm used in various applications like financial analysis, data processing, and as a building block for more complex algorithms like 3Sum and 4Sum."
    },
    longestconsecutivesequence: {
      title: "Longest Consecutive Sequence Algorithm",
      description: "The Longest Consecutive Sequence algorithm finds the length of the longest consecutive elements sequence in an unsorted array. It uses a hash set for O(1) lookups to efficiently check for consecutive elements.",
      timeComplexity: "O(n) where n is the number of elements in the array",
      spaceComplexity: "O(n) for storing elements in the hash set",
      inventor: "Common interview problem, no specific inventor",
      useCases: "This algorithm is useful in scenarios where you need to find patterns in data, such as analyzing stock price movements, finding streaks in sports statistics, or identifying continuous ranges in any dataset."
    },
    recursion: {
      title: "Recursion Visualization",
      description: "Recursion is a programming technique where a function calls itself to solve a problem. This visualization demonstrates how recursive algorithms like factorial, Fibonacci, and tree traversals work by showing the call stack and execution flow.",
      timeComplexity: "Varies by algorithm (Factorial: O(n), Fibonacci: O(2^n), Tree Traversal: O(n))",
      spaceComplexity: "Varies by algorithm (Typically O(n) for the call stack)",
      inventor: "Recursion as a concept dates back to ancient mathematics, but was formalized in computer science in the 1950s",
      useCases: "Recursion is used in many algorithms like tree/graph traversal, divide and conquer algorithms, and dynamic programming. It's essential for solving problems that can be broken down into similar subproblems."
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <TitleContainer>
            <Title>Algorithm Visualizer</Title>
            <Subtitle>Interactive visualizations of common algorithms</Subtitle>
          </TitleContainer>
        </Header>
        
        <AlgorithmSelector>
          <AlgorithmButton 
            active={algorithm === 'binarysearch'} 
            onClick={() => setAlgorithm('binarysearch')}
          >
            Binary Search
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'quicksort'} 
            onClick={() => setAlgorithm('quicksort')}
          >
            Quick Sort
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'mergesort'} 
            onClick={() => setAlgorithm('mergesort')}
          >
            Merge Sort
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'selectionsort'} 
            onClick={() => setAlgorithm('selectionsort')}
          >
            Selection Sort
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'bubblesort'} 
            onClick={() => setAlgorithm('bubblesort')}
          >
            Bubble Sort
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'insertionsort'} 
            onClick={() => setAlgorithm('insertionsort')}
          >
            Insertion Sort
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'twosum'} 
            onClick={() => setAlgorithm('twosum')}
          >
            Two Sum
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'longestconsecutivesequence'} 
            onClick={() => setAlgorithm('longestconsecutivesequence')}
          >
            Longest Consecutive Sequence
          </AlgorithmButton>
          <AlgorithmButton 
            active={algorithm === 'recursion'} 
            onClick={() => setAlgorithm('recursion')}
          >
            Recursion
          </AlgorithmButton>
        </AlgorithmSelector>
        
        <InfoCard>
          <InfoTitle>{algorithmInfo[algorithm].title}</InfoTitle>
          <InfoText>{algorithmInfo[algorithm].description}</InfoText>
          <InfoText><strong>Time Complexity:</strong> {algorithmInfo[algorithm].timeComplexity}</InfoText>
          <InfoText><strong>Space Complexity:</strong> {algorithmInfo[algorithm].spaceComplexity}</InfoText>
          <InfoText><strong>Invented by:</strong> {algorithmInfo[algorithm].inventor}</InfoText>
          <InfoText><strong>Use Cases:</strong> {algorithmInfo[algorithm].useCases}</InfoText>
        </InfoCard>
        
        {/* Gemini-powered AI Assistant */}
        <GeminiAssistant 
          algorithm={algorithm}
          timeComplexity={algorithmInfo[algorithm].timeComplexity}
          spaceComplexity={algorithmInfo[algorithm].spaceComplexity}
        />
        
        {/* Gemini-powered Code Generator */}
        <GeminiCodeGenerator algorithm={algorithm} />
        
        {/* Show Gemini explanation demo for binary search */}
        {algorithm === 'binarysearch' && <GeminiExplanationDemo />}
        
        {algorithm === 'binarysearch' && <BinarySearchVisualizer />}
        {algorithm === 'quicksort' && <QuickSortVisualizer />}
        {algorithm === 'mergesort' && <MergeSortVisualizer />}
        {algorithm === 'selectionsort' && <SelectionSortVisualizer />}
        {algorithm === 'bubblesort' && <BubbleSortVisualizer />}
        {algorithm === 'insertionsort' && <InsertionSortVisualizer />}
        {algorithm === 'twosum' && <TwoSumVisualizer />}
        {algorithm === 'longestconsecutivesequence' && <LongestConsecutiveSequenceVisualizer />}
        {algorithm === 'recursion' && <RecursionVisualizer />}
        
        <Footer>
          &copy; {new Date().getFullYear()} Algorithm Visualizer - Created for educational purposes
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;