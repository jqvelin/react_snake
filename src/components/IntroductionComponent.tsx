import React, { FC } from 'react';

interface IntroductionComponentProps {
    setIntroduction: (nextState: boolean) => void
}

const IntroductionComponent: FC<IntroductionComponentProps> = ({setIntroduction}) => {
    return (
        <div className="modal">
            <h1>To control the snake press W, A, S and D on keyboard or click
                on the cell the same column snake's head is currently at.
            </h1>
            <button onClick={() => setIntroduction(false)}>Start Game</button>
        </div>
    );
};

export default IntroductionComponent;