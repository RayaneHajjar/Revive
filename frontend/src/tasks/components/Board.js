import React from 'react';
import { MdCancel } from 'react-icons/md';
import Card from './Card.js';
import Editable from '../../shared/components/forms/Editable';

const Board = (props) => {
    
    return (
        <div
            className='w-full laptop:w-90 p-8 flex flex-col gap-5 bg-green max-h-80vh overflow-y-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-green'
            onDragEnter={() => props.dragEnteredBoard(props.board.id)}
            onDragOver={(event) => {
                event.preventDefault();
            }}
        >
            {/* Board Top */}
            <div className='flex justify-between items-center'>
                {/* Board Title */}
                <p className='font-bold'>
                    <span className='text-brown text-lg'>
                        {props.board.title}
                    </span>
                    <span className='text-white ml-3'>
                        {props.board.cards.length || 0}
                    </span>
                </p>
                {/* Delete Icon */}
                <MdCancel className='fill-brown cursor-pointer' onClick={() => props.removeBoard(props.board.id)} />
            </div>
            {/* Board Cards */}
            <div className='flex flex-col gap-3'>
                {props.board.cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        boardId={props.board.id}
                        removeCard={props.removeCard}
                        dragEntered={props.dragEnteredCard}
                        dragEnded={props.dragEnded}
                        updateCard={props.updateCard}
                    />
                ))}
                {/* Add Card */}
                <Editable
                    text='+ Add Card'
                    placeholder='Enter Card Title'
                    displayClass='text-center'
                    onSubmit={(value) => props.addCard(props.board.id, value)}
                />
            </div>
        </div>
    );
};

export default Board;
