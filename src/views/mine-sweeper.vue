<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'

const WIDTH = 12
const HEIGHT = 12

interface BlockState {
  x: number
  y: number
  mine: Boolean
  count: number
  turnOver: Boolean
  explode: Boolean
}
interface Postion {
  x: number
  y: number
}

// 伪数组加箭头函数生成数组  Array.from([1, 2, 3], x => x + x);
// let array = new Array(height).fill(new Array(width).fill(0));
const array = Array.from({ length: HEIGHT }, (value, x) => {
  return Array.from({ length: WIDTH },
    (value, y): BlockState => ({
      x,
      y,
      mine: Math.random() < 0.08,
      count: 0,
      turnOver: false,
      explode: false,
    }),
  )
})
const state = reactive(array)

// 计算方向 (todo: 应该让它具有排除错误的能力)
function computeDirections(x: number, y: number): Postion[] {
  // 方向
  const directions = [
    {
      x: -1,
      y: -1,
    },
    {
      x: -1,
      y: 0,
    },
    {
      x: -1,
      y: 1,
    },
    {
      x: 0,
      y: -1,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 1,
      y: -1,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 1,
      y: 1,
    },
  ]
  return directions.map((item) => {
    return {
      x: x + item.x,
      y: y + item.y,
    }
  })
}
// 计算数量
function computeCount(arrayState: BlockState[][]) {
  for (let y = 0; y < arrayState.length; y++) {
    const row = arrayState[y]
    for (let x = 0; x < row.length; x++) {
      if (arrayState[x][y]?.mine) {
        continue
      }
      const postions = computeDirections(x, y)
      arrayState[x][y].count = 0
      postions.forEach((postion: Postion) => {
        if (arrayState?.[postion.x]?.[postion.y]?.mine) {
          arrayState[x][y].count += arrayState[postion.x][postion.y].mine ? 1 : 0
        }
      })
    }
  }
}
// 点击翻牌
function turnOverMine(arrayState: BlockState[][], x: number, y: number) {
  // 点中雷
  if (arrayState[x][y].mine) {
    arrayState[x][y].turnOver = true
    arrayState[x][y].explode = true
    return
  }
  // 没点中雷
  if (arrayState[x][y].mine === false) {
    turnZero(arrayState, x, y)
  }
}
// 翻开为零的块
function turnZero(arrayState: BlockState[][], x: number, y: number) {
  if (arrayState[x][y].turnOver) {
    return
  }
  arrayState[x][y].turnOver = true
  if (arrayState[x][y].mine === false && arrayState[x][y].count === 0) {
    const postions = computeDirections(x, y)
    postions.forEach((postion: Postion) => {
      if (arrayState?.[postion.x]?.[postion.y]) {
        turnZero(arrayState, postion.x, postion.y)
      }
    })
  }
}

computeCount(state)

</script>
<template>
  <div class="mine-map">
    <div v-for="(row, x) in state" :key="x">
      <button
        v-for="(block, y) in row"
        :key="y"
        class="mine-block"
        :class="block.turnOver ? 'mine-block-color-over' : 'mine-block-color'"
        @click="turnOverMine(state, x, y)"
      >
        <template v-if="block.turnOver">
          <!-- 💣 -->
          <template v-if="block.mine && block.explode">{{ '💥' }}</template>
          <template v-else>{{ block.count ? block.count : '' }}</template>
        </template>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mine-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(182, 179, 179, 0.082);
  div {
    display: flex;
    .mine-block {
      width: 40px;
      height: 40px;
      margin: 1px;
    }
  }
}

.mine-block-color {
  background: rgb(119, 116, 116);
}
.mine-block-color-over {
  background: #fff;
}
</style>
