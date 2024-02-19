import React, { FC } from 'react';
import { Colors } from '../models/Colors';
import { Cell } from '../models/Cell';

interface CellComponentProps {
    cell: Cell;
    changeDirection: (e: string | undefined) => void
}

const CellComponent: FC<CellComponentProps> = ({cell, changeDirection}) => {
    function calculateDirection(){
        if (cell.position - cell.field.snake.coords[0] < 10 && cell.position - cell.field.snake.coords[0] > 0){
            return 'KeyD'
        }
        else if (cell.position - cell.field.snake.coords[0] > -10 && cell.position - cell.field.snake.coords[0] < 0) {
            return 'KeyA'
        }
        else if (cell.position - cell.field.snake.coords[0] >= 10) {
            return 'KeyS'
        }
        else if (cell.position - cell.field.snake.coords[0] < -10){
            return 'KeyW'
        }
    }
    return (
        <div onPointerDown={() => changeDirection(calculateDirection())} className={['cell', cell.hasApple ? 'apple' : '', cell.color === Colors.LIGHT ? 'light' : 'dark', cell.hasSnakeBody ? 'snake_body' : ''].join(' ')}>
        </div>
    );
};

export default CellComponent;