import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { quickSort } from '../algorithms/quickSort';
import ArrayVisualizer from './ArrayVisualizer';
import QuickSortCode from './QuickSortCode';

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

const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ResetButton = styled(Button)`
  background-color: #e74c3c;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const GenerateButton = styled(Button)`
  background-color: #2ecc71;
  
  &:hover {
    background-color: #27ae60;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 250px;
`;

const SliderLabel = styled.label`
  font-weight: 600;
  color: #34495e;
  min-width: 120px;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  background: #ecf0f1;
  border-radius: 4px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: #2980b9;
  }
`;

const ArraySizeInput = styled.input`
  padding: 10px 15px;
  border-radius: 6px;
  border: 2px solid #ecf0f1;
  width: 80px;
  font-size: 1rem;
  text-align: center;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const StepInfo = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #3498db;
`;

const StepTitle = styled.h3`
  margin-top: 0;
  color: #3498db;
  font-weight: 600;
`;

const StepDescription = styled.p`
  margin-bottom: 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  margin-top: 15px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: string }>`
  height: 100%;
  width: ${props => props.width};
  background-color: #3498db;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const CodeContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const VisualizationContainer = styled.div`
  flex: 1.5;
  min-width: 0;
`;

const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// SVG Icons for buttons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
  </svg>
);

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6L9 12L15 18V6Z" fill="currentColor" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18V6Z" fill="currentColor" />
  </svg>
);

const ResetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="currentColor" />
  </svg>
);

const QuickSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20); 
  const [maxValue, setMaxValue] = useState<number>(100);
  const [sortingSteps, setSortingSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500); 
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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
    setSortingSteps([]);
    setCurrentStepIndex(0);
    setIsSorting(false);
    setIsPlaying(false);
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
    startTimeRef.current = performance.now();
    const result = quickSort(array);
    setSortingSteps(result.steps);
    setCurrentStepIndex(0);
    setIsSorting(true);
    
    // Count comparisons and swaps
    let compCount = 0;
    let swapCount = 0;
    
    result.steps.forEach(step => {
      if (step.description.includes("Comparing")) {
        compCount++;
      }
      if (step.swappedIndices) {
        swapCount++;
      }
    });
    
    setComparisons(compCount);
    setSwaps(swapCount);
    setSortingTime(performance.now() - (startTimeRef.current || 0));
  };

  // Handle auto-play of the sorting steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && currentStepIndex < sortingSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, speed);
    } else if (currentStepIndex >= sortingSteps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, sortingSteps, speed]);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Go to next step
  const nextStep = () => {
    if (currentStepIndex < sortingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Go to previous step
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Reset to the beginning
  const reset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Get the current step data
  const currentStep = sortingSteps[currentStepIndex] || {
    array: array,
    description: "Initial array",
    codeLineNumber: 1
  };

  // Calculate progress percentage
  const progressPercentage = sortingSteps.length > 0 
    ? `${(currentStepIndex / (sortingSteps.length - 1)) * 100}%` 
    : '0%';

  return (
    <VisualizerContainer>
      <ControlPanel>
        <ControlGroup>
          <SliderLabel>Array Size:</SliderLabel>
          <ArraySizeInput
            type="number"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value) || 20)}
            disabled={isSorting && isPlaying}
          />
          <GenerateButton 
            onClick={generateRandomArray}
            disabled={isSorting && isPlaying}
          >
            Generate New Array
          </GenerateButton>
        </ControlGroup>
        
        <ControlGroup>
          {!isSorting ? (
            <Button onClick={startSorting}>Start Sorting</Button>
          ) : (
            <>
              <Button onClick={prevStep} disabled={currentStepIndex === 0 || isPlaying}>
                <PrevIcon /> Previous
              </Button>
              <Button onClick={togglePlay}>
                {isPlaying ? <><PauseIcon /> Pause</> : <><PlayIcon /> Play</>}
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={currentStepIndex === sortingSteps.length - 1 || isPlaying}
              >
                Next <NextIcon />
              </Button>
              <ResetButton onClick={reset} disabled={isPlaying}>
                <ResetIcon /> Reset
              </ResetButton>
            </>
          )}
        </ControlGroup>
        
        <SliderContainer>
          <SliderLabel>Animation Speed:</SliderLabel>
          <Slider
            type="range"
            min="50"
            max="2000"
            step="50"
            value={2050 - speed} 
            onChange={(e) => setSpeed(2050 - parseInt(e.target.value))}
            disabled={isPlaying}
          />
        </SliderContainer>
      </ControlPanel>

      {isSorting && (
        <StepInfo>
          <StepTitle>Step {currentStepIndex + 1} of {sortingSteps.length}</StepTitle>
          <StepDescription>{currentStep.description}</StepDescription>
          <ProgressBar>
            <Progress width={progressPercentage} />
          </ProgressBar>
        </StepInfo>
      )}

      <FlexContainer>
        <VisualizationContainer>
          <ArrayVisualizer 
            array={currentStep.array}
            pivotIndex={currentStep.pivotIndex}
            leftIndex={currentStep.leftIndex}
            rightIndex={currentStep.rightIndex}
            swappedIndices={currentStep.swappedIndices}
            sortedIndices={currentStep.sortedIndices}
            maxValue={maxValue}
          />
          
          {isSorting && (
            <StatisticsContainer>
              <StatCard>
                <StatValue>{comparisons}</StatValue>
                <StatLabel>Comparisons</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{swaps}</StatValue>
                <StatLabel>Swaps</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{sortingTime.toFixed(2)}ms</StatValue>
                <StatLabel>Sorting Time</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{arraySize}</StatValue>
                <StatLabel>Array Size</StatLabel>
              </StatCard>
            </StatisticsContainer>
          )}
        </VisualizationContainer>
        
        <CodeContainer>
          <QuickSortCode currentLineNumber={currentStep.codeLineNumber} />
        </CodeContainer>
      </FlexContainer>
    </VisualizerContainer>
  );
};

export default QuickSortVisualizer;