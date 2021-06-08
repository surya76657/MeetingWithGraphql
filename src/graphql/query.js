
import { gql } from '@apollo/client';

export const dashboardQuery = gql`query {
	Buildings{
    id
  },
  MeetingRooms{
    id
  },
  Meetings{
    title
    id
    date
    startTime
    endTime
  }
}`

export const getBuildingQuery = gql`query {
  Buildings{
    id,
    name
  }
}`

export const getRoomQuery = gql`query($id: Int!){
  Building(id: $id){
    id,
    name,
    meetingRooms{
      id,
      name,
      floor,
      meetings{
        startTime
        endTime
        date
      }
    }
  },
  Meetings{
    id
  }
}`
