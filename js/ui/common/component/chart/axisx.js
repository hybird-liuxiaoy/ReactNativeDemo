/*
 * Author: Max Created:05/04/2017
 */
'use strict';
import React from 'react';
import {G, Line, Text, Circle} from 'react-native-svg';

const TICKSIZE = 7;

const radius = 14;

const getTickPoints = (start, end, numTicks) => {
    let res = [];
    let ticksEvery = Math.ceil((end - start) / (numTicks - 1));

    for (let cur = start; cur <= end; cur += ticksEvery) {
        res.push(cur);
    }
    //console.log(res);
    return res;
};

const getFulltime = (view,date) => {
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    switch (view) {
        case 'day':
            return Y+'年'+M+'月'+D+'日';
        case 'month':
            return Y+'年'+M+'月';
        case 'season':
            return Y+'年'+M+'季';
        case 'year':
            return Y+'年';
        default :

    }
};

const getTime = (view,date) => {
    let Y = date.getFullYear().toString().slice(2,4);
    let M = date.getMonth() + 1;
    let D = date.getDate();
    switch (view) {
        case 'day':
            if (M == 1) {
                if (D == 1) {
                    return Y+'年';
                } else return D+'日';
            } else {
                if (D == 1) {
                    return M+'月';
                } return D+'日';
            }
        case 'month':
            if (M == 1) {
                return Y+'年';
            } else return M+'月';
        case 'season':
            if (M == 1) {
             return Y+'年';
            }else return M+'季';
        case 'year':
            return Y+'年';
        default :

    }
};

const Axisx = ({data,view,width, height, xPadding, yPadding, ticks, startVal, endVal, svgWidth, scale}) => {
    let xStart = xPadding;
    let yStart = height - yPadding;
    let xEnd = xStart + width;
    let yEnd = yStart;
    if (!scale) {
        scale = typeof startVal === 'number' ? scale.scaleLinear() : scale.scaleTime();
        scale.domain([xStart, xEnd]).range([startVal, endVal]);
    }
    let tickPoints = getTickPoints(startVal, endVal, ticks);
    let middleTicket = Math.floor(ticks / 2);
    let middleX = scale.invert(tickPoints[middleTicket]);
    return (
        <G>
            <Line
                stroke="#6a6a6a"
                strokeWidth="0.75"
                x1={xStart}
                y1={yStart}
                x2={xEnd}
                y2={yEnd}/>
            {tickPoints.map(
                pos => <Line
                    key={pos}
                    stroke='#6a6a6a'
                    strokeWidth='0.75'
                    x1={scale.invert(pos)}
                    y1={yStart}
                    x2={scale.invert(pos)}
                    y2={yStart + TICKSIZE}/>
            )}
            { endVal > 4 ? <Circle fill='#6AD3DC' r={radius}  cx={middleX} cy={yStart + 4.5 * TICKSIZE - radius/2 +0.7} /> : null}
            <Text
                //fill='#555555'
                stroke='#969696'
                fontSize='10'
                textAnchor='middle'
                dy=".32em"
                x={middleX}
                y={yStart + 6 * TICKSIZE}>
                {data[tickPoints[middleTicket-1]] && getFulltime(view,data[tickPoints[middleTicket-1]].date)}
            </Text>
            {tickPoints.map(
                (pos,index) => <Text
                    key={pos}
                    //fill='#555555'
                    stroke={index == 4 ? '#fff' :'#585858'}
                    fontSize='10'
                    textAnchor='middle'
                    dy=".32em"
                    x={tickPoints.length == 2 && index==1 ? svgWidth/2 : scale.invert(pos)}
                    y={yStart + 2.5 * TICKSIZE}>
                    {/*{console.log(pos)}*/}
                    {/*{typeof startVal === 'number' ? pos : scale(pos).toLocaleDateString()}*/}
                    {/*{console.log(data[pos].date.getFullYear())}*/}
                    {pos > 0 && data[pos-1] && getTime(view,data[pos-1].date)}
                </Text>
            )}
        </G>
    );
};

export default Axisx;