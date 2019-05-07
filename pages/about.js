export default class extends React.Component {
    render(){
      return <div>
      
  
      <img src="/static/catrinas.png" alt="catrinas"/>
      <h1>Acerca de</h1>
      <p>Esto no es regueton</p>
      
      <style jsx>{`
      h1 {
        color: #2B0738;
        text-align: center;
      }
      p {
        color: purple;
        text-align: center;

      }
      img{
        max-width: 50%;
        display: block;
        margin: 0 auto;
      }
      
      `}</style>
  
      <style jsx global>
      {`
      body {
        background: #FFE4EA;
      }
      `}
      </style>
      </div>
    }
  }
  