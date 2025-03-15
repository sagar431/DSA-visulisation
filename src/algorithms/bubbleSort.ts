export interface BubbleSortStep {
  array: number[];
  comparing?: [number, number];
  swappedIndices?: [number, number];
  sortedIndices: number[];
}

export interface BubbleSortResult {
  sortedArray: number[];
  steps: BubbleSortStep[];
  comparisons: number;
  swaps: number;
}

export const bubbleSort = (originalArray: number[]): BubbleSortResult => {
  const array = [...originalArray];
  const steps: BubbleSortStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  // Add initial state
  steps.push({
    array: [...array],
    sortedIndices: [...sortedIndices]
  });

  for (let i = 0; i < array.length; i++) {
    let swapped = false;
    
    for (let j = 0; j < array.length - i - 1; j++) {
      // Add step to show comparison
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        sortedIndices: [...sortedIndices]
      });
      
      comparisons++;
      
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        swaps++;
        
        // Add step to show swap
        steps.push({
          array: [...array],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices]
        });
      }
    }
    
    // Mark the last unsorted element as sorted
    sortedIndices.unshift(array.length - 1 - i);
    
    // Add step to show updated sorted portion
    steps.push({
      array: [...array],
      sortedIndices: [...sortedIndices]
    });
    
    // If no swaps were made in this pass, the array is already sorted
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < array.length; k++) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
      }
      
      // Add final state with all elements sorted
      steps.push({
        array: [...array],
        sortedIndices: sortedIndices.sort((a, b) => a - b)
      });
      
      break;
    }
  }

  return {
    sortedArray: array,
    steps,
    comparisons,
    swaps
  };
};
