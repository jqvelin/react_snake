import { Cell } from "./Cell"
import { Colors } from "./Colors"
import { SnakeBody } from "./SnakeBody"

export class Field {
    cells: Cell[] = []
    snake: SnakeBody
    constructor(){
        this.snake = new SnakeBody(this)
    }

    initCells(){
        this.cells = []
        for (let y = 0; y < 10; y++){
            for (let x = 0; x < 10; x++){
                this.cells.push(new Cell((x+y) % 2 === 0 ? Colors.LIGHT : Colors.DARK, y === 0 ? x : Number(`${y}${x}`), this))
            }
        }
    }

    initSnake(){
        this.snake = new SnakeBody(this)
        this.drawSnake()
    }

    drawSnake(){
        for (let cell of this.cells){
            cell.hasSnakeBody = false
        }
        for (let coord of this.snake.coords){
            const cell = this.cells.find(cell => cell.position === coord)
            if (cell) cell.hasSnakeBody = true
        }
    }

    spawnApple(){
        this.cells.forEach(cell => cell.hasApple = false)
        let randomCell = Math.floor(Math.random() * 10 ** 2)
        while(this.cells[randomCell].hasSnakeBody){
            randomCell = Math.floor(Math.random() * 10 ** 2)
        }
        this.cells[randomCell].hasApple = true
    }

    getFieldCopy(){
        const fieldCopy = new Field()
        fieldCopy.cells = this.cells
        fieldCopy.snake = this.snake
        return fieldCopy
    }
}