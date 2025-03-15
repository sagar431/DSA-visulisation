export interface InsertionSortStep {
  array: number[];
  currentIndex?: number;
  comparingIndex?: number;
  insertPosition?: number;
  sortedIndices: number[];
}

export interface InsertionSortResult {
  sortedArray: number[];
  steps: InsertionSortStep[];
  comparisons: number;
  shifts: number;
}

export const insertionSort = (originalArray: number[]): InsertionSortResult => {
  const array = [...originalArray];
  const steps: InsertionSortStep[] = [];
  let comparisons = 0;
  let shifts = 0;
  const sortedIndices: number[] = [0]; // First element is already "sorted"

  // Add initial state
  steps.push({
    array: [...array],
    sortedIndices: [...sortedIndices]
  });

  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;
    
    // Add step to show current element being considered
    steps.push({
      array: [...array],
      currentIndex: i,
      sortedIndices: [...sortedIndices]
    });
    
    // Find the position to insert the current element
    while (j >= 0) {
      // Add step for each comparison
      steps.push({
        array: [...array],
        currentIndex: i,
        comparingIndex: j,
        sortedIndices: [...sortedIndices]
      });
      
      comparisons++;
      
      if (array[j] <= current) {
        break;
      }
      
      // Shift elements to the right
      array[j + 1] = array[j];
      shifts++;
      
      // Add step to show shift
      const tempArray = [...array];
      tempArray[j] = current; // Visualize where current will go
      
      steps.push({
        array: [...array],
        currentIndex: i,
        insertPosition: j,
        sortedIndices: [...sortedIndices]
      });
      
      j--;
    }
    
    // Insert the current element at the correct position
    array[j + 1] = current;
    
    // Add step to show insertion
    steps.push({
      array: [...array],
      sortedIndices: [...sortedIndices]
    });
    
    // Update sorted indices
    sortedIndices.push(i);
    
    // Add step to show updated sorted portion
    steps.push({
      array: [...array],
      sortedIndices: [...sortedIndices]
    });
  }

  return {
    sortedArray: array,
    steps,
    comparisons,
    shifts
  };
};
