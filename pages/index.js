import Head from "next/head"
import styles from "../styles/Home.module.css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import Bottom from "../components/Bottom"
import Header from "../components/Header"
import Welcome from "../components/Welcome"
export default function Home() {
    const { address } = useAccount()
    return (
        <div>
            <Head>
                <title>Signet</title>
                <meta name="description" content="2" />
                <link rel="icon" href="/logo.ico" />
            </Head>
            <Header />
            <Welcome />
            <Bottom />
        </div>
    )
}
