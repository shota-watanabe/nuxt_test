<template>
  <div>
    index<br>
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLogo />
    <BaseHeader />
  </div>
</template>

<script>
export default {
  asyncData(){
    console.log('asyncData')
  },
  fetch(context){
    console.log('fetch')
    console.log(context.route.name)
  },
  created(){
    console.log('created')
  }
}
</script>
