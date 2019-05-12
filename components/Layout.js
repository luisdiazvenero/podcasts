import Link from 'next/link'
export default class Layout extends React.Component{
    render(){
        const {children} = this.props
        return <div>
            <header><Link href="/"><a>Podcasts</a></Link> </header>
            {children}

            <style jsx>{`
                header {
                    color: #fff;
                    background: #8756ca;
                    padding: 15px;
                    text-align: center;
                }

                header a{
                    color: #fff;
                    text-decoration: none;
                }
            `}</style>

            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: system-ui;
                    background: white;
                }
            `}</style>
        </div>
    }
}