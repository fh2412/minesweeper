import { Component } from '@angular/core';
import { MinesweeperService } from '../../services/minesweeper.service';
import { CommonModule } from '@angular/common';
import { WaterFlushComponent } from "../water-flush/water-flush.component";
import { WinDialogComponent } from '../win-dialog/win-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, WaterFlushComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})

export class GameBoardComponent {
  
  grid: GridCell[][] = [];
  flagsLeft: number = 0;
  minesCount: number = 12;
  gridSize: number = 10;
  showWaterFlush: boolean = false;

  constructor(private minesweeperService: MinesweeperService, private dialog: MatDialog) {}

  ngOnInit() {
    this.grid = this.minesweeperService.fillGrid(this.gridSize, this.gridSize, this.minesCount).map(row => 
      row.map(value => ({ value, revealed: false, flagged: false }))
    );
    this.flagsLeft = this.minesCount;
  }

  flagCell(row: number, col: number, event: MouseEvent) {
    event.preventDefault();
    this.grid[row][col].flagged = !this.grid[row][col].flagged;
    this.flagsLeft -= this.grid[row][col].flagged ? 1 : -1;
    if (this.isGameWon()) {
      this.openWinDialog();
    }
  }

  revealCell(row: number, col: number) {
    if (this.grid[row][col].revealed) {
      return;
    }

    else if (this.grid[row][col].flagged) {
      this.grid[row][col].flagged = false;
      this.flagsLeft++;
      return;
    }
  
    this.grid[row][col].revealed = true;
  
    if (this.grid[row][col].value === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (row + i >= 0 && row + i < this.grid.length && 
              col + j >= 0 && col + j < this.grid[0].length &&
              !(i === 0 && j === 0)) {
            this.revealCell(row + i, col + j);
          }
        }
      }
    }

    if (this.isGameWon()) {
      this.openWinDialog();
    }

    else if (this.grid[row][col].value === -1) {
      this.showWaterFlush = true;
      setTimeout(() => {
        // Reset the game state here, e.g.,
        this.resetGame();
      }, 1500);

      setTimeout(() => {
        this.showWaterFlush = false;
      }, 3000);
    }
  }

  isGameWon(): boolean {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        if (!this.grid[row][col].revealed && !this.grid[row][col].flagged) {
          return false;
        }
      }
    }
    return true;
  }

  openWinDialog() {
    const dialogRef = this.dialog.open(WinDialogComponent, {
      data: { message: 'You Win!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'playAgain') {
        // Reset the game
        this.resetGame();
      }
    });
  }

  resetGame(){
    this.grid = this.minesweeperService.fillGrid(this.gridSize, this.gridSize, this.minesCount).map(row => 
      row.map(value => ({ value, revealed: false, flagged: false }))
    );
    this.flagsLeft = this.minesCount;
  }

}


interface GridCell {
  value: number;
  revealed: boolean;
  flagged: boolean;
}
