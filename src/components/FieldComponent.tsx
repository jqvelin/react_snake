import React, { useEffect, useRef, useState } from 'react';
import { Field } from '../models/Field';
import CellComponent from './CellComponent';
import TryAgainComponent from './TryAgainComponent';

const FieldComponent = () => {
    const [field, setField] = useState(new Field(10))
    const [gameRunning, setGameRunning] = useState(true)
    const intervalID = useRef<null | ReturnType<typeof setInterval>>(null)

    const direction = useRef(1)
    let intervalTime = 1000
    let ignoreRestart = false
    let ignoreInterval = false
    useEffect(() => {
        if (!ignoreRestart) restart()
        return () => {ignoreRestart = true}
    }, [])
    useEffect(() => {
        if (!ignoreInterval) {
        intervalID.current && clearInterval(intervalID.current)
        intervalID.current = setInterval(() => {
            if (!gameRunning) return
            if (!field.snake.canMove(direction.current)) {
                setGameRunning(false)
                return
            }
            const nextField = field.getFieldCopy()
            nextField.snake.move(direction.current)
            nextField.drawSnake()
            setField(nextField)
        }, intervalTime * field.snake.speed)}
        return () => {ignoreInterval = true}
    }, [field.snake.speed, gameRunning])
    
    function restart(){
        document.querySelector('html')?.style.setProperty('--columns_qty', `${field.size}`)
        document.addEventListener('keydown', e => changeDirection(e.code))
        direction.current = 1
        const nextField = field
        nextField.initCells()
        nextField.initSnake()
        nextField.spawnApple()
        setField(nextField)
        setGameRunning(true)
        
    }

    function changeDirection(dir: string | undefined){
        switch (dir){
            case 'KeyD':
                direction.current = 1
                break;
            case 'KeyW':
                direction.current = -field.size
                break;
            case 'KeyS':
                direction.current = field.size
                break;
            case 'KeyA':
                direction.current = -1
                break;
        }
    }

    return (
        <>
        {!gameRunning && <TryAgainComponent restart={restart}/>}
        <div className="field">
            {field.cells.map(cell => 
                <CellComponent changeDirection={changeDirection} key={cell.position} cell={cell}/>
            )}
        </div>
        </>
    );
};

export default FieldComponent;