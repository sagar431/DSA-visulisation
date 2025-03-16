export interface TwoSumStep {
  array: number[];
  target: number;
  currentIndex?: number;
  complementIndex?: number;
  checking?: [number, number];
  foundPair?: [number, number];
  checkedIndices: number[];
}

export interface TwoSumResult {
  array: number[];
  target: number;
  solution: [number, number] | null;
  steps: TwoSumStep[];
  comparisons: number;
}

export const twoSum = (originalArray: number[], target: number): TwoSumResult => {
  const array = [...originalArray];
  const steps: TwoSumStep[] = [];
  let comparisons = 0;
  let solution: [number, number] | null = null;
  const checkedIndices: number[] = [];

  // Add initial state
  steps.push({
    array: [...array],
    target,
    checkedIndices: []
  });

  // Create a dictionary to store value -> index
  const numMap = new Map<number, number>();

  for (let i = 0; i < array.length; i++) {
    const complement = target - array[i];
    
    // Add step to show current element being processed
    steps.push({
      array: [...array],
      target,
      currentIndex: i,
      checkedIndices: [...checkedIndices]
    });
    
    comparisons++;
    
    // Check if complement exists in dictionary
    if (numMap.has(complement)) {
      const complementIndex = numMap.get(complement)!;
      
      // Add step to show checking for complement
      steps.push({
        array: [...array],
        target,
        currentIndex: i,
        complementIndex,
        checking: [i, complementIndex],
        checkedIndices: [...checkedIndices]
      });
      
      // Add step to show found pair
      solution = [complementIndex, i];
      steps.push({
        array: [...array],
        target,
        currentIndex: i,
        complementIndex,
        foundPair: [complementIndex, i],
        checkedIndices: [...checkedIndices, i]
      });
      
      break;
    }
    
    // Add current number to dictionary
    numMap.set(array[i], i);
    checkedIndices.push(i);
    
    // Add step to show updated checked indices
    steps.push({
      array: [...array],
      target,
      checkedIndices: [...checkedIndices]
    });
  }
  
  // If no solution found, add final state
  if (!solution) {
    steps.push({
      array: [...array],
      target,
      checkedIndices: [...checkedIndices]
    });
  }

  return {
    array,
    target,
    solution,
    steps,
    comparisons
  };
};
