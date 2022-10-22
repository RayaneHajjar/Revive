import React, { useState } from "react";
import { FaClock } from 'react-icons/fa';
import { MdDelete, MdCheckBox } from 'react-icons/md';

import CardInfo from "./CardInfo";

function Card(props) {
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, labels, tasks } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className='rounded-md p-4 flex flex-col gap-3 bg-white cursor-pointer overflow-hidden'
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id, props.card)}
        onDragEnter={() => props.dragEnteredCard(props.boardId, id)}
        onDragOver={(event) => {event.preventDefault()}}
      >
        {/* Card Header */}
        <div className='flex items-center justify-between'>
          {/* Card Labels */}
          <div className='flex flex-wrap gap-1'>
            {labels?.map((item, index) => (
              <label key={index} style={{backgroundColor: item.color}} className={`text-white w-fit rounded-3xl py-1 px-3 text-xs`}>
                {item.title}
              </label>
            ))}
          </div>
          {/* Card Delete */}
          <MdDelete className='fill-brown cursor-pointer' onClick={() => props.removeCard(props.boardId, id)} />
        </div>
        {/* Card Title */}
        <div className='flex-1 text-lg font-bold text-brown ml-1' onClick={() => setShowModal(true)}>{title}</div>
        {/* Card Footer */}
        <div className='flex items-center justify-between' onClick={() => setShowModal(true)}>
          {date && (
            <p className='rounded-3xl py-1 px-3 bg-green bg-opacity-50 w-fit text-xs flex gap-1 items-center'>
              <FaClock className='w-3 h-3 fill-brown' />
              <span className='text-brown font-bold ml-1'>{formatDate(date)}</span>
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className='rounded-3xl py-1 px-3 bg-green bg-opacity-50 w-fit text-xs flex gap-1 items-center'>
              <MdCheckBox className='w-3 h-3 fill-brown' />
              <span className='text-brown font-bold ml-1'>{tasks?.filter((item) => item.completed)?.length}/{tasks?.length}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;