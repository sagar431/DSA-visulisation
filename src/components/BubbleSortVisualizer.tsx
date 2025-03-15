import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { bubbleSort } from '../algorithms/bubbleSort';
import ArrayVisualizer from './ArrayVisualizer';
import BubbleSortCode from './BubbleSortCode';

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

const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.primary ? '#3498db' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#e0e0e0'};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Slider = styled.input`
  width: 200px;
`;

const SliderLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

const VisualizationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const CodeSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ArraySection = styled.div`
  flex: 2;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
`;

const StatTitle = styled.h3`
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

const StatValue = styled.p`
  margin: 10px 0 0;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 700;
`;

const BubbleSortVisualizer: React.FC = () => {
  // State for array and sorting
  const [array, setArray] = useState<number[]>([]);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sortingSpeed, setSortingSpeed] = useState<number>(500);
  const [arraySize, setArraySize] = useState<number>(20);
  
  // Statistics state
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [sortingTime, setSortingTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  // Generate a random array
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * maxValue) + 1
    );
    
    setArray(newArray);
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsSorting(false);
    setIsPaused(false);
    setComparisons(0);
    setSwaps(0);
    setSortingTime(0);
    startTimeRef.current = null;
    setMaxValue(100);
  }, [arraySize, maxValue]);

  // Initialize the array when the component mounts or array size changes
  useEffect(() => {
    generateRandomArray();
  }, [arraySize, generateRandomArray]);

  // Start the sorting process
  const startSorting = () => {
    if (isSorting && !isPaused) return;
    
    if (currentStepIndex === -1) {
      // Start new sort
      const result = bubbleSort(array);
      setSteps(result.steps);
      setComparisons(result.comparisons);
      setSwaps(result.swaps);
      setCurrentStepIndex(0);
      setIsSorting(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
    } else {
      // Resume paused sort
      setIsPaused(false);
    }
  };

  // Pause the sorting process
  const pauseSorting = () => {
    setIsPaused(true);
  };

  // Reset the sorting process
  const resetSorting = () => {
    setCurrentStepIndex(-1);
    setIsSorting(false);
    setIsPaused(false);
    setComparisons(0);
    setSwaps(0);
    setSortingTime(0);
    startTimeRef.current = null;
  };

  // Handle sorting speed change
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value);
    setSortingSpeed(1000 - newSpeed); // Invert so higher value = faster
  };

  // Handle array size change
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setArraySize(newSize);
  };

  // Advance to the next step in the sorting process
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isSorting && !isPaused && currentStepIndex >= 0) {
      if (currentStepIndex < steps.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStepIndex(prevIndex => prevIndex + 1);
          
          // Update sorting time
          if (startTimeRef.current) {
            setSortingTime(Date.now() - startTimeRef.current);
          }
        }, sortingSpeed);
      } else {
        // Sorting complete
        setIsSorting(false);
        if (startTimeRef.current) {
          setSortingTime(Date.now() - startTimeRef.current);
        }
      }
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSorting, isPaused, currentStepIndex, steps, sortingSpeed]);

  // Get the current step data for visualization
  const currentStep = steps[currentStepIndex] || { array: array, sortedIndices: [] };
  
  // Map the current step to the appropriate line number in the code
  const getCodeLineNumber = () => {
    if (currentStepIndex === -1) return 0;
    
    if (currentStep.comparing) return 10; // Comparing elements
    if (currentStep.swappedIndices) return 13; // Swapping elements
    
    return 1; // Default to first line
  };
  
  return (
    <VisualizerContainer>
      <ControlsContainer>
        <Button 
          primary 
          onClick={startSorting} 
          disabled={isSorting && !isPaused}
        >
          {currentStepIndex === -1 ? 'Start Sorting' : 'Resume'}
        </Button>
        
        <Button 
          onClick={pauseSorting} 
          disabled={!isSorting || isPaused}
        >
          Pause
        </Button>
        
        <Button 
          onClick={resetSorting} 
          disabled={!isSorting && currentStepIndex === -1}
        >
          Reset
        </Button>
        
        <Button 
          onClick={generateRandomArray} 
          disabled={isSorting && !isPaused}
        >
          Generate New Array
        </Button>
        
        <SliderContainer>
          <SliderLabel>Speed:</SliderLabel>
          <Slider 
            type="range" 
            min="100" 
            max="950" 
            value={1000 - sortingSpeed} 
            onChange={handleSpeedChange} 
            disabled={isSorting && !isPaused}
          />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>Array Size:</SliderLabel>
          <Slider 
            type="range" 
            min="5" 
            max="50" 
            value={arraySize} 
            onChange={handleSizeChange} 
            disabled={isSorting}
          />
        </SliderContainer>
      </ControlsContainer>
      
      <StatsContainer>
        <StatCard>
          <StatTitle>Comparisons</StatTitle>
          <StatValue>{comparisons}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Swaps</StatTitle>
          <StatValue>{swaps}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Time</StatTitle>
          <StatValue>{(sortingTime / 1000).toFixed(2)}s</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Array Size</StatTitle>
          <StatValue>{array.length}</StatValue>
        </StatCard>
      </StatsContainer>
      
      <VisualizationSection>
        <ArraySection>
          <ArrayVisualizer 
            array={currentStep.array}
            leftIndex={currentStep.comparing ? currentStep.comparing[0] : undefined}
            rightIndex={currentStep.comparing ? currentStep.comparing[1] : undefined}
            swappedIndices={currentStep.swappedIndices}
            sortedIndices={currentStep.sortedIndices}
            maxValue={maxValue}
          />
        </ArraySection>
        
        <CodeSection>
          <BubbleSortCode currentLineNumber={getCodeLineNumber()} />
        </CodeSection>
      </VisualizationSection>
    </VisualizerContainer>
  );
};

export default BubbleSortVisualizer;
