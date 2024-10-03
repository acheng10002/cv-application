import { useState } from "react";

export default function EdPractInfoSection({
  sectionTitle,
  initialEdPractInput,
  fieldNames,
}) {
  // set isEditing state to true on page load
  const [isEditing, setIsEditing] = useState(true);
  // set edPractInput state to some initial info
  const [edPractInput, setEdPractInput] = useState(initialEdPractInput);
  // set submittedEdPractInfo state to null
  const [submittedEdPractInfo, setSubmittedEdPractInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // when values are typed into the inputs
  const handleInfoChange = (e) => {
    // destructures the name and value attributes from the event's target element/input
    const { name, value } = e.target;

    // adds bullet points automatically for the textarea
    if (name === "positionResponsibilities") {
      let modifiedValue = value;
      /* first ensures the current value does not end with a new line character 
        (user hasn't just pressed Enter )
        and second checks if the current value contains at least one newline
        character (user has entered multiple lines of text */
      if (!value.endsWith("\n") && value.includes("\n")) {
        modifiedValue = value
          // splits the textarea text into an array using \n as the delimiter
          .split("\n")
          /* maps over each line in the array, first checks if the trimmed line
            without leading/trailing spaces, already starts with a bullet 
            if it does, the line remains unchanged
            if it doesn't, a bullet point is added to the start with <leading /
            trailing whitespace removed */
          .map((line) =>
            line.trim().startsWith("•") ? line : `• ${line.trim()}`
          )
          // joins the lines back together with newline characters between them
          .join("\n");
      }
      // if Enter is pressed, add a new bullet point
      if (value.endsWith("\n")) {
        modifiedValue += "• ";
      }

      setEdPractInput({
        ...edPractInput,
        [name]: modifiedValue,
      });
    } else {
      // updates edPractInput state and triggers re-render
      setEdPractInput({
        ...edPractInput,
        [name]: value,
      });
    }
  };

  const isEducationEntry =
    edPractInput.hasOwnProperty("schoolName") &&
    edPractInput.hasOwnProperty("titleOfStudy") &&
    edPractInput.hasOwnProperty("datesOfStudy");

  const isPracticalEntry =
    edPractInput.hasOwnProperty("companyName") &&
    edPractInput.hasOwnProperty("positionTitle") &&
    edPractInput.hasOwnProperty("datesAtPosition") &&
    edPractInput.hasOwnProperty("positionResponsibilities");

  // when the button is clicked
  const handleToggleEditing = (e) => {
    // prevent page reload
    e.preventDefault();
    // if isEditing is true
    if (isEditing) {
      if (
        (isEducationEntry &&
          edPractInput.schoolName.trim() === "" &&
          edPractInput.titleOfStudy.trim() === "" &&
          edPractInput.datesOfStudy.trim() === "") ||
        (isPracticalEntry &&
          edPractInput.companyName.trim() === "" &&
          edPractInput.positionTitle.trim() === "" &&
          edPractInput.datesAtPosition.trim() === "" &&
          edPractInput.positionResponsibilities.trim() === "")
      ) {
        const updatedEdPractInput = [...submittedEdPractInfo];
        updatedEdPractInput.splice(currentIndex, 1);
        setSubmittedEdPractInfo(updatedEdPractInput);

        if (updatedEdPractInput.length > 0) {
          const nextIndex =
            currentIndex >= updatedPractInfo.length ? 0 : currentIndex;
          setEdPractInput(updatedEdPractInput[nextIndex]);
          setCurrentIndex(nextIndex);
        } else {
          setEdPractInput(initialEdPractInput);
          setCurrentIndex(0);
          setIsEditing(false);
        }
      } else {
        const updatedEdPractInput = [...submittedEdPractInfo];
        if (currentIndex < updatedEdPractInput.length) {
          updatedEdPractInput[currentIndex] = edPractInput;
        } else {
          updatedEdPractInput.push(edPractInput);
        }
        setSubmittedEdPractInfo(updatedEdPractInput);

        if (currentIndex < updatedEdPractInput.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setEdPractInput(updatedEdPractInput[currentIndex + 1]);
        } else {
          setEdPractInput(initialEdPractInput);
          setIsEditing(false);
        }
      }
    } else {
      if (submittedEdPractInfo.length > 0) {
        setEdPractInput(submittedEdPractInfo[0]);
        setCurrentIndex(0);
        setIsEditing(true);
      }
    }
  };

  const handleAddNewEntry = () => {
    const isEntryValid =
      (isEducationEntry &&
        edPractInput.schoolName.trim() !== "" &&
        edPractInput.titleOfStudy.trim() !== "" &&
        edPractInput.datesOfStudy.trim() !== "") ||
      (isPracticalEntry &&
        edPractInput.companyName.trim() !== "" &&
        edPractInput.positionTitle.trim() !== "" &&
        edPractInput.datesAtPosition.trim() !== "" &&
        edPractInput.positionResponsibilities.trim() !== "");
    if (isEntryValid) {
      setSubmittedEdPractInfo([...submittedEdPractInfo, edPractInput]);
      setEdPractInput(initialEdPractInput);
      setCurrentIndex(submittedEdPractInfo.length + 1);
      setIsEditing(false);
    }
  };

  return (
    <>
      <div
        className={`section ${sectionTitle === "Practical Experience" ? "pract-experience" : ""}`}
      >
        <form className="ed-pract-form" onSubmit={handleToggleEditing}>
          <h2 className="section-heading ed-pract-heading">{sectionTitle}</h2>
          {
            /* for each element in this array, render a label whose key
            is the value of the element */
            fieldNames.map((field) => (
              <label
                key={field}
                /* as label text, uppercase the first character of the
              element's value and concatenate that with the substring starting
              at the second character */
              >
                {field === "schoolName" ||
                field === "titleOfStudy" ||
                field === "datesOfStudy"
                  ? `${field.charAt(0).toUpperCase()}${field.slice(1).replace(/([A-Z])/g, " $1")}: `
                  : `${field.charAt(0).toUpperCase()}${field.slice(1).replace(/([A-Z])/g, " $1")}: `}
                {field === "positionResponsibilities" ? (
                  <textarea
                    name={field}
                    value={edPractInput[field] || ""}
                    onChange={handleInfoChange}
                    rows="5"
                    cols="100"
                  />
                ) : (
                  <input
                    name={field}
                    value={edPractInput[field]}
                    onChange={handleInfoChange}
                  />
                )}
              </label>
            ))
          }
          <div
            className={`buttons-container ${sectionTitle === "Educational Experience" ? "ed-buttons" : ""}`}
          >
            <button
              className="ed-pract-submit"
              type="submit"
              /* if isEditing is true, button should show "Submit", otherwise "Edit" */
            >
              {isEditing ? "Submit" : "Edit"}
            </button>
            {!isEditing && (
              <button
                className="ed-pract-add"
                type="button"
                onClick={handleAddNewEntry}
              >
                Add & Submit New Entry
              </button>
            )}
          </div>
        </form>
        <div className="section-rendering ed-pract">
          {submittedEdPractInfo.length > 0 &&
            submittedEdPractInfo.map((entry, index) => (
              <div key={index} className="entry-display">
                {entry.schoolName && entry.titleOfStudy ? (
                  <p>{`${entry.schoolName},  ${entry.titleOfStudy},  ${entry.datesOfStudy}`}</p>
                ) : entry.companyName && entry.positionTitle ? (
                  <div>
                    <p>
                      <b>
                        {`${entry.companyName}, ${entry.positionTitle}, ${entry.datesAtPosition}`}
                      </b>
                    </p>
                    <pre>
                      {entry.positionResponsibilities.replace(/• /g, "\n• ")}
                    </pre>
                  </div>
                ) : (
                  <div>
                    <p>Unknown Entry</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
