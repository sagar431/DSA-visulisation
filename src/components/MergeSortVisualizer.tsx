import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { mergeSort } from '../algorithms/mergeSort';
import ArrayVisualizer from './ArrayVisualizer';
import MergeSortCode from './MergeSortCode';

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

const SubArrayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`;

const SubArraySection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  flex: 1;
`;

const SubArrayTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const SubArrayVisualizer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const SubArrayItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props.isActive ? '#3498db' : '#f0f0f0'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border-radius: 8px;
  font-weight: 600;
  box-shadow: ${props => props.isActive ? '0 4px 8px rgba(52, 152, 219, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
`;

const MergeSortVisualizer: React.FC = () => {
  // State for array and sorting
  const [array, setArray] = useState<number[]>([]);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sortingSpeed, setSortingSpeed] = useState<number>(500);
  const [arraySize, setArraySize] = useState<number>(16); // Default to power of 2 for merge sort
  
  // Statistics state
  const [comparisons, setComparisons] = useState<number>(0);
  const [merges, setMerges] = useState<number>(0);
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
    setMerges(0);
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
      const result = mergeSort(array);
      setSteps(result.steps);
      setComparisons(result.comparisons);
      setMerges(result.merges);
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
    setSortingTime(0);
    startTimeRef.current = null;
  };

  // Move to the next step in the sorting process
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    } else if (currentStepIndex === steps.length - 1) {
      setIsSorting(false);
      if (startTimeRef.current) {
        setSortingTime(Date.now() - startTimeRef.current);
      }
    }
  };

  // Move to the previous step in the sorting process
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

  // Automatically advance to the next step based on sorting speed
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isSorting && !isPaused && currentStepIndex < steps.length) {
      timer = setTimeout(() => {
        nextStep();
        
        // If we've reached the end, update sorting time
        if (currentStepIndex === steps.length - 1) {
          if (startTimeRef.current) {
            setSortingTime(Date.now() - startTimeRef.current);
          }
        }
      }, 1000 - sortingSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [isSorting, isPaused, currentStepIndex, steps.length, sortingSpeed]);

  // Get the current step data
  const currentStep = steps[currentStepIndex] || { array: array, sortedIndices: [] };
  
  // Calculate the percentage of completion
  const completionPercentage = steps.length > 0 
    ? Math.round((currentStepIndex / (steps.length - 1)) * 100) 
    : 0;

  return (
    <VisualizerContainer>
      <ControlsContainer>
        <Button onClick={generateRandomArray} disabled={isSorting && !isPaused}>
          Generate New Array
        </Button>
        
        <SliderContainer>
          <SliderLabel>Array Size:</SliderLabel>
          <Slider 
            type="range" 
            min="4" 
            max="64" 
            value={arraySize} 
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting && !isPaused}
          />
          <span>{arraySize}</span>
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>Speed:</SliderLabel>
          <Slider 
            type="range" 
            min="100" 
            max="950" 
            step="50"
            value={sortingSpeed} 
            onChange={(e) => setSortingSpeed(parseInt(e.target.value))}
          />
          <span>{sortingSpeed / 10}</span>
        </SliderContainer>
        
        {isSorting && !isPaused ? (
          <Button primary onClick={pauseSorting}>Pause</Button>
        ) : (
          <Button primary onClick={startSorting}>
            {currentStepIndex === -1 ? 'Start Sorting' : 'Resume'}
          </Button>
        )}
        
        <Button onClick={resetSorting} disabled={!isSorting && currentStepIndex === -1}>
          Reset
        </Button>
        
        <Button onClick={prevStep} disabled={currentStepIndex <= 0 || (isSorting && !isPaused)}>
          Previous Step
        </Button>
        
        <Button onClick={nextStep} disabled={currentStepIndex >= steps.length - 1 || (isSorting && !isPaused)}>
          Next Step
        </Button>
      </ControlsContainer>
      
      <StatsContainer>
        <StatCard>
          <StatTitle>Progress</StatTitle>
          <StatValue>{completionPercentage}%</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Comparisons</StatTitle>
          <StatValue>{comparisons}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Merges</StatTitle>
          <StatValue>{merges}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Time</StatTitle>
          <StatValue>
            {sortingTime > 0 ? `${(sortingTime / 1000).toFixed(2)}s` : '-'}
          </StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Current Step</StatTitle>
          <StatValue>{currentStepIndex > -1 ? currentStepIndex + 1 : '-'}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Total Steps</StatTitle>
          <StatValue>{steps.length || '-'}</StatValue>
        </StatCard>
      </StatsContainer>
      
      <VisualizationSection>
        <CodeSection>
          <MergeSortCode currentStepIndex={currentStepIndex} />
        </CodeSection>
        
        <ArraySection>
          <ArrayVisualizer 
            array={currentStep.array || array}
            pivotIndex={currentStep.mergeIndices?.mergeIndex}
            leftIndex={currentStep.mergeIndices?.leftIndex !== undefined ? 
              (currentStep.subArrayBounds?.start || 0) + currentStep.mergeIndices.leftIndex : 
              undefined}
            rightIndex={currentStep.mergeIndices?.rightIndex !== undefined ? 
              (currentStep.subArrayBounds?.mid || 0) + 1 + currentStep.mergeIndices.rightIndex : 
              undefined}
            sortedIndices={currentStep.sortedIndices}
            maxValue={maxValue}
          />
          
          {currentStep.leftArray && currentStep.rightArray && (
            <SubArrayContainer>
              <SubArraySection>
                <SubArrayTitle>Left Subarray</SubArrayTitle>
                <SubArrayVisualizer>
                  {currentStep.leftArray.map((value: number, index: number) => (
                    <SubArrayItem 
                      key={index}
                      isActive={currentStep.mergeIndices?.leftIndex === index}
                    >
                      {value}
                    </SubArrayItem>
                  ))}
                </SubArrayVisualizer>
              </SubArraySection>
              
              <SubArraySection>
                <SubArrayTitle>Right Subarray</SubArrayTitle>
                <SubArrayVisualizer>
                  {currentStep.rightArray.map((value: number, index: number) => (
                    <SubArrayItem 
                      key={index}
                      isActive={currentStep.mergeIndices?.rightIndex === index}
                    >
                      {value}
                    </SubArrayItem>
                  ))}
                </SubArrayVisualizer>
              </SubArraySection>
            </SubArrayContainer>
          )}
        </ArraySection>
      </VisualizationSection>
    </VisualizerContainer>
  );
};

export default MergeSortVisualizer;
