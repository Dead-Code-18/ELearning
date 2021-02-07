import React from "react";

const Course = (props) => {
  const {name, title, instructor, price  } = props.course;
  return (
    <section className="course">
      <h1>{name}</h1>
      <p>{title}</p>
      <p>{instructor}</p>
      <p>{price}</p>
    </section>
  );
};

export default Course;