import Layout from '../components/Layout'
import Banner from '../components/Banner'
import Series from '../components/Series'
import PodcastListWithClick from '../components/PodcastListWithClick'
import Error from './_error'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component {

    constructor(props){
        super(props)
        this.state = { openPodcast: null }
    }
  static async getInitialProps({ query, res }) {
    try {
        let idChannel = query.id

        let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
        ])

        if (reqChannel.status >= 400) {
            res.statusCode = reqChannel.status
            return {channel: null, audioClips: null, series: null, statusCode: reqChannel.status}
        }

        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel

        let dataAudios = await reqAudios.json()
        let audioClips = dataAudios.body.audio_clips

        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels

        return { channel, audioClips, series, statusCode: 200 }
    } catch(e) {
        return { channel: null, audioClips: null, series: null, statusCode: 503}
    }

    
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
        openPodcast: podcast
    })
  }
  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
        openPodcast: null
    })
  }
  render() {
    const { channel, audioClips, series, statusCode } = this.props
    const { openPodcast } = this.state

    if ( statusCode !== 200 ) {
        return <Error statusCode={statusCode}></Error>
      }

    return <Layout title={channel.title}>
        <Banner channel={channel}/>

        { openPodcast && 
        <div className="modal">
            <PodcastPlayer clip={openPodcast} onClose={this.closePodcast}></PodcastPlayer>
        </div> 
        }
        <h1>{ channel.title }</h1>

        { series.length > 0 &&
        <Series series = { series } />
        }

        <h2>Ultimos Podcasts</h2>
        <PodcastListWithClick podcasts = { audioClips } onClickPodcast={this.openPodcast}/>

      <style jsx>{`    
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
            padding: 15px;
            font-size: 1.2em;
            font-weight: 600;
            margin: 0;
        }
        .modal {
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index:99999;
            background: black;
        }
      `}</style>

    </Layout>
  }
}