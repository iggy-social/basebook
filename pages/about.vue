<template>
  <Head>
    <Title>About | {{ $config.projectMetadataTitle }}</Title>
    <Meta property="og:title" :content="'About | ' + $config.projectMetadataTitle" />
  </Head>

  <div class="card border scroll-500">
    <div class="card-body">
      <p class="fs-3" @click="$router.back()">
        <i class="bi bi-arrow-left-circle cursor-pointer"></i>
      </p>

      <h3 class="mb-3 mt-3">Web3 Social is here.</h3>

      <p class="text-break mt-3">
        Basebook is <strong>a web3 social network</strong> built on Base, bringing about a brighter, decentralized social era.
      </p>

      <p class="text-break mt-3">
        Web3 Social is a place where social media is fully decentralized, permissionless and all the data is owned by users. 
        The way it should be.
      </p>

      <p class="text-break mt-3">
        Let's leave the old world of corporation-controlled social media behind us and move towards a decentralized future. 
        We promise, it's going to be a lot of fun!
      </p>

      <p class="text-break mt-3">
        Brought to you by the 
        <a target="_blank" href="https://punk.domains">Punk Domains</a> & Iggy Social
        team.
      </p>

      <hr />

      <h5>Beta test</h5>

      <p class="text-break mt-3">
        Basebook is still in beta. This means that many features are still missing, but will be added over time. 
        There may also be bugs and other issues.
      </p>

      <p class="text-break mt-3">
        The code is completely open source and you can access it 
        <a target="_blank" href="https://github.com/iggy-social/basebook">on GitHub</a>. Smart contract addresses are in 
        the <code>nuxt.config.ts</code> file (all smart contracts are verified on 
        <a target="_blank" href="https://base.blockscout.com/">Base BlockScout</a>).
      </p>

      <p class="text-break mt-3">
        What we need from you at this point is to try out Basebook and provide us with feedback. 
        Feel free to post ideas, features suggestions, rants directly in the Basebook. 
        Or you can drop by 
        <a target="_blank" href="https://discord.gg/8dSrwrAQeu">our Discord</a> 
        and share your thoughts there.
      </p>

      <div class="d-flex justify-content-around flex-wrap">
        <img class="img-fluid tech-stack mt-3" src="/img/tech/orbis.png" />

        <img class="img-fluid tech-stack mt-3" src="/img/tech/ceramic.png" />

        <img class="img-fluid tech-stack mt-3" src="/img/tech/punk.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>