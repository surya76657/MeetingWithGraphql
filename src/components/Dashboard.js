import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { dashboardQuery } from '../graphql/query'
import { getDateWithTime } from '../utils'
export default function Dashboard() {
  const { loading, data } = useQuery(dashboardQuery);
  if (loading) return "loading...";

  const buildings = data?.Buildings?.length;
  const rooms = data?.MeetingRooms?.length;
  const meetings = data?.Meetings?.length;

  const onGoingMeetings = data?.Meetings?.filter(meet => {
    const { startTime, endTime, date } = meet;
    const currentDate = new Date();
    let sDate = getDateWithTime(date, startTime);
    let eDate = getDateWithTime(date, endTime);
    return currentDate >= sDate && currentDate <= eDate;
  }).length;

  return (
    <div className='dashboard'>
      <h2>Dashboard</h2>
      <ul className='list'>
        <li className='list-item'>
          <p>Buildings</p>
          <span>Total {buildings}</span>
        </li>
        <li className='list-item'>
          <p>Rooms</p>
          <span>Total {rooms}</span>
          <span>Free now {Math.max(rooms - onGoingMeetings, 0)}</span>
        </li>
        <li className='list-item'>
          <p>Meetings</p>
          <span>Total {meetings} today</span>
          <span>Total {onGoingMeetings || 0} ongoing now</span>
        </li>
      </ul>

      <Link to="/meeting/add"><button >Add a meeting</button></Link>
    </div>
  );
}