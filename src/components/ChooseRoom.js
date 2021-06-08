
import { useState } from 'react'
import { ADD_MEETING } from '../graphql/mutation'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { getRoomQuery } from '../graphql/query'
import { useHistory } from "react-router-dom";
import { format } from 'date-fns'
import { getDateWithTime } from '../utils'
export default function ChooseRoom({ setStep, data }) {
  const history = useHistory();
  const { data: rooms, loading } = useQuery(getRoomQuery, { variables: { "id": Number(data.building) } });
  const [getListOfRooms, { data: roomsForSubmit, loading: isLoading }] = useLazyQuery(getRoomQuery, { variables: { "id": Number(data.building) } });
  const [addMeeting] = useMutation(ADD_MEETING);
  const [meetingRoomId, setMeetingRoomId] = useState(0);

  const getPayload = () => {
    const meetingId = rooms?.Meetings?.reduce((acc, curr) => Math.max(acc, curr.id), 0) || 0;
    const { title, date, startTime, endTime } = data;
    return {
      variables: {
        id: meetingId + 1,
        title,
        date: format(new Date(date), 'dd/MM/yyyy'),
        startTime,
        endTime,
        meetingRoomId
      }
    }
  }

  const handleClick = async () => {
    if (!meetingRoomId) return;
    await getListOfRooms();
    if (!freeRoom()) {
      return 'No Room Available'
    }
    const payload = getPayload();
    addMeeting(payload).then(data => {
      history.push("/");
      console.log(data);
    }).catch(err => console.error(err))
  }

  const freeRoom = () => rooms?.Building?.meetingRooms?.filter(room => {
    const isMeetingAvailable = room.meetings?.filter(meet => {
      const { startTime, endTime, date } = meet;
      const sDate = getDateWithTime(date, startTime);
      const eDate = getDateWithTime(date, endTime);
      const currentSDate = getDateWithTime(data.date, data.startTime);
      const currentEDate = getDateWithTime(data.date, data.endTime);
      if (currentSDate >= sDate && currentSDate <= eDate) {
        return true;
      } if (sDate >= currentSDate && sDate <= currentEDate) {
        return true;
      };
      return false;
    }).length;
    return (isMeetingAvailable) === 0
  });

  return (
    <div className='choose-room'>
      <button onClick={() => setStep(0)}>&#8592; Back</button>
      <h2>Please select one of the free rooms: </h2>
      <ul className='list'>
        {loading ? 'loading...' :
          freeRoom?.()?.length ? freeRoom()?.map(room => (
            <li className={`list-item ${room.id === meetingRoomId ? 'selected' : ""}`} onClick={() => setMeetingRoomId(room.id)} key={room.id}>
              <p>{room.name}</p>
              <span> {rooms?.Building?.name}</span>
              <span> Floor {room.floor}</span>
            </li>
          )) : 'No Room Available'
        }
      </ul>
      <div className="button-container">
        <button onClick={handleClick} disabled={!meetingRoomId}>Add Meeting</button>
      </div>
    </div>
  )
}

