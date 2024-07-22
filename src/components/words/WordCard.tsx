'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import SetFamiliarity from '@/actions/update-familiarity';
import doubleArrow from '../../../public/double-arrow.png';
import pic1 from "../../../public/double-arrow.png";


interface Props {
  originalWord?: string,
  translatedWord?: string
}


export const WordCard = (props: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  const handleDrag = (evt: any) => {
    console.log(evt.currentTarget.id)
}

const handleDragOver = (evt: any) => {
    console.log(evt.currentTarget);
    if(evt.currentTarget.id == 'good') {
      var badEl = document.getElementById("good");
      badEl?.classList.add("hovering");
    }
    if(evt.currentTarget.id == 'bad') {
      var badEl = document.getElementById("bad");
      badEl?.classList.add("hovering");
    }
    console.log('entered!!');

    evt.preventDefault()
}

const handleDragAway = (evt: any) => {
  if (evt.currentTarget.contains(evt.relatedTarget)) {
    return;
  }
  if(evt.currentTarget.id == 'good') {
    var badEl = document.getElementById("good");
    badEl?.classList.remove("hovering");
  }
  if(evt.currentTarget.id == 'bad') {
    var badEl = document.getElementById("bad");
    badEl?.classList.remove("hovering");
  }
  evt.preventDefault()
}

const handleDrop = (evt: any) => {
    alert('dropped')
    var badEl = document.getElementById("bad");
    badEl?.classList.remove("hovering");
    var badEl = document.getElementById("good");
    badEl?.classList.remove("hovering");
}

const handleZoneDrop = (evt: any) => {
  evt.preventDefault();
    console.log(evt.target.id)
    SetFamiliarity(props.originalWord || '', evt.target.id)

}

const handleZoneDragOver = (evt: any) => {
  evt.preventDefault();
    //console.log(evt)
    evt.dataTransfer.dropEffect = "move";
}
var dragIcon = document.createElement('img');
console.log(doubleArrow.src);
dragIcon.src = doubleArrow.src;
dragIcon.width = 100;
const dragstartHandler = (evt: any) => {

  evt.dataTransfer.setDragImage(dragIcon, 0, 0);
}

const handleDragStart = (evt: any) => {

}

//this.addEventListener('dragstart', handleDragStart, false);

  return (
    <>
      <div className="flex items-stretch">
        <div id="bad" onDragLeave={handleDragAway} onDragEnter={handleDragOver} className="w-[50vw] h-screen border-dashed border-red-500 border-8 flex justify-start" onDrop={handleZoneDrop} onDragOver={handleZoneDragOver}>
        <div className="self-center ml-20 -rotate-90 bold text-4xl">{"Drag here if still struggling"}</div>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <div
            className="flip-card w-[40%] h-[200px] rounded-md"
            onClick={handleFlip}

            id="p1"
          >
            <motion.div
              className="flip-card-inner mt-20"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 360 }}
              transition={{ duration: 0.4, animationDirection: "normal" }}
              onAnimationComplete={() => setIsAnimating(false)}
            >
              <div
                onDragStart={dragstartHandler}
                draggable="true"
                className="flip-card-front w-[100%] h-[100%] bg-cover text-black rounded-lg p-4 flex items-center justify-center">
                <div className=""><h2 className="text-5xl flex align-middle p-20 bg-neutral-200 rounded">{ props.originalWord }</h2></div>
              </div>

              <div
                onDragStart={dragstartHandler}
                draggable="true"
                className="flip-card-back w-[100%] h-[100%] bg-cover text-black rounded-lg p-4 flex items-center justify-center">
                <h2 className="text-5xl p-20 bg-neutral-200 rounded">{ props.translatedWord }</h2>
              </div>
            </motion.div>
          </div>
        </div>
        <div id="good" onDragLeave={handleDragAway} onDragEnter={handleDragOver} className="w-[50vw] h-screen border-dashed border-blue-500 border-8 flex justify-end" onDrop={handleZoneDrop} onDragOver={handleZoneDragOver}>
          <div className="self-center mr-20 rotate-90 bold text-4xl">{"Drag here if familiar"}</div>
        </div>
      </div>
    </>
  );
};

