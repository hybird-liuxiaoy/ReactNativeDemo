import React, {Component} from 'react';
import {G, Line, Text} from 'react-native-svg';

const TICK_SIZE = 7;

const getTickPoints = (start, end, numTicks) => {
    let res = [start.toFixed(2)];
    let ticksEvery = Math.ceil((end - start) / (numTicks - 1));

    for (let cur = start; cur <= end; cur += ticksEvery) {
        res.push(cur.toFixed(2));
    }
    return res;
};

const Axis = ({width, height, xPadding, yPadding, ticks, startVal, endVal, scale, vertical}) => {
    let xStart = xPadding;
    let yStart = height - yPadding;
    let xEnd = vertical ? xStart : xStart + width;
    let yEnd = vertical ? yPadding : yStart;
    if (!scale) {
        scale = typeof startVal === 'number' ? scale.scaleLinear() : scale.scaleTime();
        scale.domain(vertical ? [yStart, yEnd] : [xStart, xEnd]).range([startVal, endVal]);
    }
    let tickPoints = getTickPoints(startVal, endVal, ticks);
    return (
        <G>
            <Line
                stroke="#000000"
                strokeWidth="0.75"
                x1={xStart}
                y1={yStart}
                x2={xEnd}
                y2={yEnd}
            />
            {tickPoints.map(
                pos =>
                    <Line
                        key={pos}
                        stroke='#000000'
                        strokeWidth='0.75'
                        x1={vertical ? xStart : scale.invert(pos)}
                        y1={vertical ? scale.invert(pos) : yStart}
                        x2={vertical ? xStart - TICK_SIZE : scale.invert(pos)}
                        y2={vertical ? scale.invert(pos) : yStart + TICK_SIZE}/>
            )}
            {tickPoints.map(
                pos =>
                    <Text
                        key={pos}
                        fill='#555555'
                        stroke='#555555'
                        fontSize='10'
                        textAnchor='middle'
                        dy=".32em"
                        x={vertical ? xStart - 2 * TICK_SIZE : scale.invert(pos)}
                        y={vertical ? scale.invert(pos) : yStart + 2 * TICK_SIZE}>
                        {typeof startVal === 'number' ? pos : scale(pos).toLocaleDateString()}
                    </Text>
            )}
        </G>
    );
};

export default Axis;
