import 'isomorphic-fetch'
export default class extends React.Component {

  static async getInitialProps() {
    let req = await fetch('https://randomuser.me/api/?results=50&inc=name,picture,email')
    let { results: persona } = await req.json()

    return { persona }
  }
  render(){
    const { persona } = this.props
    //{console.log(persona)}
    return <div>
      <header>Influencers</header>
      
      <div className="channels">
        { persona.map((user, index) => (
          <div className="channel" key={index}>
            <img src={user.picture.large } alt=""/>
            <h2>{user.name.first} {user.name.last}</h2>
            <p className="email">{user.email}</p>
          </div>
         
        )) }
      </div>
      
      
    
    <style jsx>{`
      header {
        color: #fff;
        background: #8756ca;
        padding: 15px;
        text-align: center;
    }

    .channels {
      display: grid;
      grid-gap: 15px;
      padding: 15px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

    .channel {
      display: block;
      border-radius: 3px;
      margin-bottom: 0.5em;
      box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
  }
  .channel img {
      width: 100%;   
  }
  .channel .email {
    font-size: 10px;
    text-align: center;
    margin: 0 0 10px;
    color: blue;
  }
  h2 {
      padding: 5px 0 0;
      font-size: 0.9em;
      font-weight: 600;
      margin: 0;
      text-align: center;
  }
    `}</style>

    <style jsx global>
    {`
    body {
      margin: 0;
      font-family: system-ui;
      background: white;
    }
    `}
    </style>
    </div>
  }
}
