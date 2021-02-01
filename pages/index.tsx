import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const prefectures = [{ id: '09', name: '栃木' }, { id: '20', name: '長野' }, { id: '30', name: '和歌山' }]

export default function Home({ areas, time }) {
  const [input, setInput] = useState('')
  const [currentAreas, setCurrentAreas] = useState(areas)

  const search = async () => {
    const res = await fetch(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${input}`)
    const resJson = await res.json()
    const areas = resJson?.data ?? []
    setCurrentAreas(areas)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next SSG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {new Date().toLocaleTimeString()}
          {time}
        </h1>
        <label htmlFor='prefCode'>都道府県コード</label>
        <input id='prefCode' type='text' value={input} onChange={e => setInput(e.target.value)} />

        <button onClick={search}>検索</button>
        <a href='/prefecture/list'>都道府県一覧</a>
        <ul>
          {currentAreas.map(area => {
            return (
              <li key={area.id}>{area.name}</li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://www.land.mlit.go.jp/webland/api/CitySearch?area=13')
  const resJson = await res.json()
  const areas = resJson?.data ?? []
  console.log('res', resJson?.data)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      areas,
      time: new Date().toLocaleTimeString()
    },
  }
}

