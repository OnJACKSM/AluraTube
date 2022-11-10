import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLineStyle";

function HomePage() {
    const estiloDaHome = {
        //backgroundColor: "red" 
    };

    // console.log(config.playlists);

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu
                    valorDoFiltro={valorDoFiltro}
                    setValorDoFiltro={setValorDoFiltro}

                />
                <Header />
                <TimeLine
                    valorDoFiltro={valorDoFiltro}
                    playlists={config.playlists} favorites={config.favorites}
                >
                    O que tiver aqui dentro é filho de TimeLine
                </TimeLine>
            </div>
        </>
    )
}

export default HomePage

// function Menu() {
//     return (
//         <div>Menu</div>
//     )
// };

const StyledHeader = styled.div`
    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({ bannerBg }) => bannerBg});
    /* background-image: url(${config.bannerBg}); */
    margin-top: 56px;
    width: 100%;
    height: 230px;
`;

const StyledSpanFav = styled.span`
    .img-fav {
        flex-direction: row;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .p-fav {
        width: 50px;
        height: 16px;
        top: 108px;
        left: 15px;
        font-family: Helvetica, Arial, sans-serif;
        
    }
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bannerBg={config.bannerBg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} className="user-img" />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
};

function TimeLine({ valorDoFiltro, ...props }) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    const favTubes = Object.keys(props.favorites);
    // Statement (for);
    // Retorno por expressão (forEach não funciona);
    // Retorno por expressão (map converte de array(lista de nomes) para componentes de reaact;

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const valorDoFiltroNormalized = valorDoFiltro.toLowerCase();
                                return titleNormalized.includes(valorDoFiltroNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>

                )
            })}
            {favTubes.map((favTube) => {
                const cards = props.favorites[favTube];
                // console.log(card);
                return (
                    <section key={favTube}>
                        <h2>AluraTubes favoritos</h2>
                        <>
                            {cards.map((card) => {
                                return (
                                    <StyledSpanFav key={card.gitUserPng}>
                                        <img src={`https://github.com/${card.gitUserPng}.png`} className="img-fav" />
                                        <p className="p-fav">{card.name}</p>
                                    </StyledSpanFav>
                                )
                            })}
                        </>
                    </section>
                )
            })}
        </StyledTimeline>
    )
};