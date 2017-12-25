'use strict';
import React from 'react';
import {G,Circle,Rect,Text,Ellipse} from 'react-native-svg';

const RoundBar = ({width, height, x, y,value}) => (
    <G>
        <Text stroke='#585858' fontSize='10' textAnchor='middle' dy=".32em" x={x} y={value == 0 ? 180 : y-20}>{value}</Text>
        {
            height > width ?
                <Circle fill="#32C5D2" r={width/2} cx={x} cy={ y+width/2}/>
                : null
        }
        {
            height > width ?
                <Rect fill="#32C5D2" width={width} height={height-width} x={x-width/2} y={y+width/2}/>
                :null
        }
        {
            height > width ?
                <Circle fill="#32C5D2" r={width/2} cx={x} cy={y+height+0.1*width - width/2 -1.5}/>
                :
                <Ellipse fill="#32C5D2" rx={width/2} ry={height/2} cx={x} cy={y+height - height/2}/>
        }
        {
            /*{value == 2.48 ? console.log(width, height, x, y) : null}*/
        }
    </G>
);

export default RoundBar;

