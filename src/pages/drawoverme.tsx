import Draw from '@/components/control/draw';
import { PageProps } from '@/type/global'
import Head from 'next/head'
import React from 'react'

export default function DrawOverMe({ socket, title}: PageProps ) {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Draw socket={socket} />
    </>)
}
