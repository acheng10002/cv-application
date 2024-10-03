import { useState } from "react";

export default function GeneralInfoSection() {
  // set isEditing state to true on page load
  const [isEditing, setIsEditing] = useState(true);
  // set generalInfo inputs state to empty strings
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // set submittedGenInfo state to null
  const [submittedGenInfo, setSubmittedGenInfo] = useState(null);

  // when values are typed into the inputs
  const handleInfoChange = (e) => {
    // destructures the name and value attributes from the event's target element/input
    const { name, value } = e.target;
    // updates generalInfo input state and triggers re-render
    setGeneralInfo({
      ...generalInfo,
      [name]: value,
    });
  };

  // when the button is clicked
  const handleToggleEditing = (e) => {
    // prevent page reload
    e.preventDefault();
    // if isEditing is true
    if (isEditing) {
      // updates submittedGenInfo state to be the updated generalInfo and triggers re-render
      setSubmittedGenInfo(generalInfo);
      // updates generalInfo input state to be empty strings and triggers re-render
      setGeneralInfo({ name: "", email: "", phone: "" });
    } else {
      // if isEditing is false, display the submitteEdGenInfo in the inputs or blank inputs
      setGeneralInfo(submittedGenInfo || { name: "", email: "", phone: "" });
    }
    /* set isEditing state to the opposite of the previous state 
      ensures I always get the most up-to-date isEditing state */
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      <div className="section gen-info">
        <form className="gen-form" onSubmit={handleToggleEditing}>
          <h2 className="section-heading">General Information</h2>
          {
            /* for each element in this array, render a label whose key
            is the value of the element */
            ["name", "email", "phone"].map((field) => (
              <label
                key={field}
                /* as label text, uppercase the first character of the
                element's value and concatenate that with the substring starting
                at the second character */
              >
                {`${field.charAt(0).toUpperCase() + field.slice(1)}:`}{" "}
                <input
                  name={field}
                  value={generalInfo[field]}
                  onChange={handleInfoChange}
                />
              </label>
            ))
          }
          <button
            className="gen-submit"
            type="submit"
            /* if isEditing is true, button should show "Submit", otherwise "Edit" */
          >
            {isEditing ? "Submit" : "Edit"}
          </button>
        </form>
        <div
          className="section-rendering gen"
          /* if isEditing is false (input values have been submitted) and submittedGenInfo
           is not null, then render the HTML elements for general info */
        >
          {submittedGenInfo && (
            <>
              <h2>{submittedGenInfo.name}</h2>
              <h3>{submittedGenInfo.email}</h3>
              <h3>{submittedGenInfo.phone}</h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}
