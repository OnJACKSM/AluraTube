import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/MenuStyle";
import { StyledTimeline } from "../src/components/TimeLineStyle";

function HomePage() {
    const estiloDaHome = {
        //backgroundColor: "red" 
    };

    // console.log(config.playlists);

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu />
                <Header />
                <TimeLine playlists={config.playlists}>
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
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

function Header() {
    return (
        <StyledHeader>

            {/* <img src="banner" /> */}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
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

function TimeLine(props) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);

    // Statement (for);
    // Retorno por expressão (forEach não funciona);
    // Retorno por expressão (map converte de array(lista de nomes) para componentes de reaact;

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                console.log(videos);
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
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
        </StyledTimeline>
    )
};