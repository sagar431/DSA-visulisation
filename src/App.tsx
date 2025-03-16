import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import QuickSortVisualizer from './components/QuickSortVisualizer';
import SelectionSortVisualizer from './components/SelectionSortVisualizer';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import TwoSumVisualizer from './components/TwoSumVisualizer';

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
  const [algorithm, setAlgorithm] = useState<string>('quicksort');

  const algorithmInfo: Algorithms = {
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
      useCases: "Bubble Sort is primarily used as an educational tool to introduce sorting algorithms. It's simple to understand and implement but inefficient for large datasets."
    },
    insertionsort: {
      title: "Insertion Sort Algorithm",
      description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.",
      timeComplexity: "Best: O(n), Average: O(n²), Worst: O(n²)",
      spaceComplexity: "O(1)",
      inventor: "Unknown, but has been in use since at least the 1950s",
      useCases: "Insertion Sort is used when the data set is nearly sorted or when the input array is small. It's also used in hybrid sorting algorithms like Timsort."
    },
    twosum: {
      title: "Two Sum Algorithm",
      description: "The Two Sum algorithm finds two numbers in an array that add up to a specific target sum. It's a common problem in computer science interviews and demonstrates efficient use of hash maps.",
      timeComplexity: "O(n) where n is the number of elements in the array",
      spaceComplexity: "O(n) for storing the hash map",
      inventor: "Commonly attributed to computer science interview questions, no specific inventor",
      useCases: "The Two Sum problem is used in various applications like finding pairs in financial data, detecting complementary elements, and as a building block for more complex algorithms."
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <TitleContainer>
            <Title>Algorithm Visualizer</Title>
            <Subtitle>Interactive visualization of common algorithms</Subtitle>
          </TitleContainer>
        </Header>
        
        <AlgorithmSelector>
          <AlgorithmButton 
            active={algorithm === 'quicksort'} 
            onClick={() => setAlgorithm('quicksort')}
          >
            Quick Sort
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
        </AlgorithmSelector>
        
        <InfoCard>
          <InfoTitle>{algorithmInfo[algorithm].title}</InfoTitle>
          <InfoText>{algorithmInfo[algorithm].description}</InfoText>
          <InfoText><strong>Time Complexity:</strong> {algorithmInfo[algorithm].timeComplexity}</InfoText>
          <InfoText><strong>Space Complexity:</strong> {algorithmInfo[algorithm].spaceComplexity}</InfoText>
          <InfoText><strong>Inventor:</strong> {algorithmInfo[algorithm].inventor}</InfoText>
          <InfoText><strong>Use Cases:</strong> {algorithmInfo[algorithm].useCases}</InfoText>
        </InfoCard>
        
        {algorithm === 'quicksort' && <QuickSortVisualizer />}
        {algorithm === 'selectionsort' && <SelectionSortVisualizer />}
        {algorithm === 'bubblesort' && <BubbleSortVisualizer />}
        {algorithm === 'insertionsort' && <InsertionSortVisualizer />}
        {algorithm === 'twosum' && <TwoSumVisualizer />}
        
        <Footer>
          &copy; {new Date().getFullYear()} Algorithm Visualizer | Created for educational purposes
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;