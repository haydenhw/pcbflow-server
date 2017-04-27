import moment from 'moment';

export default function getTimeStamp() {
  return moment().format('h:mm:ss a');
}

