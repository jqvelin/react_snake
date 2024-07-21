import { Field } from "./Field"

export class SnakeBody {
    coords: number[] = [53, 52, 51, 50]
    field: Field
    speed: number = 1
    isFreeToMove: boolean = true

    constructor(field: Field){
        this.field = field
    }
    
    move(direction: number){
        const nextHeadPosition = this.coords[0] + direction
        this.coords.unshift(nextHeadPosition)
        if (this.field.cells[nextHeadPosition].hasApple) {
            this.field.spawnApple()
            this.speed *= 0.95
            return
        }
        this.coords.pop()
    }

    canMove(direction: number){
        const nextHeadPosition = this.coords[0] + direction
        if (
            (!this.field.cells[nextHeadPosition]) ||
            (direction === 1 && nextHeadPosition % 10 === 0) ||
            (direction === -1 && nextHeadPosition % 10 === 10 - 1) ||
            (this.field.cells[nextHeadPosition].hasSnakeBody)
        ) return false
        return true
    }

}