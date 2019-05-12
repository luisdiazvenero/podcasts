import 'isomorphic-fetch'
import Layout from '../components/Layout'
import PodNav from '../components/PodNav';
import PodPic from '../components/PodPic';
import PodPlayer from '../components/PodPlayer';

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    let id = query.id
    let fetchClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
    let clip = (await fetchClip.json()).body.audio_clip
    return { clip }
  }

  render() {
    const { clip } = this.props

    return <Layout title="Podcasts">
      <div className='modal'>
        <div className='clip'>      
        <PodNav clip={clip}></PodNav>
        <PodPic clip={clip}></PodPic>
        <PodPlayer clip={clip}></PodPlayer>  
        </div>
      </div>

      <style jsx>{`
        .clip {
          display: flex;
          height: 100%;
          flex-direction: column;
          background: #8756ca;
          color: white;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
        }
      `}</style> 
    </Layout>
  }
}