export default function Event() {
  return (
    <div>
      <h3>Create event</h3>
      <div>
        <form action="submit">
          <div>
            <div>
              <label htmlFor="createEventFormLocation">Name:</label>
              <input
                type="text"
                id="createEventFormName"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormLocation">Location:</label>
              <input
                type="text"
                id="createEventFormLocation"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormName">Date:</label>
              <input
                type="text"
                id="createEventFormName"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormGenre">Genre:</label>
              <input
                type="text"
                id="createEventFormGenre"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormDuration">Duration:</label>
              <input
                type="number"
                step="0.25"
                id="createEventFormDuration"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormCapacity">Max Capacity:</label>
              <input
                type="text"
                id="createEventFormCapacity"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormBanner">Banner:</label>
              <input
                type="text"
                id="createEventFormBanner"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
            <div>
              <label htmlFor="createEventFormLink">Link:</label>
              <input
                type="text"
                id="createEventFormLink"
                required
                style={{ color: "rgb(0,0,0)" }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
