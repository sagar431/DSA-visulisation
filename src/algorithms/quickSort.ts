export interface SortStep {
  array: number[];
  pivotIndex?: number;
  leftIndex?: number;
  rightIndex?: number;
  swappedIndices?: [number, number];
  sortedIndices?: number[];
  description: string;
  codeLineNumber: number;
}

export interface QuickSortResult {
  sortedArray: number[];
  steps: SortStep[];
}

export const quickSort = (
  originalArray: number[]
): QuickSortResult => {
  // Create a copy of the array to avoid modifying the original
  const array = [...originalArray];
  const steps: SortStep[] = [];
  
  // Initial step showing the unsorted array
  steps.push({
    array: [...array],
    description: "Starting with the unsorted array",
    codeLineNumber: 1
  });

  // Call the recursive quicksort function
  quickSortHelper(array, 0, array.length - 1, steps);
  
  // Final step showing the sorted array
  steps.push({
    array: [...array],
    sortedIndices: Array.from({ length: array.length }, (_, i) => i),
    description: "Array is now sorted",
    codeLineNumber: 3
  });

  return {
    sortedArray: array,
    steps
  };
};

const quickSortHelper = (
  array: number[],
  low: number,
  high: number,
  steps: SortStep[]
): void => {
  if (low < high) {
    // Add step to show the current subarray we're working on
    steps.push({
      array: [...array],
      description: `Working on subarray from index ${low} to ${high}`,
      codeLineNumber: 6
    });

    // Partition the array and get the pivot index
    const pivotIndex = partition(array, low, high, steps);
    
    // Add step to show the partition is complete
    steps.push({
      array: [...array],
      pivotIndex,
      description: `Partition complete. Pivot (${array[pivotIndex]}) is now at its correct position (index ${pivotIndex})`,
      codeLineNumber: 7
    });

    // Recursively sort the left part
    quickSortHelper(array, low, pivotIndex - 1, steps);
    
    // Recursively sort the right part
    quickSortHelper(array, pivotIndex + 1, high, steps);
  }
};

const partition = (
  array: number[],
  low: number,
  high: number,
  steps: SortStep[]
): number => {
  // Choose the rightmost element as pivot
  const pivot = array[high];
  
  // Add step to show pivot selection
  steps.push({
    array: [...array],
    pivotIndex: high,
    description: `Selected pivot: ${pivot} at index ${high}`,
    codeLineNumber: 13
  });

  // Index of smaller element
  let i = low - 1;
  
  // Add step to show initialization of i
  steps.push({
    array: [...array],
    pivotIndex: high,
    leftIndex: i,
    description: `Initialize i = ${i} (index of smaller element)`,
    codeLineNumber: 14
  });

  // Traverse through all elements
  // compare each element with pivot
  for (let j = low; j < high; j++) {
    // Add step to show current comparison
    steps.push({
      array: [...array],
      pivotIndex: high,
      leftIndex: i,
      rightIndex: j,
      description: `Comparing element at index ${j} (${array[j]}) with pivot (${pivot})`,
      codeLineNumber: 17
    });

    // If current element is smaller than the pivot
    if (array[j] < pivot) {
      // Increment index of smaller element
      i++;
      
      // Add step to show increment of i
      steps.push({
        array: [...array],
        pivotIndex: high,
        leftIndex: i,
        rightIndex: j,
        description: `Element ${array[j]} is less than pivot ${pivot}, incrementing i to ${i}`,
        codeLineNumber: 19
      });
      
      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
      
      // Add step to show the swap
      steps.push({
        array: [...array],
        pivotIndex: high,
        leftIndex: i,
        rightIndex: j,
        swappedIndices: [i, j],
        description: `Swapped elements at indices ${i} and ${j}: ${array[i]} and ${array[j]}`,
        codeLineNumber: 20
      });
    }
  }
  
  // Swap the pivot element with the element at (i + 1)
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  
  // Add step to show the final pivot swap
  steps.push({
    array: [...array],
    pivotIndex: i + 1,
    swappedIndices: [i + 1, high],
    description: `Placed pivot at its correct position by swapping elements at indices ${i + 1} and ${high}`,
    codeLineNumber: 25
  });
  
  // Return the position where partition is done
  return i + 1;
}; 