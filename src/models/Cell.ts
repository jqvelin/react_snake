import { Colors } from "./Colors";
import { Field } from "./Field";

export class Cell {
    color: Colors
    position: number
    field: Field
    hasSnakeBody: boolean = false
    hasApple: boolean = false
    constructor(color: Colors, position: number, field: Field){
        this.color = color
        this.position = position
        this.field = field
    }
}