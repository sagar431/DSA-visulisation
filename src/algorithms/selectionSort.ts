export interface SelectionSortStep {
  array: number[];
  currentIndex?: number;
  minIndex?: number;
  comparingIndex?: number;
  swappedIndices?: [number, number];
  sortedIndices: number[];
}

export interface SelectionSortResult {
  sortedArray: number[];
  steps: SelectionSortStep[];
  comparisons: number;
  swaps: number;
}

export const selectionSort = (originalArray: number[]): SelectionSortResult => {
  const array = [...originalArray];
  const steps: SelectionSortStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  // Add initial state
  steps.push({
    array: [...array],
    sortedIndices: [...sortedIndices]
  });

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    
    // Add step to show current position
    steps.push({
      array: [...array],
      currentIndex: i,
      minIndex,
      sortedIndices: [...sortedIndices]
    });

    for (let j = i + 1; j < array.length; j++) {
      // Add step for each comparison
      steps.push({
        array: [...array],
        currentIndex: i,
        minIndex,
        comparingIndex: j,
        sortedIndices: [...sortedIndices]
      });
      
      comparisons++;
      
      if (array[j] < array[minIndex]) {
        minIndex = j;
        
        // Add step to show new minimum
        steps.push({
          array: [...array],
          currentIndex: i,
          minIndex,
          sortedIndices: [...sortedIndices]
        });
      }
    }

    if (minIndex !== i) {
      // Swap elements
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      swaps++;
      
      // Add step to show swap
      steps.push({
        array: [...array],
        currentIndex: i,
        swappedIndices: [i, minIndex],
        sortedIndices: [...sortedIndices]
      });
    }
    
    // Mark current position as sorted
    sortedIndices.push(i);
    
    // Add step to show updated sorted portion
    steps.push({
      array: [...array],
      currentIndex: i,
      sortedIndices: [...sortedIndices]
    });
  }
  
  // Mark the last element as sorted
  sortedIndices.push(array.length - 1);
  
  // Add final state
  steps.push({
    array: [...array],
    sortedIndices: [...sortedIndices]
  });

  return {
    sortedArray: array,
    steps,
    comparisons,
    swaps
  };
};
