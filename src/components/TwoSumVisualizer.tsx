import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { twoSum } from '../algorithms/twoSum';
import ArrayVisualizer from './ArrayVisualizer';
import TwoSumCode from './TwoSumCode';

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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 80px;
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

const ResultContainer = styled.div<{ success: boolean }>`
  background-color: ${props => props.success ? '#2ecc71' : '#e74c3c'};
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 18px;
  animation: ${fadeIn} 0.5s ease;
`;

const TwoSumVisualizer: React.FC = () => {
  // State for array and algorithm
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(20);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [runningSpeed, setSortingSpeed] = useState<number>(500);
  const [arraySize, setArraySize] = useState<number>(8);
  
  // Statistics state
  const [comparisons, setComparisons] = useState<number>(0);
  const [solutionFound, setSolutionFound] = useState<boolean | null>(null);
  const [solutionPair, setSolutionPair] = useState<[number, number] | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  // Generate a random array
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * maxValue) + 1
    );
    
    setArray(newArray);
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsRunning(false);
    setIsPaused(false);
    setComparisons(0);
    setSolutionFound(null);
    setSolutionPair(null);
    setExecutionTime(0);
    startTimeRef.current = null;
  }, [arraySize, maxValue]);

  // Initialize the array when the component mounts or array size changes
  useEffect(() => {
    generateRandomArray();
  }, [arraySize, generateRandomArray]);

  // Start the algorithm
  const startAlgorithm = () => {
    if (isRunning && !isPaused) return;
    
    if (currentStepIndex === -1) {
      // Start new algorithm
      const result = twoSum(array, target);
      setSteps(result.steps);
      setComparisons(result.comparisons);
      setSolutionFound(result.solution !== null);
      setSolutionPair(result.solution);
      setCurrentStepIndex(0);
      setIsRunning(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
    } else {
      // Resume paused algorithm
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  // Pause the algorithm
  const pauseAlgorithm = () => {
    setIsPaused(true);
  };

  // Reset the algorithm
  const resetAlgorithm = () => {
    setCurrentStepIndex(-1);
    setIsRunning(false);
    setIsPaused(false);
    setSolutionFound(null);
    setSolutionPair(null);
    setExecutionTime(0);
    startTimeRef.current = null;
  };

  // Step forward in the visualization
  const stepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
      if (currentStepIndex === 0 && startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
      if (currentStepIndex === steps.length - 2) {
        if (startTimeRef.current !== null) {
          setExecutionTime(Date.now() - startTimeRef.current);
        }
      }
    }
  };

  // Step backward in the visualization
  const stepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

  // Auto-advance through steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning && !isPaused && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        stepForward();
      }, 1000 - runningSpeed);
    }
    
    if (currentStepIndex === steps.length - 1 && startTimeRef.current !== null) {
      setExecutionTime(Date.now() - startTimeRef.current);
      startTimeRef.current = null;
      setIsRunning(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isRunning, isPaused, currentStepIndex, steps.length, runningSpeed]);

  // Get current step data for visualization
  const getCurrentStepData = () => {
    if (steps.length === 0 || currentStepIndex === -1) {
      return {
        array,
        sortedIndices: []
      };
    }
    
    const step = steps[currentStepIndex];
    
    return {
      array: step.array,
      pivotIndex: undefined,
      leftIndex: step.currentIndex,
      rightIndex: step.complementIndex,
      swappedIndices: step.foundPair,
      sortedIndices: step.checkedIndices || []
    };
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setTarget(value);
      resetAlgorithm();
    }
  };

  return (
    <VisualizerContainer>
      <ControlsContainer>
        <Button onClick={generateRandomArray}>Generate New Array</Button>
        <SliderContainer>
          <SliderLabel>Array Size:</SliderLabel>
          <Slider 
            type="range" 
            min="4" 
            max="15" 
            value={arraySize} 
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isRunning && !isPaused}
          />
          <span>{arraySize}</span>
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>Max Value:</SliderLabel>
          <Slider 
            type="range" 
            min="10" 
            max="50" 
            value={maxValue} 
            onChange={(e) => setMaxValue(parseInt(e.target.value))}
            disabled={isRunning && !isPaused}
          />
          <span>{maxValue}</span>
        </SliderContainer>
        <InputContainer>
          <SliderLabel>Target Sum:</SliderLabel>
          <Input 
            type="number" 
            value={target} 
            onChange={handleTargetChange}
            disabled={isRunning && !isPaused}
            min="1"
          />
        </InputContainer>
        <SliderContainer>
          <SliderLabel>Speed:</SliderLabel>
          <Slider 
            type="range" 
            min="100" 
            max="950" 
            value={runningSpeed} 
            onChange={(e) => setSortingSpeed(parseInt(e.target.value))}
          />
          <span>{Math.round((runningSpeed / 950) * 100)}%</span>
        </SliderContainer>
      </ControlsContainer>
      
      <StatsContainer>
        <StatCard>
          <StatTitle>Comparisons</StatTitle>
          <StatValue>{currentStepIndex >= 0 ? comparisons : 0}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Current Step</StatTitle>
          <StatValue>{currentStepIndex >= 0 ? currentStepIndex + 1 : 0}/{steps.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Execution Time</StatTitle>
          <StatValue>{executionTime > 0 ? `${executionTime}ms` : '-'}</StatValue>
        </StatCard>
      </StatsContainer>
      
      {solutionFound !== null && currentStepIndex === steps.length - 1 && (
        <ResultContainer success={solutionFound}>
          {solutionFound 
            ? `Solution Found! Indices [${solutionPair?.[0]}, ${solutionPair?.[1]}] sum to ${target}`
            : `No solution found for target sum ${target}`}
        </ResultContainer>
      )}
      
      <VisualizationSection>
        <CodeSection>
          <TwoSumCode 
            currentStepIndex={currentStepIndex} 
            steps={steps}
          />
        </CodeSection>
        <ArraySection>
          <ArrayVisualizer 
            {...getCurrentStepData()}
            maxValue={maxValue}
          />
        </ArraySection>
      </VisualizationSection>
      
      <ControlsContainer>
        <Button 
          onClick={resetAlgorithm}
          disabled={currentStepIndex === -1 && !isRunning}
        >
          Reset
        </Button>
        <Button 
          onClick={stepBackward}
          disabled={currentStepIndex <= 0 || isRunning && !isPaused}
        >
          Step Back
        </Button>
        {isRunning && !isPaused ? (
          <Button 
            primary 
            onClick={pauseAlgorithm}
          >
            Pause
          </Button>
        ) : (
          <Button 
            primary 
            onClick={startAlgorithm}
            disabled={steps.length > 0 && currentStepIndex === steps.length - 1}
          >
            {currentStepIndex === -1 ? 'Start' : 'Resume'}
          </Button>
        )}
        <Button 
          onClick={stepForward}
          disabled={steps.length === 0 || currentStepIndex === steps.length - 1 || (isRunning && !isPaused)}
        >
          Step Forward
        </Button>
      </ControlsContainer>
    </VisualizerContainer>
  );
};

export default TwoSumVisualizer;
