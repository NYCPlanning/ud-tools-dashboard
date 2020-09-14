import React, { useState, useRef } from 'react';
import { useDrag, useGesture } from 'react-use-gesture';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';

const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false }

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current));
  // const bind = useGesture(() => {
  //   console.log('dragged')
  //   // set({ x: down ? mx : 0, y: down ? my : 0})
  // })
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    // onDrag: state => () = > {
    //   console.log('gesture')
    //   const curIndex = order.current.indexOf(originalIndex)
    //   const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    //   const newOrder = swap(order.current, curIndex, curRow)
    //   setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    //   if (!down) order.current = newOrder
    // }
  });

  return (
    <div className='draggable-list flex'>
      {
      //springs.map(({ zIndex, shadow, y, scale }, i) => (
      //   <animated.div
      //     {...bind(i)}
      //     key={i}
      //     className='relative bg-black text-white p-4 cursor-pointer select-none'
      //     style={{
      //       zIndex,
      //       transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
      //     }}
      //     children={items[i]}
      //   />
      // ))
      }
    </div>
  )
}

export default DraggableList;