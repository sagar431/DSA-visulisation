import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ArrayVisualizerProps {
  array: number[];
  pivotIndex?: number;
  leftIndex?: number;
  rightIndex?: number;
  swappedIndices?: [number, number];
  sortedIndices?: number[];
  maxValue: number;
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

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const VisualizerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 400px;
  margin: 20px 0;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
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
  
  animation: ${fadeIn} 0.5s ease;
`;

const ArrayBarContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 4px;
`;

const ArrayBar = styled.div<{
  height: string;
  isPivot: boolean;
  isLeft: boolean;
  isRight: boolean;
  isSwapped: boolean;
  isSorted: boolean;
}>`
  flex: 1;
  margin: 0 2px;
  max-width: 60px;
  height: ${props => props.height};
  background: ${props => {
    if (props.isPivot) return 'linear-gradient(to top, #e74c3c, #c0392b)';
    if (props.isSwapped) return 'linear-gradient(to top, #f39c12, #d35400)';
    if (props.isLeft) return 'linear-gradient(to top, #3498db, #2980b9)';
    if (props.isRight) return 'linear-gradient(to top, #9b59b6, #8e44ad)';
    if (props.isSorted) return 'linear-gradient(to top, #2ecc71, #27ae60)';
    return 'linear-gradient(to top, #95a5a6, #7f8c8d)';
  }};
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 6px 6px 0 0;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &::after {
    content: ${props => 
      props.isPivot ? '"Pivot"' : 
      props.isLeft ? '"Left"' : 
      props.isRight ? '"Right"' : 
      'none'
    };
    position: absolute;
    top: -30px;
    font-size: 12px;
    color: #333;
    font-weight: bold;
    background-color: ${props => 
      props.isPivot ? '#e74c3c' : 
      props.isLeft ? '#3498db' : 
      props.isRight ? '#9b59b6' : 
      'transparent'
    };
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    opacity: ${props => 
      props.isPivot || props.isLeft || props.isRight ? 1 : 0
    };
  }
  
  ${props => props.isPivot && css`animation: ${pulse} 1.5s infinite;`}
  ${props => props.isSwapped && css`animation: ${bounce} 0.5s ease;`}
`;

const Legend = styled.div`
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
  font-size: 0.9rem;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 4px;
`;

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  pivotIndex,
  leftIndex,
  rightIndex,
  swappedIndices,
  sortedIndices,
  maxValue
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Adjust the container height based on window size
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const windowHeight = window.innerHeight;
        // Adjust height for 24-inch monitor (typically 1080p)
        const newHeight = Math.min(windowHeight * 0.4, 500);
        containerRef.current.style.height = `${newHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <>
      <VisualizerContainer ref={containerRef}>
        <ArrayBarContainer>
          {array.map((value, index) => {
            const height = `${(value / maxValue) * 100}%`;
            const isPivot = pivotIndex === index;
            const isLeft = leftIndex === index;
            const isRight = rightIndex === index;
            const isSwapped = swappedIndices?.includes(index) || false;
            const isSorted = sortedIndices?.includes(index) || false;

            return (
              <ArrayBar
                key={index}
                height={height}
                isPivot={isPivot}
                isLeft={isLeft}
                isRight={isRight}
                isSwapped={isSwapped}
                isSorted={isSorted}
              >
                {value}
              </ArrayBar>
            );
          })}
        </ArrayBarContainer>
      </VisualizerContainer>
      
      <Legend>
        <LegendItem>
          <LegendColor color="linear-gradient(to top, #e74c3c, #c0392b)" />
          <span>Pivot Element</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="linear-gradient(to top, #3498db, #2980b9)" />
          <span>Left Pointer</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="linear-gradient(to top, #9b59b6, #8e44ad)" />
          <span>Right Pointer</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="linear-gradient(to top, #f39c12, #d35400)" />
          <span>Swapped Elements</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="linear-gradient(to top, #2ecc71, #27ae60)" />
          <span>Sorted Elements</span>
        </LegendItem>
      </Legend>
    </>
  );
};

export default ArrayVisualizer;