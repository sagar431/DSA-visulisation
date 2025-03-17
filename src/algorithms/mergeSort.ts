export interface MergeSortStep {
  array: number[];
  leftArray?: number[];
  rightArray?: number[];
  mergeIndices?: {
    leftIndex?: number;
    rightIndex?: number;
    mergeIndex?: number;
  };
  highlightIndices?: number[];
  sortedIndices: number[];
  subArrayBounds?: {
    start: number;
    mid: number;
    end: number;
  };
}

export interface MergeSortResult {
  sortedArray: number[];
  steps: MergeSortStep[];
  comparisons: number;
  merges: number;
}

export const mergeSort = (originalArray: number[]): MergeSortResult => {
  const array = [...originalArray];
  const steps: MergeSortStep[] = [];
  let comparisons = 0;
  let merges = 0;
  
  // Add initial state
  steps.push({
    array: [...array],
    sortedIndices: []
  });

  // Call the recursive merge sort function
  const sortedIndices: number[] = [];
  mergeSortHelper(array, 0, array.length - 1, steps, sortedIndices, comparisons, merges);

  return {
    sortedArray: array,
    steps,
    comparisons,
    merges
  };
};

const mergeSortHelper = (
  array: number[],
  start: number,
  end: number,
  steps: MergeSortStep[],
  sortedIndices: number[],
  comparisons: number,
  merges: number
): void => {
  // Base case: if the array has 1 or 0 elements, it's already sorted
  if (start >= end) {
    if (start === end) {
      sortedIndices.push(start);
      steps.push({
        array: [...array],
        highlightIndices: [start],
        sortedIndices: [...sortedIndices],
        subArrayBounds: { start, mid: start, end }
      });
    }
    return;
  }

  // Find the middle point
  const mid = Math.floor((start + end) / 2);

  // Add step to show the division
  steps.push({
    array: [...array],
    highlightIndices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
    sortedIndices: [...sortedIndices],
    subArrayBounds: { start, mid, end }
  });

  // Recursively sort the left half
  mergeSortHelper(array, start, mid, steps, sortedIndices, comparisons, merges);

  // Recursively sort the right half
  mergeSortHelper(array, mid + 1, end, steps, sortedIndices, comparisons, merges);

  // Merge the sorted halves
  merge(array, start, mid, end, steps, sortedIndices, comparisons, merges);
};

const merge = (
  array: number[],
  start: number,
  mid: number,
  end: number,
  steps: MergeSortStep[],
  sortedIndices: number[],
  comparisons: number,
  merges: number
): void => {
  // Create temporary arrays
  const leftArray = array.slice(start, mid + 1);
  const rightArray = array.slice(mid + 1, end + 1);

  // Add step to show the subarrays to be merged
  steps.push({
    array: [...array],
    leftArray: [...leftArray],
    rightArray: [...rightArray],
    sortedIndices: [...sortedIndices],
    subArrayBounds: { start, mid, end }
  });

  let leftIndex = 0;
  let rightIndex = 0;
  let mergeIndex = start;

  // Merge the two arrays
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    // Add step to show comparison
    steps.push({
      array: [...array],
      leftArray: [...leftArray],
      rightArray: [...rightArray],
      mergeIndices: {
        leftIndex: leftIndex,
        rightIndex: rightIndex,
        mergeIndex: mergeIndex
      },
      sortedIndices: [...sortedIndices],
      subArrayBounds: { start, mid, end }
    });

    comparisons++;

    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      array[mergeIndex] = leftArray[leftIndex];
      leftIndex++;
    } else {
      array[mergeIndex] = rightArray[rightIndex];
      rightIndex++;
    }

    // Add step to show the merge
    steps.push({
      array: [...array],
      leftArray: [...leftArray],
      rightArray: [...rightArray],
      mergeIndices: {
        leftIndex: leftIndex,
        rightIndex: rightIndex,
        mergeIndex: mergeIndex
      },
      sortedIndices: [...sortedIndices],
      subArrayBounds: { start, mid, end }
    });

    mergeIndex++;
    merges++;
  }

  // Copy the remaining elements of leftArray, if any
  while (leftIndex < leftArray.length) {
    array[mergeIndex] = leftArray[leftIndex];

    // Add step to show copying remaining left elements
    steps.push({
      array: [...array],
      leftArray: [...leftArray],
      rightArray: [...rightArray],
      mergeIndices: {
        leftIndex: leftIndex,
        rightIndex: rightIndex,
        mergeIndex: mergeIndex
      },
      sortedIndices: [...sortedIndices],
      subArrayBounds: { start, mid, end }
    });

    leftIndex++;
    mergeIndex++;
    merges++;
  }

  // Copy the remaining elements of rightArray, if any
  while (rightIndex < rightArray.length) {
    array[mergeIndex] = rightArray[rightIndex];

    // Add step to show copying remaining right elements
    steps.push({
      array: [...array],
      leftArray: [...leftArray],
      rightArray: [...rightArray],
      mergeIndices: {
        leftIndex: leftIndex,
        rightIndex: rightIndex,
        mergeIndex: mergeIndex
      },
      sortedIndices: [...sortedIndices],
      subArrayBounds: { start, mid, end }
    });

    rightIndex++;
    mergeIndex++;
    merges++;
  }

  // Mark all indices in this subarray as sorted
  for (let i = start; i <= end; i++) {
    if (!sortedIndices.includes(i)) {
      sortedIndices.push(i);
    }
  }

  // Add final step to show the merged subarray
  steps.push({
    array: [...array],
    highlightIndices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
    sortedIndices: [...sortedIndices],
    subArrayBounds: { start, mid, end }
  });
};
