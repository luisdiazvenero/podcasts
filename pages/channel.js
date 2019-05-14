import Layout from '../components/Layout'
import Banner from '../components/Banner'
import Series from '../components/Series'
import LastPodcasts from '../components/LastPodcasts'
import Error from './_error'

export default class extends React.Component {

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

  render() {
    const { channel, audioClips, series, statusCode } = this.props

    if ( statusCode !== 200 ) {
        return <Error statusCode={statusCode}></Error>
      }

    return <Layout title={channel.title}>
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