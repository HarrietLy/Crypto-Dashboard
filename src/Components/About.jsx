import github from './github.png'
import linkedin from './linkedin.png'

export default function About() {
    return (
        <div className="about">
            <div>
            <p>This web appliation was coded using Javascript and ReactJS library</p>
            <p>Price Line Chart: Chart JS library</p>
            <p>Data source: CoinGecko API</p>
            <p>Style: adapted from Sakura CSS framework</p>
            <br/>
            Feel free me drop  me a message on Linkedin to chat about software engineering and technology.
            </div> <br/>
            
            <div  >
                <a href='https://github.com/HarrietLy/Crypto-Dashboard'>
                <img alt='github-repos' src={github} width='50px' height='50px' style={{padding: '30px'}} />
                </a>
                <a href='https://www.linkedin.com/in/harrietly/'>
                <img alt='linkedin' src={linkedin} width='50px' height='50px' style={{padding: '30px'}} />
                </a>
            </div>
        </div>

    )
}