import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import FloatButton from '../../components/FloatButton';
import { listActivities } from '../../actions/activityActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../components/utils/LoadingBox';
import MessageBox from '../../components/MessageBox';

const reorder = (list, startIndex, endIndex) => {
    const result  = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}
export default function ActivityScreen(props) {

    const dispatch = useDispatch();

    const activitiesList = useSelector(state => state.activitiesList);
    const { loading, activities: activitiesLoad, error } = activitiesList;

    const [activities, setActivities] = useState();

    useEffect(()=>{
        if(!activitiesLoad) {
            dispatch(listActivities());
        } else {
            setActivities(activitiesLoad)
        }
    }, [dispatch, activitiesLoad]);

    return (
        <div>
            {
                loading ? <LoadingBox /> 
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                activities && (
                    <DragDropContext onDragEnd={(result) => {
                        const { source, destination } = result;
                        if (!destination) return;
                        if(source.index === destination.index) return;
                        setActivities(prevActivities => reorder(prevActivities, source.index, destination.index));
                    }}>
                        <div className="dragger-title">Actividades</div>
                        <Droppable droppableId="activities">
                            {(droppableProvided) => (
                                <div 
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef}
                                >
                                    {activities.map((item, index) => (
                                            <Draggable key={item.activityId.toString()} draggableId={item.activityId.toString()} index={index}>
                                                {(draggableProvided) => (
                                                    <div className="dragger-container"
                                                        {...draggableProvided.draggableProps}
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.dragHandleProps}
                                                    >
                                                        <Avatar className={`avatar-dragger-${item.activity.typeAlert}`}>
                                                            {item.activity.charAt(0)}
                                                        </Avatar>
        
                                                        <div>
                                                            {item.activity}
                                                        </div>
                                                        
                                                        <div>
                                                            <DeleteIcon />
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                            
                                    ))}
                                    {droppableProvided.placeholder}
                                </div>
                            )}
        
                        </Droppable>
                    </DragDropContext>
                )
            }

            <FloatButton props={props} />
        </div>
    )
}
