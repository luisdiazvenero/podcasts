import Layout from '../components/Layout'
import Banner from '../components/Banner'
import Series from '../components/Series'
import LastPodcasts from '../components/LastPodcasts'

export default class extends React.Component {

  static async getInitialProps({ query }) {
    let idChannel = query.id

    let [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
    ])

    let dataChannel = await reqChannel.json()
    let channel = dataChannel.body.channel

    let dataAudios = await reqAudios.json()
    let audioClips = dataAudios.body.audio_clips

    let dataSeries = await reqSeries.json()
    let series = dataSeries.body.channels

    return { channel, audioClips, series }
  }

  render() {
    const { channel, audioClips, series } = this.props

    return <Layout title="Podcasts">
        <Banner channel={channel}/>
        <h1>{ channel.title }</h1>

        { series.length > 0 &&
        <Series series = { series } />
        }

        <LastPodcasts audioClips = { audioClips } />

      <style jsx>{`    
        h1 {
          font-weight: 600;
          padding: 15px;
        }
      `}</style>

    </Layout>
  }
}