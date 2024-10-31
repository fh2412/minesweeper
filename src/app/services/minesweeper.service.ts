import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinesweeperService {

  fillGrid(rows: number, cols: number, mineCount: number): number[][] {
    const grid: number[][] = [];

    // Initialize the grid with 0s
    for (let i = 0; i < rows; i++) {
      grid.push(new Array(cols).fill(0));
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      if (grid[row][col] !== -1) {
        grid[row][col] = -1;
        minesPlaced++;

        // Update the numbers of adjacent mines for surrounding cells
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (row + i >= 0 && row + i < rows && col + j >= 0 && col + j < cols && grid[row + i][col + j] !== -1) {
              grid[row + i][col + j]++;
            }
          }
        }
      }
    }

    return grid;
  }
}