<template>
  <div class="animation-container">
    <div class="animation-options">
      <el-row :gutter="10">
        <el-radio-group
          v-model="selectedAnimation"
          class="animation-radio-group"
        >
          <el-radio
            v-for="animation in animations"
            :key="animation.value"
            :label="animation.value"
          >
            {{ animation.label }}
          </el-radio>
        </el-radio-group>
      </el-row>

      <el-divider />
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="持续时间" label-width="90px">
            <el-input-number
              v-model="animationDuration"
              :min="0.1"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="延迟时间" label-width="90px">
            <el-input-number
              v-model="animationDelay"
              :min="0"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="重复次数" label-width="90px">
            <el-input-number
              v-model="animationRepeat"
              :min="-1"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />
      <div class="button-group">
        <el-button class="action-button" @click="applyAnimation"
          >开始</el-button
        >
        <el-button class="action-button danger" @click="stopAnimation"
          >停止</el-button
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

const selectedAnimation = ref<string | null>(null)
const animationDuration = ref(2)
const animationDelay = ref(0)
const animationRepeat = ref(0)
const animationHistory = ref<string[]>([])

const applyAnimation = () => {
  const options = {
    duration: animationDuration.value,
    delay: animationDelay.value,
    repeat: animationRepeat.value,
    ease: 'power1.inOut'
  }

  switch (selectedAnimation.value) {
    case 'from':
      gsap.from(`#${store.current.id!}`, {
        ...options,
        x: 250,
        rotation: 360,
        yoyo: true
      })
      break
    case 'fromTo':
      gsap.fromTo(
        `#${store.current.id!}`,
        { x: 0, rotation: 0 },
        { ...options, x: 250, rotation: 360, borderRadius: '100%', yoyo: true }
      )
      break
    case 'scrollTrigger':
      gsap.to(`#${store.current.id!}`, {
        ...options,
        x: 150,
        rotation: 360,
        borderRadius: '100%',
        scale: 1.5,
        scrollTrigger: {
          trigger: `#${store.current.id!}`,
          start: 'bottom bottom',
          end: 'top 10%',
          scrub: true
        }
      })
      break
    case 'stagger':
      gsap.to(`#${store.current.id!}`, {
        ...options,
        y: 250,
        rotation: 360,
        yoyo: true,
        stagger: {
          amount: 1.5,
          grid: [2, 1],
          axis: 'y',
          from: 'center'
        }
      })
      break
    case 'to':
      gsap.to(`#${store.current.id!}`, {
        ...options,
        x: 250,
        rotation: 360,
        yoyo: true
      })
      break
    case 'timeline':
      const tl = gsap.timeline()
      tl.to(`#${store.current.id!}`, { x: 250, rotation: 360, duration: 2 })
        .to(`#${store.current.id!}`, { x: 0, rotation: 0, duration: 2 })
        .to(`#${store.current.id!}`, { x: -250, rotation: -360, duration: 2 })
        .to(`#${store.current.id!}`, { x: 0, rotation: 0, duration: 2 })
      break
    default:
      break
  }
  animationHistory.value.push(selectedAnimation.value!)
}

const stopAnimation = () => {
  gsap.killTweensOf(`#${store.current.id!}`)
}

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
  height: 100%;

  .animation-options {
    background: #fff;
    border-radius: 8px;
    width: 300px;

    .animation-radio-group {
      margin-bottom: 5px;

      .el-radio {
        margin-bottom: 10px;
      }
    }

    .button-group {
      display: flex;
      justify-content: space-between;
    }

    .action-button {
      width: 45%;
      padding: 10px;
      background-color: #00ced1;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #007b83;
      }
    }

    .danger {
      background-color: #ff4500;

      &:hover {
        background-color: #e03d00;
      }
    }
  }

  .el-form-item {
    margin-bottom: 10px;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .el-input-number {
      width: 100%;
    }
  }
}
</style>
