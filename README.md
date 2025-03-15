# DSA Visualization

A modern web application for visualizing Data Structures and Algorithms (DSA) with step-by-step code execution.

## Features

- **Interactive Visualizations**: Watch algorithms in action with a visual representation of each step
- **Code Highlighting**: See which line of code is being executed at each step
- **Step-by-Step Control**: Navigate through the algorithm execution manually or use auto-play
- **Adjustable Speed**: Control the speed of the visualization
- **Customizable Input**: Generate random arrays of different sizes

## Currently Implemented Algorithms

- **Quick Sort**: Visualize the divide-and-conquer sorting algorithm with pivot selection, partitioning, and recursive sorting

## Project Structure

```
dsa-visualization/
├── public/                 # Public assets
│   ├── index.html          # HTML entry point
│   └── manifest.json       # Web app manifest
├── src/                    # Source code
│   ├── algorithms/         # Algorithm implementations
│   │   └── quickSort.ts    # QuickSort implementation with step tracking
│   ├── components/         # React components
│   │   ├── ArrayVisualizer.tsx       # Array visualization component
│   │   ├── QuickSortCode.tsx         # Code display with highlighting
│   │   └── QuickSortVisualizer.tsx   # Main QuickSort visualization component
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles
│   └── index.tsx           # React entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Make sure you have Node.js installed:
   ```
   node --version
   ```
   If not installed, download and install from [nodejs.org](https://nodejs.org/)

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Install styled-components:
   ```
   npm install styled-components @types/styled-components
   ```
   or
   ```
   yarn add styled-components @types/styled-components
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Adjust the array size using the input field (default is 10 elements)
2. Click "Generate New Array" to create a random array
3. Click "Start Sorting" to begin the visualization
4. Use the control buttons to:
   - Play/Pause the animation
   - Step forward or backward through the algorithm
   - Reset to the beginning
5. Adjust the speed slider to control how fast the animation runs

## Understanding the Visualization

- **Red Bar**: Represents the pivot element
- **Blue Bar**: Represents the left pointer (i)
- **Purple Bar**: Represents the right pointer (j)
- **Orange Bars**: Represent elements being swapped
- **Green Bars**: Represent elements in their final sorted position

## How QuickSort Works

1. **Choose a pivot**: The algorithm selects an element as the pivot (in our implementation, the rightmost element)
2. **Partitioning**: Rearrange the array so that:
   - Elements less than the pivot are on the left
   - Elements greater than the pivot are on the right
   - The pivot is in its final sorted position
3. **Recursion**: Apply the same process to the subarrays on the left and right of the pivot

## Future Enhancements

- Add more sorting algorithms (Merge Sort, Bubble Sort, etc.)
- Add data structure visualizations (Binary Trees, Linked Lists, etc.)
- Add graph algorithms (BFS, DFS, Dijkstra's, etc.)
- Add more customization options for the visualization
- Add performance metrics (time complexity, space complexity, etc.)

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js and npm/yarn are properly installed
2. Try deleting the `node_modules` folder and running `npm install` again
3. Check for any console errors in your browser's developer tools
4. Make sure all dependencies are installed correctly

## License

This project is licensed under the MIT License. 