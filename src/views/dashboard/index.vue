<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>-->
    <el-row>
      <el-col :xs="{span: 36}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <local-city></local-city>
      </el-col>
      <el-col :xs="{span: 36}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <liked-city></liked-city>
        <email-notify style="margin-top: 1rem;"></email-notify>
      </el-col>
    </el-row>
    <el-row>
      <trends></trends>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import LocalCity from './components/LocalCity'
import LikedCity from './components/LikedCity'
import Trends from './components/Trends'
import EmailNotify from './components/EmailNotify'

export default {
  name: 'Dashboard',
  components: {
    LocalCity,
    LikedCity,
    Trends,
    EmailNotify
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
