import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { animalEmojis, Articol, articole } from "../data/data";

export const CardArticol = ({ title, summary, poza, link }: Articol) => {
  const navigate = useNavigate();
  const gotoArticle = () => navigate(link || "/articol");

  return (
    <div className="card" onClick={gotoArticle}>
      <img
        src={"https://picsum.photos/400/200?" + Math.random()}
        alt="O imagine despre care nu stim nimic"
      />
      <h4>{title}</h4>
      <span className="emoji">
        {animalEmojis[Math.floor(Math.random() * animalEmojis.length)]}
      </span>
    </div>
  );
};
export const Postari: React.FC = () => {
  return (
    <Fragment>
      <h3 className="page-title">Ultimele articole</h3>
      <section className="card-container">
        {articole.map((articol, key) => (
          <CardArticol key={key} {...articol} />
        ))}
      </section>
    </Fragment>
  );
};
