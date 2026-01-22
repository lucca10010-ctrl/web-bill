import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function New() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <h1>new</h1>
      <div>
        <h3>DatePicker Demo</h3>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select date"
        />
        <p>Selected date: {startDate ? startDate.toLocaleDateString() : "None"}</p>
      </div>
    </div>
  );
}

export default New;