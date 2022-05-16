import { url } from 'inspector'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Banner from '../components/Banner'
import Header from '../components/Header'
import NewHeader from '../components/NewHeader'
import PostGrid from '../components/PostGrid'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>ChainRaise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewHeader />
      <Banner />
      <PostGrid posts={posts}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const getPostsQuery = `*[_type == "post"]{
      _id, 
      title,
      slug,
      author -> {
        name, 
        image
      },
      description,
      mainImage,
    }`

  const posts = await sanityClient.fetch(getPostsQuery)

  return {
    props: {
      posts,
    },
  }
}
