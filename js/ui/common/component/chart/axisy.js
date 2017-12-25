'use strict';
import React from 'react';
import {G, Line, Text} from 'react-native-svg';

const TICKSIZE = 7;

const getTickPoints = (start, end, numTicks) => {
    let res = [];
    let ticksEvery = Math.ceil((end - start) / (numTicks));

    for (let cur = start; cur <= end; cur += ticksEvery) {
        res.push(cur)
    }
    res.shift();
    return res;
};

const Axisy = ({width, height, xPadding, yPadding, ticks, startVal, endVal, scale}) => {
    let xStart = xPadding;
    let yStart = height - yPadding;
    let xEnd = xStart + width;
    let yEnd = yPadding;
    if (!scale) {
        scale = typeof startVal === 'number' ? scale.scaleLinear() : scale.scaleTime();
        scale.domain([yStart, yEnd]).range([startVal, endVal])
    }
    let tickPoints = getTickPoints(startVal, endVal, ticks);
    return (
        <G>
            {/*<Line*/}
                {/*stroke="#000000"*/}
                {/*strokeWidth="0.75"*/}
                {/*x1={xStart}*/}
                {/*y1={yStart}*/}
                {/*x2={xEnd}*/}
                {/*y2={yEnd}/>*/}
            {tickPoints.map(
                pos => <Line
                    key={pos}
                    stroke='#d8d8d8'
                    strokeWidth='0.75'
                    x1={xStart}
                    y1={scale.invert(pos)}
                    x2={xEnd}
                    y2={scale.invert(pos)}/>
            )}
            {tickPoints.map(
                pos => <Text
                    key={pos}
                    //fill='#b7b7b7'
                    stroke='#585858'
                    fontSize='10'
                    textAnchor='middle'
                    dy=".32em"
                    x={xEnd + 2 * TICKSIZE}
                    y={scale.invert(pos)}>
                    {typeof startVal === 'number' ? pos : scale(pos).toLocaleDateString()}
                </Text>
            )}
        </G>
    )
};

export default Axisy;
