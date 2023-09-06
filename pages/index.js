import Head from "next/head"
import Bottom from "../components/Bottom"
import Header from "../components/Header"
import Welcome from "../components/Welcome"
import Script from "next/script"
export default function Home() {
    return (
        <div>
            <Head>
                <title>Testnet Minting Site</title>
                <meta name="description" content="Ethereum testnet minting site" />
                <link rel="icon" href="/Cjdowner-Cryptocurrency-Flat-Ethereum-ETH.ico" />
            </Head>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
                strategy="lazyOnload"
            />
            <Script strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
            </Script>
            <Script
                src={process.env.NEXT_PUBLIC_GOOGLE_ADS}
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />

            <Header />
            <Welcome />
            <Bottom />
        </div>
    )
}
