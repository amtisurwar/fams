import { eventImage } from '../common/constant';

module.exports = {

  getEventListData(value) {
    console.log("value", value);
    const eventListCurrent = [];
    const eventListPast = [];
    value.current.map((data) =>{
      eventListCurrent.push({
        source: data.image,
        eventTitle: data.name,
        eventAddress: data.location,
        eventDescription: data.date,
        id: data.id,
      })
    } )
    value.past.map((data) =>{
      eventListPast.push({
        source: data.image,
        eventTitle: data.name,
        eventAddress: data.location,
        eventDescription: data.date,
        id: data.id,
      })
    } )
    const eventList = {
      eventListCurrent,
      eventListPast
    }
    return eventList;
  },

  parseList(value) {
    const parseList = [];
    value.map((data) => {
      parseList.push({
        value: data.name,
        id: data.id,
      })
    } )
    return parseList;
  },

  dropDownFilter(data) {
    if(data.Data !== undefined) {
      if(data.Data.LeaveType !== undefined) {
        return data;
      }
    }
  },

};
