import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { binarySearch, BinarySearchStep } from '../algorithms/binarySearch';

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
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  min-height: 400px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 12px 12px 0 0;
  }
`;

const ArrayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  margin: 30px 0;
  gap: 6px;
`;

const ArrayElement = styled.div<{ 
  active: boolean;
  left: boolean;
  right: boolean;
  found: boolean;
  height: number;
}>`
  width: 50px;
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: ${props => {
    if (props.found) return '#2ecc71';
    if (props.active) return '#3498db';
    if (props.left || props.right) return '#f39c12';
    return '#f0f0f0';
  }};
  color: ${props => (props.active || props.found || props.left || props.right) ? 'white' : '#333'};
  transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::after {
    content: ${props => props.left ? '"L"' : props.right ? '"R"' : props.active ? '"M"' : '""'};
    position: absolute;
    bottom: -25px;
    font-size: 14px;
    font-weight: 600;
    color: ${props => {
      if (props.found) return '#2ecc71';
      if (props.active) return '#3498db';
      if (props.left || props.right) return '#f39c12';
      return '#333';
    }};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
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

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

const LegendText = styled.span`
  font-size: 14px;
  color: #333;
`;

const BinarySearchVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [target, setTarget] = useState<number>(0);
    const [steps, setSteps] = useState<BinarySearchStep[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(1000);

    useEffect(() => {
        generateArray();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps, speed]);

    const generateArray = () => {
        const newArray = Array.from({ length: 15 }, (_, i) => i * 2);
        setArray(newArray);
        setSteps([]);
        setCurrentStep(0);
    };

    const startSearch = () => {
        const newSteps = binarySearch([...array], target);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const pauseVisualization = () => {
        setIsPlaying(false);
    };

    const resetVisualization = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const stepForward = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const stepBackward = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const getCurrentStep = () => {
        return steps[currentStep] || { array: [], left: 0, right: 0, mid: 0, found: false, target: 0 };
    };

    const getComparisonCount = () => {
        return currentStep + 1;
    };

    const isFound = () => {
        return steps.length > 0 && steps[currentStep]?.found;
    };

    return (
        <VisualizerContainer>
            <ControlsContainer>
                <Button primary onClick={generateArray}>
                    Generate New Array
                </Button>
                <InputContainer>
                    <SliderLabel>Target:</SliderLabel>
                    <Input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                        placeholder="Target"
                    />
                </InputContainer>
                <SliderContainer>
                    <SliderLabel>Speed:</SliderLabel>
                    <Slider
                        type="range"
                        min="100"
                        max="2000"
                        step="100"
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                    />
                </SliderContainer>
                {steps.length === 0 ? (
                    <Button primary onClick={startSearch}>
                        Start Search
                    </Button>
                ) : (
                    <>
                        <Button onClick={stepBackward} disabled={currentStep <= 0}>
                            Step Back
                        </Button>
                        {isPlaying ? (
                            <Button primary onClick={pauseVisualization}>
                                Pause
                            </Button>
                        ) : (
                            <Button primary onClick={() => setIsPlaying(true)}>
                                Play
                            </Button>
                        )}
                        <Button onClick={stepForward} disabled={currentStep >= steps.length - 1}>
                            Step Forward
                        </Button>
                        <Button onClick={resetVisualization}>
                            Reset
                        </Button>
                    </>
                )}
            </ControlsContainer>

            <VisualizationSection>
                <ArrayContainer>
                    {array.map((num, idx) => {
                        const step = steps[currentStep];
                        const isActive = step && idx === step.mid;
                        const isLeft = step && idx === step.left;
                        const isRight = step && idx === step.right;
                        const isInRange = step && idx >= step.left && idx <= step.right;
                        const isFound = step && isActive && step.found;

                        return (
                            <ArrayElement
                                key={idx}
                                active={isActive}
                                left={isLeft && !isActive}
                                right={isRight && !isActive}
                                found={isFound}
                                height={Math.max(40, (num + 1) * 8)}
                            >
                                {num}
                            </ArrayElement>
                        );
                    })}
                </ArrayContainer>

                <LegendContainer>
                    <LegendItem>
                        <LegendColor color="#3498db" />
                        <LegendText>Middle Element (M)</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <LegendColor color="#f39c12" />
                        <LegendText>Left (L) / Right (R) Boundaries</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <LegendColor color="#2ecc71" />
                        <LegendText>Found Element</LegendText>
                    </LegendItem>
                </LegendContainer>

                {steps.length > 0 && (
                    <StatsContainer>
                        <StatCard>
                            <StatTitle>Target</StatTitle>
                            <StatValue>{getCurrentStep().target}</StatValue>
                        </StatCard>
                        <StatCard>
                            <StatTitle>Comparisons</StatTitle>
                            <StatValue>{getComparisonCount()}</StatValue>
                        </StatCard>
                        <StatCard>
                            <StatTitle>Status</StatTitle>
                            <StatValue>
                                {isFound() 
                                    ? "Found!" 
                                    : currentStep >= steps.length - 1 
                                        ? "Not Found" 
                                        : "Searching..."}
                            </StatValue>
                        </StatCard>
                    </StatsContainer>
                )}
            </VisualizationSection>
        </VisualizerContainer>
    );
};

export default BinarySearchVisualizer;
