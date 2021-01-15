import React, {useState, useEffect} from 'react'
import '../css/MainDeadline.css'
import MainOne from './mains/MainOne'
import _ from "underscore"

import {useRecoilValue} from 'recoil'
import NearestDate from '../states/nearestdate'

const MainDeadline: React.FC = () => {
    // get the date and the stuff from chrome storage
    const {schools, dates} = useRecoilValue(NearestDate);
    const [autos, setAutos] = useState<string>("");

    // render on whether its 0,1,error or an array
    const elems: string[][] = _.zip(schools, dates);

    //dynamically render the style

    useEffect(() => {
        const siz: number = Math.round(Math.sqrt(elems.length));
        const autostring: string = "auto ".repeat(siz);

        setAutos(autostring);
    }, [elems]);

    return (
        <div className="MainDeadline">
            <style jsx>{`
                .MainDeadline {
                    display: grid;
                    grid-template-columns: ${autos}
                }
            `}</style>

            {
                elems.map(([school, date]) => (
                    <MainOne school={school} date={date} />
                ))
            }
        </div>
    )
}

export default MainDeadline;