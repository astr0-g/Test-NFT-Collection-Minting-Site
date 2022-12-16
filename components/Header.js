import { ConnectButton } from "@rainbow-me/rainbowkit"
import styles from "../styles/Home.module.css"
export default function Header() {
    return (
        <div>
            <nav className={styles.navBar}>
                <div className="flex items-center ">
                    <div className="text-white font-bold font-Prompt text-2xl">
                        TESTNET NFT MINT
                    </div>
                </div>
                <ConnectButton />
            </nav>
        </div>
    )
}
