<template>
  <main>
    <transition name='in-left'>
      <aside-bar></aside-bar>
    </transition>
    <article>
      <head-bar>
        <div slot='navs'>
          <slot name='navs'></slot>
        </div>
      </head-bar>
      <content id='container'>
        <transition name='slide' mode='out-in' duration='100'>
          <slot name='content'></slot>
        </transition>
      </content>
    </article>
  </main>
</template>