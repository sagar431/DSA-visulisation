export interface BinarySearchStep {
    array: number[];
    left: number;
    right: number;
    mid: number;
    found: boolean;
    target: number;
}

export const binarySearch = (
    array: number[],
    target: number,
    steps: BinarySearchStep[] = []
): BinarySearchStep[] => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push({
            array: [...array],
            left,
            right,
            mid,
            found: array[mid] === target,
            target
        });

        if (array[mid] === target) {
            return steps;
        }

        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    steps.push({
        array: [...array],
        left,
        right,
        mid: -1,
        found: false,
        target
    });

    return steps;
};
