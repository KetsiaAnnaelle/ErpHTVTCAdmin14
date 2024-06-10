import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, Print } from '@syncfusion/ej2-react-schedule';
import '../schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {AppBarComponent} from "@syncfusion/ej2-react-navigations";
import '../schedule-component.css';
/**
 * Schedule local data sample
 */
const LocalData = () => {
    const scheduleObj = useRef(null);

    const dataSource = [{
        Id:1,
        End: new Date(2019, 0, 11, 6, 30),
        start: new Date(2019, 0, 11, 4, 0),
        Summary:'Developper',
        IsAllDay:true,
        RecurrenceRule:'FREQ=DAILY;INTERVAL=1;COUNT=10'
    },
        {
            Id:1,
            End: new Date(2019, 0, 11, 16, 30),
            start: new Date(2019, 0, 11, 14, 20),
            Summary:'Informatique',
        },
    ]

    const data = extend([], dataSource.zooEventsData, null, true);
    const onEventRendered = (args) => {
        let categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) {
            return;
        }
        if (scheduleObj.current.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    };

    const onPrint = () => {
        scheduleObj.current.print();
    };



    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper'>
                <AppBarComponent colorMode="Primary" className='my-3'>
                    <div className='control-panel calendar-export'>
                        <ButtonComponent id='printBtn' cssClass='title-bar-btn e-inherit' iconCss='e-icons e-print' onClick={(onPrint)} content='imprimer'/>
                    </div>
                </AppBarComponent>
                <ScheduleComponent width='100%' selectedDate={new Date(2021, 1, 15)} ref={scheduleObj} eventSettings={{ dataSource: data }} eventRendered={onEventRendered}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, Print]}/>
                </ScheduleComponent>
            </div>
        </div>
    </div>);
};
export default LocalData;