import Head from "next/head"
import Bottom from "../components/Bottom"
import Header from "../components/Header"
import Welcome from "../components/Welcome"
export default function Home() {
    return (
        <div>
            <Head>
                <title>Testnet Minting Site</title>
                <meta name="description" content="2" />
                <link rel="icon" href="/Cjdowner-Cryptocurrency-Flat-Ethereum-ETH.ico" />
            </Head>
            <Header />
            <Welcome />
            <Bottom />
        </div>
    )
}
