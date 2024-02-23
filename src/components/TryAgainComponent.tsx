import React, { FC } from 'react';

interface TryAgainComponentProps {
    restart: () => void
}

const TryAgainComponent: FC<TryAgainComponentProps> = ({restart}) => {
    return (
        <div className="modal">
            <h1>Game Lost!</h1>
            <button onClick={restart}>Try Again</button>
        </div>
    );
};

export default TryAgainComponent;