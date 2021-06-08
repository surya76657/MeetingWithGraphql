
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBuildingQuery } from '../graphql/query'
export default function AddMeeting({ setStep, setData, data }) {
  const { data: buildingData } = useQuery(getBuildingQuery);
  const [title, setTitle] = useState(data.title || '');
  const [date, setDate] = useState(data.date || '');
  const [startTime, setStartTime] = useState(data.startTime || '00:00');
  const [endTime, setEndTime] = useState(data.endTime || '00:00');
  const [building, setBuilding] = useState(data.building || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStep(1);
    setData({ title, startTime, endTime, building, date });
  }

  return (
    <div className="add-meeting">
      <h2> Add A Meeting </h2>
      <form onSubmit={handleSubmit}>
        <table >
          <tbody>
            <tr>
              <td><label>Title</label></td>
              <td><input type="text" value={title} onChange={e => setTitle(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>Date</label></td>
              <td><input type="date" value={date} onChange={e => setDate(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>Start Time</label></td>
              <td><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>End Time</label></td>
              <td><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>Select a building</label></td>
              <td>
                <select value={building} onChange={e => setBuilding(e.target.value)} required>
                  <option value="" >Choose</option>
                  {buildingData?.Buildings?.map(b => (<option value={b.id} key={b.id}>{b.name}</option>))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

