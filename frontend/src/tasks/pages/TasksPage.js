import React, { useState, useEffect, useContext } from 'react';
import Page from '../../shared/components/layouts/Page.js';
import Container from '../../shared/components/layouts/Container.js';
import Header from '../../shared/components/layouts/Header/Header.js';
import Board from '../components/Board.js';
import Editable from '../../shared/components/forms/Editable.js';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttp } from '../../shared/hooks/use-http';

import LoadingSpinner from '../../shared/components/layouts/LoadingSpinner';
import ErrorModal from '../../shared/components/layouts/ErrorModal';

const TasksPage = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const [boards, setBoards] = useState([]);
    const [targetCard, setTargetCard] = useState({
        bid: '',
        cid: '',
    });
    const [targetBoard, setTargetBoard] = useState('');

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:3001/api/boards/user/${auth.userId}`,
                    'GET'
                );
                setBoards(responseData.boards);
            } catch (err) {console.log(err);}
        };
        fetchBoards();
    }, [sendRequest, auth.userId]);

    const addBoardHandler = async (title) => {
        const bid = Date.now() + Math.random() * 2;
        try {
            const responseData = await sendRequest(
                `http://localhost:3001/api/boards/`,
                'POST',
                JSON.stringify({
                    id: bid,
                    title: title,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const tempBoards = [...boards];
            tempBoards.push({
                id: bid,
                title: title,
                cards: [],
            });
            setBoards(tempBoards);
        } catch (err) {console.log(err);}
    };

    const removeBoardHandler = async (boardId) => {
        try{
            const responseData = await sendRequest(
                `http://localhost:3001/api/boards/${boardId}`,
                'DELETE',
                JSON.stringify({
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const index = boards.findIndex((item) => item.id === boardId);
            if (index < 0) return;
            const tempBoards = [...boards];
            tempBoards.splice(index, 1);
            setBoards(tempBoards);
        } catch (err) {console.log(err);}
    };

    const addCardHandler = async (bid, title) => {
        const cid = Date.now() + Math.random() * 2;
        try {
            const responseData = await sendRequest(
                `http://localhost:3001/api/boards/card/`,
                'POST',
                JSON.stringify({
                    id: cid,
                    title: title,
                    boardId: bid
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const index = boards.findIndex((item) => item.id === bid);
            if (index < 0) return;
            const tempBoards = [...boards];
            tempBoards[index].cards.push({
                id: cid,
                title,
                labels: [],
                date: "",
                tasks: [],
            });
            setBoards(tempBoards);
            console.log(boards);
        } catch (err) {console.log(err);}
    };

    const removeCardHandler = async (bid, cid) => {
        try{
            const responseData = await sendRequest(
                `http://localhost:3001/api/boards/card/${cid}`,
                'DELETE',
                JSON.stringify({
                    boardId: bid
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const index = boards.findIndex((item) => item.id === bid);
            if (index < 0) return;
            const tempBoards = [...boards];
            const cards = tempBoards[index].cards;
            const cardIndex = cards.findIndex((item) => item.id === cid);
            if (cardIndex < 0) return;
            cards.splice(cardIndex, 1);
            setBoards(tempBoards);
        } catch (err) {console.log(err);}
    };

    const dragEnded = async (bid, cid, card) => {
        let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;

        s_boardIndex = boards.findIndex((item) => item.id === bid);
        if(s_boardIndex < 0) return;

        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if(s_cardIndex < 0) return;
        
        let t_boardId = '';
        if(targetCard.bid==='' || targetCard.cid===''){
            t_boardId = targetBoard;
            t_boardIndex = boards.findIndex((item) => item.id === t_boardId);
            if (t_boardIndex < 0) return;
            t_cardIndex = boards.length;
        }
        else{
            t_boardId = targetCard.bid;
            t_boardIndex = boards.findIndex((item) => item.id === t_boardId);
            if (t_boardIndex < 0) return;

            t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
                (item) => item.id === targetCard.cid
            );
            if (t_cardIndex < 0)  return;
        }

        try{
            const response1 = await sendRequest(
                `http://localhost:3001/api/boards/card/${cid}`,
                'DELETE',
                JSON.stringify({
                    boardId: bid
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const response2 = await sendRequest(
                `http://localhost:3001/api/boards/card/`,
                'POST',
                JSON.stringify({
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    date: card.date,
                    labels: card.labels,
                    tasks: card.tasks,
                    boardId: t_boardId,
                    index: t_cardIndex
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const tempBoards = [...boards];
            tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
            tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, card);
            setBoards(tempBoards);
        } catch (err) {console.log(err);}
        setTargetCard({
            bid: '',
            cid: '',
        });
        setTargetBoard('');
    };

    const dragEnteredCard = (bid, cid) => {
        setTargetCard({
            bid,
            cid,
        });
    };

    const dragEnteredBoard = (bid) => {
        setTargetBoard(bid);
    };
    const updateCard = async (bid, cid, card) => {
        try{
            const responseData = await sendRequest(
                `http://localhost:3001/api/boards/card/${cid}`,
                'PATCH',
                JSON.stringify({
                    boardId: bid,
                    title: card.title,
                    description: card.description,
                    date: card.date,
                    labels: card.labels,
                    tasks: card.tasks
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const index = boards.findIndex((item) => item.id === bid);
            if (index < 0) return;

            const tempBoards = [...boards];
            const cards = tempBoards[index].cards;

            const cardIndex = cards.findIndex((item) => item.id === cid);
            if (cardIndex < 0) return;

            tempBoards[index].cards[cardIndex] = card;

            setBoards(tempBoards);
        } catch (err) {console.log(err);}
    };

    // useEffect(() => {
    //     localStorage.setItem('revive-boards', JSON.stringify(boards));
    // }, [boards]);

    return (
        <Page>
            <Header />
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <Container className='bg-white scrollbar-thin scrollbar-thumb-brown scrollbar-track-green overflow-y-auto laptop:overflow-y-hidden laptop:overflow-x-auto'>
                <div className='w-full h-fit laptop:w-fit laptop:h-full flex flex-col laptop:flex-row items-center laptop:items-start gap-7'>
                    {boards.map((item) => (
                        <Board
                            key={item.id}
                            board={item}
                            addCard={addCardHandler}
                            removeBoard={() => removeBoardHandler(item.id)}
                            removeCard={removeCardHandler}
                            dragEnded={dragEnded}
                            dragEnteredCard={dragEnteredCard}
                            dragEnteredBoard={dragEnteredBoard}
                            updateCard={updateCard}
                        />
                    ))}
                    <div className='w-full laptop:w-90'>
                        <Editable
                            displayClass='text-center'
                            placeholder='Enter Board Name'
                            text='+ Add Board'
                            onSubmit={addBoardHandler}
                        />
                    </div>
                </div>
            </Container>
        </Page>
    );
};

export default TasksPage;
