import React, { useEffect, useRef, useState } from 'react';
import { Field } from '../models/Field';
import CellComponent from './CellComponent';
import IntroductionComponent from './IntroductionComponent';
import TryAgainComponent from './TryAgainComponent';

const INTERVAL_TIME = 1000

const FieldComponent = () => {
    const [field, setField] = useState(new Field())
    const [gameState, setGameState] = useState<'intro' | 'running' | 'lost'>('intro')
    const intervalID = useRef<null | ReturnType<typeof setInterval>>(null)

    const direction = useRef(1)

    useEffect(() => {
        restart()
    }, [])

    useEffect(() => {
        intervalID.current && clearInterval(intervalID.current)
        intervalID.current = setInterval(() => {
            if (gameState !== 'running') return
            if (!field.snake.canMove(direction.current)) {
                setGameState('lost')
                return
            }
            const nextField = field.getFieldCopy()
            nextField.snake.move(direction.current)
            nextField.drawSnake()
            setField(nextField)
        }, INTERVAL_TIME * field.snake.speed)
    }, [field.snake.speed, gameState])

    function restart() {
        document.addEventListener('keydown', e => changeDirection(e.code))
        direction.current = 1
        const nextField = new Field()
        nextField.initCells()
        nextField.initSnake()
        nextField.spawnApple()
        setField(nextField)
    }

    function endIntroduction() {
        setGameState('running')
    }

    function changeDirection(dir: string | undefined) {
        switch (dir) {
            case 'KeyD':
                direction.current = 1
                break;
            case 'KeyW':
                direction.current = -10
                break;
            case 'KeyS':
                direction.current = 10
                break;
            case 'KeyA':
                direction.current = -1
                break;
        }
    }

    return (<>
        <div className="field">
            {field.cells.map(cell =>
                <CellComponent direction={direction.current} changeDirection={changeDirection} key={cell.position} cell={cell} />
            )}
        </div>
        <IntroductionComponent endIntroduction={endIntroduction} />
        {gameState === "lost" && <TryAgainComponent restart={() => { restart(); setGameState("running") }} />}
    </>
    )
};

export default FieldComponent;