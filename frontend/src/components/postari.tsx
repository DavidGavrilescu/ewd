import React, { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { animalEmojis } from '../data/emoji';


interface Articol {
    title: string;
    summary: string;
    poza: string | null;
    link?: string;
}

export const articole: Articol[] = [
    {
        title: 'Primul articol',
        summary: 'Prmul articol este despre ceva anume dar inca nu este clar',
        poza: null
    },
    {
        title: 'Al doilea articol',
        summary: 'Al doilea articol este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Al treilea articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Penultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Ultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null,
    }, {
        title: 'Primul articol',
        summary: 'Prmul articol este despre ceva anume dar inca nu este clar',
        poza: null
    },
    {
        title: 'Al doilea articol',
        summary: 'Al doilea articol este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Al treilea articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Penultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Ultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null,
    },
]
export const CardArticol = ({
    title, summary, poza, link
}: Articol) => {
    const navigate = useNavigate();
    const gotoArticle = () => navigate(link || '/articol');

    return <div className="card" onClick={gotoArticle}>
        <img src={"https://picsum.photos/400/200?"+Math.random()} alt="O imagine despre care nu stim nimic" />
        <h4>{title}</h4>
        <span className="emoji">{animalEmojis[Math.floor(Math.random() * animalEmojis.length)]}</span>

    </div>
}
export const Postari: React.FC = () => {
    return (
        <Fragment>
            <h3 className="page-title">Ultimele articole</h3>
            <section className="card-container">
                {articole.map(articol => <CardArticol {...articol} />)}
            </section>
        </Fragment>
    );
};

