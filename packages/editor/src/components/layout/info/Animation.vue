<template>
  <div class="animation-container">
    <div class="animation-options">
      <el-radio-group v-model="selectedAnimation" class="animation-radio-group">
        <el-radio
          v-for="animation in animations"
          :key="animation.value"
          :label="animation.value"
        >
          {{ animation.label }}
        </el-radio>
      </el-radio-group>
      <div class="button-group">
        <el-button class="action-button" @click="applyAnimation"
          >应用动画</el-button
        >
        <el-button class="action-button danger" @click="stopAnimation"
          >停止动画</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'
import { useEditorStore } from '@es-drager/editor/src/store'

const store = useEditorStore()

const applyAnimation = () => {
  switch (selectedAnimation.value) {
    case 'from':
      gsap.from(`#${store.current.id!}`, {
        x: 250,
        repeat: -1,
        yoyo: true,
        rotation: 360,
        duration: 2,
        ease: 'power1.inOut'
      })
      break
    case 'fromTo':
      gsap.fromTo(
        `#${store.current.id!}`,
        {
          x: 0,
          rotation: 0,
          borderRadius: '0%'
        },
        {
          x: 250,
          repeat: -1,
          yoyo: true,
          rotation: 360,
          duration: 2,
          borderRadius: '100%',
          ease: 'bounce.out'
        }
      )
      break
    case 'scrollTrigger':
      gsap.to(`#${store.current.id!}`, {
        x: 150,
        rotation: 360,
        borderRadius: '100%',
        scale: 1.5,
        scrollTrigger: {
          trigger: `#${store.current.id!}`,
          start: 'bottom, bottom',
          end: 'top 10%',
          scrub: true
        },
        ease: 'power1.inOut'
      })
      break
    case 'stagger':
      gsap.to(`#${store.current.id!}`, {
        y: 250,
        rotation: 360,
        yoyo: true,
        repeat: -1,
        borderRadius: '100%',
        stagger: {
          amount: 1.5,
          grid: [2, 1],
          axis: 'y',
          ease: 'circ.inOut',
          from: 'center'
        }
      })
      break
    case 'to':
      gsap.to(`#${store.current.id!}`, {
        x: 250,
        repeat: -1,
        yoyo: true,
        rotation: 360,
        duration: 2,
        ease: 'elastic'
      })
      break
    case 'timeline':
      const tl = gsap.timeline()
      tl.to(`#${store.current.id!}`, {
        x: 250,
        rotation: 360,
        duration: 2,
        ease: 'power1.inOut'
      })
        .to(`#${store.current.id!}`, {
          x: 0,
          rotation: 0,
          duration: 2,
          ease: 'power1.inOut'
        })
        .to(`#${store.current.id!}`, {
          x: -250,
          rotation: -360,
          duration: 2,
          ease: 'power1.inOut'
        })
        .to(`#${store.current.id!}`, {
          x: 0,
          rotation: 0,
          duration: 2,
          ease: 'power1.inOut'
        })
      break
    default:
      break
  }
}

const stopAnimation = () => {
  gsap.killTweensOf(`#${store.current.id!}`)
}

const selectedAnimation = ref<string | null>(null)

const animations = [
  { label: 'GsapFrom', value: 'from' },
  { label: 'GsapFromTo', value: 'fromTo' },
  { label: 'GsapScrollTrigger', value: 'scrollTrigger' },
  { label: 'GsapStagger', value: 'stagger' },
  { label: 'GsapTo', value: 'to' },
  { label: 'GsapTimeline', value: 'timeline' }
]
</script>

<style lang="scss" scoped>
.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;

  .animation-options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .animation-radio-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;

      .el-radio {
        margin-bottom: 10px;
        align-self: flex-start;
      }
    }

    .button-group {
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 10px;
    }

    .action-button {
      padding: 10px;
      background-color: #00ced1;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .danger {
      background-color: #ff4500;
    }
  }
}
</style>
