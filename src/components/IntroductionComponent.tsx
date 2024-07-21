import { FC, useRef } from 'react';

interface IntroductionComponentProps {
    endIntroduction: () => void
}

const IntroductionComponent: FC<IntroductionComponentProps> = ({endIntroduction}) => {
    const modalRef = useRef<HTMLDialogElement>(null)

    function closeIntroductionModal() {
        modalRef.current?.remove()
        endIntroduction()
    }

    return (
        <dialog onClose={closeIntroductionModal} className="modal" ref={modalRef}>
            <h1>To control the snake press W, A, S and D on keyboard or click
                on the cell the same column snake's head is currently at.
            </h1>
            <button onClick={closeIntroductionModal}>Start Game</button>
        </dialog>
    );
};

export default IntroductionComponent;